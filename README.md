# Zaawansowana automatyzacja - Playwright + TypeScript

## Wzorce AAA i SMURF jako next level po Page Object: typowane fixtures i testy API w praktyce

To repozytorium jest starterem projektu warsztatowego dla osób, które znają już podstawy Playwrighta i chcą wejść poziom wyżej: uporządkować testy według AAA, świadomie używać Page Object, pisać testy zgodne z zasadą SMURF oraz budować typowane fixtures pod scenariusze UI, API i hybrydowe.

## Co to jest i dla kogo

Projekt służy jako punkt startowy dla uczestników średnio- i zaawansowanych warsztatów automatyzacji w Playwright + TypeScript. Skupiamy się na praktyce:

- wzorzec **AAA** (Arrange, Act, Assert),
- wzorzec **SMURF** (Small, Maintainable, Understandable, Repeatable, Fast),
- typowane fixtures o zasięgu testu i workera,
- Page Object jako warstwa intencji użytkownika,
- testy API oraz hybrydy API + UI,
- redukcja flakiness przez stabilne selektory, retry i artefakty diagnostyczne.

## Struktura projektu warsztatowego

```text
.
├─ README.md
├─ README-SETUP.md
├─ COMMANDS.md
├─ package.json
├─ package-lock.json
├─ playwright.config.ts
├─ tsconfig.json
├─ .env.sample
├─ .gitignore
├─ setup.ps1
├─ setup.sh
├─ app/
│  ├─ README.md
│  └─ server.js
├─ docs/
│  ├─ PROJECT.md
│  ├─ AAA.md
│  ├─ PAGE_OBJECT.md
│  └─ SMURF.md
├─ exercises/
│  ├─ README.md
│  ├─ KOLEJNOSC-PRAC.md
│  ├─ 01-aaa.md
│  ├─ 02-page-object.md
│  ├─ 03-smurf.md
│  ├─ 04-fixtures-api.md
│  └─ 05-testarena-przypadki-testowe.md
├─ fixtures/
│  ├─ loginPage/
│  │  └─ fixtures.ts
│  └─ smurf/
│     ├─ fixtures.ts
│     └─ loginForm.ts
├─ src/
│  └─ pageobjects/
│     ├─ basePage.ts
│     ├─ LoginPage.ts
│     └─ WorkshopLoginPage.ts
└─ tests/
   ├─ example.spec.ts
   ├─ patterns/
   │  ├─ login-aaa.spec.ts
   │  ├─ login-page-object.spec.ts
   │  └─ login-smurf-before-each.spec.ts
   └─ smurf/
      └─ example.spec.ts
```

## Szybkie wymagania

- Node.js LTS
- npm
- Git
- Visual Studio Code lub inny edytor z obsługą TypeScript
- Przeglądarki Playwright zainstalowane poleceniem `npm run install:browsers`

## Jak zacząć lokalnie

1. Sklonuj repozytorium.
2. Skopiuj `.env.sample` do `.env`.
3. Uruchom `npm ci`.
4. Uruchom `npm run install:browsers`.
5. Uruchom aplikację demo przez `npm run app`, jeśli pracujesz z ćwiczeniem API + UI.
6. Uruchom `npm test`.

Szczegóły konfiguracji są w [README-SETUP.md](README-SETUP.md), a pełna lista komend w [COMMANDS.md](COMMANDS.md).

## Dokumentacja

- [Opis projektu](docs/PROJECT.md) - jak działa projekt, jak czytać strukturę i jakie dobre praktyki są tu zaszyte.
- [Arrange, Act, Assert](docs/AAA.md) - jak układać testy w czytelne trzy fazy.
- [Page Object](docs/PAGE_OBJECT.md) - jak modelować ekrany i zachowania bez ukrywania sensu testu.
- [SMURF](docs/SMURF.md) - praktyczna checklista jakości testów warsztatowych.

## Ćwiczenia

Ćwiczenia dla uczestników są w katalogu [exercises](exercises/README.md). Ich kolejność prowadzi od refaktoryzacji prostego testu, przez Page Object, po SMURF i fixtures API.

Gotowy duplikat testów po refaktoryzacji SMURF znajduje się w [tests/smurf/example.spec.ts](tests/smurf/example.spec.ts).

Dodatkowe, osobne przykłady wzorców są w katalogu [tests/patterns](tests/patterns): AAA, Page Object bez AAA oraz SMURF z `beforeEach` bez fixtures.
