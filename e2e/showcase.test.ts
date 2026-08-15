import { expect, test } from '@playwright/test';

test.describe('AGS home story', () => {
	test('home explains product before jargon', async ({ page }) => {
		await page.goto('/');
		await expect(
			page.getByRole('heading', { name: /Keep AI coding agents honest/i })
		).toBeVisible();
		await expect(page.locator('#story')).toBeVisible();
		await expect(page.getByRole('button', { name: /Replay/i }).first()).toBeVisible();
		await expect(page.locator('[data-ags-animation="commit-story"]')).toBeVisible();
	});

	test('commit story can replay', async ({ page }) => {
		await page.goto('/');
		const replay = page.locator('#story').getByRole('button', { name: /Replay/i });
		await replay.click();
		await expect(page.locator('#story').getByText(/Commit blocked|Checkpoint accepted/)).toBeVisible({
			timeout: 8000
		});
	});

	test('docs and get still load', async ({ page }) => {
		await page.goto('/docs/');
		await expect(page.getByRole('heading', { name: 'Documentation' })).toBeVisible();
		await page.goto('/get/');
		await expect(page.getByRole('heading', { name: 'Get AGS' })).toBeVisible();
	});
});
