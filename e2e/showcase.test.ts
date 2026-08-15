import { expect, test } from '@playwright/test';

test.describe('AGS capability pillars', () => {
	test('hero, token efficiency, and pillars use product copy', async ({ page }) => {
		await page.goto('/');
		await expect(
			page.getByRole('heading', { name: /Cut agent token waste/i })
		).toBeVisible();
		await expect(page.locator('#discipline')).toBeVisible();
		await expect(page.getByText(/Agent Discipline & Drift Prevention/i).first()).toBeVisible();
		await expect(page.locator('#token-efficiency')).toBeVisible();
		await expect(
			page.getByRole('heading', { name: /Token Efficiency as a First-Class Feature/i })
		).toBeVisible();
		await expect(page.getByText(/Ungoverned/i).first()).toBeVisible();
		await expect(page.getByText(/Governed/i).first()).toBeVisible();
		await expect(page.getByText('Get AGS').first()).toBeVisible();
		await expect(page.getByText(/Start coding with governed agents/i)).toBeVisible();
		await expect(page.locator('#engines')).toBeVisible();
	});
});
