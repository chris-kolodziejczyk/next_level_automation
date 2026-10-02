# Ćwiczenie 02 - Page Object

## Cel

Wydzielić interakcje z formularzem logowania do Page Object tak, żeby test nadal jasno opisywał scenariusz.

## Start

Porównaj gotowe `src/pageobjects/LoginPage.ts` i `tests/patterns/login-page-object.spec.ts`:

```bash
npx playwright test tests/patterns/login-page-object.spec.ts --project=chromium
```

Właściwym szkieletem do ćwiczenia jest `src/pageobjects/WorkshopLoginPage.ts`. Utwórz `tests/workshop/login-page-object.spec.ts` dla lokalnej aplikacji; Playwright uruchomi ją automatycznie. Formularz i komunikaty opisuje [app/README.md](../app/README.md).

## Zadania

1. W `WorkshopLoginPage` dodaj jawnie typowane locatory `emailInput`, `passwordInput`, `submitButton` i `errorMessage`. Użyj labeli `Email`, `Password`, przycisku `Sign in` oraz `data-testid="login-error"`.
2. Zaimplementuj `loginAs(email, password)`: wypełnij pola i kliknij przycisk. Nawigację wykonuje odziedziczone `open`.
3. W Arrange utwórz Page Object i otwórz stronę. Przygotuj unikalny, nieutworzony email. W Act wywołaj `loginAs(email, 'correct-password')`.
4. W Assert sprawdź `errorMessage` i dokładny tekst `Nieprawidłowy login lub hasło.`. Oznacz sekcje `//Arrange`, `//Act`, `//Assert`.
5. Testuj rzeczywisty serwer, bez `page.route` i bez `page.setContent`. Gotowy `LoginPage` obsługuje inny formularz z `flash-message`; nie jest szkieletem tego ćwiczenia.

## Weryfikacja

Po utworzeniu testu i uzupełnieniu Page Object:

```bash
npx playwright test tests/workshop/login-page-object.spec.ts --project=chromium
```

## Kryteria ukończenia

- W teście nie ma powtórzonych selektorów formularza logowania.
- Page Object nie ukrywa całego scenariusza w jednej metodzie.
- Nazwy metod opisują zachowanie użytkownika.
- `npm test` przechodzi lokalnie.
