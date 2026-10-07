# SonarCloud w projekcie automatyzacji testów

SonarCloud (obecnie SonarQube Cloud) pozwala sprawdzać jakość i bezpieczeństwo kodu automatyzacji w pipeline. W tym repozytorium przykład dotyczy TypeScriptu, Playwrighta i GitHub Actions. Analizujemy wspólny kod: Page Objects, fixtures, generatory oraz lokalną aplikację demo. Scenariusze testowe pomijamy.

Dokument zawiera konfigurację do wdrożenia; opisane pliki konfiguracyjne i workflow należy utworzyć osobno w podanych lokalizacjach.

## Założenia i zakres

| Obszar repozytorium | Analiza statyczna | Coverage w wariancie bez unit testów | Coverage w wariancie z unit testami |
|---|---|---|---|
| `src/pageobjects/` | Tak | Pomijane | Pomijane w tym przykładzie |
| `fixtures/` | Tak | Pomijane | Pomijane w tym przykładzie |
| `utils/`, np. `DataGenerator` | Tak | Pomijane | Mierzone |
| `app/` — aplikacja demo | Tak | Pomijane | Pomijane w tym przykładzie |
| `tests/`, również Page Objects i fixtures umieszczone wewnątrz tego katalogu | Pomijana | Pomijane | Pomijane |
| `docs/`, `exercises/`, raporty, zależności i konfiguracja w katalogu głównym | Poza zakresem | Poza zakresem | Poza zakresem |

Jeżeli helper z `tests/workshop/` ma podlegać analizie, przenieś go do `src/`, `fixtures/` lub `utils/` i popraw importy. Wykluczenie całego `tests/` obejmuje wszystkie jego pliki, również te bez nazwy `*.spec.ts`.

Pomijanie analizy plików testowych i pomijanie coverage to oddzielne ustawienia:

- `sonar.sources` wskazuje katalogi kodu wspólnego, a `sonar.tests` katalogi testów. Podajemy zwykłe ścieżki, bez wildcardów.
- `sonar.exclusions` wyklucza pliki z analizy kodu źródłowego.
- `sonar.test.exclusions` wyklucza pliki zaklasyfikowane jako testy. W nazwie parametru jest `test`, a w `sonar.tests` — `tests`.
- `sonar.coverage.exclusions` pomija pliki wyłącznie w pomiarze pokrycia. Nadal podlegają analizie jakości i bezpieczeństwa.
- `sonar.cpd.exclusions` dotyczy tylko wykrywania duplikacji; nie zastępuje wykluczenia z analizy.

