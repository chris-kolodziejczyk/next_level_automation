# Przydatne polecenia

Ten plik zbiera komendy używane podczas warsztatu. Uruchamiaj je z katalogu głównego projektu.

## Instalacja

```bash
npm ci
```

```bash
npm run install:browsers
```

## Testy

Playwright uruchamia aplikację automatycznie. Polecenie `npm run app` jest potrzebne, jeśli chcesz osobno otworzyć formularz lub uruchomić nagrywanie kroków.

Gotowe rozwiązania przeniesione do `tests/workshop` uruchomisz bez nieuzupełnionych materiałów `patterns`:

```bash
npm test -- tests/workshop
npm test -- tests/workshop/zadanie1Test.ts --project=chromium
```

Lokalne pełne `npm test` obejmuje też `patterns` i opcjonalne `docs/rozwiazania`. GitHub Actions ustawia `CI=true`, które wyklucza te dwa katalogi. Kolejne pliki `*Test.ts`, `*.spec.ts` i `*.test.ts` w `tests`, również w podfolderach, są wykrywane automatycznie.

```bash
npm test
```

```bash
npm run test:headed
```

```bash
npm run test:ui
```

```bash
npm run test:debug
```

```bash
npx playwright test tests/patterns/login-aaa.spec.ts --project=chromium
```

```bash
npx playwright test --grep "login"
```

Filtr `--grep` wybiera nazwy testów, a argument ścieżki wybiera pliki. Plik wskazany w ćwiczeniu, np. `tests/workshop/locked-user.spec.ts`, musi najpierw zostać utworzony przez uczestnika.

```bash
# Wszystkie przykłady dostarczone w repozytorium.
npx playwright test tests/patterns --project=chromium

# Powtórne wykonanie przykładów w celu sprawdzenia powtarzalności.
npx playwright test tests/patterns --project=chromium --repeat-each=2
```

Jeśli masz lokalny, ignorowany przez Git katalog `docs/rozwiazania`, korzystasz z tej samej konfiguracji:

```bash
npx playwright test docs/rozwiazania --project=chromium
npx playwright test zadanie5/ --project=chromium
```

## Typy i lintowanie

```bash
npx tsc --noEmit
npm run lint:tests
npx eslint utils --max-warnings=0
```

Kontrola TypeScript pomija nieuzupełnione przykłady w `tests/patterns`. Przeniesione testy i ich części możesz lintować przez `npx eslint tests/workshop --max-warnings=0`; pliki `*Fixture.ts` mają te same reguły fixtures co lokalne rozwiązania.

Po uzupełnieniu TODO w Page Object i fixtures sprawdź również:

```bash
npm run lint:src
npm run lint:fixtures
```

W nieuzupełnionym starterze te dwa skrypty zgłaszają nieużywane argumenty w szkieletach. Jeśli masz lokalne rozwiązania, sprawdzisz je przez `npx eslint docs/rozwiazania --max-warnings=0`.

## Raporty i diagnostyka

```bash
npm run test:report
```

```bash
# Zastąp przykład rzeczywistą ścieżką do pliku trace.zip.
npx playwright show-trace "test-results/nazwa-wykonania/trace.zip"
```

```bash
npx playwright test tests/patterns/login-aaa.spec.ts --project=chromium --trace=on
```

`playwright.config.ts` już zapisuje trace każdego wykonania (`trace: 'on'`) oraz screenshot po błędzie. Raport HTML jest w `playwright-report`, a wyniki poszczególnych wykonań w `test-results`. `npm run test:report` otwiera raport ostatniego uruchomienia.

## Generowanie selektorów i nagrywanie kroków

```bash
# Uruchom aplikację w osobnym terminalu i pozostaw ją działającą.
npm run app
```

```bash
npx playwright codegen http://localhost:3000/login
```

`codegen` nie uruchamia `webServer` z konfiguracji testów. Ręczny start na innym porcie opisuje [app/README.md](app/README.md#start).

## Git i praca warsztatowa

```bash
git status
```

```bash
git checkout -b workshop/my-solution
```

```bash
git add .
git commit -m "Add workshop exercise solution"
```

`git add .` pomija `.env`, raporty, `node_modules` i `docs/rozwiazania` zgodnie z `.gitignore`. Rozwiązania uczestnika zapisuj w `tests/workshop` i w pozostałych katalogach wskazanych w ćwiczeniach.

Aby uruchamiać kolejne rozwiązanie w CI, przenieś komplet plików zadania do `tests/workshop` albo jego podfolderu i dodaj je do commita. Zachowaj importy względne między plikami zadania. Wspólny `BasePage` jest importowany przez alias `@pageobjects/basePage`, więc głębokość katalogu nie wymaga zmian. Jeśli Page Object, fixture lub helper umieszczasz w osobnych katalogach projektu, dostosuj ich importy przy użyciu `@pageobjects/*`, `@fixtures/*` i `@utils/*`. Szczegóły zawiera [instrukcja przenoszenia](README.md#przenoszenie-kolejnych-rozwiązań-do-ci).
