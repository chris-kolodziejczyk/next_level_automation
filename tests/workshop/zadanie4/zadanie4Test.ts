import { test, expect } from './zadanie4Fixture';


// SMURF:
// Small: test sprawdza udane logowanie jednego aktywnego użytkownika.
// Maintainable: Page Object skupia selektory, fixtures przygotowują i sprzątają konto.
// Understandable: loginAs opisuje akcję użytkownika, a sekcje AAA porządkują test.
// Repeatable: każdy test ma własny email i cleanup wykonywany także po błędzie.
// Fast: konto powstaje przez API; kontekst HTTP jest współdzielony w workerze.
test('aktywny użytkownik widzi dashboard po poprawnym logowaniu', async ({
  testUser,
  loginPage,
}) => {
  //Arrange
  const { email, password } = testUser;

  
  //Act
  await loginPage.loginAs(email, password);
  //Assert
  await expect(loginPage.dashboardHeading).toBeVisible();
  await expect(loginPage.welcomeMessage).toHaveText(`Welcome ${email}`);
});
