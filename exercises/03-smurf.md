# Ćwiczenie 03 - SMURF

## Cel

Ocenić istniejący test według zasad SMURF i poprawić te elementy, które zwiększają ryzyko flakiness albo utrudniają czytanie.

## Zadania

1. Sprawdź, czy test jest mały i dotyczy jednego zachowania.
2. Usuń zbędne kroki, które nie wpływają na asercję.
3. Upewnij się, że dane testowe są deterministyczne.
4. Zastąp kruche selektory selektorami po roli, labelu albo `data-testid`.
5. Sprawdź, czy test nie używa twardych timeoutów.

## Kryteria ukończenia

- Test można uruchomić wiele razy z tym samym wynikiem.
- Test jest krótki i skupiony.
- Asercja opisuje efekt biznesowy albo użytkowy.
- `npm test` przechodzi lokalnie.

## Gotowy wariant referencyjny

Po wykonaniu ćwiczenia porównaj swoje rozwiązanie z `tests/smurf/example.spec.ts`. Ten plik jest duplikatem przykładu po refaktoryzacji w kierunku SMURF: dane testowe są w fixture, formularz testowy jest poza specyfikacją, a każdy test sprawdza jedno zachowanie.
