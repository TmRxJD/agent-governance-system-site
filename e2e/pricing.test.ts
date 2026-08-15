import { expect, test } from '@playwright/test';

test.describe('AGS pricing page', () => {
	test('shows tiers, token efficiency, and comparison', async ({ page }) => {
		await page.goto('/pricing/');
		await expect(page.getByRole('heading', { name: /Pay for governance that reduces token/i })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Free', exact: true }).first()).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Personal', exact: true }).first()).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Enterprise', exact: true }).first()).toBeVisible();
		await expect(page.getByText(/Students 75% off/i)).toBeVisible();
		await expect(page.getByRole('heading', { name: /Token Efficiency & Cost Reduction/i })).toBeVisible();
		await expect(page.getByText(/AGS pays for itself by reducing token consumption/i)).toBeVisible();
		await expect(page.getByText(/Token Efficiency/i).first()).toBeVisible();
		await expect(page.getByText(/Organic guardrail learning/i)).toBeVisible();
		await expect(page.getByRole('link', { name: 'Buy license' }).first()).toBeVisible();
		await expect(page.locator('body')).not.toContainText(/\bTower\b/);
		await expect(page.locator('body')).not.toContainText(/Contact Sales/i);
	});
});
