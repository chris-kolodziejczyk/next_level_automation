# Ćwiczenia warsztatowe

Ćwiczenia są ułożone tak, żeby uczestnicy stopniowo przechodzili od prostego testu do bardziej dojrzałej struktury projektu Playwright.

Po ćwiczeniach podstawowych wykonaj rozszerzenia 05–10 w podanej kolejności.

## Kolejność

1. [AAA](01-aaa.md) - uporządkowanie testu według Arrange, Act, Assert.
2. [Page Object](02-page-object.md) - wydzielenie interakcji z formularzem do obiektu strony.
3. [SMURF](03-smurf.md) - refaktoryzacja testu pod kątem małości, czytelności i powtarzalności.
4. [Fixtures i API](04-fixtures-api.md) - przygotowanie danych testowych przez typowane fixtures.
5. [Parametryzacja testów](05-parametryzacja-testow.md) - tabela trzech przypadków logowania i osobne, czytelne nazwy testów.
6. [Zmiana stanu przez API](06-zmiana-stanu-api.md) - utworzenie użytkownika, blokada przez PATCH i sprawdzenie UI.
7. [Testy samego API](07-testy-api.md) - tworzenie użytkownika, walidacja danych i aktualizacja nieistniejącego konta.
8. [Diagnozowanie błędu](08-diagnozowanie-bledu.md) - celowa usterka, raport HTML i trace.
9. [Refaktoryzacja generatora danych](09-refaktoryzacja-generatora.md) - odpowiedzialność BasePage i typowana klasa DataGenerator.
10. [Porównanie AAA, Page Object i fixtures](10-porownanie-refaktoryzacji.md) - ten sam scenariusz w trzech wariantach.

## Przygotowanie do rozszerzeń

Playwright automatycznie uruchamia lokalną aplikację albo korzysta z już działającego serwera. Możesz też otworzyć ją ręcznie przez `npm run app`. Domyślnie działa pod `http://localhost:3000`; endpointy opisuje [app/README.md](../app/README.md). Testy lokalnej aplikacji mają korzystać z serwera, bez podstawiania HTML przez `page.route`.

Utwórz katalog `tests/workshop` i pliki wskazane w ćwiczeniach. Są to pliki do napisania przez uczestnika. Ćwiczenia z Page Object wymagają uzupełnienia TODO w `src/pageobjects/WorkshopLoginPage.ts`, a wariant z fixtures również TODO w `fixtures/smurf/fixtures.ts`.

Uruchamiaj konkretny plik poleceniem podanym w ćwiczeniu. Pełne `npm test` obejmuje przykłady w `tests` oraz lokalnie dostępne [rozwiązania](../docs/rozwiazania/README.md), korzystając ze wspólnej konfiguracji w głównym katalogu.

Każdy test tworzący dane ma używać własnego adresu email i usuwać swojego użytkownika po wykonaniu, również po błędzie asercji. Nie wywołuj globalnego `/api/reset` podczas równoległych testów. W przykładach API używaj ścieżek `/api/users` i `/api/users/${encodeURIComponent(email)}`.

## Zasada pracy

Każde ćwiczenie zacznij od uruchomienia testów. Po zmianach uruchom test ponownie i dopiero wtedy przechodź do kolejnego kroku. Jeżeli test robi się długi, najpierw nazwij problem w komentarzu albo nazwie helpera, a dopiero później wydziel kod.
