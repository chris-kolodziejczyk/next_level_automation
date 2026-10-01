import { test } from '../fixtures/testArenaSmurf/fixtures';

test.describe('Example TestArena tests for test base - SMURF', () => {
	test('Should add test case to test base using SMURF pattern', async ({
		testBasePage,
		testCase,
	}) => {
		// ACT
		await testBasePage.addTestCase(testCase);

		// ASSERT
		await testBasePage.expectTestCaseWasAdded();
	});
});
