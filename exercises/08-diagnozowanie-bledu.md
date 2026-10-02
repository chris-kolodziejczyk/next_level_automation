# Ćwiczenie 08 - Diagnozowanie błędu

## Cel

Rozróżnić błąd selektora od błędnego oczekiwania, korzystając z raportu HTML i trace.

## Start

Przygotuj środowisko według [instrukcji](README.md#przygotowanie-do-rozszerzeń). Utwórz `tests/workshop/login-debug.spec.ts` z działającym testem logowania nieznanego użytkownika. Użyj unikalnego, nieutworzonego emaila i oczekuj `Nieprawidłowy login lub hasło.` w `login-error`.

## Zadania

1. Uruchom test i upewnij się, że przechodzi.
2. Celowo zmień tylko selektor komunikatu z `getByTestId('login-error')` na `getByTestId('flash-message')`.
3. Uruchom wyłącznie ten plik:

   ```bash
   npx playwright test tests/workshop/login-debug.spec.ts --project=chromium --trace=on
   ```

4. Otwórz raport przez `npm run test:report`. Wybierz nieudany test i sprawdź lokalizację błędu, log oczekiwania oraz screenshot.
5. Otwórz trace dostępny przy teście w raporcie. Sprawdź snapshot DOM po kliknięciu `Sign in`, rzeczywisty `data-testid`, treść komunikatu i odpowiedź POST `/login` w zakładce Network.
6. Zapisz przyczynę w krótkiej notatce: który element był szukany, jaki istnieje w DOM i dlaczego oczekiwanie nie mogło się spełnić. Napraw selektor i uruchom test ponownie.
7. Teraz zmień wyłącznie oczekiwany tekst na `Invalid credentials`. Powtórz diagnozę i wyjaśnij różnicę między brakiem elementu a niezgodną treścią. Przywróć poprawny tekst.

Konfiguracja projektu zapisuje trace każdego wykonania. Możesz też znaleźć `trace.zip` w podkatalogu `test-results` i otworzyć konkretny plik przez `npx playwright show-trace <ścieżka-do-trace.zip>`.

## Kryteria ukończenia

- Uczestnik wskazuje przyczynę na podstawie DOM i logu, bez zgadywania.
- Potrafi rozróżnić dwa celowo wprowadzone błędy.
- Nie dodaje `waitForTimeout` ani większego timeoutu jako sposobu naprawy.
- Końcowy test przechodzi; celowa usterka zostaje usunięta.

Dokumentacja: [Trace Viewer](https://playwright.dev/docs/trace-viewer).
