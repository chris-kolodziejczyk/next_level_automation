# Ćwiczenie 10 - Porównanie AAA, Page Object i fixtures

## Cel

Porównać trzy sposoby zapisania tego samego scenariusza oraz ocenić korzyści i koszt dodatkowych abstrakcji.

## Start

Przygotuj środowisko według [instrukcji](README.md#przygotowanie-do-rozszerzeń). Uzupełnij `WorkshopLoginPage` oraz fixtures w `fixtures/smurf/fixtures.ts` zgodnie z ćwiczeniami podstawowymi.

Scenariusz dla każdego wariantu: aktywny użytkownik utworzony przez API loguje się poprawnymi danymi i widzi nagłówek `Dashboard` oraz `Welcome ${email}` w `welcome-message`.

## Zadania

1. Utwórz trzy pliki w `tests/workshop`: `comparison-aaa.spec.ts`, `comparison-page-object.spec.ts` oraz `comparison-fixtures.spec.ts`.
2. W wariancie AAA umieść przygotowanie użytkownika przez API w Arrange, wypełnienie formularza i kliknięcie w Act, a sprawdzenie nagłówka i powitania w Assert. Cleanup wykonaj również po błędzie.
3. W wariancie Page Object zachowaj przygotowanie danych przez API w teście, a nawigację i logowanie wykonaj przez `WorkshopLoginPage`. Asercje rezultatu pozostaw w teście.
4. W wariancie fixtures przenieś tworzenie i usuwanie konta do `testUser`, a przygotowanie Page Object do `loginPage`. Zaimportuj rozszerzony `test` z `fixtures/smurf/fixtures.ts` i pobierz obie fixtures w argumentach testu.
5. Nadaj każdemu wariantowi własny email. Wszystkie trzy testy mają być niezależne, także uruchamiane równolegle.
6. Porównaj rozwiązania, uzupełniając poniższą tabelę obserwacjami z własnego kodu.

| Pytanie | AAA | Page Object | Fixtures |
|---|---|---|---|
| Gdzie przygotowujesz i sprzątasz dane? | | | |
| Ile miejsc trzeba zmienić po zmianie selektora? | | | |
| Jak łatwo odczytać scenariusz z samego testu? | | | |
| Ile plików trzeba otworzyć, żeby prześledzić błąd? | | | |
| Co można współdzielić z kolejnym testem? | | | |

AAA nadal obowiązuje w wariantach Page Object i fixtures. Porównujesz miejsce umieszczenia kodu oraz jego ponowne użycie.

## Weryfikacja

```bash
npx playwright test tests/workshop/comparison-aaa.spec.ts tests/workshop/comparison-page-object.spec.ts tests/workshop/comparison-fixtures.spec.ts --project=chromium --workers=3
```

## Kryteria ukończenia

- Wszystkie warianty sprawdzają to samo zachowanie lokalnej aplikacji.
- Każdy test sprząta wyłącznie własne dane i przechodzi niezależnie od pozostałych.
- Page Object opisuje interakcje użytkownika, a fixture zarządza przygotowaniem i sprzątaniem.
- Uczestnik wskazuje korzyść i koszt każdego wariantu, uzasadniając wybór dla jednego oraz wielu scenariuszy.
