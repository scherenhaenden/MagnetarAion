#!/usr/bin/env bash

# If invoked with sh (not bash), re-exec under bash so bash-specific features work
if [ -z "${BASH_VERSION:-}" ]; then
  exec bash "$0" "$@"
fi

set -euo pipefail

# run_migrations.sh
# - Creates a venv at backend/.venv (unless --no-create-venv)
# - Installs backend requirements (unless --no-install)
# - Runs: alembic -c alembic.ini upgrade head
# - Supports: DATABASE_URL env var override, --sql for dry-run SQL output

# Defaults
VENV_DIR="${VENV_DIR:-backend/.venv}"
REQ_FILE="backend/requirements.txt"
ALEMBIC_CONFIG="alembic.ini"
NO_INSTALL=0
DRY_RUN_SQL=0
STAMP_ONLY=0
AUTO_STAMP=0

print_usage() {
  cat <<EOF
Usage: $0 [options]

Options:
  --no-install        Don't (re)install requirements into the venv
  --no-create-venv    Don't create the venv if it doesn't exist (fail instead)
  --venv <path>       Use an alternate venv path (ENV: VENV_DIR)
  --sql               Do a dry-run and write SQL to ./alembic_output.sql (won't apply)
  --stamp             Mark the current database as having applied the latest revision (alembic stamp head)
  --auto-stamp        If upgrade fails due to existing schema objects, automatically run 'alembic stamp head'
  -h, --help          Show this help

Environment:
  DATABASE_URL        If set, Alembic (via app settings) will pick this up and use it as DB URL

Examples:
  # Run migrations (creates venv and installs if needed)
  bash run_migrations.sh

  # Dry-run (generate SQL only)
  bash run_migrations.sh --sql

  # Mark DB as up-to-date without applying schema changes
  bash run_migrations.sh --stamp

  # If upgrade fails because schema already exists, auto-stamp
  bash run_migrations.sh --auto-stamp

  # Use a different DB URL (e.g. production)
  DATABASE_URL="postgresql://user:pass@host/db" bash run_migrations.sh

EOF
}

# parse args
while [[ $# -gt 0 ]]; do
  case "$1" in
    --no-install) NO_INSTALL=1; shift ;;
    --no-create-venv) NO_CREATE_VENV=1; shift ;;
    --venv) VENV_DIR="$2"; shift 2 ;;
    --sql) DRY_RUN_SQL=1; shift ;;
    --stamp) STAMP_ONLY=1; shift ;;
    --auto-stamp) AUTO_STAMP=1; shift ;;
    -h|--help) print_usage; exit 0 ;;
    *) echo "Unknown arg: $1"; print_usage; exit 2 ;;
  esac
done

# Ensure script runs from repository root (where this script is located)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Tools inside venv
PYTHON_BIN="$VENV_DIR/bin/python"
ALEMBIC_BIN="$VENV_DIR/bin/alembic"

echo "[migrations] Using venv: $VENV_DIR"

# Create venv if missing (unless user requested not to)
if [ ! -d "$VENV_DIR" ]; then
  if [ "${NO_CREATE_VENV:-0}" = 1 ]; then
    echo "ERROR: venv not found at $VENV_DIR and --no-create-venv specified" >&2
    exit 1
  fi
  echo "[migrations] Creating virtual environment at $VENV_DIR..."
  python3 -m venv "$VENV_DIR"
fi

# Ensure pip and alembic are available; install requirements unless told not to
if [ "$NO_INSTALL" -eq 0 ]; then
  echo "[migrations] Upgrading pip and installing backend requirements (this may take a moment)..."
  "$PYTHON_BIN" -m pip install --upgrade pip >/dev/null
  if [ -f "$REQ_FILE" ]; then
    "$PYTHON_BIN" -m pip install -r "$REQ_FILE"
  else
    echo "[migrations] WARNING: requirements file $REQ_FILE not found. Installing alembic & sqlalchemy into venv as fallback."
    "$PYTHON_BIN" -m pip install alembic sqlalchemy >/dev/null
  fi
