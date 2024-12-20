import { test, expect } from '@playwright/test';
import { getTranslations } from '@translation/languageDetector.js';

let translation;

test.describe('Analytics Module Functionality Testing', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://admin.prod.buerokratt.ee/analytics/advisors');
        translation = await getTranslations(page);
        test.info().annotations.push({ type: 'repository', description: 'Analytics-Module' });
        await page.waitForTimeout(3000);
    });

    test('should display heading and date pickers in the period section', async ({ page }) => {
        const cardBody = page.locator('.card__body');
        const heading = cardBody.getByRole('heading', { name: `${translation.advisors}`, exact: true });
        const periodLabel = cardBody.getByText(`${translation.period}`, { exact: true });
        const startDatePicker = cardBody.locator('.datepicker').nth(0);
        const endDatePicker = cardBody.locator('.datepicker').nth(1);

        await expect(heading).toBeVisible();
        await expect(periodLabel).toBeVisible();
        await expect(startDatePicker).toBeVisible();
        await expect(endDatePicker).toBeVisible();
    });

    test('should interact with period selection buttons', async ({ page }) => {
        const cardBody = page.locator('.card__body');
        const todayButton = cardBody.getByRole('button', { name: `${translation.today}`, exact: true });
        const yesterdayButton = cardBody.getByRole('button', { name: `${translation.yesterday}`, exact: true });
        const last30DaysButton = cardBody.getByRole('button', { name: `${translation.last30Days}`, exact: true });
        const selectedMonthsButton = cardBody.getByRole('button', { name: `${translation.selectedMonths}`, exact: true });

        await todayButton.click();
        await expect(todayButton).toHaveClass(/active/);

        await yesterdayButton.click();
        await expect(yesterdayButton).toHaveClass(/active/);

        await last30DaysButton.click();
        await expect(last30DaysButton).toHaveClass(/active/);

        await selectedMonthsButton.click();
        await expect(selectedMonthsButton).toHaveClass(/active/);
    });

    test('should handle date pickers for selected period', async ({ page }) => {
        const cardBody = page.locator('.card__body');
        const selectedPeriodButton = cardBody.getByRole('button', { name: `${translation.selectedPeriod}`, exact: true });
        const startDatePicker = cardBody.locator('.datepicker').nth(0);
        const endDatePicker = cardBody.locator('.datepicker').nth(1);

        await selectedPeriodButton.click();
        const startInput = startDatePicker.locator('input').first();
        const endInput = endDatePicker.locator('input').first();

        await startInput.fill('01.01.2024');
        await endInput.fill('31.12.2024');

        const startValue = await startInput.getAttribute('value');
        const endValue = await endInput.getAttribute('value');

        expect(startValue).toBe('01.01.2024');
        expect(endValue).toBe('31.12.2024');
    });

    test('should handle metric selection buttons', async ({ page }) => {
        const section = page.locator('.card__body').locator('section').filter({ hasText: `${translation.chooseMetric}` });
        const forwardingButton = section.getByRole('button', { name: `${translation.forwarding}`, exact: true });
        const responseSpeedButton = section.getByRole('button', { name: `${translation.averageResponseSpeed}`, exact: true });

        await forwardingButton.click();
        await expect(forwardingButton).toHaveClass(/active/);

        await responseSpeedButton.click();
        await expect(responseSpeedButton).toHaveClass(/active/);
    });

    test('should toggle additional options checkboxes', async ({ page }) => {
        const section = page.locator('.card__body').locator('section').filter({ hasText: `${translation.additionalOptions}` });
        const directedFromAdvisorCheckbox = section.getByRole('checkbox', { name: `${translation.directedFromAdvisor}`, exact: true });
        const counselorCheckbox = section.getByRole('checkbox', { name: `${translation.counselorDirected}`, exact: true });

        await directedFromAdvisorCheckbox.check();
        await expect(directedFromAdvisorCheckbox).toBeChecked();

        await counselorCheckbox.check();
        await expect(counselorCheckbox).toBeChecked();
    });

    test('should switch chart types in the report section', async ({ page }) => {
        const chartSection = page.locator('.card__body').locator('.recharts-wrapper');
        const dropdown = chartSection.getByText(new RegExp(`${translation.barChart}`));
        await dropdown.click();
        const pieOption = page.getByText(`${translation.pieChart}`, { exact: true });
        await pieOption.click();
        const activeOption = dropdown.locator('.selected').first();
        await expect(activeOption).toHaveText(`${translation.pieChart}`);
    });
});
