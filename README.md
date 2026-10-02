# Zaawansowana automatyzacja — Playwright + TypeScript

Starter warsztatowy dla osób znających podstawy Playwrighta. Uczestnik ćwiczy AAA (Arrange, Act, Assert), Page Object, SMURF (Small, Maintainable, Understandable, Repeatable, Fast), typowane fixtures i przygotowanie danych przez API.

## Aktualny stan startera

- `tests/patterns/login-aaa.spec.ts`, `login-page-object.spec.ts` i `login-smurf-before-each.spec.ts` to gotowe przykłady na HTML podstawionym przez `page.route`. `LoginPage.ts` obsługuje formularz z przykładu Page Object.
- `src/pageobjects/WorkshopLoginPage.ts` jest szkieletem z TODO: locatory i metoda `loginAs` są zadaniem uczestnika.
- `fixtures/smurf/fixtures.ts` jest typowanym szkieletem z TODO dla `testUser` i `loginPage`. Niezrealizowane fixtures zgłaszają błąd TODO.
- `fixtures/loginPage/fixtures.ts` pokazuje kontekst API o zasięgu workera, identyfikator danych i tworzenie `WorkshopLoginPage`. Nie tworzy użytkownika przez API ani nie otwiera strony automatycznie.
- Testy i Page Objects TestArena zostały usunięte. Scenariusze API + UI należy napisać w ramach ćwiczeń.

Opcjonalne rozwiązania prowadzącego znajdują się lokalnie w `docs/rozwiazania/zadanie1`–`zadanie10`; ich instrukcję zawiera `docs/rozwiazania/README.md`. Ten katalog jest pomijany przez Git i nie pojawi się po klonowaniu repozytorium. Jeśli jest dostępny, główne konfiguracje Playwright, TypeScript i ESLint obejmują także jego pliki, a `npm test` uruchamia również rozwiązania.

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
│  ├─ SMURF.md
│  └─ rozwiazania/                 # opcjonalnie, lokalnie; ignorowane przez Git
│     ├─ README.md
│     └─ zadanie1/ … zadanie10/
├─ exercises/
│  ├─ README.md
│  ├─ 01-aaa.md
│  ├─ 02-page-object.md
│  ├─ 03-smurf.md
│  ├─ 04-fixtures-api.md
│  ├─ 05-parametryzacja-testow.md
│  ├─ 06-zmiana-stanu-api.md
│  ├─ 07-testy-api.md
│  ├─ 08-diagnozowanie-bledu.md
│  ├─ 09-refaktoryzacja-generatora.md
│  └─ 10-porownanie-refaktoryzacji.md
├─ fixtures/
│  ├─ loginPage/fixtures.ts
│  └─ smurf/
│     ├─ fixtures.ts
│     └─ loginForm.ts
├─ src/pageobjects/
│  ├─ basePage.ts
│  ├─ LoginPage.ts
│  └─ WorkshopLoginPage.ts
├─ utils/generators/
│  └─ dataGenerator.ts
└─ tests/patterns/
   ├─ login-aaa.spec.ts
   ├─ login-page-object.spec.ts
   └─ login-smurf-before-each.spec.ts
```

`fixtures/smurf/loginForm.ts` zawiera pomocniczy HTML. Szkielet fixtures nie korzysta z niego; ćwiczenie z `WorkshopLoginPage` dotyczy aplikacji w `app/`.

## Przygotowanie środowiska

Wymagane: Node.js zgodny z zależnościami, npm, Git i edytor z obsługą TypeScript. ESLint 10 wymaga Node.js `^20.19.0`, `^22.13.0` lub `>=24`; Playwright wymaga `>=20`. Polecenia wykonuj z katalogu głównego projektu. Dokładne wersje zależności utrwala `package-lock.json`.

Pobierz projekt i przejdź do jego katalogu:

```bash
git clone https://github.com/chris-kolodziejczyk/next_level_automation.git
cd next_level_automation
```

1. Zainstaluj zależności: `npm ci`.
2. Utwórz `.env`, jeśli go nie ma. Polecenia, które zachowują istniejący plik, są w [instrukcji setupu](README-SETUP.md#instalacja-krok-po-kroku).
3. Zainstaluj przeglądarki: `npm run install:browsers`.
4. Uruchom dostępne przykłady:

```bash
npx playwright test tests/patterns --project=chromium
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

Skrypty tworzą `.env`, jeśli nie istnieje, wykonują `npm ci`, instalują przeglądarki i uruchamiają pełne `npm test`. Konfiguracja Playwright uruchamia aplikację demo automatycznie.

## Lokalna aplikacja

Playwright uruchamia aplikację automatycznie przed testami. Aby otworzyć ją ręcznie, uruchom w osobnym terminalu:

```bash
npm run app
```

