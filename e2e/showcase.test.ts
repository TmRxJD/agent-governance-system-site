import { expect, test } from '@playwright/test';

test.describe('AGS showcase routes', () => {
	test('home is a long-scroll story', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('html')).toHaveClass(/dark/);
		await expect(
			page.getByRole('heading', { name: /Deterministic governance for agents/i })
		).toBeVisible();
		await expect(page.locator('#commit-gate')).toBeVisible();
		await expect(page.locator('#engines')).toBeVisible();
		await expect(page.getByRole('main').getByRole('link', { name: 'Get AGS' }).first()).toBeVisible();
	});

	test('engine deep page has watch + diagram markers', async ({ page }) => {
		await page.goto('/showcase/staging/');
		await expect(page.locator('[data-ags-demo="staging"]')).toBeVisible();
		await expect(page.locator('[data-ags-animation="watch"]')).toBeVisible();
		await expect(page.getByText('Watch it work')).toBeVisible();
	});

	test('docs and get pages load', async ({ page }) => {
		await page.goto('/docs/');
		await expect(page.getByRole('heading', { name: 'Documentation' })).toBeVisible();
		await page.goto('/get/');
		await expect(page.getByRole('heading', { name: 'Get AGS' })).toBeVisible();
	});
});
