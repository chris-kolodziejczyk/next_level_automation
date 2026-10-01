# Przydatne polecenia

Ten plik zbiera komendy używane podczas warsztatu. Uruchamiaj je z katalogu głównego projektu.

## Instalacja

```bash
npm ci
```

```bash
npm run install:browsers
```

## Testy

```bash
npm run app
```

```bash
npm test
```

```bash
npm run test:headed
```

```bash
npm run test:ui
```

```bash
npm run test:debug
```

```bash
npx playwright test tests/example.spec.ts --project=chromium
```

```bash
npx playwright test --grep "login"
```

## Raporty i diagnostyka

```bash
npm run test:report
```

```bash
npx playwright show-trace test-results/path-to-trace.zip
```

```bash
npx playwright test --trace on
```

## Generowanie selektorów i nagrywanie kroków

```bash
npx playwright codegen http://localhost:3000
```

## Git i praca warsztatowa

```bash
git status
```

```bash
git checkout -b workshop/my-solution
```

```bash
git add .
git commit -m "Add workshop exercise solution"
```
