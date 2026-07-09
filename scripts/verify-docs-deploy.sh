#!/usr/bin/env bash
set -uo pipefail

staging_url="https://connectfx-docs-staging.up.railway.app"
production_url="https://connectfx-docs.up.railway.app"
deep_link="/docs/start/quickstart"
failures=0

check() {
  local label="$1" url="$2" expected="$3"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [ "$code" = "$expected" ]; then
    echo "ok   $label $url -> $code"
  else
    echo "FAIL $label $url -> $code (expected $expected)"
    failures=$((failures + 1))
  fi
}

check "staging root" "$staging_url/" 200
check "staging deep link" "$staging_url$deep_link" 200
check "staging llms" "$staging_url/llms.txt" 200
check "production root" "$production_url/" 200
check "production deep link" "$production_url$deep_link" 200
check "production llms" "$production_url/llms.txt" 200

for env in staging production; do
  url_var="${env}_url"
  title=$(curl -s "${!url_var}/" | grep -o "<title>[^<]*</title>" | head -1)
  if [ "$title" = "<title>Connectfx</title>" ]; then
    echo "ok   $env title $title"
  else
    echo "FAIL $env title $title (expected <title>Connectfx</title>)"
    failures=$((failures + 1))
  fi
done

if [ "$failures" -gt 0 ]; then
  echo "verify-docs-deploy: $failures failures"
  exit 1
fi
echo "verify-docs-deploy: all checks passed"
