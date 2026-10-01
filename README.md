# Zaawansowana automatyzacja — Playwright + TypeScript

Starter warsztatowy dla osób znających podstawy Playwrighta. Uczestnik ćwiczy AAA (Arrange, Act, Assert), Page Object, SMURF (Small, Maintainable, Understandable, Repeatable, Fast), typowane fixtures i przygotowanie danych przez API.

## Aktualny stan startera

- `tests/patterns/login-aaa.spec.ts` i `login-smurf-before-each.spec.ts` to gotowe przykłady na HTML podstawionym przez `page.route`. Nie wymagają aplikacji demo.
- `src/pageobjects/WorkshopLoginPage.ts` jest szkieletem z TODO: locatory i metoda `loginAs` są zadaniem uczestnika.
- `fixtures/smurf/fixtures.ts` jest typowanym szkieletem z TODO dla `testUser` i `loginPage`. Niezrealizowane fixtures zgłaszają błąd TODO.
- `fixtures/loginPage/fixtures.ts` pokazuje kontekst API o zasięgu workera, identyfikator danych i tworzenie `WorkshopLoginPage`. Nie tworzy użytkownika przez API ani nie otwiera strony automatycznie.
- Testy i Page Objects TestArena zostały usunięte. Scenariusze API + UI należy napisać w ramach ćwiczeń.

**Ograniczenie:** `tests/patterns/login-page-object.spec.ts` nadal importuje usunięty `src/pageobjects/LoginPage.ts`. Pełne `npm test`, ostatni krok setupu i CI zgłoszą błąd importu do czasu dostosowania tego przykładu lub przeniesienia go poza katalog testów. Sama zamiana importu na `WorkshopLoginPage` nie wystarczy: lokalna aplikacja ma inne selektory i komunikaty niż podstawiony formularz.

## Struktura

```text
.
├─ README.md, README-SETUP.md, COMMANDS.md
├─ package.json, package-lock.json
├─ playwright.config.ts, tsconfig.json
├─ .env.sample
├─ setup.ps1, setup.sh
├─ .github/workflows/playwright.yml
├─ app/
│  ├─ README.md
│  └─ server.js
├─ docs/
│  ├─ AAA.md
│  ├─ PAGE_OBJECT.md
│  └─ SMURF.md
├─ exercises/
│  ├─ README.md
│  ├─ 01-aaa.md
│  ├─ 02-page-object.md
│  ├─ 03-smurf.md
│  └─ 04-fixtures-api.md
├─ fixtures/
│  ├─ loginPage/fixtures.ts
│  └─ smurf/
│     ├─ fixtures.ts
│     └─ loginForm.ts
├─ src/pageobjects/
│  ├─ basePage.ts
│  └─ WorkshopLoginPage.ts
└─ tests/patterns/
   ├─ login-aaa.spec.ts
   ├─ login-page-object.spec.ts
   └─ login-smurf-before-each.spec.ts
```

`fixtures/smurf/loginForm.ts` zawiera pomocniczy HTML. Szkielet fixtures nie korzysta z niego; ćwiczenie z `WorkshopLoginPage` dotyczy aplikacji w `app/`.

## Przygotowanie środowiska

Wymagane: Node.js LTS, npm, Git i edytor z obsługą TypeScript. Polecenia wykonuj z katalogu głównego projektu.

Pobierz projekt i przejdź do jego katalogu:

```bash
git clone https://github.com/chris-kolodziejczyk/next_level_automation.git
cd next_level_automation
```

1. Zainstaluj zależności: `npm ci`.
2. Utwórz `.env`: w PowerShell `Copy-Item .env.sample .env`, w Bash `cp .env.sample .env`. Zachowaj własną konfigurację, jeśli plik już istnieje.
3. Zainstaluj przeglądarki: `npm run install:browsers`.
4. Uruchom dostępne przykłady:

```bash
npx playwright test tests/patterns/login-aaa.spec.ts tests/patterns/login-smurf-before-each.spec.ts --project=chromium
```

### Skrypty setup

Windows PowerShell:

```powershell
.\setup.ps1
```

Linux/macOS lub Git Bash:

```bash
bash setup.sh
```

Skrypty tworzą `.env`, jeśli nie istnieje, wykonują `npm ci`, instalują przeglądarki i uruchamiają pełne `npm test`. Nie uruchamiają aplikacji demo. Ostatni krok ma obecnie ograniczenie opisane w sekcji „Aktualny stan startera”.

## Lokalna aplikacja

W osobnym terminalu uruchom:

