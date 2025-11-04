
#!/usr/bin/env bash

# If invoked with sh (not bash), re-exec under bash so bash-specific features work
if [ -z "${BASH_VERSION:-}" ]; then
  exec bash "$0" "$@"
fi

set -euo pipefail

echo "Installing backend dependencies..."

# Create a venv in backend/.venv if it doesn't exist and install into it.
if [ ! -d "backend/.venv" ]; then
  python3 -m venv backend/.venv
fi

backend/.venv/bin/python -m pip install --upgrade pip
backend/.venv/bin/pip install -r backend/requirements.txt

echo "Installing frontend dependencies..."
npm install --prefix frontend/magnetaraion-app

echo "Starting backend server..."
# Use the uvicorn binary from the venv to avoid depending on global path
backend/.venv/bin/uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 &

echo "Starting frontend server..."
npm start --prefix frontend/magnetaraion-app
