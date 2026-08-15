#!/usr/bin/env node
/**
 * Lightweight commit-msg gate for AGS site agent commits.
 * Expects: status/<status>(ags-site): <summary>
 */
import fs from 'node:fs';

const msgPath = process.argv[2];
if (!msgPath) {
	console.error('Usage: validate-site-commit-msg.mjs <commit-msg-file>');
	process.exit(1);
}

const raw = fs.readFileSync(msgPath, 'utf8');
const first = raw.split(/\r?\n/).find((l) => l.trim() && !l.startsWith('#')) ?? '';
const re =
	/^status\/(checkpoint|awaiting-user|user-approved|blocked|docs|test|chore)\(ags-site\):\s.+/;

if (!re.test(first)) {
	console.error(
		`Invalid commit subject.\nExpected: status/<status>(ags-site): <imperative summary>\nGot: ${first}`
	);
	process.exit(1);
}

// Soft checks for missing showcase keywords when message mentions demos
const body = raw.toLowerCase();
if (body.includes('showcase') && body.includes('remove')) {
	console.error('Commit appears to remove showcase content — blocked by site policy.');
	process.exit(1);
}

process.exit(0);
