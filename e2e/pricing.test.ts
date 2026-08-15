import { expect, test } from '@playwright/test';

test.describe('AGS pricing page', () => {
	test('shows three public tiers and comparison', async ({ page }) => {
		await page.goto('/pricing/');
		await expect(
			page.getByRole('heading', { name: /Choose the level of governance/i })
		).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Free', exact: true }).first()).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Personal', exact: true }).first()).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Enterprise', exact: true }).first()).toBeVisible();
		await expect(page.getByText(/Students 75% off/i)).toBeVisible();
		await expect(page.getByRole('link', { name: 'Buy license' }).first()).toBeVisible();
		await expect(page.getByText(/Feature comparison/i)).toBeVisible();
		await expect(page.locator('body')).not.toContainText(/\bTower\b/);
		await expect(page.locator('body')).not.toContainText(/Contact Sales/i);
	});
});
