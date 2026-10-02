# Przygotowanie środowiska

Ten plik prowadzi przez minimalne przygotowanie środowiska do warsztatu Playwright + TypeScript.

## Wymagania

- Node.js zgodny z zależnościami: ESLint 10 wymaga `^20.19.0`, `^22.13.0` lub `>=24`, a Playwright `>=20`
- npm
- Git
- Dostęp do terminala PowerShell, Bash albo terminala wbudowanego w edytor

## Instalacja krok po kroku

Polecenia wykonuj z głównego katalogu sklonowanego repozytorium. `npm ci` używa dostarczonego `package-lock.json`.

1. Zainstaluj zależności projektu.

   ```bash
   npm ci
   ```

2. Utwórz lokalny plik konfiguracyjny.

   Windows PowerShell:

   ```powershell
   if (-not (Test-Path -LiteralPath .env)) { Copy-Item -LiteralPath .env.sample -Destination .env }
   ```

   Linux / macOS:

   ```bash
   if [ ! -f .env ]; then cp .env.sample .env; fi
   ```

3. Zainstaluj przeglądarki Playwright.

   ```bash
   npm run install:browsers
   ```

4. Uruchom testy.

   ```bash
   npm test
   ```

   To uruchamia wszystkie dostępne testy na Chromium, Firefox i WebKit. Same przykłady startera na jednej przeglądarce uruchomisz przez:

   ```bash
   npx playwright test tests/patterns --project=chromium
   ```

   Konfiguracja Playwright automatycznie uruchamia lokalną aplikację albo korzysta z już działającego serwera; nie trzeba wcześniej wywoływać `npm run app`.

5. Otwórz raport HTML po wykonaniu testów.

   ```bash
   npm run test:report
   ```

## Konfiguracja `.env`

Plik `.env.sample` zawiera przykładowe wartości:

- `BASE_URL` - adres aplikacji testowanej przez UI.
- `LOGIN_URL` - adres formularza otwierany przez `WorkshopLoginPage`.
- `API_BASE_URL` - adres worker-scoped kontekstu `api` z `fixtures/loginPage/fixtures.ts`.
- `TEST_USER_EMAIL` i `TEST_USER_PASSWORD` - przykładowe dane; szkielety fixtures nie odczytują ich automatycznie.

Przykłady z `tests/patterns` podstawiają HTML przez `page.route`. Ćwiczenia dotyczące lokalnej aplikacji korzystają z prawdziwego formularza i API. Wspólne `webServer` uruchamia serwer także podczas wykonania przykładów z podstawionym HTML.

Domyślne adresy to `http://localhost:3000`, `http://localhost:3000/login` oraz `http://localhost:3000/api`. Przy zmianie lokalnego portu zaktualizuj wszystkie trzy wartości. Wbudowana fixture `request` korzysta z `BASE_URL`; `API_BASE_URL` dotyczy osobno tworzonego kontekstu `api`.

Ręczne `npm run app` odczytuje `PORT` z otoczenia procesu i nie ładuje `.env`. Konfiguracja Playwright wczytuje `.env` i przekazuje port wynikający z `BASE_URL` do serwera. Dla innego środowiska testowego dostosuj również `webServer`.

`WorkshopLoginPage` i `fixtures/smurf/fixtures.ts` zawierają TODO do ćwiczeń. Gotowe przykłady startera nie używają tych nieuzupełnionych fixtures. Pliki w `tests/workshop` tworzysz w trakcie warsztatu.

Opcjonalny katalog `docs/rozwiazania` jest pomijany przez Git i nie jest pobierany przy klonowaniu. Jeśli prowadzący udostępni go lokalnie, główna konfiguracja obejmie również te testy.

## Szybkie skrypty setupu

Możesz użyć skryptów pomocniczych:

- Windows: `.\setup.ps1`
- Linux / macOS lub Git Bash: `bash setup.sh`

Skrypty tworzą `.env` tylko wtedy, gdy go nie ma, następnie uruchamiają `npm ci`, instalację przeglądarek i `npm test`. Istniejący `.env` zostaje zachowany.

## Kontrola kodu

```bash
npx tsc --noEmit
npm run lint:tests
npx eslint utils --max-warnings=0
```

Skrypty `lint:src` i `lint:fixtures` obejmują szkielety z TODO; przed ich uzupełnieniem zgłaszają nieużywane argumenty. Listę poleceń zawiera [COMMANDS.md](COMMANDS.md).
