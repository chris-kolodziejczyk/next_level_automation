# Ćwiczenie 07 - Testy samego API

## Cel

Sprawdzić zachowanie endpointów bez otwierania przeglądarki, rozdzielając sukces i błędy walidacji.

## Start

Przygotuj środowisko według [instrukcji](README.md#przygotowanie-do-rozszerzeń). Utwórz `tests/workshop/users-api.spec.ts` i używaj fixture `request` z `@playwright/test`. Żaden test nie potrzebuje `page`.

Docelowo wydziel wywołania HTTP do osobnej klasy, np. `ApiHelperPage`, a jej instancję dostarcz przez typowaną fixture zależną od `request`. Helper pełni rolę analogiczną do Page Object dla API; nie dziedziczy po `BasePage`.

## Przypadki

| Przypadek | Żądanie | Status | Oczekiwana odpowiedź |
|---|---|---|---|
| Utworzenie użytkownika | POST `/api/users`, pełne dane | `201` | `user` zawiera email, hasło i `active: true` |
| Brak emaila | POST `/api/users`, tylko hasło | `400` | `error: 'email and password are required'` |
| Brak hasła | POST `/api/users`, tylko email | `400` | `error: 'email and password are required'` |
| Aktualizacja nieistniejącego konta | PATCH `/api/users/<email>`, `{ active: false }` | `404` | `error: 'user not found'` |

## Zadania

1. Zapisz niezależny test tworzenia użytkownika. Oprócz statusu sprawdź JSON odpowiedzi; samo `response.ok()` nie odróżnia statusów `200` i `201`.
2. Wywołaj `GET /api/users` i sprawdź obecność utworzonego użytkownika. Nie porównuj całej listy z jedną stałą tablicą, bo inne testy mogą równolegle tworzyć konta.
3. Zapisz dwa przypadki niepełnych danych, opcjonalnie jako tabelę parametrów.
4. Zapisz test PATCH dla unikalnego adresu, dla którego konto nie zostało utworzone.
5. W teście sukcesu usuń użytkownika przez DELETE w cleanup i sprawdź status `204`. Nie próbuj parsować pustej odpowiedzi DELETE jako JSON.
6. Dopilnuj, aby każdy test przygotowywał własny stan i nie zależał od kolejności wykonania.
7. W `ApiHelperPage` dodaj metody `createUser`, `listUsers`, `updateUser`, `deleteUser`, przyjmując `APIRequestContext` w konstruktorze. Zwracaj `APIResponse`; status i JSON sprawdzaj w teście, a cleanup w teardown fixture. Zachowaj `//Arrange`, `//Act`, `//Assert` i wskaż pięć zasad SMURF.

## Weryfikacja

```bash
npx playwright test tests/workshop/users-api.spec.ts --project=chromium
```

Projekt `chromium` wybiera konfigurację uruchomienia; fixture `request` nie wymaga otwierania przeglądarki.

## Kryteria ukończenia

- Wszystkie cztery przypadki mają osobne wyniki w raporcie.
- Asercje sprawdzają konkretny status i zawartość odpowiedzi.
- Nie ma interakcji UI ani zależności między testami.
- Utworzone konto jest usuwane także po błędzie asercji.

Dokumentacja: [testy API w Playwright](https://playwright.dev/docs/api-testing).
