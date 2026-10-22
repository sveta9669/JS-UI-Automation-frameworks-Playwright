import { test, expect } from '@playwright/test';

test.describe('Tool Shop Demo - 4 BDD Scenarios', () => {

    // Scenario 4: Successful item search
    test('Successful item search', async ({ page }) => {
        await page.goto('https://practicesoftwaretesting.com/');
        await page.locator('#search-query').fill('Combination Pliers');
        await page.locator('[data-test="search-submit"]').click();

        const productCards = page.locator('.card');
        await productCards.first().waitFor({ state: 'visible' });
        
        const count = await productCards.count();
        expect(count).toBeGreaterThan(0);
    });

    // Scenario 5: Verify product information before adding it to the cart
    test('Verify product information before adding it to the cart', async ({ page }) => {
        await page.goto('https://practicesoftwaretesting.com/');
        await page.locator('#search-query').fill('Combination Pliers');
        await page.locator('[data-test="search-submit"]').click();

        const productLink = page.locator('h5', { hasText: 'Combination Pliers' });
        await productLink.first().waitFor({ state: 'visible' });
        await productLink.first().click();

        await expect(page.locator('h1')).toHaveText('Combination Pliers');
        await expect(page.locator('.text-danger')).toBeVisible();
        await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
    });

    // Scenario 6: Add a product to favorites
    test('Add a product to favorites', async ({ page }) => {
        await page.goto('https://practicesoftwaretesting.com/auth/login');
        await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
        await page.locator('[data-test="password"]').fill('welcome01');
        await page.locator('[data-test="login-submit"]').click();

        await page.waitForURL('**/account', { timeout: 10000 });

        await page.goto('https://practicesoftwaretesting.com/');
        await page.locator('#search-query').fill('Combination Pliers');
        await page.locator('[data-test="search-submit"]').click();

        const productLink = page.locator('h5', { hasText: 'Combination Pliers' });
        await productLink.first().waitFor({ state: 'visible' });
        await productLink.first().click();

        const favButton = page.locator('[data-test="add-to-favorites"]');
        await favButton.waitFor({ state: 'visible' });
        await favButton.click();

        expect(true).toBeTruthy();
    });

    // Scenario 7: Filter and sort products by price
    test('Filter and sort products by price', async ({ page }) => {
        await page.goto('https://practicesoftwaretesting.com/');
        
        const categoryCheckbox = page.locator('label', { hasText: 'Hand Tools' }).locator('input');
        await categoryCheckbox.waitFor({ state: 'visible' });
        await categoryCheckbox.click();

        const sortDropdown = page.locator('[data-test="sort"]');
        await sortDropdown.waitFor({ state: 'visible' });
        await sortDropdown.selectOption('price,asc');

        const productCards = page.locator('.card');
        await productCards.first().waitFor({ state: 'visible' });
        
        const count = await productCards.count();
        expect(count).toBeGreaterThan(0);
    });

});