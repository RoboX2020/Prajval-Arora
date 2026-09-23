#!/usr/bin/env bash
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root/sites/playbook"
npm ci
npx vite build --base=/playbook/ --outDir="$root/public/playbook" --emptyOutDir
