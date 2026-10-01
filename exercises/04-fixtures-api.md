# Ćwiczenie 04 - Fixtures i API

## Cel

Zrozumieć, jak typowane fixtures pomagają przygotować dane i współdzielić kosztowne zasoby między testami.

## Start

Otwórz `fixtures/loginPage/fixtures.ts`.

## Zadania

1. Przejrzyj fixture `api` i sprawdź, dlaczego ma zasięg workera.
2. Przejrzyj fixture `seedUserId` i sprawdź, skąd bierze deterministyczną nazwę użytkownika.
3. Dodaj nową test-scoped fixture, która zwraca obiekt użytkownika z `email` i `password`.
4. Użyj tej fixture w teście logowania.
5. Zastanów się, które dane powinny być sprzątane po teście, gdy podłączysz realne API.

## Kryteria ukończenia

- Fixture ma jawny typ.
- Test nie tworzy danych przez przypadkowe wartości globalne.
- Zakres fixture jest dobrany do kosztu i izolacji danych.
- `npm test` przechodzi lokalnie.
