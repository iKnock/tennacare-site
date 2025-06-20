#!/usr/bin/env bash

# run.sh – simple helper script to launch a local web-server for this static site
# Usage:  ./run.sh [port]
# Default port: 8000
# Requires Python ≥3 (built-in on macOS) – no extra dependencies needed.

set -euo pipefail

PORT="${1:-8000}"

# cd to the location of this script so it works no matter where it is invoked from
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)"
cd "$SCRIPT_DIR"

printf "Serving \033[1m%s\033[0m at http://localhost:%s (press Ctrl+C to stop)\n" "$SCRIPT_DIR" "$PORT"

# Start Python's built-in static file server
python3 -m http.server "$PORT" --bind 127.0.0.1