Szczegóły: [zakres początkowy](https://docs.sonarsource.com/sonarqube-cloud/managing-your-projects/project-analysis/setting-analysis-scope/setting-initial-scope), [wykluczenia plików](https://docs.sonarsource.com/sonarqube-cloud/managing-your-projects/project-analysis/setting-analysis-scope/excluding-files-based-on-patterns) oraz [wykluczenia coverage i duplikacji](https://docs.sonarsource.com/sonarqube-cloud/managing-your-projects/project-analysis/setting-analysis-scope/exclude-from-coverage-duplication).

## Przygotowanie SonarCloud i GitHub

1. Połącz repozytorium z projektem w SonarCloud i skopiuj jego **Project Key** oraz **Organization Key**. Nie zakładaj, że są identyczne z nazwą repozytorium lub loginem GitHub.
2. W projekcie SonarCloud wybierz `Administration > Analysis Method` i wyłącz **Automatic Analysis**, ponieważ skan będzie wykonywany przez CI.
3. Utwórz token z uprawnieniem do analizy projektu i dodaj go w GitHub jako sekret repozytorium `SONAR_TOKEN`: `Settings > Secrets and variables > Actions`.
4. Ustal Quality Gate odpowiedni dla projektu automatyzacji. Wariant bez unit testów opisany poniżej świadomie pomija coverage.

Nie zapisuj tokena w repozytorium. Przykład korzysta z europejskiej instancji `https://sonarcloud.io`. Instrukcja połączenia projektu i wyboru metody analizy: [Getting started with GitHub](https://docs.sonarsource.com/sonarqube-cloud/getting-started/github). Analiza CI wymaga wyłączenia analizy automatycznej: [Overview of integrated CIs](https://docs.sonarsource.com/sonarqube-cloud/analyzing-source-code/ci-based-analysis/overview-of-integrated-cis).

## Wariant A: analiza kodu automatyzacji bez wymogu unit testów

To wariant startowy dla tego repozytorium: `npm test` uruchamia Playwrighta, a projekt nie ma osobnego runnera testów jednostkowych ani generatora raportu LCOV. Sprawdzamy kod wspólny, ale nie wymagamy jego pokrycia unit testami.

Utwórz `sonar-project.properties` w **katalogu głównym repozytorium**, obok `package.json`:

```properties
# Zastąp wartości kluczami z SonarCloud.
sonar.projectKey=REPLACE_WITH_PROJECT_KEY
sonar.organization=REPLACE_WITH_ORGANIZATION_KEY
sonar.host.url=https://sonarcloud.io
sonar.sourceEncoding=UTF-8

# Ścieżki względem katalogu głównego repozytorium.
sonar.sources=src,utils,fixtures,app
sonar.tests=tests

# Pomijamy scenariusze także wtedy, gdy trafią do katalogów źródłowych.
# Nazwy odpowiadają konwencjom używanym w playwright.config.ts.
sonar.exclusions=**/tests/**,**/__tests__/**,**/*.spec.ts,**/*.test.ts,**/*Test.ts,**/*.d.ts

# Pomijamy całą analizę plików z sonar.tests.
sonar.test.exclusions=**/*

# Nie wymagamy pokrycia kodu automatyzacji testami jednostkowymi.
# Analiza jakości i bezpieczeństwa pozostaje aktywna.
sonar.coverage.exclusions=**/*

# Pipeline czeka na wynik Quality Gate i zgłasza jego niepowodzenie.
sonar.qualitygate.wait=true
sonar.qualitygate.timeout=300
```

`tests/` nie należy do `sonar.sources`, a `sonar.test.exclusions=**/*` usuwa wszystkie pliki z osobnego zakresu testów. Samo `sonar.tests=tests` nie oznacza pomijania testów — bez wykluczenia Sonar analizowałby je jako kod testowy. Wzorce nazw w `sonar.exclusions` dopasuj, jeśli zmienisz konwencję projektu.

`sonar.coverage.exclusions=**/*` usuwa cały analizowany kod z obliczeń coverage. To świadoma decyzja dla wariantu A; po wprowadzeniu unit testów zastąp ten wpis konfiguracją wariantu B. Sam brak raportu LCOV nie jest sposobem na wyłączenie wymogu pokrycia.

### Przykład pipeline w GitHub Actions

Utwórz `.github/workflows/sonarcloud.yml`. Workflow uruchamia analizę niezależnie od istniejącego `.github/workflows/playwright.yml`:

```yaml
name: SonarCloud

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
    types: [opened, synchronize, reopened]
  workflow_dispatch:

permissions:
  contents: read

jobs:
  sonarcloud:
    # Pull requesty z forków nie mają dostępu do SONAR_TOKEN.
    if: github.event_name != 'pull_request' || github.event.pull_request.head.repo.full_name == github.repository
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: '24'
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: SonarCloud scan and Quality Gate
        uses: SonarSource/sonarqube-scan-action@v8
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

`fetch-depth: 0` pobiera pełną historię potrzebną do poprawnej analizy zmian. Skan korzysta z `sonar-project.properties` w katalogu głównym. Przeglądarki i aplikacja demo nie są potrzebne do tej analizy; wykonanie testów UI/API zapewnia istniejący workflow Playwrighta. Kod zakończenia skanu uwzględnia Quality Gate dzięki `sonar.qualitygate.wait=true`.

Akcja i jej konfiguracja: [SonarSource/sonarqube-scan-action](https://github.com/SonarSource/sonarqube-scan-action), [wydania akcji](https://github.com/SonarSource/sonarqube-scan-action/releases). Parametry oczekiwania na Quality Gate: [Analysis parameters](https://docs.sonarsource.com/sonarqube-cloud/analyzing-source-code/analysis-parameters/parameters-not-settable-in-ui).

## Wariant B: unit testy i coverage wybranych helperów

Unit testy mają sens szczególnie dla kodu niezależnego od przeglądarki: generatorów danych, walidacji, parserów i obliczeń. Przykładem w tym repozytorium jest `utils/generators/dataGenerator.ts`. W tym wariancie nadal pomijamy analizę samych plików testowych, ale mierzymy pokrycie kodu w `utils/`.

SonarCloud importuje raport pokrycia wygenerowany przez zewnętrzne narzędzie. Nie uruchamia unit testów i nie tworzy raportu za nas. Raport HTML Playwrighta i trace nie są raportami LCOV. Dla JS oraz TS służy ten sam parametr `sonar.javascript.lcov.reportPaths`: [przegląd coverage](https://docs.sonarsource.com/sonarqube-cloud/analyzing-source-code/test-coverage/overview) i [coverage JavaScript/TypeScript](https://docs.sonarsource.com/sonarqube-cloud/analyzing-source-code/test-coverage/javascript-typescript-test-coverage).

### Przygotowanie runnera i raportu

Przykład używa Vitesta. Poniższe kroki wykonaj dopiero przy wdrażaniu wariantu B:

1. Zainstaluj zależności i zapisz zmiany w `package.json` oraz `package-lock.json`:

   ```bash
   npm install --save-dev vitest @vitest/coverage-v8
   ```

   Użyj zgodnych wersji `vitest` i `@vitest/coverage-v8`.

2. Utwórz `vitest.config.mts` w katalogu głównym:

   ```typescript
   import { defineConfig } from 'vitest/config';

   export default defineConfig({
     test: {
       environment: 'node',
       include: ['tests/unit/**/*.test.ts'],
       coverage: {
         provider: 'v8',
         reporter: ['text', 'lcov'],
         reportsDirectory: './coverage',
         include: ['utils/**/*.ts'],
         exclude: ['**/*.test.ts', '**/*.spec.ts', '**/*Test.ts', '**/*.d.ts'],
       },
     },
   });
   ```

   Jawne `coverage.include` obejmuje również helpery, których testy nie zaimportowały. Konfiguracja runnera: [Vitest coverage](https://vitest.dev/guide/coverage.html).

3. Dodaj testy jednostkowe w `tests/unit/`, np. `dataGenerator.test.ts`. Dla `DataGenerator` sprawdź długość wyniku, dozwolony zestaw znaków, długość `0` i tryby generatora. Unikaj asercji oczekujących konkretnego losowego wyniku.

4. W `playwright.config.ts` zastąp istniejące `testIgnore` poniższym wpisem, aby Playwright nie zbierał testów Vitesta lokalnie ani w CI:

   ```typescript
   testIgnore: [
     '**/tests/unit/**',
     ...(isCI ? ['**/tests/patterns/**', '**/docs/rozwiazania/**'] : []),
   ],
   ```

### Zmiana konfiguracji SonarCloud i pipeline

W `sonar-project.properties` **zastąp** `sonar.coverage.exclusions=**/*` poniższymi ustawieniami. Nie pozostawiaj dwóch wpisów tej samej właściwości:

```properties
# Coverage wymagamy dla utils; reszta nadal podlega analizie statycznej.
sonar.coverage.exclusions=src/**,fixtures/**,app/**
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

Pozostaw `sonar.sources`, `sonar.tests`, `sonar.exclusions` i `sonar.test.exclusions` z wariantu A. LCOV ma wskazywać pliki kodu źródłowego w `utils/`; pomijanie analizy plików testowych nie blokuje importu pokrycia tych helperów.

W workflow, **po `npm ci` i przed skanem SonarCloud**, dodaj:

```yaml
      - name: Unit tests with coverage
        run: npx vitest run --config vitest.config.mts --coverage

      - name: Verify LCOV report
        run: test -s coverage/lcov.info
```

Testy i skan działają w tym samym jobie, więc raport jest dostępny bez przesyłania artefaktów. Nie używaj `continue-on-error` dla unit testów. Jeśli rozszerzysz wymaganie coverage na kolejne katalogi, ujednolić trzeba zarówno `coverage.include` w Vitest, jak i `sonar.coverage.exclusions` w SonarCloud.

## Quality Gate i weryfikacja wdrożenia

Quality Gate określa warunki zaliczenia analizy. Jako punkt startowy dla automatyzacji można przyjąć brak nowych problemów, przegląd nowych Security Hotspots i kontrolę duplikacji. Bez unit testów można przypisać projektowi własny gate bez warunków coverage; wymaga to uprawnienia `Administer Quality Gates`. W wariancie B dodaj warunek pokrycia nowego kodu, np. minimum 80% jako uzgodniony próg zespołu. Definicję gate konfiguruje się w SonarCloud, a nie przez właściwość `sonar.coverage.exclusions`.

Opis gate i przypisania go projektowi: [Introduction to quality gates](https://docs.sonarsource.com/sonarqube-cloud/standards/managing-quality-gates/introduction), [Quality gate](https://docs.sonarsource.com/sonarqube-cloud/managing-your-projects/project-analysis/changing-quality-gate).

Po pierwszym uruchomieniu sprawdź:

- w widoku kodu SonarCloud są `src/`, `utils/`, `fixtures/` i `app/`, a nie ma `tests/` ani materiałów szkoleniowych;
- pliki `*.spec.ts`, `*.test.ts` i `*Test.ts` są pomijane także w katalogach źródłowych;
- w wariancie A nie wymagasz coverage, ale nadal otrzymujesz wyniki analizy kodu wspólnego;
- w wariancie B pipeline tworzy niepusty `coverage/lcov.info`, skan go importuje i pokazuje coverage dla `utils/`;
- Quality Gate w SonarCloud odpowiada wynikowi joba, a testy Playwrighta nadal wykonuje ich dotychczasowy workflow.
