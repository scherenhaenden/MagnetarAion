# Specification v1.8: Technical Architecture

This document outlines the technical architecture and stack for the MagnetarAion project.

## 1. Technology Stack

| Component | Technology | Version | Rationale |
| :--- | :--- | :--- | :--- |
| **Backend** | Python (FastAPI) | LTS stable | Development speed, strong typing with Pydantic, performance, and a rich ecosystem. |
| **Frontend** | Angular | LTS stable | Provides an enterprise-grade structure, comprehensive tooling, i18n support, and robust testing capabilities. |
| **Database** | PostgreSQL | Latest stable | ACID compliance, powerful JSONB support, extensibility (e.g., full-text search), and vertical scalability. |

## 2. Key Architectural Patterns

- **FE/BE Separation:** The frontend and backend will be developed and deployed as separate applications.
- **API-first:** The system will be designed with an API-first approach, using the OpenAPI specification for documentation.
- **Authentication:** Authentication will be handled using JWT or OAuth2.

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
- **Project:** Contains project-specific settings and fields (`key`, `name`, `ProjectFields`).
- **Issue:** The core entity, with core fields, custom fields (`IssueCustomFields[]`), time tracking data (`WorkItems[]`), and relationships (`Links[]`).
- **WorkItem:** Represents a single time log entry (`spent`, `category`, `author`, `at`).
- **Article:** The main entity for the Knowledge Base, with associated `Comment` and `Attachment` entities.
- **Board/Sprint:** (Future) Entities for managing Agile boards and sprints.
- **Gantt:** (Future) Dependencies will be managed through the `Links` on the `Issue` entity.
