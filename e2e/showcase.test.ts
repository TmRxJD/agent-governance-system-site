import { expect, test } from '@playwright/test';

test.describe('AGS capability pillars', () => {
	test('hero, savings section, and pillars use visitor copy', async ({ page }) => {
		await page.goto('/');
		await expect(
			page.getByRole('heading', { name: /Keep AI coding on track/i })
		).toBeVisible();
		await expect(page.locator('#discipline')).toBeVisible();
		await expect(page.getByText(/Agent Discipline & Drift Prevention/i).first()).toBeVisible();
		await expect(page.locator('#token-efficiency')).toBeVisible();
		await expect(
			page.getByRole('heading', { name: /Stop paying for the same mistake twice/i })
		).toBeVisible();
		await expect(page.locator('body')).not.toContainText(/The hook/i);
		await expect(page.locator('body')).not.toContainText(/First-Class Feature/i);
		await expect(page.getByRole('link', { name: 'Get AGS' })).toHaveCount(0);
		await expect(page.getByText(/Ungoverned/i).first()).toBeVisible();
		await expect(page.getByText(/Governed/i).first()).toBeVisible();
		await expect(page.getByText(/Ready to run governed agents/i)).toBeVisible();
		await expect(page.locator('#engines')).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Engines', exact: true })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Agent discipline', exact: true })).toBeVisible();
		await expect(page.getByRole('link', { name: /^Staging/ })).toBeVisible();
		await expect(page.getByRole('link', { name: /^Efficiency/ })).toBeVisible();
		await expect(page.getByRole('link', { name: /^Security/ })).toBeVisible();
		await expect(page.locator('#engines a[href*="/showcase/"]')).toHaveCount(24);
		await expect(page.locator('#engines')).not.toContainText(/the rest of the system/i);
		await expect(page.locator('#engines')).not.toContainText(/by domain/i);
		await expect(page.locator('[data-ags-diagram="comparison"]').first()).toBeVisible();
		await expect(page.locator('#delivery')).toBeVisible();
	});
});
