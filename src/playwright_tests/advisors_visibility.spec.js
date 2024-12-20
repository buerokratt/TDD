import { test, expect } from '@playwright/test';
import { getTranslations } from '@translation/languageDetector.js';

let translation;

test.describe('Analytics-Module', () => {
    test.beforeEach(async ({ page }) => {
        test.info().annotations.push({ type: 'repository', description: 'Analytics-Module' });
        await page.goto('https://admin.prod.buerokratt.ee/analytics/advisors');
        await page.waitForTimeout(3000);
        translation = await getTranslations(page);
    });

    test.describe('Main Heading', () => {
        test('should display main heading', async ({ page }) => {
            const heading = await page.getByRole('heading', { name: `${translation.advisors}`, exact: true });
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
            const forwardingButton = await page.getByRole('button', { name: `${translation.forwarding}`, exact: true });
            const averageResponseSpeedButton = await page.getByText(`${translation.averageResponseSpeedInTheInstitution}`, { exact: true });
            const averagePresenceButton = await page.getByText(`${translation.averagePresenceOfCounselors}`, { exact: true });
            const conversationsByAdviserButton = await page.getByText(`${translation.numberOfConversationsByAdviser}`, { exact: true });
            const conversationTimeButton = await page.getByText(`${translation.conversationTimeByAdvisor}`, { exact: true });

            await expect(forwardingButton).toBeVisible();

            await expect(averageResponseSpeedButton).toBeVisible();
            await expect(averagePresenceButton).toBeVisible();
            await expect(conversationsByAdviserButton).toBeVisible();
            await expect(conversationTimeButton).toBeVisible();
        });

        test('should display label for Additional Options', async ({ page }) => {
            const additionalOptionsLabel = await page.getByText(`${translation.additionalOptions}`, { exact: true });
            await expect(additionalOptionsLabel).toBeVisible();
        });

        test('should display switch options', async ({ page }) => {
            const conversationsSwitch = await page.getByText(`${translation.numberOfConversationsDirectedFromTheAdvisor}`, { exact: true });
            const counselorConversationsSwitch = await page.getByText(`${translation.counselorDirectedConversations}`, { exact: true });
            const outOfFacilitySwitch = await page.getByText(`${translation.outOfFacilityForwards}`, { exact: true });

            await expect(conversationsSwitch).toBeVisible();
            await expect(counselorConversationsSwitch).toBeVisible();
            await expect(outOfFacilitySwitch).toBeVisible();
        });
    });

    test.describe('Card Header', () => {
        test('should display forwarding heading', async ({ page }) => {
            const forwardingHeading = await page.getByRole('heading', { name: `${translation.forwarding}`, exact: true });
            await expect(forwardingHeading).toBeVisible();
        });

        test('should display CSV button and dropdown', async ({ page }) => {
            const csvButton = await page.getByText(`${translation.csv}`, { exact: true });
            const dropdown = page.locator('.select');
            await expect(csvButton).toBeVisible();
            await expect(dropdown).toBeVisible();
        });
    });
});
