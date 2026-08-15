/**
 * Additive-only Appwrite provisioner for AGS commerce.
 * - Creates database `ags_commerce` if missing
 * - Creates collections/attributes/indexes if missing
 * - NEVER deletes or updates existing databases/collections/attributes
 *
 * Usage (from AgentGovernanceSystem-Site):
 *   node scripts/provision-ags-commerce-db.mjs
 *
 * Reads creds from tracker repo .env.local:
 *   VITE_APPWRITE_ENDPOINT, VITE_APPWRITE_PROJECT_ID, VITE_APPWRITE_API_KEY
 */
import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const DB_ID = 'ags_commerce';
const DB_NAME = 'AGS Commerce';
const TRACKER_ENV = resolve(
	process.env.TRACKER_ENV_FILE ||
		'C:/Users/jdion/Projects/TrackerWebsite/the-tower-run-tracker/.env.local'
);

const FORBIDDEN = [
	/\bdelete\b/i,
	/\bupdate-database\b/i,
	/\bupdate-collection\b/i,
	/\bupdate-.*-attribute\b/i,
	/\bdatabases update\b/i
];

function loadEnv(path) {
	if (!existsSync(path)) throw new Error(`Missing env file: ${path}`);
	const out = {};
	for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
		const m = line.match(/^\s*([A-Za-z0-9_]+)=(.*)$/);
		if (!m) continue;
		out[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
	}
	return out;
}

function aw(args, { allowFail = false } = {}) {
	const joined = args.join(' ');
	for (const bad of FORBIDDEN) {
		if (bad.test(joined)) throw new Error(`Refusing forbidden CLI: ${joined}`);
	}
	const res = spawnSync('appwrite', args, {
		encoding: 'utf8',
		shell: true,
		env: process.env
	});
	const stdout = res.stdout || '';
	const stderr = res.stderr || '';
	const text = `${stdout}\n${stderr}`;
	if (res.status !== 0 && !allowFail) {
		throw new Error(`appwrite ${args.join(' ')} failed:\n${text}`);
	}
	return { status: res.status ?? 1, text };
}

function sleep(ms) {
	// Cross-platform short pause between Appwrite attribute creates
	spawnSync(
		process.platform === 'win32' ? 'powershell' : 'sleep',
		process.platform === 'win32'
			? ['-NoProfile', '-Command', `Start-Sleep -Milliseconds ${ms}`]
			: [String(Math.ceil(ms / 1000))],
		{ stdio: 'ignore' }
	);
}

function existsDatabase() {
	const r = aw(['databases', 'get', '--database-id', DB_ID], { allowFail: true });
	return r.status === 0;
}

function existsCollection(collectionId) {
	const r = aw(
		['databases', 'get-collection', '--database-id', DB_ID, '--collection-id', collectionId],
		{ allowFail: true }
	);
	return r.status === 0;
}

function listAttributeKeys(collectionId) {
	const r = aw(
		['databases', 'list-attributes', '--database-id', DB_ID, '--collection-id', collectionId],
		{ allowFail: true }
	);
	if (r.status !== 0) return new Set();
	const keys = new Set();
	for (const line of r.text.split(/\r?\n/)) {
		const m = line.match(/^\s*([a-zA-Z][a-zA-Z0-9_]*)\s*│/);
		if (m && m[1] !== 'key' && m[1] !== '$id') keys.add(m[1]);
	}
	// Also parse JSON-ish key: fields
	for (const m of r.text.matchAll(/"key"\s*:\s*"([^"]+)"/g)) keys.add(m[1]);
	return keys;
}

function ensureString(collectionId, key, size, required) {
	console.log(`  ensure string ${collectionId}.${key}`);
	const r = aw(
		[
			'databases',
			'create-string-attribute',
			'--database-id',
			DB_ID,
			'--collection-id',
			collectionId,
			'--key',
			key,
			'--size',
			String(size),
			'--required',
			required ? 'true' : 'false'
		],
		{ allowFail: true }
	);
	if (r.status !== 0 && !/already exists|Attribute with the requested key already exists/i.test(r.text)) {
		throw new Error(r.text);
	}
	if (r.status !== 0) console.log(`  skip (exists)`);
	sleep(900);
}

function ensureEmail(collectionId, key, required) {
	console.log(`  ensure email ${collectionId}.${key}`);
	const r = aw(
		[
			'databases',
			'create-email-attribute',
			'--database-id',
			DB_ID,
			'--collection-id',
			collectionId,
			'--key',
			key,
			'--required',
			required ? 'true' : 'false'
		],
		{ allowFail: true }
	);
	if (r.status !== 0 && !/already exists|Attribute with the requested key already exists/i.test(r.text)) {
		throw new Error(r.text);
	}
	if (r.status !== 0) console.log(`  skip (exists)`);
	sleep(900);
}

