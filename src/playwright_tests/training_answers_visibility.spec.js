import { test, expect } from '@playwright/test';
import { getTranslations } from '@translation/languageDetector.js';

let translation;

test.describe('Training Module - Responses', () => {
  test.beforeEach(async ({ page }) => {
    // Annotation
    test.info().annotations.push({ type: 'repository', description: 'Training-Module' });

    // Navigate to the page
    await page.goto('https://admin.prod.buerokratt.ee/training/training/responses');

    // Fetch translations after navigation
    translation = await getTranslations(page);

    // Ensure elements load properly
    await page.waitForTimeout(3000);
  });

  test.describe('Heading and Card Section', () => {
    test('should display the main heading', async ({ page }) => {
      const heading = await page.getByRole('heading', { name: `${translation.responses}`, exact: true });
      await expect(heading).toBeVisible();
    });

    test('should display search input and add button in card body', async ({ page }) => {
      const searchInput = await page.getByPlaceholder(`${translation.searchResponse}`, { exact: true });
      const addButton = await page.getByText(`${translation.add}`, { exact: true });

      await expect(searchInput).toBeVisible();
      await expect(addButton).toBeVisible();
    });
  });

  test.describe('Table Section', () => {
    test('should display sortable "Response" header', async ({ page }) => {
      const sortingButton = page.locator('th').filter({ hasText: `${translation.response}` }).locator('button');
      await expect(sortingButton).toBeVisible();
    });

    test('should display edit and delete buttons in the first row of the table', async ({ page }) => {
      const container = page.locator('.data-table');
      const editButton = container.getByRole('button', { name: `${translation.edit}` }).first();
      const deleteButton = container.getByRole('button', { name: `${translation.delete}` }).first();

      await expect(editButton).toBeVisible();
      await expect(deleteButton).toBeVisible();
    });
  });
});
