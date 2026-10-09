#!/bin/sh
# Serve the portfolio locally: ./serve.sh [port]
PORT="${1:-8000}"
cd "$(dirname "$0")"
echo "Serving at http://localhost:$PORT"
exec python3 -m http.server "$PORT"
