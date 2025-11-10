# Database Migrations Guide

## Überblick

Dieses Projekt verwendet [Alembic](https://alembic.sqlalchemy.org/) für Datenbank-Migrationen. Das Skript `run_migrations.sh` automatisiert den Prozess.

## Schnellstart

### Migrationen ausführen (Standard)

```bash
bash run_migrations.sh
```

Dies erstellt automatisch ein virtuelles Environment (falls nötig), installiert Abhängigkeiten und führt alle ausstehenden Migrationen aus.

### Migrationen ohne Neuinstallation von Paketen

```bash
bash run_migrations.sh --no-install
```

## Verfügbare Optionen

| Option | Beschreibung |
|--------|--------------|
| `--no-install` | Überspringt die Installation von Abhängigkeiten |
| `--no-create-venv` | Bricht ab, wenn kein venv existiert (anstatt es zu erstellen) |
| `--venv <path>` | Verwendet ein alternatives venv (Standard: `backend/.venv`) |
| `--sql` | Dry-run: Generiert SQL in `alembic_output.sql` ohne Änderungen anzuwenden |
| `--stamp` | Markiert die DB als up-to-date ohne Schema-Änderungen |
| `--auto-stamp` | Führt automatisch `stamp head` aus, falls Schema bereits existiert |
| `-h, --help` | Zeigt Hilfe an |

## Erweiterte Verwendung

### Produktions-Datenbank mit anderer URL

```bash
DATABASE_URL="postgresql://user:pass@host/db" bash run_migrations.sh
```

**Wichtig:** Erstelle immer ein Backup vor der Ausführung auf Produktionsdaten!

### Dry-Run (SQL generieren ohne Anwendung)

```bash
bash run_migrations.sh --sql
```

Das generierte SQL wird in `alembic_output.sql` gespeichert und kann vor der Anwendung überprüft werden.

### Datenbank als "up-to-date" markieren

Falls das Schema bereits manuell erstellt wurde oder bereits korrekt ist:

```bash
bash run_migrations.sh --stamp
```

## Manuelle Alembic-Befehle

Falls du direkten Zugriff auf Alembic-Befehle benötigst:

### Aktuelle Revision anzeigen

```bash
backend/.venv/bin/alembic -c alembic.ini current
```

### Migrations-Historie anzeigen

```bash
backend/.venv/bin/alembic -c alembic.ini history --verbose
```

### Auf eine bestimmte Revision upgraden

```bash
backend/.venv/bin/alembic -c alembic.ini upgrade <revision>
```

### Auf eine bestimmte Revision downgraden

```bash
backend/.venv/bin/alembic -c alembic.ini downgrade <revision>
```

### Neue Migration erstellen (nach Model-Änderungen)

```bash
backend/.venv/bin/alembic -c alembic.ini revision --autogenerate -m "Beschreibung der Änderung"
```

## Troubleshooting

### "table already exists" Fehler

Falls Alembic versucht, bereits existierende Tabellen zu erstellen:

```bash
bash run_migrations.sh --auto-stamp
```

Dies erkennt automatisch, dass das Schema bereits existiert, und markiert die Migrationen als angewendet.

### "no such column" Fehler zur Laufzeit

Dies bedeutet, dass das Schema nicht mit den Models übereinstimmt. Überprüfe:

1. Aktuelle Alembic-Revision: `backend/.venv/bin/alembic -c alembic.ini current`
2. Sollte `0f2b58ea8f95 (head)` sein
3. Falls nicht, führe Migrationen aus: `bash run_migrations.sh`

### Schema prüfen (SQLite)

```bash
# Alle Tabellen anzeigen
sqlite3 magnetaraion.db '.tables'

# Struktur einer bestimmten Tabelle
sqlite3 magnetaraion.db 'PRAGMA table_info(users);'

# Alembic-Version prüfen
sqlite3 magnetaraion.db 'SELECT * FROM alembic_version;'
```

### Schema prüfen (PostgreSQL)

```bash
# Tabellen anzeigen
psql -d database_name -c "\dt"

# Struktur einer Tabelle
psql -d database_name -c "\d users"

# Alembic-Version
psql -d database_name -c "SELECT * FROM alembic_version;"
```

## Best Practices

### Vor Produktions-Migrationen

1. **Backup erstellen:**
   - SQLite: `cp magnetaraion.db magnetaraion.db.backup`
   - PostgreSQL: `pg_dump database_name > backup.sql`

2. **Dry-Run durchführen:**
   ```bash
   bash run_migrations.sh --sql
   ```
   Prüfe `alembic_output.sql` auf unerwartete Änderungen.

3. **Test in Staging-Umgebung:** Führe Migrationen zuerst in einer Test-Umgebung aus.

### Nach Model-Änderungen

1. Erstelle eine neue Migration:
   ```bash
   backend/.venv/bin/alembic -c alembic.ini revision --autogenerate -m "Add new field"
   ```

2. Überprüfe die generierte Migration in `backend/alembic/versions/`

3. Teste die Migration lokal:
   ```bash
   bash run_migrations.sh
   ```

4. Commit die neue Migration ins Repository

## Migrations-Historie

Die Migrationen werden in `backend/alembic/versions/` gespeichert:

1. `c3f798039793` - Initial migration (users, projects, issues, etc.)
2. `6f913a12175c` - Add roles table
3. `bb445797cabc` - Add project_users table
4. `c2a02942c3fc` - Add is_active to User model
5. `0f2b58ea8f95` - Add password_reset_tokens table (aktuell)

## Integration in run.sh

Falls du möchtest, dass Migrationen automatisch beim Start ausgeführt werden, kannst du in `run.sh` vor dem Uvicorn-Start folgendes hinzufügen:

```bash
echo "Running database migrations..."
bash run_migrations.sh --no-install
```

## Umgebungsvariablen

- `DATABASE_URL`: Überschreibt die Standard-Datenbank-URL aus `backend/app/settings.py`
- `VENV_DIR`: Überschreibt das Standard-venv-Verzeichnis (Standard: `backend/.venv`)

## Support

Bei Problemen mit Migrationen:
1. Prüfe die Alembic-Logs
2. Verifiziere die aktuelle Schema-Version
3. Erstelle bei Bedarf ein Backup und setze die Datenbank zurück

