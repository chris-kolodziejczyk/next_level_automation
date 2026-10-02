# Ćwiczenie 05 - Parametryzacja testów

## Cel

Ograniczyć duplikację kroków logowania, zachowując osobny test i czytelną nazwę dla każdego przypadku.

## Start

Przygotuj środowisko według [instrukcji](README.md#przygotowanie-do-rozszerzeń). Utwórz `tests/workshop/login-parameterized.spec.ts`. Jako przykład struktury AAA wykorzystaj `tests/patterns/login-aaa.spec.ts`, ale testuj lokalną aplikację bez mockowania formularza.

## Przypadki

| Nazwa | Stan użytkownika | Email | Hasło | Oczekiwany komunikat |
|---|---|---|---|---|
| Nieznany użytkownik | Konto nie istnieje | Unikalny, nieutworzony adres | `correct-password` | `Nieprawidłowy login lub hasło.` |
| Puste hasło | Aktywne konto utworzone przez API | Adres utworzonego konta | Pusty string | `Nieprawidłowy login lub hasło.` |
| Błędne hasło | Aktywne konto utworzone przez API | Adres utworzonego konta | `wrong-password` | `Nieprawidłowy login lub hasło.` |

## Zadania

1. Zadeklaruj typ przypadku z nazwą, informacją o potrzebie utworzenia konta, hasłem do logowania i oczekiwanym komunikatem. Zbuduj tablicę trzech przypadków.
2. Pętlą `for...of` zadeklaruj trzy osobne wywołania `test(...)`. Pętla ma tworzyć testy podczas zbierania pliku, a nie wykonywać wszystkie przypadki wewnątrz jednego testu.
3. W Arrange przygotuj unikalny email dla bieżącego testu. Dla istniejących kont wywołaj `POST /api/users` z hasłem `correct-password` i sprawdź status `201`.
4. Otwórz `/login` przez uzupełniony `WorkshopLoginPage`. Jego `loginAs` wypełnia pola przez `getByLabel('Email')` i `getByLabel('Password')`, następnie klika `Sign in`.
5. Sprawdź komunikat przez locator `errorMessage` wskazujący `getByTestId('login-error')`. Wspólna asercja w teście ma odczytywać oczekiwanie z tabeli.
6. Dodaj cleanup kont utworzonych przez test, np. przez `try/finally` lub fixture. Dla nieznanego użytkownika nie twórz konta.
7. W końcowej wersji przenieś przygotowanie i cleanup kont do typowanej fixture z opcją utworzenia konta. Zachowaj `//Arrange`, `//Act`, `//Assert` i wskaż wszystkie pięć zasad SMURF.

## Weryfikacja

```bash
npx playwright test tests/workshop/login-parameterized.spec.ts --project=chromium
```

## Kryteria ukończenia

- Raport pokazuje trzy osobne testy z nazwami opisującymi przypadki.
- Kroki logowania i asercja są zapisane tylko raz.
- Test pustego i błędnego hasła korzysta z istniejącego aktywnego konta.
- Wszystkie przypadki przechodzą także przy powtórnym uruchomieniu.

Dokumentacja: [parametryzacja testów Playwright](https://playwright.dev/docs/test-parameterize).
