# Ćwiczenia warsztatowe

Ćwiczenia są ułożone tak, żeby uczestnicy stopniowo przechodzili od prostego testu do bardziej dojrzałej struktury projektu Playwright.

Szczegółowa kolejność pracy podczas warsztatu znajduje się w [KOLEJNOSC-PRAC.md](KOLEJNOSC-PRAC.md).

## Kolejność

1. [AAA](01-aaa.md) - uporządkowanie testu według Arrange, Act, Assert.
2. [Page Object](02-page-object.md) - wydzielenie interakcji z formularzem do obiektu strony.
3. [SMURF](03-smurf.md) - refaktoryzacja testu pod kątem małości, czytelności i powtarzalności.
4. [Fixtures i API](04-fixtures-api.md) - przygotowanie danych testowych przez typowane fixtures.
5. [Przypadki testowe lokalnej aplikacji](05-testarena-przypadki-testowe.md) - trzy scenariusze logowania z Arrange przez API do przeprowadzenia przez AAA, Page Object i SMURF.

## Zasada pracy

Każde ćwiczenie zacznij od uruchomienia testów. Po zmianach uruchom test ponownie i dopiero wtedy przechodź do kolejnego kroku. Jeżeli test robi się długi, najpierw nazwij problem w komentarzu albo nazwie helpera, a dopiero później wydziel kod.
