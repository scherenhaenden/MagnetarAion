# Data Layer Plan

This document outlines the plan for the data layer of the MagnetarAion application. It covers schema versioning, data migration, and support for multiple database systems.

## 1. Core Principles

- **Reliability:** The data layer must be reliable and ensure data integrity.
- **Flexibility:** The design should support multiple database backends (e.g., SQLite for development, PostgreSQL for production).
- **Scalability:** The data layer should be designed to handle future growth.
- **Maintainability:** Schema changes and data migrations must be easy to manage.

## 2. Technology Stack

- **SQLAlchemy:** Used as the core ORM for interacting with the database.
- **Alembic:** For database schema migrations.
- **Pydantic:** For data validation and settings management.

## 3. Configuration

Database connection settings will be managed in `backend/app/settings.py` to centralize configuration. This will allow for easy switching between different database backends.

```python
# backend/app/settings.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./magnetaraion.db"
    # other settings...

settings = Settings()
```

The `backend/app/database.py` file will be updated to use this configuration.

```python
# backend/app/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from .settings import settings

engine = create_engine(
    settings.DATABASE_URL, connect_args={"check_same_thread": False} # check_same_thread is only for sqlite
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
```

## 4. Schema Versioning and Data Migration

Alembic will be used to manage database schema migrations.

### 4.1. Initial Setup

1.  **Install Alembic:** `pip install alembic`
2.  **Initialize Alembic:** `alembic init alembic` in the `backend` directory.
3.  **Configure Alembic:**
    -   Update `alembic.ini` to point to the database URL from the application settings.
    -   Modify `alembic/env.py` to use the SQLAlchemy `Base` from the application's models.

### 4.2. Migration Workflow

1.  **Generate a new migration:** `alembic revision --autogenerate -m "Description of changes"`
2.  **Review the migration script:** Manually inspect the generated script in the `alembic/versions` directory to ensure correctness.
3.  **Apply the migration:** `alembic upgrade head`

## 5. Multi-database Support

The application will be designed to support both SQLite and PostgreSQL.

-   **SQLite:** Used for local development and testing due to its simplicity.
-   **PostgreSQL:** The recommended database for production environments due to its robustness and feature set.

The `DATABASE_URL` in the settings will be the single point of configuration for switching between databases. For example:

-   SQLite: `sqlite:///./magnetaraion.db`
-   PostgreSQL: `postgresql://user:password@host:port/database`

The `create_engine` call in `database.py` will need to be adjusted to handle different database connection arguments.

## 6. Data Access Layer

The existing `get_db` dependency in `dependencies.py` will continue to be used to provide database sessions to the API endpoints. This ensures that the session is properly managed and closed after each request.

## 7. Testing

-   Backend tests will use a separate in-memory SQLite database to ensure test isolation.
-   The `DATABASE_URL` for the test environment will be overridden in the test configuration.
