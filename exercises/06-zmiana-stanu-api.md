# Ćwiczenie 06 - Zmiana stanu przez API

## Cel

Przygotować konto przez API, zmienić jego stan i sprawdzić efekt widoczny w UI.

## Start

Przygotuj środowisko według [instrukcji](README.md#przygotowanie-do-rozszerzeń). Utwórz `tests/workshop/locked-user.spec.ts`.

## Zadania

1. Utwórz unikalnego użytkownika przez `POST /api/users` z `email`, `password` oraz `active: true`. Sprawdź status `201` i pole `user.active` w odpowiedzi.
2. W Arrange zablokuj go przez `PATCH /api/users/${encodeURIComponent(email)}` z danymi `{ active: false }`. Sprawdź status `200` i `user.active === false`.
3. W Act otwórz formularz i spróbuj zalogować się poprawnym emailem oraz hasłem tego użytkownika. Możesz użyć uzupełnionego `WorkshopLoginPage`.
4. W Assert sprawdź dokładny komunikat `Konto użytkownika jest zablokowane.` w `getByTestId('login-error')` oraz brak widocznego nagłówka `Dashboard`.
5. Usuń użytkownika przez DELETE i sprawdź status `204`. Zapewnij cleanup także wtedy, gdy PATCH albo asercja UI zgłosi błąd.

Przy API korzystaj z fixture `request` lub kontekstu `api` z `fixtures/loginPage/fixtures.ts`. W drugim przypadku zaimportuj rozszerzony `test` z tego pliku.

## Weryfikacja

```bash
npx playwright test tests/workshop/locked-user.spec.ts --project=chromium
```

## Kryteria ukończenia

- Konto powstaje jako aktywne i zostaje zablokowane osobnym wywołaniem PATCH.
- Hasło użyte w UI jest poprawne, więc test sprawdza blokadę konta.
- Arrange korzysta z API, Act i Assert z UI.
- Test nie modyfikuje domyślnego użytkownika ani danych innych testów.

## Rozszerzenie

W osobnym teście odblokuj konto przez `{ active: true }` i sprawdź udane logowanie: nagłówek `Dashboard` i `welcome-message` o treści `Welcome ${email}`. Nowy test ma samodzielnie przygotować swoje konto.

Dokumentacja: [przygotowanie stanu przez API](https://playwright.dev/docs/api-testing).
