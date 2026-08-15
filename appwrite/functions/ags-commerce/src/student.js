import { randomBytes } from 'node:crypto';
import { env } from './env.js';
import { hashToken, signStudentProof, verifyStudentProof } from './crypto-box.js';
import { studentVerificationsCol } from './setup-tokens.js';

const ACADEMIC_EMAIL =
	/\.(edu|ac\.[a-z]{2}|edu\.[a-z]{2}|ac\.uk|edu\.au|edu\.sg|edu\.hk)$/i;

export function isAcademicEmail(email) {
	const e = String(email || '').toLowerCase();
	if (!e.includes('@')) return false;
	const domain = e.split('@')[1] || '';
	return ACADEMIC_EMAIL.test(domain) || domain.endsWith('.edu');
}

export function siteOrigin() {
	return env('PUBLIC_SITE_ORIGIN', 'https://tmrxjd.github.io/agent-governance-system-site').replace(
		/\/$/,
		''
	);
}

export function requireStudentProofForPlan(planId) {
	return String(planId || '').includes('student');
}

export function checkStudentProof(proof) {
	const secret = env('LICENSE_SIGNING_SECRET');
	if (!secret) return { ok: false, error: 'server misconfigured' };
	return verifyStudentProof(proof, secret);
}

export async function startGithubOAuth({ returnUrl }) {
	const clientId = env('GITHUB_OAUTH_CLIENT_ID');
	if (!clientId) {
		return {
			ok: false,
			error: 'GitHub student verification is not configured (GITHUB_OAUTH_CLIENT_ID).',
			code: 'github_not_configured'
		};
	}
	const state = randomBytes(16).toString('hex');
	const redirectUri = env(
		'GITHUB_OAUTH_REDIRECT_URI',
		`${siteOrigin()}/students/?provider=github`
	);
	const params = new URLSearchParams({
		client_id: clientId,
		redirect_uri: redirectUri,
		scope: 'read:user user:email',
		state,
		allow_signup: 'false'
	});
	// Stash state→returnUrl in signed proof-shaped cookie substitute: return state to client to echo back
	return {
		ok: true,
		authUrl: `https://github.com/login/oauth/authorize?${params}`,
		state,
		redirectUri,
		returnUrl: returnUrl || `${siteOrigin()}/checkout/?plan=personal_student_monthly`
	};
}

export async function completeGithubOAuth({ code, state, log }) {
	const clientId = env('GITHUB_OAUTH_CLIENT_ID');
	const clientSecret = env('GITHUB_OAUTH_CLIENT_SECRET');
	if (!clientId || !clientSecret) {
		return { ok: false, error: 'GitHub OAuth not configured', code: 'github_not_configured' };
	}
	if (!code) return { ok: false, error: 'missing code' };

	const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
		method: 'POST',
		headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify({
			client_id: clientId,
			client_secret: clientSecret,
			code,
			redirect_uri: env(
				'GITHUB_OAUTH_REDIRECT_URI',
				`${siteOrigin()}/students/?provider=github`
			)
		})
	});
	const tokenJson = await tokenRes.json();
	if (!tokenJson.access_token) {
		log?.(`github token exchange failed: ${JSON.stringify(tokenJson)}`);
		return { ok: false, error: 'GitHub token exchange failed', code: 'oauth_failed' };
	}
	const ghToken = tokenJson.access_token;

	const eduRes = await fetch('https://education.github.com/api/user', {
		headers: {
			Authorization: `token ${ghToken}`,
			Accept: 'application/json'
		}
	});
	if (!eduRes.ok) {
		log?.(`education API ${eduRes.status}`);
		return {
			ok: false,
			error:
				'Could not confirm GitHub Student Developer Pack. Join the Pack at education.github.com, then try again.',
			code: 'not_student'
		};
	}
	const edu = await eduRes.json();
	if (!edu.student) {
		return {
			ok: false,
			error: 'GitHub account is not verified as a student (Student Developer Pack).',
			code: 'not_student'
		};
	}

	const userRes = await fetch('https://api.github.com/user', {
		headers: {
			Authorization: `Bearer ${ghToken}`,
			Accept: 'application/vnd.github+json',
			'User-Agent': 'ags-commerce'
		}
	});
	const user = userRes.ok ? await userRes.json() : {};
	const emailRes = await fetch('https://api.github.com/user/emails', {
		headers: {
			Authorization: `Bearer ${ghToken}`,
			Accept: 'application/vnd.github+json',
			'User-Agent': 'ags-commerce'
		}
	});
	const emails = emailRes.ok ? await emailRes.json() : [];
	const primary =
		(Array.isArray(emails) && emails.find((e) => e.primary)?.email) ||
		user.email ||
		`${user.login || 'student'}@users.noreply.github.com`;

	const secret = env('LICENSE_SIGNING_SECRET');
	const proof = signStudentProof(
		{
			method: 'github_student_pack',
			email: String(primary).toLowerCase(),
			githubId: String(user.id || ''),
			login: user.login || '',
			exp: Math.floor(Date.now() / 1000) + 90 * 24 * 60 * 60,
			state: state || ''
		},
		secret
	);

	return {
		ok: true,
		studentProof: proof,
		email: String(primary).toLowerCase(),
		method: 'github_student_pack',
		expiresInDays: 90
	};
}

