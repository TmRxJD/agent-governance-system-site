import { expect, test } from '@playwright/test';

test.describe('AGS capability pillars', () => {
	test('hero and three pillars use product copy', async ({ page }) => {
		await page.goto('/');
		await expect(
			page.getByRole('heading', { name: /Turn chaotic AI-assisted development/i })
		).toBeVisible();
		await expect(page.locator('#discipline')).toBeVisible();
		await expect(page.getByText(/don’t fail loudly/i).first()).toBeVisible();
		await expect(page.getByText('Get AGS').first()).toBeVisible();
		await expect(page.getByText(/Start coding with governed agents/i)).toBeVisible();
		await expect(page.locator('#engines')).toBeVisible();
	});
});
