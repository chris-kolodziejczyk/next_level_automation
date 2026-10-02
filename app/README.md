# Workshop Login App

Lokalna aplikacja demo do ćwiczeń Playwright. Udostępnia prosty formularz logowania oraz API do przygotowania stanu testów w sekcji Arrange.

## Start

Playwright uruchamia serwer automatycznie przed testami. Ręczny start, np. do obejrzenia formularza albo pracy z `codegen`:

```bash
npm run app
```

Domyślny adres:

```text
http://localhost:3000/login
```

Ręczny serwer odczytuje `PORT` z otoczenia procesu i nie wczytuje `.env`. Możesz zmienić port:

PowerShell:

```powershell
$env:PORT = '3001'
npm run app
```

Bash:

```bash
PORT=3001 npm run app
```

Przy uruchamianiu testów port serwera jest przekazywany przez `playwright.config.ts` na podstawie `BASE_URL`. Aby testować pod portem `3001`, ustaw w `.env` spójnie:

```dotenv
BASE_URL=http://localhost:3001
LOGIN_URL=http://localhost:3001/login
API_BASE_URL=http://localhost:3001/api
```

## Domyślny użytkownik

```text
email: workshop.user@example.com
password: correct-password
active: true
```

Dane są przechowywane w pamięci. Restart serwera odtwarza wyłącznie domyślnego użytkownika.

## Formularz i wynik logowania

`GET /` przekierowuje do `/login`, a `GET /login` zwraca formularz. Pola mają etykiety `Email` i `Password`, przycisk ma nazwę `Sign in`. Formularz wysyła POST `/login`:

| Wynik | Status | HTML |
|---|---|---|
| Aktywne konto i poprawne hasło | `200` | Nagłówek `Dashboard` i `data-testid="welcome-message"` z treścią `Welcome ${email}`. |
| Nieznany email albo błędne/puste hasło | `401` | `data-testid="login-error"` z treścią `Nieprawidłowy login lub hasło.`. |
| Zablokowane konto i poprawne hasło | `403` | `data-testid="login-error"` z treścią `Konto użytkownika jest zablokowane.`. |

Dashboard jest treścią odpowiedzi POST `/login`; aplikacja nie przekierowuje na osobny `/dashboard`. Email jest normalizowany do małych liter i ma usuwane białe znaki na początku oraz końcu. Komunikat blokady pojawia się dopiero po sprawdzeniu poprawnego hasła.

## API

W testach używaj ścieżek zaczynających się od `/api`, także przy bazowym adresie `http://localhost:3000/api`. Dla adresu konta używaj `/api/users/${encodeURIComponent(email)}`.

### Health check

```http
GET /api/health
```

Status `200`, JSON `{ "status": "ok" }`. Ten endpoint służy też do sprawdzania gotowości `webServer`.

### Reset danych

```http
POST /api/reset
```

Status `200`, JSON `{ "users": [...] }`. Usuwa wszystkie konta i przywraca domyślnego użytkownika. Nie wywołuj resetu w równoległych testach; usuwaj tylko konto utworzone przez swój test.

### Lista użytkowników

```http
GET /api/users
```

Status `200`, JSON `{ "users": [...] }`. Każdy użytkownik ma `email`, `password` i `active`. Test tworzenia konta powinien sprawdzać obecność własnego użytkownika, ponieważ lista może zawierać dane innych testów.

### Utworzenie użytkownika

```http
POST /api/users
Content-Type: application/json

{
  "email": "student@example.com",
  "password": "correct-password",
  "active": true
}
```

Status `201`, JSON `{ "user": { "email": "student@example.com", "password": "correct-password", "active": true } }`.

Puste lub brakujące `email` albo `password` dają `400` z `{ "error": "email and password are required" }`. `active` domyślnie ma wartość `true`. POST z już istniejącym, znormalizowanym emailem nadpisuje konto i również zwraca `201`; nie sprawdza konfliktu `409`. Testy powinny używać własnych adresów.

### Aktualizacja użytkownika

```http
PATCH /api/users/student%40example.com
Content-Type: application/json

{
  "active": false
}
```

Status `200`, JSON `{ "user": ... }` z aktualnymi danymi. PATCH zmienia `active`, jeśli przekazano boolean, oraz `password`, jeśli przekazano string. Nie zmienia emaila. Dla nieistniejącego konta zwraca `404` z `{ "error": "user not found" }`.

### Usunięcie użytkownika

```http
DELETE /api/users/student%40example.com
```

Status `204`, puste body; nie wywołuj `response.json()`. DELETE nieistniejącego konta także zwraca `204`. Cleanup wykonaj w `finally` albo teardown fixture, żeby konto zostało usunięte również po błędzie asercji.
