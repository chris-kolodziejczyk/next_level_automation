# SMURF

SMURF to warsztatowy akronim opisujący cechy dobrego testu automatycznego:

- **Small** - mały.
- **Maintainable** - łatwy w utrzymaniu.
- **Understandable** - zrozumiały.
- **Repeatable** - powtarzalny.
- **Fast** - szybki.

## Small

Test powinien sprawdzać jedno zachowanie. Jeżeli scenariusz ma wiele niezależnych asercji, rozważ podział na mniejsze testy.

## Maintainable

Test powinien używać stabilnych selektorów, wspólnych fixtures i Page Object tam, gdzie realnie zmniejszają koszt zmian. W testach API rolę takiej warstwy pełni helper z metodami domenowymi. Generator danych ma własną klasę, niezależną od strony. Utrzymywalność nie oznacza maksymalnej abstrakcji.

## Understandable

Osoba czytająca test powinna szybko zobaczyć, co jest przygotowaniem, co akcją, a co oczekiwanym wynikiem. Nazwy testów i helperów powinny mówić językiem użytkownika albo domeny.

## Repeatable

Test powinien przechodzić niezależnie od kolejności uruchamiania i liczby powtórek. Dane testowe muszą być izolowane, deterministyczne albo sprzątane po teście.

## Fast

Test powinien korzystać z API do przygotowania stanu, jeśli UI nie jest przedmiotem sprawdzenia. Wolne kroki UI zostawiamy tam, gdzie testujemy realny przepływ użytkownika.

## Checklista refaktoryzacji

- Czy test sprawdza jeden temat?
- Czy nazwa testu opisuje zachowanie, a nie implementację?
- Czy dane testowe są izolowane?
- Czy można przygotować stan przez API zamiast klikać przez UI?
- Czy test nie używa `waitForTimeout`?
- Czy Page Object albo fixture upraszcza test bez ukrywania intencji?

## Co pokazać w tym projekcie

| Zasada | Konkretne miejsce lub zadanie |
|---|---|
| **Small** | [Przykład z beforeEach](../tests/patterns/login-smurf-before-each.spec.ts) ma dwa niezależne testy. W ćwiczeniu 5 każdy przypadek z tabeli ma osobny wynik. |
| **Maintainable** | [LoginPage](../src/pageobjects/LoginPage.ts) skupia selektory i `loginAs`. Ćwiczenie 7 wydziela metody API do klasy pośredniej. |
| **Understandable** | Nazwy opisują zachowanie, a `//Arrange`, `//Act`, `//Assert` oddzielają dane, akcję i rezultat. |
| **Repeatable** | Fixture przygotowuje własne konto i usuwa je w `finally`; ćwiczenie 9 sprawdza właściwości losowego wyniku. |
| **Fast** | [Kontekst api](../fixtures/loginPage/fixtures.ts) jest współdzielony w workerze. Ćwiczenia 7 i 9 nie otwierają przeglądarki. |

Przykład `login-smurf-before-each.spec.ts` korzysta z podstawionego HTML, danych zapisanych w pliku i wspólnego helpera. Nie używa typowanych fixtures ani Page Object; jest etapem pokazującym `beforeEach` i skupione testy. Końcowy kod ćwiczeń UI od zadania 2 korzysta z Page Object, a zadania 3–10 wymagają wskazania wszystkich pięciu zasad. Fixtures do rzeczywistej aplikacji uczestnik uzupełnia w ćwiczeniu 4.

Opcjonalny lokalny katalog `docs/rozwiazania` zawiera końcowe warianty z komentarzami wskazującymi pięć zasad. Jest pomijany przez Git, więc podstawą pracy po klonowaniu pozostają przykłady w `tests/patterns`, szkielety oraz opisy w `exercises`.
