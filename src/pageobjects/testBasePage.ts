import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

type testForm = {
	testFormName: string;
	testFormDesc: string;
	testFormResult?: string;
	testContext: 'Przypadek testowy' | 'Test automatyczny';
};

export class TestBasePage extends BasePage {
	readonly addBtn: Locator;
	readonly testList: Locator;
	readonly testName: Locator;
	readonly testDesc: Locator;
	readonly result: Locator;
	readonly saveBtn: Locator;
	readonly saveMsgAlert: Locator;
	readonly saveMsgText: Locator;
	readonly cancelSave: Locator;

	constructor(page: Page) {
		super(page, '/');
		this.addBtn = this.page.locator('nav[class="button_link_nav"]');
		this.testList = page.locator('.popbox.button_link_ul>div>ul');
		this.testName = page.locator('#name');
		this.testDesc = page.locator('#description');
		this.result = page.locator('#result');
		this.saveBtn = page.locator('#add');
		this.cancelSave = page.locator('.j_cancel_button');
		this.saveMsgAlert = page.locator('#j_info_box');
		this.saveMsgText = page.locator('#j_info_box>p');
	}

	async clickAddBtn() {
		await this.addBtn.click();
	}

	async goToTest(testName: string) {
		await this.testList.getByText(testName).click();
	}

	async saveOrCancelForm(saveOpt: boolean) {
		if (saveOpt) {
			await this.saveBtn.click();
		} else {
			await this.cancelSave.click();
		}
	}

	async fillTestFormAndSaveOrCancel(
		formParams: testForm = 	{
				testFormName: '9875348053jfkweljf',
				testFormDesc: 'fbkjdlcfelfkqhkf',
				testContext: 'Przypadek testowy',
			},
		saveOpt: boolean
	) {
		await this.testName.fill(formParams.testFormName);

		if (formParams.testContext === 'Przypadek testowy') {
			await this.testDesc.fill(formParams.testFormDesc);
			await this.result.fill(formParams.testFormResult || '');
		} else if (formParams.testContext === 'Test automatyczny') {
			await this.testDesc.fill(formParams.testFormDesc);
		}

		this.saveOrCancelForm(saveOpt);
	}

	async checAddTest() {
		await expect(this.saveMsgAlert).toBeVisible();
		await expect(this.saveMsgText).toHaveText(
			'Przypadek testowy został dodany.'
		);
	}
}
