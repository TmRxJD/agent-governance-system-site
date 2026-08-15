import type { Tutorial } from './types';

/** Soften formulaic tutorial copy at render time without rewriting every entry. */
export function polishTutorialParagraph(raw: string, tutorial: Tutorial): string {
	const p = raw.trim();

	if (p === 'Apply the following configuration in your repo.') {
		const tip = tutorial.config?.[0] ? ` (often \`${tutorial.config[0]}\`)` : '';
		return `Add or update the configuration below in your repo${tip}. Keep it aligned with what agents and hooks read at runtime.`;
	}

	if (p.startsWith('Import from:')) {
		const imports = p.slice('Import from:'.length).trim();
		return `Use these package entrypoints from host or agent code: ${imports}. Prefer the documented export path over deep relative imports.`;
	}

	if (p.startsWith('Primary MCP tools:')) {
		const tools = p.slice('Primary MCP tools:'.length).trim();
		return `Call these MCP tools through your AGS / tower-gov host — ${tools}. Prefer scan/get before validate/diff, and enforce only when the change set is ready.`;
	}

	if (p.startsWith('Primary config surfaces:')) {
		const surfaces = p.slice('Primary config surfaces:'.length).trim();
		return `Wire these surfaces first: ${surfaces}. Treat them as the contract agents must not invent around.`;
	}

	return raw;
}

export function polishMcpCode(title: string, code: string, tutorial: Tutorial): string {
	const trimmed = code.trim();
	if (trimmed !== '{}' && trimmed !== '') return code;
	const tool =
		tutorial.mcpTools?.find((t) => title.toLowerCase().includes(t.split('_')[0]!)) ||
		tutorial.mcpTools?.[0] ||
		'tool_name';
	return `{
  /* Example MCP call — fill args from schema_get / docs */
  "tool": "${tool}",
  "arguments": {}
}`;
}

export function tutorialTitleBySlug(slug: string, all: Tutorial[]): string {
	return all.find((t) => t.slug === slug)?.title ?? slug;
}
