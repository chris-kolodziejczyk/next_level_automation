#!/usr/bin/env bash
set -euo pipefail

if [ ! -f ".env" ] && [ -f ".env.sample" ]; then
  cp ".env.sample" ".env"
fi

npm ci
npm run install:browsers
npm test
