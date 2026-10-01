# Workshop Login App

Lokalna aplikacja demo do ćwiczeń Playwright. Udostępnia prosty formularz logowania oraz API do przygotowania stanu testów w sekcji Arrange.

## Start

```bash
npm run app
```

Domyślny adres:

```text
http://localhost:3000/login
```

Możesz zmienić port przez zmienną środowiskową:

```bash
PORT=3001 npm run app
```

## Domyślny użytkownik

```text
email: workshop.user@example.com
password: correct-password
active: true
```

## API

### Health check

```http
GET /api/health
```

### Reset danych

```http
POST /api/reset
```

Przywraca domyślnego użytkownika.

### Lista użytkowników

```http
GET /api/users
```

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

### Aktualizacja użytkownika

```http
PATCH /api/users/student%40example.com
Content-Type: application/json

{
  "active": false
}
```

### Usunięcie użytkownika

```http
DELETE /api/users/student%40example.com
```
