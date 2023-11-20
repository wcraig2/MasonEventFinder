// @ts-check
import { test, expect } from '@playwright/test';

test('html', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Entertainment Finder/);
});


test('sidebar', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByText('Nearby Events').hover();
  await expect(page.locator('div').filter({ hasText: /^Example Menu Item$/ })).toBeVisible();
});

test('dark-mode-css', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.locator('#icon').click();
  await expect(page.locator('html')).toHaveCSS('--bg-color', '#333');
  await expect(page.locator('html')).toHaveCSS('--color', '#ddd');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('light-mode-css', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.locator('#icon').click();
  await page.locator('#icon').click();
  await expect(page.locator('html')).toHaveCSS('--bg-color', 'rgb(205, 223, 243)');
  await expect(page.locator('html')).toHaveCSS('--color', '#333');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('dark-mode-icon', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.locator('#icon').click();
  await expect(page.locator('#icon')).toHaveAttribute('src', 'src/lib/images/moon.png');
});

test('light-mode-icon', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.locator('#icon')).toHaveAttribute('src', 'src/lib/images/sun.png');
  await page.locator('#icon').click();
  await page.locator('#icon').click();
  await expect(page.locator('#icon')).toHaveAttribute('src', 'src/lib/images/sun.png');
});