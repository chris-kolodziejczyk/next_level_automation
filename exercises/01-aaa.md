# Ćwiczenie 01 - Arrange, Act, Assert

## Cel

Przekształcić prosty test w czytelny scenariusz z trzema wyraźnymi częściami: Arrange, Act i Assert.

## Start

Otwórz istniejący `tests/patterns/login-aaa.spec.ts` i uruchom go:

```bash
npx playwright test tests/patterns/login-aaa.spec.ts --project=chromium
```

Skopiuj wybrany scenariusz do nowego `tests/workshop/login-aaa.spec.ts`. Katalog `tests/workshop` oraz ten plik tworzy uczestnik. Ten etap korzysta z HTML podstawionego przez `page.route`, tak jak przykład startowy.

## Zadania

1. Upewnij się, że przygotowanie HTML i danych użytkownika jest w sekcji Arrange.
2. Zostaw w sekcji Act tylko główną akcję testowaną w scenariuszu.
3. Przenieś oczekiwania do sekcji Assert.
4. Nadaj testowi nazwę opisującą zachowanie, nie techniczne kroki.
5. Oznacz sekcje dokładnie `//Arrange`, `//Act`, `//Assert`. Gdy badaną akcją jest wysłanie formularza, pola możesz wypełnić w Arrange i pozostawić kliknięcie w Act.

## Weryfikacja

Po utworzeniu własnego pliku:

```bash
npx playwright test tests/workshop/login-aaa.spec.ts --project=chromium
```

## Kryteria ukończenia

- Test da się przeczytać od góry do dołu bez skakania po helperach.
- Sekcja Act ma jedną główną akcję.
- Asercja sprawdza rezultat widoczny dla użytkownika.
- `npm test` przechodzi lokalnie.
