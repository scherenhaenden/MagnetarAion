# Specification v1.4: Integrations and Connectivity

This document specifies the integration and connectivity capabilities of the MagnetarAion system.

## 1. Version Control Systems (VCS)

### 1.1. Supported Platforms
- The system will integrate with the following VCS platforms:
  - GitHub
  - GitLab
  - Bitbucket
  - Gogs
  - Gitea
  - Azure Repos

### 1.2. Integration Features
- **Commit-to-Issue Linking:** Commits can be linked to issues by referencing the issue ID in the commit message or branch name.
- **Commands in Commits:** The system will support commands in commit messages to manipulate issues (e.g., change state, add a comment).
- **Pull/Merge Request Status:** The status of pull/merge requests will be embedded and visible within the corresponding issue.

## 2. CI/CD Systems

### 2.1. Supported Platforms
- **Deep Integration:** A deep integration with TeamCity will be provided, showing "fixed-in-build" information, supporting commands triggered by builds, and displaying VCS changes.
- **Standard Integration:** Integration with Jenkins, GitHub Actions, GitLab CI, and Azure Pipelines will be supported via plugins, webhooks, or the API.

## 3. IDE Integrations

- **In-IDE Functionality:** The system will offer IDE integrations that provide:
  - A task/issue window within the IDE.
  - Deep links from stack traces to issues.
  - Time tracking capabilities directly from the IDE.

## 4. Other Integrations

- **Chat Platforms:** Notifications and actions will be available through Slack and Telegram.
- **ITSM/CRM:**
  - Bidirectional integration with Zendesk.
  - No-code connectors (e.g., Albato, Onlizer) for integration with various CRM and marketing platforms.
- **Test Management:**
  - The system will link to test management tools (e.g., TestRail, Qase).
  - Bugs can be automatically created when a test fails.

## 5. REST API

### 5.1. Functionality
- The REST API will provide full CRUD (Create, Read, Update, Delete) operations for issues, projects, users, and other system entities.
- The same powerful search and filtering syntax used in the UI will be available through the API.

### 5.2. Authentication and Security
- **Authentication:** The API will support token-based authentication and OAuth 2.0.
- **Rate Limiting:** Pagination and rate limits will be implemented to ensure API stability and fair usage.

### 5.3. Documentation
- **OpenAPI:** The API will be documented using the OpenAPI specification.
- **Resources:** A Postman collection and other examples will be provided to facilitate API adoption.

## 6. Importers and Migration

- **Supported Sources:** The system will provide importers for migrating data from:
  - Jira
  - GitHub/GitLab Issues
  - Redmine
  - Zendesk
  - Bugzilla
  - Mantis
  - Trac
  - Confluence
- **Import Modes:**
  - **One-time Import:** For initial migration.
  - **Continuous Import (Sync):** To keep data synchronized from another source over time.
- **Data Mapping:** The importers will allow for the mapping of fields, users, and states between the source and target systems.
