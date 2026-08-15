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
		await expect(page.getByText(/Ungoverned/i).first()).toBeVisible();
		await expect(page.getByText(/Governed/i).first()).toBeVisible();
		await expect(page.getByText('Get AGS').first()).toBeVisible();
		await expect(page.getByText(/Start coding with governed agents/i)).toBeVisible();
		await expect(page.locator('#engines')).toBeVisible();
	});
});
