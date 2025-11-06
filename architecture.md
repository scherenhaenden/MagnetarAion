# Technical Architecture

This document outlines the technical architecture and stack for the MagnetarAion project.

## 1. Technology Stack

| Component | Technology | Version | Rationale |
| :--- | :--- | :--- | :--- |
| **Backend** | Python (FastAPI) | Latest LTS | Development speed, strong typing with Pydantic, performance, and a rich ecosystem. |
| **Frontend** | Angular | Latest LTS | Provides an enterprise-grade structure, comprehensive tooling, i18n support, and robust testing capabilities. |
| **Database** | PostgreSQL | Latest Stable | ACID compliance, powerful JSONB support, extensibility (e.g., full-text search), and vertical scalability. |

## 2. Key Architectural Patterns

- **FE/BE Separation:** The frontend and backend will be developed and deployed as separate applications.
- **API-first:** The system will be designed with an API-first approach, using the OpenAPI specification for documentation.
- **Authentication:** Authentication will be handled using JWT or OAuth2.

### 2.1. Frontend Architecture

The Angular frontend follows a modern, scalable architecture based on standalone components and a centralized service layer for API communication.

-   **Generic ApiService:** A centralized `ApiService` (`src/app/services/api.service.ts`) provides a single, reusable interface for all backend HTTP requests (GET, POST, PUT, DELETE). It is strongly typed and handles the construction of requests, including base URL, headers, and parameters, while also providing a generic error handling pipeline.

-   **HTTP Interceptors:** To keep the `ApiService` and component logic clean, request and response manipulations are handled globally using functional HTTP interceptors:
    -   **`HttpTokenInterceptor`:** Automatically attaches the user's JWT authentication token (from `localStorage`) to the `Authorization` header of all outgoing requests. This decouples authentication logic from individual service calls.
    -   **`HttpErrorInterceptor`:** Provides centralized error handling for all HTTP responses. It catches client-side and server-side errors, logs them to the console, and returns a user-friendly error message, preventing code duplication in components.

## 3. Infrastructure and Deployment

- **Development Environment:** Docker Compose will be used to orchestrate the development environment.
- **Production Environment:** The target for production deployment is Kubernetes in the medium term.

## 4. Observability

- **Structured Logs:** All services will produce structured logs in JSON format.
- **Metrics:** Prometheus will be used for collecting and storing metrics.
- **Tracing:** OpenTelemetry will be used for distributed tracing.

## 5. Quality and Testing Principles

- **Test-Driven Development (TDD):** TDD and Acceptance Test-Driven Development (ATDD) will be practiced where feasible.
- **Comprehensive Test Coverage:** The project will aim for high test coverage, including:
  - Unit tests
  - Integration tests
  - End-to-end (E2E) tests (using Cypress or Playwright)
  - API contract tests
- **Continuous Integration (CI):** A CI pipeline will be set up from the beginning of the project (using GitHub Actions) to automate testing, linting, security analysis (SCA), and container builds.

## 6. High-Level Data Model

- **User, Group, Role, Permission:** Forming the basis of the RBAC system.
- **Project:** Contains project-specific settings and fields (`key`, `name`) and custom fields (`ProjectCustomFields[]`).
- **Issue:** The core entity, with core fields, custom fields (`IssueCustomFields[]`), time tracking data (`WorkItems[]`), and relationships (`Links[]`).
- **WorkItem:** Represents a single time log entry (`spent`, `category`, `author`, `at`).
- **Article:** The main entity for the Knowledge Base, with associated `Comment` and `Attachment` entities.
- **Board/Sprint:** (Future) Entities for managing Agile boards and sprints.
- **Gantt:** (Future) Dependencies will be managed through the `Links` on the `Issue` entity.
