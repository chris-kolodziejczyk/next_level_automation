# Arrange, Act, Assert

AAA to prosty sposób organizowania testu w trzy części: przygotowanie, akcję i asercję. W Playwright pomaga ograniczyć testy, które wyglądają jak długi zapis kliknięć bez wyraźnej intencji.

## Arrange

W tej części przygotowujesz stan startowy:

- dane testowe,
- zalogowanego użytkownika,
- mocki lub odpowiedzi API,
- wejście na właściwy ekran,
- ustawienia przeglądarki potrzebne tylko w danym teście.

Arrange powinno być możliwie krótkie. Jeżeli przygotowanie stanu zajmuje dużo miejsca, rozważ fixture albo helper API.

## Act

W tej części wykonujesz zachowanie, które testujesz:

- kliknięcie przycisku,
- wysłanie formularza,
- zmianę filtra,
- wywołanie endpointu,
- przejście przez pojedynczy przepływ użytkownika.

Dobra sekcja Act opisuje jedno zachowanie. Logowanie może wymagać kilku kroków technicznych — wypełnienia pól i kliknięcia — albo jednego wywołania `loginAs`. Jeśli test dotyczy samego wysłania formularza, wypełnienie pól można umieścić w Arrange.

## Assert

W tej części sprawdzasz wynik widoczny dla użytkownika albo systemu:

- tekst na stronie,
- status odpowiedzi API,
- zmianę URL,
- widoczność elementu,
- zapisany stan po stronie backendu.

Asercje powinny dotyczyć efektu, a nie przypadkowych szczegółów implementacji.

## Przykład

Poniższy kompletny test można zapisać w `tests/workshop/login-aaa.spec.ts`. Korzysta z istniejącego pomocniczego HTML z `fixtures/smurf/loginForm.ts`, więc sprawdza rezultat formularza demonstracyjnego. Ten formularz pokazuje `Invalid credentials` dla błędnego hasła; lokalna aplikacja z `app/server.js` ma własne komunikaty i stan użytkowników.

```ts
import { test, expect } from '@playwright/test';
import { loginFormHtml } from '../../fixtures/smurf/loginForm';

test('pokazuje błąd po wysłaniu formularza z błędnym hasłem', async ({ page }) => {
  //Arrange
  const user = { email: 'unknown.user@example.com', password: 'wrong-password' };
  await page.setContent(loginFormHtml);
  await page.getByLabel('Email').fill(user.email);
  await page.getByLabel('Password').fill(user.password);

  //Act
  await page.getByRole('button', { name: 'Sign in' }).click();

  //Assert
  await expect(page.getByTestId('flash-message')).toHaveText('Invalid credentials');
});
```

Istniejący [przykład AAA](../tests/patterns/login-aaa.spec.ts) podstawia HTML przez `page.route`. W obu podejściach w teście widać przygotowanie, akcję i rezultat. Test lokalnej aplikacji otwiera `/login` i sprawdza `login-error`, bez podstawiania HTML.

W testach z fixtures część Arrange wykonuje się przed wejściem do funkcji testowej. Oznacz przygotowanie także w fixture, a w teście pozostaw `//Arrange`, `//Act`, `//Assert` przy odpowiadających im krokach. Sprawdzenie statusu POST przygotowującego konto należy do Arrange, a sprawdzenie wyniku badanego logowania do Assert. Cleanup konta umieść w `finally` albo teardown fixture, również na wypadek błędu asercji.

## Checklista

- Czy test ma widoczne trzy części?
- Czy Act opisuje jedno zachowanie?
- Czy Assert sprawdza wynik, który ma znaczenie dla użytkownika lub systemu?
- Czy przygotowanie danych nie dominuje nad sensem testu?
