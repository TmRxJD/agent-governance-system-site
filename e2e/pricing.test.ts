import { expect, test } from '@playwright/test';

test.describe('AGS pricing page', () => {
	test('shows tiers, cost section, and comparison', async ({ page }) => {
		await page.goto('/pricing/');
		await expect(page.getByRole('heading', { name: /Plans that stay useful/i })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Free', exact: true }).first()).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Personal', exact: true }).first()).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Enterprise', exact: true }).first()).toBeVisible();
		await expect(page.getByText(/Students 75% off/i)).toBeVisible();
		await expect(page.getByRole('heading', { name: /Built to waste fewer tokens/i })).toBeVisible();
		await expect(page.locator('body')).not.toContainText(/Many teams find/i);
		await expect(page.locator('body')).not.toContainText(/Who it’s for/i);
		await expect(page.getByText(/Cost & usage/i).first()).toBeVisible();
		await expect(page.getByText(/How do I get a license key/i)).toBeVisible();
		await expect(page.getByRole('link', { name: 'Buy Personal' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Buy Enterprise' })).toBeVisible();
		await expect(page.locator('body')).not.toContainText(/\bTower\b/);
		await expect(page.locator('body')).not.toContainText(/Community/i);
		await expect(page.locator('body')).not.toContainText(/Contact Sales/i);
	});
});