function ensureEnum(collectionId, key, elements, required) {
	console.log(`  ensure enum ${collectionId}.${key}`);
	const r = aw(
		[
			'databases',
			'create-enum-attribute',
			'--database-id',
			DB_ID,
			'--collection-id',
			collectionId,
			'--key',
			key,
			'--elements',
			...elements,
			'--required',
			required ? 'true' : 'false'
		],
		{ allowFail: true }
	);
	if (r.status !== 0 && !/already exists|Attribute with the requested key already exists/i.test(r.text)) {
		throw new Error(r.text);
	}
	if (r.status !== 0) console.log(`  skip (exists)`);
	sleep(900);
}

function ensureInteger(collectionId, key, required, min = 0, max = 100000) {
	console.log(`  ensure integer ${collectionId}.${key}`);
	const r = aw(
		[
			'databases',
			'create-integer-attribute',
			'--database-id',
			DB_ID,
			'--collection-id',
			collectionId,
			'--key',
			key,
			'--required',
			required ? 'true' : 'false',
			'--min',
			String(min),
			'--max',
			String(max)
		],
		{ allowFail: true }
	);
	if (r.status !== 0 && !/already exists|Attribute with the requested key already exists/i.test(r.text)) {
		throw new Error(r.text);
	}
	if (r.status !== 0) console.log(`  skip (exists)`);
	sleep(900);
}

function ensureIndex(collectionId, key, type, attributes) {
	console.log(`  create index ${collectionId}.${key} (idempotent attempt)`);
	const r = aw(
		[
			'databases',
			'create-index',
			'--database-id',
			DB_ID,
			'--collection-id',
			collectionId,
			'--key',
			key,
			'--type',
			type,
			'--attributes',
			...attributes
		],
		{ allowFail: true }
	);
	if (r.status !== 0 && /already exists|duplicate/i.test(r.text)) {
		console.log(`  skip index ${collectionId}.${key} (exists)`);
		return;
	}
	if (r.status !== 0) {
		console.log(`  index ${collectionId}.${key}: ${r.text.trim().split(/\r?\n/).slice(-2).join(' ')}`);
	}
	sleep(600);
}

function ensureCollection(collectionId, name) {
	if (existsCollection(collectionId)) {
		console.log(`collection exists: ${collectionId}`);
		return;
	}
	console.log(`create collection: ${collectionId}`);
	// Server-key only — no public role permissions
	aw([
		'databases',
		'create-collection',
		'--database-id',
		DB_ID,
		'--collection-id',
		collectionId,
		'--name',
		name,
		'--document-security',
		'false',
		'--enabled',
		'true'
	]);
	sleep(1000);
}