export async function requestEduMagicLink(databases, dbId, { email, log }) {
	const e = String(email || '').toLowerCase();
	if (!isAcademicEmail(e)) {
		return {
			ok: false,
			error: 'Use a school email (.edu or equivalent academic domain).',
			code: 'not_academic'
		};
	}
	const secret = env('LICENSE_SIGNING_SECRET');
	if (!secret) return { ok: false, error: 'server misconfigured' };

	const raw = `ags_edu_1.${randomBytes(24).toString('base64url')}`;
	const tokenHash = hashToken(raw);
	const now = new Date();
	const expiresAt = new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString();
	const id = `edu_${randomBytes(8).toString('hex')}`;

	if (databases) {
		await databases.createDocument(dbId, studentVerificationsCol(), id, {
			email: e,
			tokenHash,
			method: 'edu_email',
			status: 'pending',
			expiresAt,
			createdAt: now.toISOString(),
			confirmedAt: ''
		});
	}

	const confirmUrl = `${siteOrigin()}/students/?edu=${encodeURIComponent(raw)}`;
	const { sendGenericEmail } = await import('./email.js');
	try {
		await sendGenericEmail({
			to: e,
			subject: 'Confirm your AGS student email',
			text: [
				'Confirm your school email for the AGS student plan.',
				'',
				`Open this link within 2 hours:`,
				confirmUrl,
				'',
				'If you did not request this, ignore this email.'
			].join('\n'),
			log
		});
	} catch (err) {
		log?.(`edu email failed: ${err}`);
		return { ok: false, error: 'Could not send confirmation email', code: 'email_failed' };
	}

	return { ok: true, sent: true, email: e };
}

export async function confirmEduMagicLink(databases, dbId, rawToken) {
	if (!rawToken || !String(rawToken).startsWith('ags_edu_1.')) {
		return { ok: false, error: 'invalid token', code: 'invalid' };
	}
	if (!databases) return { ok: false, error: 'database unavailable', code: 'no_db' };
	const { Query } = await import('node-appwrite');
	const tokenHash = hashToken(rawToken);
	const res = await databases.listDocuments(dbId, studentVerificationsCol(), [
		Query.equal('tokenHash', tokenHash),
		Query.limit(1)
	]);
	const doc = res.documents?.[0];
	if (!doc) return { ok: false, error: 'unknown token', code: 'not_found' };
	if (doc.status === 'confirmed') {
		/* allow re-issue of proof */
	} else if (doc.status !== 'pending') {
		return { ok: false, error: 'token not pending', code: 'invalid' };
	}
	if (doc.expiresAt && new Date(doc.expiresAt).getTime() < Date.now()) {
		return { ok: false, error: 'expired', code: 'expired' };
	}

	await databases.updateDocument(dbId, studentVerificationsCol(), doc.$id, {
		status: 'confirmed',
		confirmedAt: new Date().toISOString()
	});

	const secret = env('LICENSE_SIGNING_SECRET');
	const proof = signStudentProof(
		{
			method: 'edu_email',
			email: doc.email,
			exp: Math.floor(Date.now() / 1000) + 180 * 24 * 60 * 60
		},
		secret
	);

	return {
		ok: true,
		studentProof: proof,
		email: doc.email,
		method: 'edu_email',
		expiresInDays: 180
	};
}
