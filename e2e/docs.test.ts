import { expect, test } from '@playwright/test';

test.describe('AGS docs wiki', () => {
	test('index is organized by domain with sidebar nav', async ({ page }) => {
		await page.goto('/docs/');
		await expect(page.getByRole('heading', { name: 'Documentation', exact: true })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Getting started', exact: true })).toBeVisible();
		const sidebar = page.locator('.hidden.lg\\:block').getByRole('navigation', { name: 'Docs by domain' });
		await expect(sidebar).toBeVisible();
		await sidebar.getByRole('link', { name: 'Overview' }).click();
		await expect(page.getByRole('heading', { name: 'Overview', exact: true })).toBeVisible();
		await expect(page.locator('body')).not.toContainText(/Audience:/i);
		await expect(page.getByLabel('Breadcrumb')).toContainText('Overview');
	});

	test('examples page has copy-paste configs', async ({ page }) => {
		await page.goto('/docs/examples/');
		await expect(page.getByRole('heading', { name: 'Examples', exact: true })).toBeVisible();
		await expect(page.getByText('.ags/versioning.yml').first()).toBeVisible();
		await expect(page.getByText('bumpRules:').first()).toBeVisible();
	});

	test('tutorials hub lists tracks and opens a feature tutorial', async ({ page }) => {
		await page.goto('/docs/tutorials/');
		await expect(page.getByRole('heading', { name: 'Tutorials', exact: true })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Commit loop', exact: true })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'Token intelligence', exact: true })).toBeVisible();
		await expect(page.getByText(/\d+ tutorials across/i)).toBeVisible();
		await page.getByRole('link', { name: /Commit Authorization Protocol/i }).first().click();
		await expect(page.getByRole('heading', { name: /Commit Authorization Protocol/i })).toBeVisible();
		await expect(page.getByRole('heading', { name: 'What you will learn', exact: true })).toBeVisible();
		await expect(page.getByText('commit_authorize').first()).toBeVisible();
		await expect(page.getByLabel('Breadcrumb')).toContainText('Tutorials');
		await expect(page.locator('body')).not.toContainText(/Audience:/i);
	});

	test('direct tutorial slug routes work for SDK surfaces', async ({ page }) => {
		await page.goto('/docs/tutorials/efficiency/');
		await expect(page.getByRole('heading', { name: /efficiency/i }).first()).toBeVisible();
		await expect(page.locator('article').getByText(/efficiency_/i).first()).toBeVisible();
		await page.goto('/docs/tutorials/staging/');
		await expect(page.getByRole('heading', { name: /Staging/i }).first()).toBeVisible();
		await expect(page.locator('article').getByText(/staging_/i).first()).toBeVisible();
	});
});
