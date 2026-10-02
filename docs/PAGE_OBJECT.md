# Page Object

Page Object to warstwa, która nazywa elementy i zachowania ekranu językiem domeny. W projekcie są dwa warianty:

| Klasa | Formularz | Komunikat wyniku |
|---|---|---|
| [LoginPage](../src/pageobjects/LoginPage.ts) | HTML podstawiany przez `tests/patterns/login-page-object.spec.ts`; kompletna implementacja. | `flashMessage` wskazuje `flash-message`; test oczekuje `Invalid credentials`. |
| [WorkshopLoginPage](../src/pageobjects/WorkshopLoginPage.ts) | Rzeczywista aplikacja z `app/server.js`; szkielet do uzupełnienia. | Docelowy `errorMessage` wskazuje `login-error`; błędne dane dają `Nieprawidłowy login lub hasło.`. |

Obie klasy korzystają z [BasePage](../src/pageobjects/basePage.ts), którego `open` wykonuje nawigację. `LoginPage` otwiera względne `/login`, natomiast `WorkshopLoginPage` używa `LOGIN_URL` lub `http://localhost:3000/login`.

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
- Tworzenia lub sprzątania kont wewnątrz metody logowania; dane przygotowuje test lub fixture i przekazuje do `loginAs`.

## Przykład

Poniżej struktura kompletnego `src/pageobjects/LoginPage.ts`. Import `./basePage` jest względny wobec tego pliku. Locatory inicjalizowane są w konstruktorze, po `super`.

```ts
import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly flashMessage: Locator;

  constructor(page: Page) {
    super(page, '/login');
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: 'Sign in' });
    this.flashMessage = page.getByTestId('flash-message');
  }

  async loginAs(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

Uruchom istniejący test: `npx playwright test tests/patterns/login-page-object.spec.ts --project=chromium`. Uzupełnianie `WorkshopLoginPage` i użycie polskiego komunikatu opisuje [ćwiczenie 02](../exercises/02-page-object.md).

## Odpowiednik dla API

W testach samego API wydziel klasę przyjmującą `APIRequestContext`, np. `ApiHelperPage`, z metodami `createUser`, `listUsers`, `updateUser` i `deleteUser`. Helper skupia ścieżki endpointów i `encodeURIComponent(email)`, a test sprawdza status oraz JSON zwróconego `APIResponse`. Nie potrzebuje `Page` ani przeglądarki. Taką klasę uczestnik tworzy w [ćwiczeniu 07](../exercises/07-testy-api.md).

## Reguła warsztatowa

Test powinien nadal dać się przeczytać jak opis zachowania. Page Object ma zdejmować szum techniczny, ale nie ma chować celu testu.
