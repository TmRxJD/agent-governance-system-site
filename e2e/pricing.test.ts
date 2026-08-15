import { expect, test } from '@playwright/test';

test.describe('AGS pricing page', () => {
	test('shows three public tiers and comparison', async ({ page }) => {
		await page.goto('/pricing/');
		await expect(
			page.getByRole('heading', { name: /AGS Licensing & Pricing/i })
		).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Free', exact: true }).first()).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Personal', exact: true }).first()).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Enterprise', exact: true }).first()).toBeVisible();
		await expect(page.getByText('Students receive 75% off Personal.', { exact: true })).toBeVisible();
		await expect(page.getByText(/Feature comparison/i)).toBeVisible();
		await expect(page.getByText(/Semantic graph intelligence/i)).toBeVisible();
		await expect(page.locator('body')).not.toContainText(/\bTower\b/);
	});
});
