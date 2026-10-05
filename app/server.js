/**
 * @file Aplikacja warsztatowa: formularz logowania i API użytkowników w pamięci.
 * Proces startuje po uruchomieniu tego pliku; port pochodzi z PORT lub wynosi 3000.
 * Stan kont jest wspólny dla żądań danego procesu i znika po jego restarcie.
 */

/**
 * Konto przechowywane w pamięci aplikacji i zwracane przez API.
 * @typedef {object} User
 * @property {string} email Adres używany jako klucz po normalizacji.
 * @property {string} password Hasło porównywane podczas logowania.
 * @property {boolean} active Czy konto może zalogować się poprawnym hasłem.
 */

/**
 * Pola odczytywane z obiektu przesłanego przy tworzeniu użytkownika.
 * @typedef {object} UserInput
 * @property {unknown} [email] Wartość konwertowana do przyciętego tekstu małymi literami.
 * @property {unknown} [password] Wartość konwertowana do tekstu bez przycinania.
 * @property {unknown} [active] Tylko jawne false tworzy nieaktywne konto.
 */

const http = require('node:http');
const { URL } = require('node:url');

/** Port HTTP z otoczenia procesu; aplikacja nie wczytuje samodzielnie pliku .env. */
const port = Number(process.env.PORT ?? 3000);

/** Komunikaty formularza dla błędnych danych i zablokowanego konta. */
const messages = {
  invalidCredentials: 'Nieprawidłowy login lub hasło.',
  lockedAccount: 'Konto użytkownika jest zablokowane.',
};

/**
 * Konta przywracane podczas startu procesu i przez POST /api/reset.
 * @type {User[]}
 */
const defaultUsers = [
  {
    email: 'workshop.user@example.com',
    password: 'correct-password',
    active: true,
  },
];

/**
 * Bieżące konta indeksowane znormalizowanym adresem email.
 * @type {Map<string, User>}
 */
let users = new Map();

/**
 * Zastępuje cały stan nowymi kopiami kont domyślnych.
 * @returns {void}
 */
function resetUsers() {
  users = new Map(
    defaultUsers.map((user) => [
      user.email.toLowerCase(),
      { ...user, email: user.email.toLowerCase() },
    ])
  );
}

resetUsers();

/**
 * Ustawia status i nagłówki, wysyła treść oraz kończy odpowiedź HTTP.
 * @param {import('node:http').ServerResponse} response Odpowiedź obsługiwanego żądania.
 * @param {number} statusCode Kod odpowiedzi HTTP.
 * @param {string} body Treść HTML, JSON, tekst albo pusty string.
 * @param {import('node:http').OutgoingHttpHeaders} [headers={}] Nagłówki odpowiedzi.
 * @returns {void}
 */
function send(response, statusCode, body, headers = {}) {
  response.writeHead(statusCode, headers);
  response.end(body);
}

/**
 * Serializuje dane do JSON i ustawia application/json z kodowaniem UTF-8.
 * Dla statusu 204 Node.js pomija body odpowiedzi.
 * @param {import('node:http').ServerResponse} response Odpowiedź HTTP.
 * @param {number} statusCode Kod odpowiedzi HTTP.
 * @param {object} payload Dane przekazywane do JSON.stringify.
 * @returns {void}
 */
function sendJson(response, statusCode, payload) {
  send(response, statusCode, JSON.stringify(payload, null, 2), {
    'content-type': 'application/json; charset=utf-8',
  });
}

/**
 * Kończy odpowiedź przekierowaniem HTTP 302.
 * @param {import('node:http').ServerResponse} response Odpowiedź HTTP.
 * @param {string} location Adres wpisywany do nagłówka Location.
 * @returns {void}
 */
function redirect(response, location) {
  send(response, 302, '', { location });
}

/**
 * Zbiera fragmenty body do tekstu aż do zakończenia strumienia żądania.
 * @param {import('node:http').IncomingMessage} request Żądanie z odczytywanym body.
 * @returns {Promise<string>} Pełna treść żądania.
 * @throws {Error} Obietnica jest odrzucana po błędzie strumienia żądania.
 */
function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk;
    });

    request.on('end', () => resolve(body));
    request.on('error', reject);
  });
}

/**
 * Parsuje body jako JSON; pusta lub zawierająca tylko białe znaki treść daje {}.
 * @param {import('node:http').IncomingMessage} request Żądanie API.
 * @returns {Promise<unknown>} Wynik JSON.parse albo pusty obiekt.
 * @throws {SyntaxError} Gdy niepuste body nie jest poprawnym JSON-em.
 */