Formularz: `http://localhost:3000/login`. `webServer` sprawdza `/api/health`; lokalnie korzysta z już działającego serwera albo uruchamia własny. Port serwera uruchamianego przez Playwright wynika z `BASE_URL`, domyślnie `3000`. Ręczne `npm run app` korzysta z `PORT` i nie wczytuje `.env`; przykłady zmiany portu są w [dokumentacji aplikacji](app/README.md#start).

| Zmienna w `.env` | Przeznaczenie |
|---|---|
| `BASE_URL` | Bazowy adres nawigacji oraz wbudowanej fixture `request`; również adres health checku `webServer` |
| `LOGIN_URL` | Adres otwierany przez `WorkshopLoginPage`, domyślnie `http://localhost:3000/login`; ustawienie jest niezależne od `BASE_URL` |
| `API_BASE_URL` | Bazowy adres worker-scoped kontekstu `api` w `fixtures/loginPage/fixtures.ts`; wbudowana fixture `request` korzysta z `BASE_URL` |
| `TEST_USER_EMAIL`, `TEST_USER_PASSWORD` | Przykładowe dane do ćwiczeń; szkielety nie odczytują ich automatycznie |

Domyślny użytkownik: `workshop.user@example.com`, hasło `correct-password`. Dane są w pamięci i tracone po restarcie serwera.

API zapewnia health check, reset danych oraz tworzenie, listowanie, aktualizację i usuwanie użytkowników. Endpointy opisuje [app/README.md](app/README.md).

Przy `API_BASE_URL=http://localhost:3000/api` z `.env.sample` użycie ścieżki `/api/users` zachowuje prefiks API. Względne `users` przy takim bazowym URL bez końcowego ukośnika może wskazać `/users`; zachowaj spójność adresów w ćwiczeniu.

Przy zmianie lokalnego portu ustaw spójnie `BASE_URL`, `LOGIN_URL` i `API_BASE_URL`, np. adresy z portem `3001`. Konfiguracja `webServer` jest przygotowana dla lokalnej aplikacji HTTP. Praca z innym środowiskiem wymaga również dostosowania tego ustawienia.

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

Ten plik należy utworzyć samodzielnie. Wybór konkretnego pliku uruchamia wyłącznie jego testy; konfiguracja zapewnia start lokalnej aplikacji.

Materiały w [exercises/](exercises/README.md) wskazują istniejące przykłady i szkielety. Pliki w `tests/workshop`, wymienione w ćwiczeniach, tworzy uczestnik; nie są gotowymi testami startera.

### Rozszerzenia warsztatu

Ćwiczenia 05–10 w [indeksie ćwiczeń](exercises/README.md) obejmują parametryzację logowania, blokadę konta przez API, testy samego API, diagnozowanie błędu w raporcie i trace, generator danych oraz porównanie AAA, Page Object i fixtures. Każde zawiera zadania, polecenie uruchomienia i kryteria ukończenia. Pliki testowe tworzy uczestnik.

Generator został wydzielony z `BasePage` do klasy `DataGenerator` w `utils/generators/dataGenerator.ts`. Metoda `randomString(len: number = 10, type: string = 'letters'): string` ma jawny typ wyniku i zachowuje dotychczasowe tryby generowania. Katalog `utils` jest objęty konfiguracją TypeScript i ESLint; lintowanie generatora uruchomisz przez `npx eslint utils --max-warnings=0`.

## Testy, raporty i CI

Wszystkie dostępne testy uruchomisz przez `npm test`. Domyślnie działają na Chromium, Firefox i WebKit. Konfiguracja zbiera `*.spec.ts` i `*.test.ts` z `tests` oraz, jeśli lokalny katalog istnieje, `*Test.ts` z `docs/rozwiazania`. Przykłady z `tests/patterns` podstawiają HTML formularza; mimo tego wspólna konfiguracja uruchamia serwer demo przed testami.

| Polecenie | Działanie |
|---|---|
| `npm test -- --project=chromium` | Pełny zestaw tylko na Chromium |
| `npx playwright test tests/patterns --project=chromium` | Przykłady dostarczone w repozytorium |
| `npx playwright test "docs/rozwiazania" --project=chromium` | Tylko rozwiązania zadań |
| `npx playwright test zadanie5/ --project=chromium` | Tylko rozwiązanie zadania 5 |
| `npm run test:headed` | Widoczne okna przeglądarek |
| `npm run test:ui` | Interaktywny tryb Playwright UI |
| `npm run test:debug` | Debugowanie |
| `npm run test:report` | Otwarcie raportu HTML |

Konfiguracja zapisuje trace każdego wykonania i screenshot przy błędzie. Lokalnie testy mogą działać równolegle; w CI używany jest jeden worker, dwie ponowne próby i blokada `test.only`.

GitHub Actions uruchamia testy na push i pull request do `main` lub `master`. Raport HTML jest przechowywany przez 30 dni. Konfiguracja Playwright zapewnia start aplikacji demo również w CI.

Pipeline instaluje zależności i przeglądarki oraz uruchamia testy. Nie uruchamia ESLint ani kontroli typów. Lokalny katalog rozwiązań nie trafia do checkoutu CI.

### TypeScript

`tsconfig.json` używa `strict: true`, `noEmit: true` oraz `NodeNext` dla modułów i ich rozwiązywania. Pliki projektu pozostają CommonJS zgodnie z `"type": "commonjs"` w `package.json`.

Projekt deklaruje zależność `typescript`; kontrolę typów całego projektu, także `docs/rozwiazania`, możesz uruchomić przez `npx tsc --noEmit`. Nie ma osobnego skryptu kontroli typów ani takiego kroku w CI. Uruchamianie testów przez Playwright nie zastępuje pełnej kontroli typów. Wspólna konfiguracja ESLint obejmuje rozwiązania; sprawdzisz je przez `npx eslint "docs/rozwiazania" --max-warnings=0`.

`npm run lint:tests` sprawdza dostarczone testy, a `npx eslint utils --max-warnings=0` generator. `lint:src` i `lint:fixtures` w nieuzupełnionym starterze zgłaszają nieużywane argumenty w miejscach TODO; uruchom je ponownie po implementacji ćwiczeń 2 i 4.

## Materiały

- [AAA](docs/AAA.md)
- [Page Object](docs/PAGE_OBJECT.md)
- [SMURF](docs/SMURF.md)
- [Przygotowanie środowiska](README-SETUP.md)
- [Polecenia](COMMANDS.md)

Jeśli masz lokalny katalog prowadzącego, dodatkową instrukcję znajdziesz w `docs/rozwiazania/README.md`.
