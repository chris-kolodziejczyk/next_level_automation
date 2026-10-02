# Ćwiczenie 04 - Fixtures i API

## Cel

Zrozumieć, jak typowane fixtures pomagają przygotować dane i współdzielić kosztowne zasoby między testami.

## Start

Otwórz `fixtures/loginPage/fixtures.ts` i uzupełniony w ćwiczeniu 02 `WorkshopLoginPage`. Utwórz `tests/workshop/login-fixtures.spec.ts` dla udanego logowania do lokalnej aplikacji.

Obecna fixture `api` tworzy worker-scoped kontekst HTTP; `seedUserId` zwraca identyfikator, a `loginPage` tylko konstruuje Page Object. Starter nie tworzy konta ani nie otwiera formularza automatycznie.

## Zadania

1. Przejrzyj fixture `api` i sprawdź, dlaczego ma zasięg workera.
2. Przejrzyj fixture `seedUserId`: identyfikator zawiera indeks workera, retry i skróconą nazwę testu. Nie jest kontem w aplikacji i sam nie gwarantuje unikalności między osobnymi uruchomieniami.
3. Rozszerz typ `TestFixtures` o test-scoped `testUser` z `email` i `password`. Połącz `seedUserId` z identyfikatorem wykonania, np. UUID, a hasło ustaw na `correct-password`.
4. W `testUser` utwórz aktywne konto przez `api.post('/api/users', ...)`, sprawdź status `201` i przekaż dane przez `await use(user)`. W `finally` usuń własne konto przez `/api/users/${encodeURIComponent(email)}` i sprawdź `204`, również po błędzie setupu lub testu.
5. W Arrange otwórz `loginPage` albo przenieś `open` do przygotowania tej fixture. W Act użyj `loginAs`, a w Assert sprawdź `Dashboard` i `welcome-message` o treści `Welcome ${email}`. Zachowaj oznaczenia AAA i wskaż pięć zasad SMURF.
6. Uzupełnij też osobny szkielet `fixtures/smurf/fixtures.ts`, potrzebny w ćwiczeniu 10: `testUser` przygotowuje konto i cleanup, a `loginPage` konstruuje Page Object i otwiera formularz. W fixture konta dodaj zależność od `request` zamiast pustego `{}`.

## Weryfikacja

Po uzupełnieniu kodu zaimportuj `test` i `expect` z `fixtures/loginPage/fixtures.ts` w swoim teście, zamiast bazowego `test`:

```bash
npx playwright test tests/workshop/login-fixtures.spec.ts --project=chromium
npx tsc --noEmit
```

## Kryteria ukończenia

- Fixture ma jawny typ.
- Test nie tworzy danych przez przypadkowe wartości globalne.
- Zakres fixture jest dobrany do kosztu i izolacji danych.
- Kontekst HTTP jest worker-scoped, ale konto należy do jednego testu i jest sprzątane w teardown.
- `npm test` przechodzi lokalnie.
