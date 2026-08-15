#!/usr/bin/env node
/**
 * Asserts every engine in the registry has a showcase route and required demo markers.
 * Use --build to also verify static export output under build/.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const checkBuild = process.argv.includes('--build');

const registryPath = path.join(root, 'src/lib/sim/engine-registry.ts');
const registrySrc = fs.readFileSync(registryPath, 'utf8');
const slugs = [...registrySrc.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);

if (slugs.length < 22) {
	console.error(`Expected >= 22 engine slugs, found ${slugs.length}`);
	process.exit(1);
}

const errors = [];

for (const slug of slugs) {
	const page = path.join(root, 'src/routes/showcase/[engine]/+page.svelte');
	if (!fs.existsSync(page)) {
		errors.push(`Missing dynamic showcase page for routing`);
		break;
	}

	const demoDir = path.join(root, 'src/lib/demos');
	const index = fs.readFileSync(path.join(demoDir, 'index.ts'), 'utf8');
	const slugInMap =
		index.includes(`'${slug}'`) ||
		index.includes(`"${slug}"`) ||
		new RegExp(`(^|[\\s,{])${slug.replace(/-/g, '\\-')}\\s*:`).test(index) ||
		index.includes(`'${slug}':`) ||
		index.includes(`"${slug}":`);
	if (!slugInMap) {
		errors.push(`DEMO_COMPONENTS missing slug: ${slug}`);
	}

	if (checkBuild) {
		const built = path.join(root, 'build', 'showcase', slug, 'index.html');
		if (!fs.existsSync(built)) {
			errors.push(`Missing static export: build/showcase/${slug}/index.html`);
		} else {
			const html = fs.readFileSync(built, 'utf8');
			for (const marker of ['data-ags-demo', 'data-ags-diagram', 'data-ags-animation']) {
				if (!html.includes(marker)) {
					errors.push(`${slug}: built HTML missing ${marker}`);
				}
			}
		}
	}
}

// Source marker check via DemoShell + demos
const shell = fs.readFileSync(path.join(root, 'src/lib/components/DemoShell.svelte'), 'utf8');
for (const marker of ['data-ags-demo', 'data-ags-diagram', 'data-ags-animation']) {
	if (!shell.includes(marker)) errors.push(`DemoShell missing ${marker}`);
}

const requiredDocs = [
	'overview',
	'engine-registry',
	'architecture',
	'semantic-domains',
	'pointer-domains',
	'staging-scopes',
	'licensing',
	'versioning',
	'deployment',
	'configuration',
	'api',
	'examples',
	'tutorials'
];
for (const doc of requiredDocs) {
	const p = path.join(root, 'src/routes/docs', doc, '+page.svelte');
	if (!fs.existsSync(p)) errors.push(`Missing docs page: ${doc}`);
}

if (errors.length) {
	console.error('Showcase inventory failed:\n' + errors.map((e) => ` - ${e}`).join('\n'));
	process.exit(1);
}

console.log(`Showcase inventory OK (${slugs.length} engines)${checkBuild ? ' + build' : ''}`);
