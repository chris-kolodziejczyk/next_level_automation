# Ćwiczenie 02 - Page Object

## Cel

Wydzielić interakcje z formularzem logowania do Page Object tak, żeby test nadal jasno opisywał scenariusz.

## Start

Otwórz `src/pageobjects/LoginPage.ts` oraz `tests/example.spec.ts`.

## Zadania

1. Dodaj do `LoginPage` brakujące locatory dla elementów formularza.
2. Dodaj metodę opisującą akcję użytkownika, na przykład `loginAs`.
3. Użyj Page Object w teście zamiast powtarzać selektory.
4. Zostaw asercję w teście, jeśli dzięki temu intencja scenariusza jest czytelniejsza.

## Kryteria ukończenia

- W teście nie ma powtórzonych selektorów formularza logowania.
- Page Object nie ukrywa całego scenariusza w jednej metodzie.
- Nazwy metod opisują zachowanie użytkownika.
- `npm test` przechodzi lokalnie.
