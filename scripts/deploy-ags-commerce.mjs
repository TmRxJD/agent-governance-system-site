/**
 * Create (if missing) + deploy Appwrite function `ags-commerce`.
 * Additive only — never deletes functions/databases/collections.
 *
 *   node scripts/deploy-ags-commerce.mjs
 *
 * Reads tracker `.env.local` for Appwrite endpoint/project/key.
 * Generates LICENSE_SIGNING_SECRET + COMMERCE_ADMIN_TOKEN if not already set on the function.
 */
import { spawnSync } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const FUNCTION_ID = 'ags-commerce';
const FUNCTION_NAME = 'AGS Commerce';
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CODE_DIR = resolve(ROOT, 'appwrite/functions/ags-commerce');
const TRACKER_ENV = resolve(
	process.env.TRACKER_ENV_FILE ||
		'C:/Users/jdion/Projects/TrackerWebsite/the-tower-run-tracker/.env.local'
);
const SECRETS_OUT = resolve(ROOT, 'temp/ags-commerce-deploy-secrets.json');

const FORBIDDEN = [/\bdelete\b/i, /\bfunctions delete\b/i, /\bdatabases delete\b/i];

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

function slugId(key) {
	return key
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '_')
		.replace(/^_|_$/g, '')
		.slice(0, 36);
}

async function listVariableKeysHttp(endpoint, project, apiKey) {
	const res = await fetch(`${endpoint}/functions/${FUNCTION_ID}/variables`, {
		headers: {
			'X-Appwrite-Project': project,
			'X-Appwrite-Key': apiKey
		}
	});
	if (!res.ok) return new Set();
	const data = await res.json();
	return new Set((data.variables || []).map((v) => v.key));
}

async function ensureVariableHttp(endpoint, project, apiKey, key, value, { secret = true } = {}) {
	const existing = await listVariableKeysHttp(endpoint, project, apiKey);
	if (existing.has(key)) {
		console.log(`  var exists: ${key}`);
		return false;
	}
	const variableId = slugId(key);
	const res = await fetch(`${endpoint}/functions/${FUNCTION_ID}/variables`, {
		method: 'POST',
		headers: {
			'X-Appwrite-Project': project,
			'X-Appwrite-Key': apiKey,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ variableId, key, value, secret })
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`create variable ${key} failed: ${res.status} ${text}`);
	}
	console.log(`  var created: ${key}`);
	return true;
}

function aw(args, { allowFail = false } = {}) {
	const joined = args.join(' ');
	for (const bad of FORBIDDEN) {
		if (bad.test(joined)) throw new Error(`Refusing forbidden CLI: ${joined}`);
	}
	const res = spawnSync('appwrite', args, {
		encoding: 'utf8',
		shell: true,
		cwd: ROOT,
		env: process.env
	});
	const text = `${res.stdout || ''}\n${res.stderr || ''}`;
	if ((res.status ?? 1) !== 0 && !allowFail) {
		throw new Error(`appwrite ${args.join(' ')} failed:\n${text}`);
	}
	return { status: res.status ?? 1, text };
}

function functionExists() {
	return aw(['functions', 'get', '--function-id', FUNCTION_ID], { allowFail: true }).status === 0;
}

