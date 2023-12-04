// @ts-check
import { test, expect } from '@playwright/test';

test('html', async ({ page }) => {
  await page.goto('https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Entertainment Finder/);
});

test('favorite-test', async ({ page }) => {
  await page.goto('https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/');
  //adding favorites in different places
  await page.getByRole('link', { name: 'Places' }).click();
  await page.locator('#favorites-button0').click();
  await page.getByRole('link', { name: 'Explore' }).click();
  await page.locator('#favorites-button0').click();
  await page.getByRole('link', { name: 'Favorites' }).click();
  //check if it's the right one
  await page.locator('#place0').getByRole('button', { name: 'Remove' }).click();
  await page.getByRole('button', { name: 'Clear Favorites' }).click();
  //after clear should expect no favorites
  await page.getByText('You don\'t have any favorites at the moment.').click();
});
test('places-links', async ({ page }) => {
  await page.goto('https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/');
  await page.getByRole('link', { name: 'Places' }).click();
  await page.waitForTimeout(1000); 
  await expect(page.locator('.results-block')).toBeTruthy();
  let explorePageURL = page.url();
  if (explorePageURL != 'https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/places') {
    throw new Error('Navigation verification failed! Unexpected page loaded.');
  }
  const totalPages = 32;
  for (let pageNumber = 2; pageNumber <= totalPages; pageNumber++){
    await expect(page.locator('.results-block')).toBeTruthy();
    await page.getByRole('link', { name: pageNumber.toString()}).first().click();
  } 
});
test('main-links', async ({ page }) => {
  await page.goto('https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/');
  await page.getByRole('link', { name: 'Places' }).click();
  await page.waitForTimeout(1000);
  let explorePageURL = page.url();
  if (explorePageURL != 'https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/places') {
    throw new Error('Navigation verification failed! Unexpected page loaded.');
  }
  await page.getByRole('link', { name: 'Explore' }).click();
  await page.waitForTimeout(1000);
  explorePageURL = page.url();
  if (explorePageURL !== 'https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/explore') {
    throw new Error('Navigation verification failed! Unexpected page loaded.');
  }
  await page.getByRole('link', { name: 'Favorites' }).click();
  await page.waitForTimeout(1000);
  explorePageURL = page.url();
  if (explorePageURL !== 'https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/favorites') {
    throw new Error('Navigation verification failed! Unexpected page loaded.');
  }
  await page.getByRole('link', { name: 'mason logo' }).click();
  await page.waitForTimeout(1000);
  explorePageURL = page.url();
  if (explorePageURL !== 'https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/') {
    throw new Error('Navigation verification failed! Unexpected page loaded.');
  }
});

test('dark-mode-css', async ({ page }) => {
  await page.goto('https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/');
  await page.locator('#icon').click();
  await expect(page.locator('html')).toHaveCSS('--bg-color', '#333');
  await expect(page.locator('html')).toHaveCSS('--color', '#ddd');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('light-mode-css', async ({ page }) => {
  await page.goto('https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/');
  await page.locator('#icon').click();
  await page.locator('#icon').click();
  await expect(page.locator('html')).toHaveCSS('--bg-color', 'rgb(205, 223, 243)');
  await expect(page.locator('html')).toHaveCSS('--color', '#333');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('dark-mode-icon', async ({ page }) => {
  await page.goto('https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/');
  await page.locator('#icon').click();
  await expect(page.locator('#icon')).toHaveAttribute('src', "/src/lib/images/moon.png");
});

test('light-mode-icon', async ({ page }) => {
  await page.goto('https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/search/cafe');
  await expect(page.locator('#icon')).toHaveAttribute('src', "/src/lib/images/sun.png");
  await page.locator('#icon').click();
  await page.locator('#icon').click();
  await expect(page.locator('#icon')).toHaveAttribute('src', "/src/lib/images/sun.png");
});