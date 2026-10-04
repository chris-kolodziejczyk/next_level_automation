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

W `tests/workshop` znajduje się przeniesione rozwiązanie `zadanie1Test.ts`. Pozostałe pliki wskazane w ćwiczeniach tworzy uczestnik. Ćwiczenia z Page Object wymagają uzupełnienia TODO w `src/pageobjects/WorkshopLoginPage.ts`, a wariant z fixtures również TODO w `fixtures/smurf/fixtures.ts`.

Uruchamiaj konkretny plik poleceniem podanym w ćwiczeniu, po jego utworzeniu. Wszystkie przeniesione rozwiązania sprawdzisz przez `npm test -- tests/workshop --project=chromium`. Pełne lokalne `npm test` obejmuje również nieuzupełnione materiały szkoleniowe w `tests/patterns`; są one pomijane w CI i podczas kontroli typów.

Opcjonalne rozwiązania prowadzącego znajdują się w `docs/rozwiazania`, z instrukcją `docs/rozwiazania/README.md`. Ten katalog jest pomijany przez Git i nie jest dostępny po samym klonowaniu. Jeśli został udostępniony lokalnie, jego testy również zbierze główna konfiguracja.

Kolejne kompletne rozwiązania możesz przenosić razem z Page Object, fixtures, helperem API i generatorem do `tests/workshop`, również do osobnych podfolderów. Playwright rozpoznaje nazwy `*Test.ts`, `*.spec.ts` i `*.test.ts`. Wspólny `BasePage` jest dostępny przez `@pageobjects/basePage`; pozostałe pliki zadania zachowują importy względne. Po dodaniu plików do commita GitHub Actions uruchomi je bez zmian w workflow. Rozdzielając pliki między katalogi projektu, dostosuj ich importy według [instrukcji](../README.md#przenoszenie-kolejnych-rozwiązań-do-ci).

Każdy test tworzący dane ma używać własnego adresu email i usuwać swojego użytkownika po wykonaniu, również po błędzie asercji. Nie wywołuj globalnego `/api/reset` podczas równoległych testów. W przykładach API używaj ścieżek `/api/users` i `/api/users/${encodeURIComponent(email)}`.

Materiał `tests/patterns/login-page-object.spec.ts` odwołuje się do `LoginPage` dla podstawionego HTML i `flash-message`; ta klasa wymaga przygotowania w ramach przykładu. `WorkshopLoginPage` jest szkieletem dla rzeczywistej aplikacji z `login-error`. Uzupełniaj go do ćwiczeń UI. Wbudowana fixture `request` korzysta z `BASE_URL`, a worker-scoped `api` z `API_BASE_URL`. `loginPage` w `fixtures/loginPage/fixtures.ts` tylko konstruuje obiekt; uczestnik dodaje otwarcie strony i przygotowanie konta.

## Docelowy zapis rozwiązań

- Każdy test ma oznaczenia `//Arrange`, `//Act`, `//Assert`.
- Od zadania 2 testy UI korzystają z Page Object; selektory i interakcje mają osobny plik.
- W zadaniu 7 wywołania HTTP są w klasie pośredniej, np. `ApiHelperPage`, używanej podobnie do Page Object. Klasa przyjmuje `APIRequestContext`, bez `Page` i bez przeglądarki.
- W zadaniu 9 osobną odpowiedzialność ma `DataGenerator`; testy sprawdzają jego kontrakt bez UI.
- Dla zadań 3–10 wskaż w komentarzach wszystkie pięć zasad SMURF i odpowiadające im elementy kodu. [SMURF](../docs/SMURF.md) opisuje konkretne punkty do omówienia na warsztacie.

Page Object, helper API, fixtures, generator i test mają osobne pliki, gdy pełnią odrębne role. Dane biznesowe i oczekiwania są stałe; identyfikatory techniczne mogą być unikalne. Zakres fixture ma zapewniać izolację, a cleanup wykonywać się także po błędzie.

## Zasada pracy

Każde ćwiczenie zacznij od uruchomienia testów. Po zmianach uruchom test ponownie i dopiero wtedy przechodź do kolejnego kroku. Jeżeli test robi się długi, najpierw nazwij problem w komentarzu albo nazwie helpera, a dopiero później wydziel kod.