```bash
npm run app
```

Formularz: `http://localhost:3000/login`. Playwright nie uruchamia serwera automatycznie — `webServer` jest zakomentowany.

| Zmienna w `.env` | Przeznaczenie |
|---|---|
| `BASE_URL` | Bazowy adres nawigacji Playwright, domyślnie `http://localhost:3000` |
| `LOGIN_URL` | Adres otwierany przez `WorkshopLoginPage` |
| `API_BASE_URL` | Bazowy adres kontekstu API |
| `TEST_USER_EMAIL`, `TEST_USER_PASSWORD` | Przykładowe dane do ćwiczeń; szkielety nie odczytują ich automatycznie |

Domyślny użytkownik: `workshop.user@example.com`, hasło `correct-password`. Dane są w pamięci i tracone po restarcie serwera.

API zapewnia health check, reset danych oraz tworzenie, listowanie, aktualizację i usuwanie użytkowników. Endpointy opisuje [app/README.md](app/README.md).

Przy `API_BASE_URL=http://localhost:3000/api` z `.env.sample` użycie ścieżki `/api/users` zachowuje prefiks API. Względne `users` przy takim bazowym URL bez końcowego ukośnika może wskazać `/users`; zachowaj spójność adresów w ćwiczeniu.

## Praca uczestnika

1. Przeczytaj przykład AAA i napisz własny test logowania do lokalnej aplikacji.
2. Uzupełnij locatory i akcję logowania w `WorkshopLoginPage.ts`. Asercję pozostaw w teście.
3. Uporządkuj scenariusze według SMURF i rozdziel niezależne zachowania.
4. Uzupełnij `fixtures/smurf/fixtures.ts`: przygotuj dane, przekaż je przez `await use(...)`, dodaj cleanup użytkowników tworzonych przez API.
5. Dodaj własne pliki `*.spec.ts` w `tests/` i uruchamiaj je po każdym etapie.

Przykładowo, po utworzeniu `tests/workshop/login.spec.ts` uruchom tylko swój plik:

```bash
npx playwright test tests/workshop/login.spec.ts --project=chromium
```

Ten plik należy utworzyć samodzielnie. Przy selekcji konkretnego pliku pozostały przykład z brakującym importem nie jest zbierany. Dla testów lokalnej aplikacji pozostaw działające `npm run app` w osobnym terminalu.

Materiały w [exercises/](exercises/README.md) zawierają jeszcze odwołania do dawnych `tests/example.spec.ts`, `LoginPage.ts`, `tests/smurf/example.spec.ts` i dodatkowych nieobecnych instrukcji. Aktualnym punktem startowym są szkielety i przykłady opisane powyżej.

## Testy, raporty i CI

Po dostosowaniu przykładu Page Object pełny zestaw uruchomisz przez `npm test`. Domyślnie testy działają na Chromium, Firefox i WebKit.

| Polecenie | Działanie |
|---|---|
| `npm test -- --project=chromium` | Pełny zestaw tylko na Chromium |
| `npm run test:headed` | Widoczne okna przeglądarek |
| `npm run test:ui` | Interaktywny tryb Playwright UI |
| `npm run test:debug` | Debugowanie |
| `npm run test:report` | Otwarcie raportu HTML |

Konfiguracja zapisuje trace każdego wykonania i screenshot przy błędzie. Lokalnie testy mogą działać równolegle; w CI używany jest jeden worker, dwie ponowne próby i blokada `test.only`.

GitHub Actions uruchamia testy na push i pull request do `main` lub `master`. Raport HTML jest przechowywany przez 30 dni. Pipeline nie uruchamia aplikacji demo — po dodaniu rzeczywistych testów UI/API trzeba zapewnić start serwera.

### TypeScript

`tsconfig.json` używa `strict: true`, `noEmit: true` oraz `NodeNext` dla modułów i ich rozwiązywania. Pliki projektu pozostają CommonJS zgodnie z `"type": "commonjs"` w `package.json`.

Projekt nie deklaruje obecnie zależności `typescript` ani skryptu kontroli typów. Uruchamianie testów przez Playwright nie zastępuje pełnej kontroli typów; taka kontrola nie jest też skonfigurowana w CI.

## Materiały

- [AAA](docs/AAA.md)
- [Page Object](docs/PAGE_OBJECT.md)
- [SMURF](docs/SMURF.md)
- [Przygotowanie środowiska](README-SETUP.md)
- [Polecenia](COMMANDS.md) — przykład z `tests/example.spec.ts` wymaga podmiany na istniejący test.
