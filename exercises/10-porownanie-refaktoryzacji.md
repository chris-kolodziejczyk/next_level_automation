# Ćwiczenie 10 - Porównanie AAA, Page Object i fixtures

## Cel

Porównać trzy sposoby organizacji przygotowania i sprzątania danych dla tego samego scenariusza. Wszystkie końcowe warianty zachowują AAA, Page Object i pięć zasad SMURF.

## Start

Przygotuj środowisko według [instrukcji](README.md#przygotowanie-do-rozszerzeń). Uzupełnij `WorkshopLoginPage` oraz fixtures w `fixtures/smurf/fixtures.ts` zgodnie z ćwiczeniami podstawowymi.

Scenariusz dla każdego wariantu: aktywny użytkownik utworzony przez API loguje się poprawnymi danymi i widzi nagłówek `Dashboard` oraz `Welcome ${email}` w `welcome-message`.

## Zadania

1. Utwórz trzy pliki w `tests/workshop`: `comparison-aaa.spec.ts`, `comparison-page-object.spec.ts` oraz `comparison-fixtures.spec.ts`.
2. We wszystkich wariantach używaj uzupełnionego `WorkshopLoginPage` do nawigacji i `loginAs`; locatory pozostają w Page Object, a asercje w testach. Dodaj `//Arrange`, `//Act`, `//Assert` i komentarze wskazujące pięć zasad SMURF.
3. W wariancie AAA utwórz konto przez API bezpośrednio w Arrange testu i usuń je w `finally`. W Act wykonaj `loginAs`, a w Assert sprawdź nagłówek i powitanie.
4. W wariancie Page Object wydziel metody tworzenia/usuwania konta do helpera API. Rozszerz typowane fixtures o `userData` przygotowującą dane i gwarantującą cleanup oraz `loginPage` otwierającą formularz. Tworzenie konta przez helper pozostaw w Arrange testu.
5. W wariancie fixtures przenieś tworzenie konta do `testUser`, korzystającej z `userData` i helpera API; cleanup może pozostać w zależnej fixture `userData`. Zaimportuj rozszerzony `test` z `fixtures/smurf/fixtures.ts` i pobierz `testUser` oraz `loginPage` w argumentach testu.
6. Nadaj każdemu wariantowi własny email. Wszystkie trzy testy mają być niezależne, także uruchamiane równolegle.
7. Porównaj rozwiązania, uzupełniając poniższą tabelę obserwacjami z własnego kodu.

| Pytanie | AAA | Page Object | Fixtures |
|---|---|---|---|
| Gdzie przygotowujesz i sprzątasz dane? | | | |
| Ile miejsc trzeba zmienić po zmianie selektora? | | | |
| Jak łatwo odczytać scenariusz z samego testu? | | | |
| Ile plików trzeba otworzyć, żeby prześledzić błąd? | | | |
| Co można współdzielić z kolejnym testem? | | | |

AAA i Page Object obowiązują we wszystkich wariantach. Porównujesz miejsce tworzenia danych, ich sprzątania oraz ponowne użycie kodu. Szkielet `fixtures/smurf/fixtures.ts` ma początkowo tylko `testUser` i `loginPage`; dodatkowe fixtures i helper API należy dopisać w tym ćwiczeniu.

## Weryfikacja

```bash
npx playwright test tests/workshop/comparison-aaa.spec.ts tests/workshop/comparison-page-object.spec.ts tests/workshop/comparison-fixtures.spec.ts --project=chromium --workers=3
```

## Kryteria ukończenia

- Wszystkie warianty sprawdzają to samo zachowanie lokalnej aplikacji.
- Każdy test sprząta wyłącznie własne dane i przechodzi niezależnie od pozostałych.
- Page Object opisuje interakcje użytkownika, a fixture zarządza przygotowaniem i sprzątaniem.
- Uczestnik wskazuje korzyść i koszt każdego wariantu, uzasadniając wybór dla jednego oraz wielu scenariuszy.
