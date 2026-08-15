import { expect, test } from '@playwright/test';

test.describe('AGS home — one scene', () => {
	test('explains problem and shows MCP path example', async ({ page }) => {
		await page.goto('/');
		await expect(
			page.getByRole('heading', { name: /Rules for AI coding agents that cannot be skipped/i })
		).toBeVisible();
		await expect(page.getByText(/If governance lives only in a prompt/i)).toBeVisible();
		await expect(page.locator('[data-ags-animation="mcp-path"]')).toBeVisible();
		await expect(page.getByText('enforcement_begin')).toBeVisible();
	});

	test('replay runs the scene', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('button', { name: /Replay/i }).click();
		await expect(page.getByText(/denied|accepted|Blocked|Legal commit/i).first()).toBeVisible({
			timeout: 12000
		});
	});
});
