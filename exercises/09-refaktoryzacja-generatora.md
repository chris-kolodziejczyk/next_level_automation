# Ćwiczenie 09 - Refaktoryzacja generatora danych

## Cel

Oddzielić generowanie danych od interakcji ze stroną i jawnie określić kontrakt metody w TypeScript.

## Start

Otwórz `src/pageobjects/basePage.ts` oraz `utils/generators/dataGenerator.ts`. Przeniesienie metody jest już wykonane w starterze: `BasePage` obsługuje stronę, a `DataGenerator` generuje dane bez zależności od Playwrighta.

## Kontrakt

```ts
randomString(len: number = 10, type: string = 'letters'): string
```

| Tryb | Wynik |
|---|---|
| `letters` (domyślny) | Litery `A–Z` i `a–z` |
| `number` | Cyfry `0–9`, również możliwe zero na początku |
| Inny string, np. `alphanumeric` | Litery i cyfry |

Nazwy trybów są normalizowane do małych liter. Wynik zawsze ma typ `string`, także w trybie `number`.

## Zadania

1. Wyjaśnij, dlaczego generator danych nie potrzebuje obiektu `Page` ani dziedziczenia po `BasePage`.
2. Własne wywołania `pageObject.randomString(...)`, jeśli je dodałeś, zastąp użyciem `DataGenerator`.
3. W pliku `tests/workshop/data-generator.spec.ts` utwórz instancję klasy i sprawdź długość oraz dozwolone znaki w trzech trybach. Nie porównuj wyniku z konkretnym losowym stringiem.
4. Dodaj przypadek długości `0` oraz trybu `LETTERS`. Sprawdź, że zachowanie odpowiada kontraktowi.
5. Omów, czy losowy sufiks wystarcza do izolacji danych. Przy użytkownikach API połącz go z identyfikatorem testu/wykonania i zachowaj wygenerowany email do cleanup.
6. Oznacz przygotowanie instancji `//Arrange`, wywołanie metody `//Act`, a sprawdzenie właściwości `//Assert`. Wskaż pięć zasad SMURF: osobne przypadki kontraktu, wydzieloną klasę, czytelne nazwy, asercje niezależne od losowej wartości i wykonanie bez przeglądarki.

Przykład importu z pliku w `tests/workshop`:

```ts
import { DataGenerator } from '../../utils/generators/dataGenerator';

const generator = new DataGenerator();
const suffix: string = generator.randomString(12, 'letters');
const email: string = `workshop-${suffix.toLowerCase()}@example.com`;
```

Typy zmiennych pokazują użycie kontraktu; TypeScript potrafi też wywnioskować je z typu wyniku metody. Sam przykład emaila demonstruje wywołanie generatora. Gdy faktycznie tworzysz konto przez API, dodaj również identyfikator testu lub wykonania i cleanup z kroku 5.

## Weryfikacja

```bash
npx eslint utils --max-warnings=0
npx playwright test tests/workshop/data-generator.spec.ts --project=chromium
```

## Kryteria ukończenia

- `BasePage` nie zawiera generatora danych.
- Klasa `DataGenerator` działa bez przeglądarki.
- Parametry mają typy `number` i `string`, a metoda jawnie zwraca `string`.
- Sprawdzenia dotyczą właściwości wyniku i nie zależą od wylosowanej wartości.