function main() {
	const env = loadEnv(TRACKER_ENV);
	const endpoint = env.VITE_APPWRITE_ENDPOINT;
	const project = env.VITE_APPWRITE_PROJECT_ID;
	const key = env.VITE_APPWRITE_API_KEY;
	if (!endpoint || !project || !key) throw new Error('Missing Appwrite creds in tracker .env.local');

	console.log(`endpoint=${endpoint}`);
	console.log(`project=${project}`);
	aw(['client', '--endpoint', endpoint, '--project-id', project, '--key', key]);

	if (existsDatabase()) {
		console.log(`database already exists: ${DB_ID} (will only add missing collections/attrs)`);
	} else {
		console.log(`create database: ${DB_ID}`);
		aw(['databases', 'create', '--database-id', DB_ID, '--name', DB_NAME, '--enabled', 'true']);
		sleep(1500);
	}

	ensureCollection('ags_customers', 'AGS Customers');
	ensureEmail('ags_customers', 'email', true);
	ensureString('ags_customers', 'displayName', 128, false);
	ensureString('ags_customers', 'stripeCustomerId', 128, false);
	ensureString('ags_customers', 'paypalPayerId', 128, false);
	ensureString('ags_customers', 'createdAt', 40, true);
	ensureString('ags_customers', 'updatedAt', 40, true);
	sleep(2000);
	ensureIndex('ags_customers', 'email_idx', 'unique', ['email']);
	ensureIndex('ags_customers', 'stripe_idx', 'key', ['stripeCustomerId']);

	ensureCollection('ags_licenses', 'AGS Licenses');
	ensureString('ags_licenses', 'keyId', 64, true);
	ensureString('ags_licenses', 'keyHash', 64, true);
	ensureString('ags_licenses', 'customerId', 128, true);
	ensureEmail('ags_licenses', 'email', true);
	ensureEnum('ags_licenses', 'tier', ['free', 'personal', 'enterprise'], true);
	ensureString('ags_licenses', 'planId', 64, true);
	ensureEnum(
		'ags_licenses',
		'status',
		['active', 'past_due', 'canceled', 'revoked', 'expired'],
		true
	);
	ensureInteger('ags_licenses', 'seats', true, 1, 100000);
	ensureEnum('ags_licenses', 'cadence', ['monthly', 'yearly', 'lifetime'], true);
	ensureEnum('ags_licenses', 'provider', ['stripe', 'paypal', 'manual'], true);
	ensureString('ags_licenses', 'providerSubscriptionId', 128, false);
	ensureString('ags_licenses', 'providerCheckoutId', 128, false);
	ensureString('ags_licenses', 'periodStart', 40, false);
	ensureString('ags_licenses', 'periodEnd', 40, false);
	ensureString('ags_licenses', 'issuedAt', 40, true);
	ensureString('ags_licenses', 'revokedAt', 40, false);
	ensureString('ags_licenses', 'lastAuthorizedAt', 40, false);
	sleep(2500);
	ensureIndex('ags_licenses', 'keyHash_idx', 'unique', ['keyHash']);
	ensureIndex('ags_licenses', 'email_idx', 'key', ['email']);
	ensureIndex('ags_licenses', 'status_idx', 'key', ['status']);
	ensureIndex('ags_licenses', 'sub_idx', 'key', ['providerSubscriptionId']);

	ensureCollection('ags_orders', 'AGS Orders');
	ensureEmail('ags_orders', 'email', true);
	ensureString('ags_orders', 'customerId', 128, false);
	ensureString('ags_orders', 'planId', 64, true);
	ensureString('ags_orders', 'tier', 32, true);
	ensureString('ags_orders', 'cadence', 32, true);
	ensureInteger('ags_orders', 'seats', true, 1, 100000);
	ensureInteger('ags_orders', 'amountCents', true, 0, 100000000);
	ensureString('ags_orders', 'currency', 8, true);
	ensureEnum(
		'ags_orders',
		'status',
		['created', 'awaiting_payment', 'paid', 'fulfilled', 'failed', 'refunded'],
		true
	);
	ensureString('ags_orders', 'provider', 32, true);
	ensureString('ags_orders', 'providerSessionId', 128, false);
	ensureString('ags_orders', 'licenseKeyId', 64, false);
	ensureString('ags_orders', 'createdAt', 40, true);
	ensureString('ags_orders', 'updatedAt', 40, true);
	sleep(2500);
	ensureIndex('ags_orders', 'email_idx', 'key', ['email']);
	ensureIndex('ags_orders', 'status_idx', 'key', ['status']);
	ensureIndex('ags_orders', 'session_idx', 'key', ['providerSessionId']);

	ensureCollection('ags_setup_tokens', 'AGS Setup Tokens');
	ensureString('ags_setup_tokens', 'tokenHash', 64, true);
	ensureString('ags_setup_tokens', 'keyCipher', 2048, true);
	ensureEmail('ags_setup_tokens', 'email', true);
	ensureString('ags_setup_tokens', 'planId', 64, false);
	ensureString('ags_setup_tokens', 'keyId', 64, false);
	ensureEnum('ags_setup_tokens', 'status', ['active', 'exhausted', 'revoked'], true);
	ensureString('ags_setup_tokens', 'expiresAt', 40, true);
	ensureString('ags_setup_tokens', 'createdAt', 40, true);
	ensureString('ags_setup_tokens', 'redeemedAt', 40, false);
	ensureInteger('ags_setup_tokens', 'redeemCount', true, 0, 100);
	sleep(2000);
	ensureIndex('ags_setup_tokens', 'tokenHash_idx', 'unique', ['tokenHash']);
	ensureIndex('ags_setup_tokens', 'email_idx', 'key', ['email']);

	ensureCollection('ags_student_verifications', 'AGS Student Verifications');
	ensureEmail('ags_student_verifications', 'email', true);
	ensureString('ags_student_verifications', 'tokenHash', 64, true);
	ensureEnum(
		'ags_student_verifications',
		'method',
		['edu_email', 'github_student_pack'],
		true
	);
	ensureEnum(
		'ags_student_verifications',
		'status',
		['pending', 'confirmed', 'revoked', 'expired'],
		true
	);
	ensureString('ags_student_verifications', 'expiresAt', 40, true);
	ensureString('ags_student_verifications', 'createdAt', 40, true);
	ensureString('ags_student_verifications', 'confirmedAt', 40, false);
	sleep(2000);
	ensureIndex('ags_student_verifications', 'tokenHash_idx', 'unique', ['tokenHash']);
	ensureIndex('ags_student_verifications', 'email_idx', 'key', ['email']);

	console.log('\nDone. Verify with: appwrite databases get --database-id ags_commerce');
	console.log(
		'Collections: ags_customers, ags_licenses, ags_orders, ags_setup_tokens, ags_student_verifications'
	);
}

main();
