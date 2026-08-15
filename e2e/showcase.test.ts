import { expect, test } from '@playwright/test';

test.describe('AGS capability pillars', () => {
	test('hero and three pillars render', async ({ page }) => {
		await page.goto('/');
		await expect(
			page.getByRole('heading', { name: /Turn chaotic AI-assisted development/i })
		).toBeVisible();
		await expect(page.locator('#discipline')).toBeVisible();
		await expect(page.locator('#repo')).toBeVisible();
		await expect(page.locator('#delivery')).toBeVisible();
		await expect(page.locator('#engines')).toBeVisible();
		await expect(page.getByText('Before AGS').first()).toBeVisible();
		await expect(page.getByText('With AGS').first()).toBeVisible();
	});

	test('CTA scrolls to discipline', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('link', { name: /See how AGS governs AI coding/i }).click();
		await expect(page.locator('#discipline')).toBeInViewport();
	});
});
