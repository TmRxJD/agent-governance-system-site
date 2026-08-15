import { randomBytes } from 'node:crypto';
import { env } from './env.js';
import { encryptPayload, hashToken } from './crypto-box.js';

export function setupTokensCol() {
	return env('APPWRITE_COLLECTION_SETUP_TOKENS', 'ags_setup_tokens');
}

export function studentVerificationsCol() {
	return env('APPWRITE_COLLECTION_STUDENT_VERIFICATIONS', 'ags_student_verifications');
}

/** Create a one-time setup token; returns raw token (show once). */
export async function issueSetupToken(databases, dbId, { licenseKey, email, planId, keyId, log }) {
	const secret = env('LICENSE_SIGNING_SECRET');
	if (!secret) throw new Error('LICENSE_SIGNING_SECRET not set');
	const raw = `ags_setup_1.${randomBytes(24).toString('base64url')}`;
	const tokenHash = hashToken(raw);
	const keyCipher = encryptPayload(licenseKey, secret);
	const now = new Date();
	const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
	const id = `stk_${randomBytes(8).toString('hex')}`;
	const doc = {
		tokenHash,
		keyCipher,
		email: String(email || '').toLowerCase(),
		planId: planId || '',
		keyId: keyId || '',
		status: 'active',
		expiresAt,
		createdAt: now.toISOString(),
		redeemedAt: '',
		redeemCount: 0
	};
	if (databases) {
		try {
			await databases.createDocument(dbId, setupTokensCol(), id, doc);
		} catch (e) {
			log?.(`setup token persist failed: ${e}`);
			throw e;
		}
	}
	return { setupToken: raw, tokenId: id, expiresAt };
}

export async function redeemSetupToken(databases, dbId, rawToken) {
	const secret = env('LICENSE_SIGNING_SECRET');
	if (!secret) return { ok: false, error: 'server misconfigured' };
	if (!rawToken || !String(rawToken).startsWith('ags_setup_1.')) {
		return { ok: false, error: 'invalid token', code: 'invalid' };
	}
	if (!databases) return { ok: false, error: 'database unavailable', code: 'no_db' };

	const { Query } = await import('node-appwrite');
	const { decryptPayload, hashToken: ht } = await import('./crypto-box.js');
	const tokenHash = ht(rawToken);
	const res = await databases.listDocuments(dbId, setupTokensCol(), [
		Query.equal('tokenHash', tokenHash),
		Query.limit(1)
	]);
	const doc = res.documents?.[0];
	if (!doc) return { ok: false, error: 'unknown token', code: 'not_found' };
	if (doc.status === 'revoked') return { ok: false, error: 'revoked', code: 'revoked' };
	if (doc.expiresAt && new Date(doc.expiresAt).getTime() < Date.now()) {
		return { ok: false, error: 'expired', code: 'expired' };
	}
	// Allow a few redeems within the window (open on phone + desktop).
	const redeemCount = Number(doc.redeemCount || 0);
	if (redeemCount >= 5) return { ok: false, error: 'redeem limit', code: 'limit' };

	let licenseKey;
	try {
		licenseKey = decryptPayload(doc.keyCipher, secret);
	} catch {
		return { ok: false, error: 'decrypt failed', code: 'corrupt' };
	}

	await databases.updateDocument(dbId, setupTokensCol(), doc.$id, {
		redeemCount: redeemCount + 1,
		redeemedAt: new Date().toISOString(),
		status: redeemCount + 1 >= 5 ? 'exhausted' : 'active'
	});

	return {
		ok: true,
		licenseKey,
		planId: doc.planId,
		email: doc.email,
		keyId: doc.keyId,
		expiresAt: doc.expiresAt
	};
}
