$ErrorActionPreference = "Stop"

if (-not (Test-Path ".env") -and (Test-Path ".env.sample")) {
  Copy-Item ".env.sample" ".env"
}

npm ci
npm run install:browsers
npm test
