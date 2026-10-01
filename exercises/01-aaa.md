# Ćwiczenie 01 - Arrange, Act, Assert

## Cel

Przekształcić prosty test w czytelny scenariusz z trzema wyraźnymi częściami: Arrange, Act i Assert.

## Start

Otwórz `tests/example.spec.ts` i znajdź test logowania.

## Zadania

1. Upewnij się, że przygotowanie HTML i danych użytkownika jest w sekcji Arrange.
2. Zostaw w sekcji Act tylko główną akcję testowaną w scenariuszu.
3. Przenieś oczekiwania do sekcji Assert.
4. Nadaj testowi nazwę opisującą zachowanie, nie techniczne kroki.

## Kryteria ukończenia

- Test da się przeczytać od góry do dołu bez skakania po helperach.
- Sekcja Act ma jedną główną akcję.
- Asercja sprawdza rezultat widoczny dla użytkownika.
- `npm test` przechodzi lokalnie.
