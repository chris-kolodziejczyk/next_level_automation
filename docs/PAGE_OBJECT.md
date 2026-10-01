# Page Object

Page Object to warstwa, która nazywa elementy i zachowania ekranu językiem domeny. W projekcie warsztatowym przykładem jest `src/pageobjects/LoginPage.ts`.

## Po co używać Page Object

- Zmniejsza duplikację selektorów.
- Nadaje nazwę akcjom użytkownika.
- Ułatwia zmianę struktury UI bez przepisywania wszystkich testów.
- Pomaga oddzielić szczegóły interfejsu od sensu scenariusza.

## Co powinno trafić do Page Object

- Locatory elementów używanych przez wiele testów.
- Akcje użytkownika, na przykład `loginAs`, `open`, `submit`.
- Krótkie metody opisujące stan ekranu, jeśli są stabilne i wielokrotnie używane.

## Czego unikać

- Ukrywania całego scenariusza w jednej metodzie typu `doEverything`.
- Dodawania asercji, które sprawiają, że test przestaje mówić, co sprawdza.
- Tworzenia Page Object dla każdego drobnego komponentu bez realnego powodu.
- Przekazywania do Page Object danych, które powinny zostać w teście jako część Arrange.

## Przykład

```ts
export class LoginPage {
  constructor(private readonly page: Page) {}

  readonly emailInput = this.page.getByLabel('Email');
  readonly passwordInput = this.page.getByLabel('Password');
  readonly submitButton = this.page.getByRole('button', { name: 'Sign in' });
  readonly flashMessage = this.page.getByTestId('flash-message');

  async loginAs(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

## Reguła warsztatowa

Test powinien nadal dać się przeczytać jak opis zachowania. Page Object ma zdejmować szum techniczny, ale nie ma chować celu testu.
