import { test, expect } from '@playwright/test';
import { getTranslations } from '@translation/languageDetector.js';

let translation;

test.describe('Analytics-Module', () => {
    test.beforeEach(async ({ page }) => {
        test.info().annotations.push({ type: 'repository', description: 'Analytics-Module' });
        await page.goto('https://admin.prod.buerokratt.ee/analytics/chats');
        await page.waitForTimeout(3000);
        translation = await getTranslations(page);
    });

    test.describe('Main Heading', () => {
        test('should display main heading', async ({ page }) => {
            const heading = await page.getByRole('heading', { name: `${translation.chats}`, exact: true });
            await expect(heading).toBeVisible();
        });
    });

    test.describe('Card Body', () => {
        test('should display label for Period', async ({ page }) => {
            const periodLabel = await page.getByText(`${translation.period}`, { exact: true });
            await expect(periodLabel).toBeVisible();
        });

        test('should display Period buttons', async ({ page }) => {
            const todayButton = await page.getByText(`${translation.today}`, { exact: true });
            const yesterdayButton = await page.getByText(`${translation.yesterday}`, { exact: true });
            const last30DaysButton = await page.getByText(`${translation.last30Days}`, { exact: true });
            const selectedMonthsButton = await page.getByText(`${translation.selectedMonths}`, { exact: true });
            const selectedPeriodButton = await page.getByText(`${translation.selectedPeriod}`, { exact: true });

            await expect(todayButton).toBeVisible();
            await expect(yesterdayButton).toBeVisible();
            await expect(last30DaysButton).toBeVisible();
            await expect(selectedMonthsButton).toBeVisible();
            await expect(selectedPeriodButton).toBeVisible();
        });

        test('should display label for Choose a metric', async ({ page }) => {
            const chooseMetricLabel = await page.getByText(`${translation.chooseAMetric}`, { exact: true });
            await expect(chooseMetricLabel).toBeVisible();
        });

        test('should display metric buttons', async ({ page }) => {
            const totalChatsButton = await page.getByRole('button', { name: `${translation.totalNumberOfChats}`, exact: true });
            const contactInfoProvidedButton = await page.getByText(`${translation.contactInformationProvided}`, { exact: true });
            const avgConversationTimeButton = await page.getByText(`${translation.averageConversationTimeMin}`, { exact: true });
            const avgWaitingTimeButton = await page.getByText(`${translation.averageWaitingTimeMin}`, { exact: true });
            const avgMessagesButton = await page.getByText(`${translation.averageNumberOfMessagesInAChat}`, { exact: true });
            const idleChatsEndedButton = await page.getByText(`${translation.countOfIdleChatsEndedByBuerokratt}`, { exact: true });

            await expect(totalChatsButton).toBeVisible();
            await expect(contactInfoProvidedButton).toBeVisible();
            await expect(avgConversationTimeButton).toBeVisible();
            await expect(avgWaitingTimeButton).toBeVisible();
            await expect(avgMessagesButton).toBeVisible();
            await expect(idleChatsEndedButton).toBeVisible();
        });

        test('should display label for Additional Options', async ({ page }) => {
            const additionalOptionsLabel = await page.getByText(`${translation.additionalOptions}`, { exact: true });
            await expect(additionalOptionsLabel).toBeVisible();
        });

        test('should display checkbox options', async ({ page }) => {
            const onlyBuerokrattCheckbox = page.locator('.card').first().getByText(`${translation.onlyBuerokrattInvolved}`, { exact: true });
            const csaInvolvedCheckbox = page.getByText(`${translation.csaInvolved}`, { exact: true });
            const totalCheckbox = page.locator('.card').first().getByText(`${translation.total}`, { exact: true });

            await expect(onlyBuerokrattCheckbox).toBeVisible();
            await expect(csaInvolvedCheckbox).toBeVisible();
            await expect(totalCheckbox).toBeVisible();
        });
    });

    test.describe('Card Header', () => {
        test('should display heading for Total number of chats', async ({ page }) => {
            const totalChatsHeading = await page.getByRole('heading', { name: `${translation.totalNumberOfChats}`, exact: true });
            await expect(totalChatsHeading).toBeVisible();
        });

        test('should display CSV button and dropdown', async ({ page }) => {
            const csvButton = await page.getByText(`${translation.csv}`, { exact: true });
            const dropdown = await page.locator('.select');

            await expect(csvButton).toBeVisible();
            await expect(dropdown).toBeVisible();
        });
    });
});
