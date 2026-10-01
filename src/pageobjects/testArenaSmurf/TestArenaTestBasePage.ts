import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../basePage';

export type TestCaseForm = {
	name: string;
	description: string;
	result: string;
	type: 'Przypadek testowy' | 'Test automatyczny';
};

export class TestArenaTestBasePage extends BasePage {
	readonly addButton: Locator;
	readonly testTypeList: Locator;
	readonly nameInput: Locator;
	readonly descriptionInput: Locator;
	readonly resultInput: Locator;
	readonly saveButton: Locator;
	readonly notification: Locator;
	readonly notificationText: Locator;

	constructor(page: Page) {
		super(page, '/');

		this.addButton = this.page.locator('nav[class="button_link_nav"]');
		this.testTypeList = this.page.locator('.popbox.button_link_ul>div>ul');
		this.nameInput = this.page.locator('#name');
		this.descriptionInput = this.page.locator('#description');
		this.resultInput = this.page.locator('#result');
		this.saveButton = this.page.locator('#add');
		this.notification = this.page.locator('#j_info_box');
		this.notificationText = this.page.locator('#j_info_box>p');
	}

	async addTestCase(testCase: TestCaseForm) {
		await this.openAddMenu();
		await this.chooseTestType(testCase.type);
		await this.fillTestCaseForm(testCase);
		await this.saveTestCase();
	}

	async expectTestCaseWasAdded() {
		await expect(this.notification).toBeVisible();
		await expect(this.notificationText).toHaveText(
			'Przypadek testowy został dodany.'
		);
	}

	private async openAddMenu() {
		await this.addButton.click();
	}

	private async chooseTestType(testType: TestCaseForm['type']) {
		await this.testTypeList.getByText(testType, { exact: true }).click();
	}

	private async fillTestCaseForm(testCase: TestCaseForm) {
		await this.nameInput.fill(testCase.name);
		await this.descriptionInput.fill(testCase.description);

		if (testCase.type === 'Przypadek testowy') {
			await this.resultInput.fill(testCase.result);
		}
	}

	private async saveTestCase() {
		await this.saveButton.click();
	}
}
