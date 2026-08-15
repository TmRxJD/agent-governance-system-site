/**
 * Encrypt/decrypt license payloads for one-time setup tokens.
 * AES-256-GCM with key derived from LICENSE_SIGNING_SECRET.
 */
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';

function keyFromSecret(secret) {
	return createHash('sha256').update(`ags-setup:${secret}`).digest();
}

export function encryptPayload(plainText, secret) {
	const iv = randomBytes(12);
	const cipher = createCipheriv('aes-256-gcm', keyFromSecret(secret), iv);
	const enc = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
	const tag = cipher.getAuthTag();
	return Buffer.concat([iv, tag, enc]).toString('base64url');
}

export function decryptPayload(blob, secret) {
	const buf = Buffer.from(blob, 'base64url');
	const iv = buf.subarray(0, 12);
	const tag = buf.subarray(12, 28);
	const data = buf.subarray(28);
	const decipher = createDecipheriv('aes-256-gcm', keyFromSecret(secret), iv);
	decipher.setAuthTag(tag);
	return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8');
}

export function hashToken(raw) {
	return createHash('sha256').update(raw).digest('hex');
}

/** HMAC session for student proof (browser-held). */
export function signStudentProof(claims, secret) {
	const body = Buffer.from(JSON.stringify(claims)).toString('base64url');
	const sig = createHash('sha256').update(`${body}.${secret}`).digest('base64url');
	return `ags_stu_1.${body}.${sig}`;
}

export function verifyStudentProof(token, secret) {
	if (!token || typeof token !== 'string') return { ok: false, error: 'missing proof' };
	const parts = token.split('.');
	if (parts.length !== 3 || parts[0] !== 'ags_stu_1') return { ok: false, error: 'invalid proof' };
	const [, body, sig] = parts;
	const expect = createHash('sha256').update(`${body}.${secret}`).digest('base64url');
	if (sig !== expect) return { ok: false, error: 'bad signature' };
	try {
		const claims = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
		if (!claims.exp || Date.now() / 1000 > claims.exp) return { ok: false, error: 'expired' };
		return { ok: true, claims };
	} catch {
		return { ok: false, error: 'bad claims' };
	}
}