else
  echo "[migrations] --no-install specified, skipping package installation"
fi

# Verify alembic binary exists, otherwise try to install it
if [ ! -x "$ALEMBIC_BIN" ]; then
  echo "[migrations] Alembic CLI not found in venv; attempting to install alembic into the venv..."
  "$PYTHON_BIN" -m pip install alembic >/dev/null
fi

if [ ! -x "$ALEMBIC_BIN" ]; then
  echo "ERROR: alembic binary not found at $ALEMBIC_BIN" >&2
  exit 1
fi

# Show what DATABASE_URL will be used (if set via env)
if [ -n "${DATABASE_URL-}" ]; then
  echo "[migrations] Using DATABASE_URL from environment: ${DATABASE_URL}"
else
  echo "[migrations] No DATABASE_URL in environment; Alembic env.py will use app settings default (sqlite file)."
fi

# Build alembic command
ALEMBIC_CMD=("$ALEMBIC_BIN" -c "$ALEMBIC_CONFIG" upgrade head)

# If user asked only to stamp, do that and exit
if [ "$STAMP_ONLY" -eq 1 ]; then
  echo "[migrations] Stamping DB with current head (no schema changes)..."
  "$ALEMBIC_BIN" -c "$ALEMBIC_CONFIG" stamp head
  EXIT_CODE=$?
  if [ $EXIT_CODE -eq 0 ]; then
    echo "[migrations] Database stamped to head successfully."
  else
    echo "[migrations] Stamping failed with exit code $EXIT_CODE" >&2
  fi
  exit $EXIT_CODE
fi

if [ "$DRY_RUN_SQL" -eq 1 ]; then
  OUTFILE="alembic_output.sql"
  echo "[migrations] Generating SQL for migrations to $OUTFILE (won't apply changes)..."
  # Use --sql to emit SQL instead of applying (alembic supports passing --sql after upgrade)
  # We run: alembic -c alembic.ini upgrade head --sql > outfile
  "${ALEMBIC_BIN}" -c "$ALEMBIC_CONFIG" upgrade head --sql > "$OUTFILE"
  echo "[migrations] SQL generation complete: $OUTFILE"
  exit 0
fi

# Run migrations
echo "[migrations] Running: ${ALEMBIC_CMD[*]}"
# Capture output so we can examine errors and optionally auto-stamp
UPGRADE_OUTPUT=""
if UPGRADE_OUTPUT=$("${ALEMBIC_CMD[@]}" 2>&1); then
  echo "$UPGRADE_OUTPUT"
  echo "[migrations] Migrations applied successfully."
else
  RET_CODE=$?
  # print output for user
  echo "$UPGRADE_OUTPUT"
  echo "[migrations] Migration command failed with exit code $RET_CODE" >&2

  # If auto-stamp requested and output contains common 'already exists' type errors, stamp head
  if [ "$AUTO_STAMP" -eq 1 ]; then
    if echo "$UPGRADE_OUTPUT" | grep -E -i "already exists|duplicate column|no such table" >/dev/null 2>&1; then
      echo "[migrations] Detected schema already contains expected objects. Running alembic stamp head to mark migrations as applied."
      "$ALEMBIC_BIN" -c "$ALEMBIC_CONFIG" stamp head
      STAMP_RC=$?
      if [ $STAMP_RC -eq 0 ]; then
        echo "[migrations] alembic stamp head completed successfully."
        exit 0
      else
        echo "[migrations] alembic stamp head failed with exit code $STAMP_RC" >&2
        exit $STAMP_RC
      fi
    fi
  fi

  echo "[migrations] To mark migrations as applied without altering DB, re-run with --stamp or --auto-stamp" >&2
  exit $RET_CODE
fi

