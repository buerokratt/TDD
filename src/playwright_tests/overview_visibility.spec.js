import { test, expect } from '@playwright/test';
import { getTranslations } from '@translation/languageDetector.js';

let translation;

test.describe('Analytics overview', () => {
  test.beforeEach(async ({ page }) => {
    test.info().annotations.push({ type: 'repository', description: 'Analytics overview' });
    await page.goto('https://admin.prod.buerokratt.ee/analytics/overview');
    await page.waitForTimeout(3000);
    translation = await getTranslations(page);
  });

  test.describe('Main Section', () => {
    test('should display main heading and Edit button', async ({ page }) => {
      const heading = await page.getByRole('heading', { name: `${translation.overview}`, exact: true });
      const editButton = await page.getByText(`${translation.edit}`, { exact: true });
      await expect(heading).toBeVisible();
      await expect(editButton).toBeVisible();
    });
  });

  test.describe('Main Metrics Area', () => {
    test('should display draggable card headings with values', async ({ page }) => {
        const monthAverageHeading = await page.locator('.card').filter({ hasText: `${translation.averageChatsPerDayMonthPrevious}` }).getByRole('heading', { level: 2 });
        const weekAverageHeading = await page.locator('.card').filter({ hasText: `${translation.averageChatsPerDayWeekPrevious}` }).getByRole('heading', { level: 2 });
        const monthAnsweredHeading = await page.locator('.card').filter({ hasText: `${translation.averageChatsAnsweredByBuerokratMonthPrevious}` }).getByRole('heading', { level: 2 });
        const weekAnsweredHeading = await page.locator('.card').filter({ hasText: `${translation.averageChatsAnsweredByBuerokratWeekPrevious}` }).getByRole('heading', { level: 2 });
        const todayAnsweredHeading = await page.locator('.card').filter({ hasText: `${translation.answeredByBuerokratTodayYesterday}` }).getByRole('heading', { level: 2 });
        const chatsMonthHeading = await page.locator('.card').filter({ hasText: `${translation.numberOfChatsMonthPrevious}` }).getByRole('heading', { level: 2 });
      
        await expect(monthAverageHeading).toBeVisible();
        await expect(weekAverageHeading).toBeVisible();
        await expect(monthAnsweredHeading).toBeVisible();
        await expect(weekAnsweredHeading).toBeVisible();
        await expect(todayAnsweredHeading).toBeVisible();
        await expect(chatsMonthHeading).toBeVisible();
    });
  });

  test.describe('Cards Section', () => {
    test('should display Total number of chats card', async ({ page }) => {
      const totalChatsLabel = await page.getByRole('heading', { name: `${translation.totalNumberOfChats}`, exact: true });
      await expect(totalChatsLabel).toBeVisible();
    });

    test('should display OpenSearch Dashboard card with button', async ({ page }) => {
      const openSearchLabel = await page.getByRole('heading', { name: `${translation.openSearchDashboardOSD}`, exact: true });
      const openOpenSearchButton = await page.getByText(`${translation.openOpenSearch}`, { exact: true });
      await expect(openSearchLabel).toBeVisible();
      await expect(openOpenSearchButton).toBeVisible();
    });
  });
});
