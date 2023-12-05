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
    await page.getByRole('link', { name: (pageNumber).toString()}).first().click();
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
  await expect(page.locator('#icon')).toHaveAttribute('alt', "moon");
});

test('light-mode-icon', async ({ page }) => {
  await page.goto('https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/search/cafe');
  await expect(page.locator('#icon')).toHaveAttribute('alt', "sun");
  await page.locator('#icon').click();
  await page.locator('#icon').click();
  await expect(page.locator('#icon')).toHaveAttribute('alt', "sun");
});

test('Map existence test within an iframe on the page', async ({ page }) => {
  // Navigate to the page where the map should be
  await page.goto('https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/');

  // Use the frameLocator to target the iframe that contains the map
  const frame = page.frameLocator('iframe[title="Neighborhood discovery"]');

  // Within the iframe, use the locator to find the div with the specified text
  const mapTextDiv = frame.locator('div').filter({ hasText: /^To navigate, press the arrow keys.$/ }).first();

  // Check if the div with the map text exists and is visible
  await expect(mapTextDiv).toBeVisible();
});

test('Search for "fairfax" and check the response', async ({ page }) => {
  // Navigate to the page where the map should be
  await page.goto('https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/');

  // Replace 'input[name="search"]' with the actual selector for your search input
  await page.getByPlaceholder('Search and hit enter...').click();
  await page.getByPlaceholder('Search and hit enter...').fill('fairfax');
  await page.getByPlaceholder('Search and hit enter...').press('Enter');

  // Replace 'text="You searched for: fairfax"' with the actual selector or text locator that fits your page
  const searchResultText = await page.locator('text="You searched for: fairfax"').first();
  await expect(searchResultText).toBeTruthy();

  // Ensure that the text is visible
  await expect(searchResultText).toBeVisible();
});

test('Main link functionability', async ({ page }) => {
  // Navigate to the page where the map should be
  await page.goto('https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Entertainment Finder/);

  // Expect the link to display proper link site
  await expect(page).toHaveURL('https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/');
});

test('Places link functionability', async ({ page }) => {
  // Navigate to the page where the map should be
  await page.goto('https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/');

  await page.getByRole('link', { name: 'Places' }).click();

  await expect(page).toHaveURL('https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/places');
});

test('Explore link functionability', async ({ page }) => {
  // Navigate to the page where the map should be
  await page.goto('https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/');

  await page.getByRole('link', { name: 'Explore' }).click();

  await expect(page).toHaveURL('https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/explore');
});

test('Favorites link functionability', async ({ page }) => {
  // Navigate to the page where the map should be
  await page.goto('https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/');

  await page.getByRole('link', { name: 'Favorites' }).click(); 

  await expect(page).toHaveURL('https://mason-event-finder-git-development-williamacraig-outlookcom.vercel.app/favorites');
});