async function readJson(request) {
  const body = await readBody(request);

  if (!body.trim()) {
    return {};
  }

  return JSON.parse(body);
}

/**
 * Odczytuje pola formularza application/x-www-form-urlencoded.
 * Przy powtórzonych nazwach pól zachowuje ostatnią wartość.
 * @param {string} body Treść formularza.
 * @returns {Record<string, string>} Nazwy pól i ich tekstowe wartości.
 */
function parseForm(body) {
  return Object.fromEntries(new URLSearchParams(body));
}

/**
 * Buduje pełny HTML formularza z labelami Email, Password i przyciskiem Sign in.
 * Pusty komunikat pozostawia element login-error ukryty.
 * @param {string} [message=''] Komunikat wyświetlany po błędzie logowania.
 * @returns {string} Dokument HTML formularza.
 */
function renderLoginPage(message = '') {
  const messageHtml = message
    ? `<p class="login-error" data-testid="login-error" role="alert">${message}</p>`
    : '<p class="login-error" data-testid="login-error" role="alert" hidden></p>';

  return `<!doctype html>
<html lang="pl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Workshop Login App</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        font-family: Arial, sans-serif;
        background: #f4f7fb;
        color: #172033;
      }

      main {
        width: min(420px, calc(100% - 32px));
        padding: 28px;
        border: 1px solid #d9e2ef;
        border-radius: 8px;
        background: #fff;
        box-shadow: 0 18px 50px rgba(23, 32, 51, 0.12);
      }

      h1 {
        margin: 0 0 8px;
        font-size: 24px;
      }

      p {
        margin: 0 0 20px;
      }

      label {
        display: grid;
        gap: 6px;
        margin-top: 14px;
        font-weight: 700;
      }

      input {
        padding: 11px 12px;
        border: 1px solid #b7c4d6;
        border-radius: 6px;
        font: inherit;
      }

      button {
        width: 100%;
        margin-top: 20px;
        padding: 12px;
        border: 0;
        border-radius: 6px;
        background: #1f6feb;
        color: #fff;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
      }

      .login-error {
        margin-top: 16px;
        padding: 12px;
        border: 1px solid #f2a7a7;
        border-radius: 6px;
        background: #fff0f0;
        color: #9b1c1c;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Workshop Login App</h1>
      <p>Demo do ćwiczeń Playwright: AAA, Page Object, SMURF oraz Arrange przez API.</p>
      <form method="post" action="/login" aria-label="Login form">
        <label for="email">
          Email
          <input id="email" name="email" type="email" autocomplete="username" />
        </label>
        <label for="password">
          Password
          <input id="password" name="password" type="password" autocomplete="current-password" />
        </label>
        <button id="submit-login" type="submit">Sign in</button>
        ${messageHtml}
      </form>
    </main>
  </body>
</html>`;
}

/**
 * Buduje HTML potwierdzający logowanie nagłówkiem Dashboard i powitaniem użytkownika.
 * @param {string} email Adres konta umieszczany w welcome-message.
 * @returns {string} Dokument HTML wyniku logowania.
 */
function renderDashboard(email) {
  return `<!doctype html>
<html lang="pl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Dashboard</title>
  </head>
  <body>
    <main>
      <h1>Dashboard</h1>
      <p data-testid="welcome-message">Welcome ${email}</p>
      <a href="/login">Sign out</a>
    </main>
  </body>
</html>`;
}

/**
 * Przygotowuje konto: przycina email i zmienia go na małe litery,
 * konwertuje hasło do tekstu oraz ustawia active na true, chyba że podano false.
 * Sprawdza niepustość emaila i hasła; nie sprawdza formatu adresu email.
 * @param {UserInput} payload Obiekt z polami danych konta.
 * @returns {User|null} Konto lub null, gdy email albo hasło są puste.
 */
function normalizeUser(payload) {
  const email = String(payload.email ?? '').trim().toLowerCase();
  const password = String(payload.password ?? '');
  const active = payload.active !== false;

  if (!email || !password) {
    return null;
  }

  return { email, password, active };
}

/**
 * Obsługuje health check, reset i operacje na użytkownikach pod /api/.
 * GET zwraca 200, POST /api/users 201 lub 400, PATCH 200 lub 404,
 * a DELETE zawsze 204, także dla brakującego konta. Tworzenie konta
 * z istniejącym emailem zastępuje jego dane. Nieznany endpoint zwraca 404.
 * @param {import('node:http').IncomingMessage} request Żądanie API.
 * @param {import('node:http').ServerResponse} response Odpowiedź kończona przez handler.
 * @param {URL} url Sparsowany adres żądania.
 * @returns {Promise<void>} Zakończenie obsługi endpointu.
 * @throws {Error} Błędy odczytu i parsowania trafiają do handlera serwera z odpowiedzią 500.
 */
