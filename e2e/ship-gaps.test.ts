import { expect, test } from '@playwright/test';

test.describe('ship gaps (minus payments wiring)', () => {
	test('/buy and /get redirect to pricing', async ({ page }) => {
		await page.goto('/buy/');
		await expect(page).toHaveURL(/\/pricing\/?$/);
		await page.goto('/get/');
		await expect(page).toHaveURL(/\/pricing\/?$/);
	});

	test('retired community routes redirect away', async ({ page }) => {
		await page.goto('/tower-community/');
		await expect(page).toHaveURL(/\/pricing\/?$/);
		await page.goto('/docs/install-tower/');
		await expect(page).toHaveURL(/\/docs\/install-commercial\/?$/);
	});

	test('legal pages are reachable', async ({ page }) => {
		await page.goto('/licensing/');
		await expect(page.getByRole('heading', { name: 'Licensing', exact: true })).toBeVisible();
		await expect(page.locator('meta[property="og:title"]').first()).toHaveAttribute(
			'content',
			/Licensing/
		);
		await expect(page.locator('body')).not.toContainText(/Community/i);

		await page.goto('/privacy/');
		await expect(page.getByRole('heading', { name: 'Privacy', exact: true })).toBeVisible();

		await page.goto('/terms/');
		await expect(page.getByRole('heading', { name: 'Terms of use', exact: true })).toBeVisible();
	});

	test('checkout and account scaffolds are reachable', async ({ page }) => {
		await page.goto('/checkout/?plan=personal_monthly');
		await expect(page.getByRole('heading', { name: 'Checkout', exact: true })).toBeVisible();
		await expect(page.getByRole('button', { name: /Continue to payment/i })).toBeVisible();

		await page.goto('/account/');
		await expect(page.getByRole('heading', { name: 'License account', exact: true })).toBeVisible();
		await expect(page.getByRole('button', { name: 'Check status' })).toBeVisible();
	});

	test('activate and students pages are reachable', async ({ page }) => {
		await page.goto('/activate/');
		await expect(page.getByRole('heading', { name: /Get AGS ready/i })).toBeVisible();
		await page.goto('/students/');
		await expect(page.getByRole('heading', { name: /Verify for student/i })).toBeVisible();
	});

	test('showcase deep pages render usage and demos', async ({ page }) => {
		await page.goto('/showcase/staging/');
		await expect(page.getByRole('heading', { name: /Staging/i }).first()).toBeVisible();
		await expect(page.getByText(/How you use it/i)).toBeVisible();
		await expect(page.getByText(/Token savings/i)).toBeVisible();
		await expect(page.getByText(/Consistency/i).first()).toBeVisible();
		await expect(page.getByText(/Interactive demo/i)).toBeVisible();
		await expect(page.getByText(/Example usage/i)).toBeVisible();
		await expect(page.locator('meta[property="og:description"]').first()).toHaveAttribute(
			'content',
			/.+/
		);

		await page.goto('/showcase/reflex-arcs/');
		await expect(page.getByRole('heading', { name: /Sentinel Reflex/i }).first()).toBeVisible();
		await expect(page.getByText(/Pain signals fire reflex arcs/i)).toBeVisible();
		await expect(page.getByText(/sentinel_status/i).first()).toBeVisible();
		await expect(page.getByText(/Token savings/i)).toBeVisible();
	});

	test('sitemap lists core routes', async ({ request }) => {
		const res = await request.get('/sitemap.xml');
		expect(res.ok()).toBeTruthy();
		const body = await res.text();
		expect(body).toContain('<urlset');
		expect(body).toContain('/pricing/');
		expect(body).toContain('/checkout/');
		expect(body).toContain('/account/');
		expect(body).toContain('/docs/tutorials/');
		expect(body).not.toContain('/tower-community/');
	});
});
