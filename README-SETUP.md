# Przygotowanie środowiska

Ten plik prowadzi przez minimalne przygotowanie środowiska do warsztatu Playwright + TypeScript.

## Wymagania

- Node.js LTS
- npm
- Git
- Dostęp do terminala PowerShell, Bash albo terminala wbudowanego w edytor

## Instalacja krok po kroku

1. Zainstaluj zależności projektu.

   ```bash
   npm ci
   ```

2. Utwórz lokalny plik konfiguracyjny.

   Windows PowerShell:

   ```powershell
   Copy-Item .env.sample .env
   ```

   Linux / macOS:

   ```bash
   cp .env.sample .env
   ```

3. Zainstaluj przeglądarki Playwright.

   ```bash
   npm run install:browsers
   ```

4. Uruchom testy.

   ```bash
   npm test
   ```

5. Otwórz raport HTML po wykonaniu testów.

   ```bash
   npm run test:report
   ```

## Konfiguracja `.env`

Plik `.env.sample` zawiera przykładowe wartości:

- `BASE_URL` - adres aplikacji testowanej przez UI.
- `API_BASE_URL` - adres API używanego do seedowania i cleanupu.
- `TEST_USER_EMAIL` - przykładowy użytkownik do scenariuszy logowania.
- `TEST_USER_PASSWORD` - przykładowe hasło do scenariuszy logowania.

W starterze testy nie wymagają realnej aplikacji, bo przykładowy scenariusz używa statycznego HTML. Podczas warsztatu wartości z `.env` można podmienić na adresy środowiska ćwiczeniowego.

## Szybkie skrypty setupu

Możesz użyć skryptów pomocniczych:

- Windows: `.\setup.ps1`
- Linux / macOS: `./setup.sh`

Skrypty kopiują `.env.sample` do `.env`, instalują zależności, instalują przeglądarki Playwright i uruchamiają testy.
