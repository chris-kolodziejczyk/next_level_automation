# Ćwiczenie 03 - SMURF

## Cel

Ocenić istniejący test według zasad SMURF i poprawić te elementy, które zwiększają ryzyko flakiness albo utrudniają czytanie.

## Zadania

Punktem startowym jest własny test z ćwiczenia 02. Utwórz jego wariant w `tests/workshop/login-smurf.spec.ts`; zachowaj Page Object i rzeczywistą aplikację.

1. Sprawdź, czy test jest mały i dotyczy jednego zachowania.
2. Usuń zbędne kroki, które nie wpływają na asercję.
3. Upewnij się, że stan użytkownika i oczekiwany wynik są znane. Nieznany użytkownik ma nieutworzony email; dane kont tworzonych przez API muszą być izolowane i sprzątane.
4. Zastąp kruche selektory selektorami po roli, labelu albo `data-testid`.
5. Sprawdź, czy test nie używa twardych timeoutów.
6. Zachowaj `//Arrange`, `//Act`, `//Assert` i dodaj krótkie komentarze wskazujące **Small**, **Maintainable**, **Understandable**, **Repeatable**, **Fast** w swoim kodzie. Typowane fixtures wprowadzisz w ćwiczeniu 04.

## Weryfikacja

```bash
npx playwright test tests/workshop/login-smurf.spec.ts --project=chromium --repeat-each=2
```

## Kryteria ukończenia

- Test można uruchomić wiele razy z tym samym wynikiem.
- Test jest krótki i skupiony.
- Asercja opisuje efekt biznesowy albo użytkowy.
- `npm test` przechodzi lokalnie.

## Gotowy wariant referencyjny

Porównaj strukturę z istniejącym `tests/patterns/login-smurf-before-each.spec.ts`. Pokazuje dwa małe testy, wspólne `beforeEach`, stałe dane i helper `submitLoginForm`. HTML jest zapisany w tym samym pliku i podstawiany przez `page.route`; ten przykład nie używa typowanych fixtures. Twoja końcowa wersja zachowuje Page Object z ćwiczenia 02 i korzysta z lokalnej aplikacji.

Pełne znaczenie pięciu zasad i ich miejsca w projekcie opisuje [SMURF](../docs/SMURF.md).