async function main() {
	const env = loadEnv(TRACKER_ENV);
	const endpoint = env.VITE_APPWRITE_ENDPOINT || env.APPWRITE_ENDPOINT;
	const project = env.VITE_APPWRITE_PROJECT_ID || env.APPWRITE_PROJECT_ID;
	const apiKey = env.VITE_APPWRITE_API_KEY || env.APPWRITE_API_KEY;
	if (!endpoint || !project || !apiKey) {
		throw new Error('Missing VITE_APPWRITE_ENDPOINT / PROJECT_ID / API_KEY in tracker .env.local');
	}

	aw(['client', 'set-endpoint', endpoint]);
	aw(['client', 'set-project', project]);
	aw(['client', 'set-key', apiKey]);

	if (!functionExists()) {
		console.log(`Creating function ${FUNCTION_ID}…`);
		aw([
			'functions',
			'create',
			'--function-id',
			FUNCTION_ID,
			'--name',
			FUNCTION_NAME,
			'--runtime',
			'node-16.0',
			'--execute',
			'any',
			'--timeout',
			'60',
			'--enabled',
			'true',
			'--logging',
			'true',
			'--entrypoint',
			'src/main.js',
			'--commands',
			'npm install',
			'--specification',
			's-1vcpu-512mb'
		]);
	} else {
		console.log(`Function ${FUNCTION_ID} already exists — will deploy only (no delete).`);
	}

	const generated = {
		LICENSE_SIGNING_SECRET: randomBytes(32).toString('hex'),
		COMMERCE_ADMIN_TOKEN: randomBytes(24).toString('hex'),
		createdAt: new Date().toISOString()
	};

	mkdirSync(dirname(SECRETS_OUT), { recursive: true });
	const prior = existsSync(SECRETS_OUT) ? JSON.parse(readFileSync(SECRETS_OUT, 'utf8')) : {};
	const secrets = {
		LICENSE_SIGNING_SECRET: prior.LICENSE_SIGNING_SECRET || generated.LICENSE_SIGNING_SECRET,
		COMMERCE_ADMIN_TOKEN: prior.COMMERCE_ADMIN_TOKEN || generated.COMMERCE_ADMIN_TOKEN,
		updatedAt: new Date().toISOString()
	};
	writeFileSync(SECRETS_OUT, JSON.stringify(secrets, null, 2));

	console.log('Ensuring function variables (create-only via REST + variableId)…');
	await ensureVariableHttp(endpoint, project, apiKey, 'APPWRITE_ENDPOINT', endpoint, {
		secret: false
	});
	await ensureVariableHttp(endpoint, project, apiKey, 'APPWRITE_PROJECT_ID', project, {
		secret: false
	});
	await ensureVariableHttp(endpoint, project, apiKey, 'APPWRITE_API_KEY', apiKey, { secret: true });
	await ensureVariableHttp(endpoint, project, apiKey, 'APPWRITE_DATABASE_ID', 'ags_commerce', {
		secret: false
	});
	await ensureVariableHttp(
		endpoint,
		project,
		apiKey,
		'LICENSE_SIGNING_SECRET',
		secrets.LICENSE_SIGNING_SECRET,
		{ secret: true }
	);
	await ensureVariableHttp(
		endpoint,
		project,
		apiKey,
		'COMMERCE_ADMIN_TOKEN',
		secrets.COMMERCE_ADMIN_TOKEN,
		{ secret: true }
	);
	await ensureVariableHttp(endpoint, project, apiKey, 'DEFAULT_PAYMENT_PROVIDER', 'stripe', {
		secret: false
	});
	await ensureVariableHttp(endpoint, project, apiKey, 'AUTHORIZE_REQUIRE_DB', '0', {
		secret: false
	});

	console.log('Packaging + uploading deployment via REST…');
	const tarPath = resolve(ROOT, 'appwrite/functions/ags-commerce.tar.gz');
	const pack = spawnSync(
		'tar',
		['-czf', tarPath, '-C', CODE_DIR, '.'],
		{ encoding: 'utf8', shell: true }
	);
	if ((pack.status ?? 1) !== 0) {
		throw new Error(`tar failed: ${pack.stderr || pack.stdout}`);
	}
	const form = new FormData();
	form.set('entrypoint', 'src/main.js');
	form.set('commands', 'npm install');
	form.set('activate', 'true');
	const blob = new Blob([readFileSync(tarPath)]);
	form.set('code', blob, 'code.tar.gz');
	const depRes = await fetch(`${endpoint}/functions/${FUNCTION_ID}/deployments`, {
		method: 'POST',
		headers: {
			'X-Appwrite-Project': project,
			'X-Appwrite-Key': apiKey
		},
		body: form
	});
	const depText = await depRes.text();
	if (!depRes.ok) throw new Error(`deployment upload failed: ${depRes.status} ${depText}`);
	const dep = JSON.parse(depText);
	console.log(`Deployment ${dep.$id} status=${dep.status}`);

	for (let i = 0; i < 40; i++) {
		await new Promise((r) => setTimeout(r, 3000));
		const st = await fetch(`${endpoint}/functions/${FUNCTION_ID}/deployments/${dep.$id}`, {
			headers: { 'X-Appwrite-Project': project, 'X-Appwrite-Key': apiKey }
		});
		const body = await st.json();
		console.log(`  build poll ${i}: ${body.status}`);
		if (body.status === 'ready' || body.status === 'failed' || body.status === 'canceled') {
			if (body.status !== 'ready') {
				throw new Error(`deployment ${body.status}\n${body.buildLogs || ''}`);
			}
			break;
		}
	}

	const baseGuess = `${endpoint.replace(/\/v1\/?$/, '')}/v1/functions/${FUNCTION_ID}/executions`;
	console.log('\nDeploy ready.');
	console.log(`Function ID: ${FUNCTION_ID}`);
	console.log(`Secrets sidecar (gitignored temp/): ${SECRETS_OUT}`);
	console.log(`Execution API (SDK-style): ${baseGuess}`);
	console.log(
		'Set PUBLIC_AGS_COMMERCE_URL once you have an HTTP domain/proxy that forwards paths (/checkout, /authorize, …).'
	);
	console.log(
		'Stripe/PayPal/Resend vars are create-only when you add them later — not required for health.'
	);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
