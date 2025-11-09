# Project Rules and Conventions

This document outlines the coding standards, conventions, and architectural rules for the MagnetarAion project. Adherence to these rules is mandatory to ensure code quality, consistency, and maintainability.

## Frontend (Angular)

### TypeScript

#### Classes
- **Documentation**: Every class must have a detailed JSDoc comment explaining its purpose, responsibilities, and how it interacts with other parts of the application.
- **Access Modifiers**: All class members (properties and methods) must have an explicit access modifier (`public`, `private`, or `protected`).
- **Readonly**: Use the `readonly` modifier for properties that should not be changed after initialization.

#### Methods
- **Return Types**: All methods must have an explicit return type.
- **Documentation**: All public methods must have a JSDoc comment explaining what the method does, its parameters (`@param`), and what it returns (`@returns`).

#### Variables
- **Access Modifiers**: All class properties must have an explicit access modifier (`public`, `private`, or `protected`).

### Component Structure
- **Standalone Components**: All new components should be created with `standalone: true`.
- **Imports**: Necessary modules like `CommonModule` must be included in the component's `imports` array.

### Services
- **API Communication**: Services must use the centralized `ApiService` for all backend HTTP requests. Direct use of `HttpClient` is forbidden, with the sole exception of `ConfigService`.
- **Endpoint Constants**: Each service should define a `const` for its specific API endpoint path.

### Styling (SCSS)
- **BEM Convention**: CSS classes must follow the Block, Element, Modifier (BEM) naming convention.
- **7-1 Pattern**: The SCSS is structured using the 7-1 architectural pattern.

## Backend (Python)

### General
- **Type Hinting**: All function and method signatures must include type hints for arguments and return values.
- **Docstrings**: Every module, class, and function must have a comprehensive docstring explaining its purpose.

### FastAPI
- **Database Sessions**: API endpoints must use the centralized `get_db` dependency function to manage database sessions.
- **CORS**: CORS is configured to allow requests from the Angular frontend.

### Database (SQLAlchemy)
- **Password Hashing**: Passwords must be securely hashed using `passlib` with `bcrypt` before being stored. The hashing logic is encapsulated in `backend/app/core/security.py`.
- **Enums**: Use Python `Enums` for model fields with a predefined set of choices (e.g., status, priority) to ensure data consistency.
- **Migrations**: Database migrations are managed with Alembic.
    - Before creating a new migration, ensure the database is upgraded to the latest version (`python -m alembic -c alembic.ini upgrade head`).
    - Generate migrations using `python -m alembic -c alembic.ini revision --autogenerate -m "<description>"`.
    - Manually review all generated migration scripts to ensure they only contain intended changes.

## General Project Rules

### Testing
- **Mandatory Tests**: All new code and functionality must be accompanied by corresponding tests.
- **TDD Preference**: A Test-Driven Development (TDD) approach is highly preferred.

### Security
- **No Hardcoded Secrets**: Secrets must not be committed to the repository. The `kubernetes/secrets.yml` file is explicitly gitignored.

### Version Control
- **Gitflow**: We use Gitflow for branching. All feature development should happen in `feature/` branches.
- **Commit Messages**: Commit messages should follow the Conventional Commits specification.
