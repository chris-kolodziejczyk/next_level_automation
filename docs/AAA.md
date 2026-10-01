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

Dobra sekcja Act zwykle ma jedną główną akcję. Jeżeli akcji jest kilka, test prawdopodobnie sprawdza więcej niż jeden temat.

## Assert

W tej części sprawdzasz wynik widoczny dla użytkownika albo systemu:

- tekst na stronie,
- status odpowiedzi API,
- zmianę URL,
- widoczność elementu,
- zapisany stan po stronie backendu.

Asercje powinny dotyczyć efektu, a nie przypadkowych szczegółów implementacji.

## Przykład

```ts
test('shows error for invalid login', async ({ page, loginPage, seedUserId }) => {
  // Arrange
  await page.setContent(loginFormHtml);
  const email = `${seedUserId}@example.com`;

  // Act
  await loginPage.loginAs(email, 'wrong-password');

  // Assert
  await expect(loginPage.flashMessage).toHaveText('Invalid credentials');
});
```

## Checklista

- Czy test ma widoczne trzy części?
- Czy Act opisuje jedno zachowanie?
- Czy Assert sprawdza wynik, który ma znaczenie dla użytkownika lub systemu?
- Czy przygotowanie danych nie dominuje nad sensem testu?
