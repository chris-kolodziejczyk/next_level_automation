import { expect, Page, test } from '@playwright/test';
import { LoginPage } from '../src/pageobjects/LoginPage';
import { MainPage } from '../src/pageobjects/mainPage';
import { TestBasePage } from '../src/pageobjects/testBasePage';
let loginPage, mainPage, testBasePage;

async function goToTest(page: Page, testName: string) {
	await page
		.locator('.popbox.button_link_ul>div>ul')
		.getByText(testName)
		.click();
}

test.describe('Example TestArena tests for test base', async () => {
	test.beforeEach(async ({ page }) => {
		// Arrange
		// otwarcie aplikacji
		// logowanie
		loginPage = new LoginPage(page);

		await loginPage.open();
		await loginPage.loginAsUser();
	});

	test('Should add test case to test base and use aaa pattern', async ({
		page,
	}) => {
		// Arrange
		// otwarcie aplikacji
		// logowanie
		// await page.goto('/zaloguj');
		// await page.locator('#email').fill('administrator@testarena.pl');
		// await page.locator('#password').fill('sumXQQ72$L');
		// await page.locator('#login').click()

		// Act
		// przejście do bazy testów
		// kliknij dodaj
		// wejdź w test
		// zapisz formularz

		await page
			.locator('div[id="wrapper"]>ul[class="menu"]')
			.getByText('Baza testów')
			.click();

		await page.locator('nav[class="button_link_nav"]').click();
		await goToTest(page, 'Przypadek testowy');

		await page.locator('#name').fill('Nazwa testu123456776ghbkjn');
		await page.locator('#description').fill('Jakiś opis dla szkolenia');
		await page.locator('#result').fill('Rezultat testu na szkoleniu');
		await page.locator('#add').click();

		// Assert
		// asercja
		await expect(page.locator('#j_info_box')).toBeVisible();
		await expect(page.locator('#j_info_box>p')).toHaveText(
			'Przypadek testowy został dodany.'
		);
	});

	test('Should add test case to test base and use page object', async ({
		page,
	}) => {
		// Act
		// przejście do bazy testów
		// kliknij dodaj
		// wejdź w test
		// zapisz formularz
		mainPage = new MainPage(page);
		testBasePage = new TestBasePage(page);

		await mainPage.goToMenuOptionPage();
		await testBasePage.clickAddBtn();


		await testBasePage.goToTest('Przypadek testowy');
		await testBasePage.fillTestFormAndSaveOrCancel(
			{
				testFormName: testBasePage.randomString(255),
				testFormDesc: testBasePage.randomString(5000),
				testFormResult: testBasePage.randomString(1000),
				testContext: 'Przypadek testowy',
			},
			true
		);
		// tutaj dla SMURF następuje zapis lub anulacja


		// Assert
		// asercja
		await testBasePage.checAddTest();
	});

		test('Should add test automation case to test base and use page object an SMURF', async ({
		page,
	}) => {
		// Act
		// przejście do bazy testów
		// kliknij dodaj
		// wejdź w test
		// zapisz formularz
		mainPage = new MainPage(page);
		testBasePage = new TestBasePage(page);

		await mainPage.goToMenuOptionPage();
		await testBasePage.clickAddBtn();

		
		await testBasePage.goToTest('Test automatyczny');
		await testBasePage.fillTestFormAndSaveOrCancel(
			{
				testFormName: testBasePage.randomString(255),
				testFormDesc: testBasePage.randomString(5000),
				testFormResult: testBasePage.randomString(1000),
				testContext: 'Test automatyczny',
			},
			true
		);
		// tutaj dla SMURF następuje zapis lub anulacja


		// Assert
		// asercja
		await testBasePage.checAddTest();
	});
});
