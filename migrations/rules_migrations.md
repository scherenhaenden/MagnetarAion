# Migration Rules

This document outlines the process for creating and documenting database migrations.

## Non-Destructive Migrations

All database migrations **must be non-destructive**. This means that operations like dropping tables or columns are strictly forbidden unless a detailed data migration plan has been approved. The primary goal is to preserve existing data.

## Migration Summaries

For each set of migrations, a summary file must be created in this directory. The file name should follow the format `yyyyMMdd.md`, where `yyyy` is the four-digit year, `MM` is the two-digit month, and `dd` is the two-digit day (e.g., `20231109.md`).

Each summary file should include:
- The new database version.
- A detailed description of the changes included in the migration.

## Flyway-Style Migration Process

The migration system follows a process similar to Flyway. Migrations are applied sequentially. If a database is multiple versions behind, each migration must be applied in order to reach the latest version. This ensures that the database schema evolves correctly and no steps are missed.