async function handleApi(request, response, url) {
  if (request.method === 'GET' && url.pathname === '/api/health') {
    sendJson(response, 200, { status: 'ok' });
    return;
  }

  if (request.method === 'POST' && url.pathname === '/api/reset') {
    resetUsers();
    sendJson(response, 200, { users: Array.from(users.values()) });
    return;
  }

  if (request.method === 'GET' && url.pathname === '/api/users') {
    sendJson(response, 200, { users: Array.from(users.values()) });
    return;
  }

  if (request.method === 'POST' && url.pathname === '/api/users') {
    const payload = await readJson(request);
    const user = normalizeUser(payload);

    if (!user) {
      sendJson(response, 400, {
        error: 'email and password are required',
      });
      return;
    }

    users.set(user.email, user);
    sendJson(response, 201, { user });
    return;
  }

  if (request.method === 'PATCH' && url.pathname.startsWith('/api/users/')) {
    const email = decodeURIComponent(url.pathname.replace('/api/users/', ''))
      .trim()
      .toLowerCase();
    const existingUser = users.get(email);

    if (!existingUser) {
      sendJson(response, 404, { error: 'user not found' });
      return;
    }

    const payload = await readJson(request);
    const updatedUser = {
      ...existingUser,
      ...(typeof payload.password === 'string'
        ? { password: payload.password }
        : {}),
      ...(typeof payload.active === 'boolean' ? { active: payload.active } : {}),
    };

    users.set(email, updatedUser);
    sendJson(response, 200, { user: updatedUser });
    return;
  }

  if (request.method === 'DELETE' && url.pathname.startsWith('/api/users/')) {
    const email = decodeURIComponent(url.pathname.replace('/api/users/', ''))
      .trim()
      .toLowerCase();

    users.delete(email);
    sendJson(response, 204, {});
    return;
  }

  sendJson(response, 404, { error: 'not found' });
}

/**
 * Porównuje dane formularza z kontem w pamięci aplikacji.
 * Zwraca HTML formularza z 401 dla błędnych danych lub 403 dla nieaktywnego
 * konta z poprawnym hasłem; udane logowanie zwraca HTML Dashboard ze statusem 200.
 * @param {import('node:http').IncomingMessage} request Żądanie POST /login.
 * @param {import('node:http').ServerResponse} response Odpowiedź zawierająca HTML.
 * @returns {Promise<void>} Zakończenie odpowiedzi po próbie logowania.
 * @throws {Error} Błąd odczytu body trafiający do obsługi 500 w serwerze.
 */
async function handleLoginPost(request, response) {
  const form = parseForm(await readBody(request));
  const email = String(form.email ?? '').trim().toLowerCase();
  const password = String(form.password ?? '');
  const user = users.get(email);

  if (!user || user.password !== password) {
    send(response, 401, renderLoginPage(messages.invalidCredentials), {
      'content-type': 'text/html; charset=utf-8',
    });
    return;
  }

  if (!user.active) {
    send(response, 403, renderLoginPage(messages.lockedAccount), {
      'content-type': 'text/html; charset=utf-8',
    });
    return;
  }

  send(response, 200, renderDashboard(user.email), {
    'content-type': 'text/html; charset=utf-8',
  });
}

/**
 * Kieruje żądania do API, formularza logowania lub odpowiedzi 404.
 * GET / przekierowuje do /login; wyjątki handlerów kończą się JSON-em z kodem 500.
 * @type {import('node:http').Server}
 */
const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);

    if (url.pathname.startsWith('/api/')) {
      await handleApi(request, response, url);
      return;
    }

    if (request.method === 'GET' && url.pathname === '/') {
      redirect(response, '/login');
      return;
    }

    if (request.method === 'GET' && url.pathname === '/login') {
      send(response, 200, renderLoginPage(), {
        'content-type': 'text/html; charset=utf-8',
      });
      return;
    }

    if (request.method === 'POST' && url.pathname === '/login') {
      await handleLoginPost(request, response);
      return;
    }

    send(response, 404, 'Not found', {
      'content-type': 'text/plain; charset=utf-8',
    });
  } catch (error) {
    console.error(error);
    sendJson(response, 500, { error: 'internal server error' });
  }
});

server.listen(port, () => {
  console.log(`Workshop app running at http://localhost:${port}`);
});
