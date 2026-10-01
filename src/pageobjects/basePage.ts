import { type Page } from '@playwright/test';

export class BasePage {
	constructor(
		protected readonly page: Page,
		private readonly defaultPath = '/'
	) {}

	async open(path = this.defaultPath) {
		await this.page.goto(path);
	}

	randomString(len: number = 10, type: string = 'letters') {
		type = type && type.toLowerCase();
		let str = '',
			i = 0,
			min = type == 'letters' ? 10 : 0,
			max = type == 'number' ? 10 : 62;
		for (; i++ < len; ) {
			let r = (Math.random() * (max - min) + min) << 0;
			str += String.fromCharCode((r += r > 9 ? (r < 36 ? 55 : 61) : 48));
		}
		return str;
	}
}
