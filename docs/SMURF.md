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

Test powinien używać stabilnych selektorów, wspólnych fixtures i Page Object tam, gdzie realnie zmniejszają koszt zmian. Utrzymywalność nie oznacza maksymalnej abstrakcji.

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
