# Specification v1.9: Roadmap and Non-Functional Requirements (NFRs)

This document outlines the proposed product roadmap and the non-functional requirements for the MagnetarAion system.

## 1. Product Roadmap

The development of MagnetarAion is planned in several phases, starting with a Minimum Viable Product (MVP) and progressing through a series of milestones (M1, M2, M3).

### 1.1. Capability Map

| Area | MVP (Sprints 1–3) | M1 (Sprints 4–7) | M2 (Sprints 8–12) | M3 (Sprints 13+) |
| :--- | :--- | :--- | :--- | :--- |
| **Issue Model** | Core fields | Basic custom fields (enum/text/date) | Advanced types (state/version/build/owned) | - |
| **Search** | Basic filters | Simple Query DSL + autocomplete | DSL parity + API filters | - |
| **Collaboration**| Comments | @mention + in-app notifs | Templates, AI (summary) | - |
| **Time Tracking**| — | Work items + basic time report | Timesheets + categories | - |
| **Agile** | — | Basic Kanban (columns=state) | Scrum (sprints, burndown) | - |
| **Gantt** | — | Static report | Interactive Gantt with dependencies | - |
| **KB** | — | Markdown pages | Tree, inline comments, public | - |
| **Helpdesk/SLA**| — | Mail-in → create tickets | SLA, macros, portal | Public helpdesk portal |
| **Notifications**| In-app | Templated Email | Slack integration | - |
| **Security** | Basic roles | Granular matrix per project | SSO/OIDC + 2FA | - |
| **API** | Basic REST CRUD | OpenAPI + tokens | Rate limits + webhooks | - |
| **Integrations**| GitHub link | Commits→issue | PR/MR status, CI hooks | Expanded CI integrations |
| **Apps/Workflows**| — | Basic rules (no-code) | JS Scripts + internal Marketplace | - |

### 1.2. Proposed Milestones

- **MVP (Sprints 1–3):** Focus on the core functionality of user and project management, issue creation and tracking, basic search, a simple API, and setting up the CI pipeline.
- **M1 (Sprints 4–7):** Introduce Kanban boards, basic custom fields, email notifications, deeper GitHub integration (commit-to-issue), basic time tracking, and more granular, per-project roles.
- **M2 (Sprints 8–12):** Add Scrum support (sprints, burndown charts), interactive Gantt charts, an advanced search DSL, a basic Knowledge Base, and Helpdesk mail-in capabilities. The API will be enhanced with webhooks, and a no-code workflow builder will be introduced.
- **M3 (Sprints 13+):** Implement SLAs, a public Knowledge Base and Helpdesk portal, SSO/2FA, and a pro-code (JavaScript) workflow engine with an internal Marketplace for apps.

## 2. Non-Functional Requirements (NFRs)

### 2.1. Must-Have
- **Security:**
  - Authentication via JWT/OAuth2.
  - Secure password hashing.
  - Role-Based Access Control (RBAC) on a per-project basis.
  - Comprehensive auditing of user actions.
- **Performance:**
  - Page load and API response times (p95) should be less than 2 seconds for lists of up to 5,000 issues.
  - Efficient pagination for all lists.
  - Proper database indexing.
- **Availability:**
  - Daily backups with a tested restoration procedure.
  - Health checks for all services.
  - Zero-downtime deployments (e.g., using blue/green).
- **Observability:**
  - Structured logs for all services.
  - Key metrics on latency, error rates, and queue depths.
  - Alerts for critical system events.

### 2.2. Should-Have
- **Accessibility:** Compliance with WCAG 2.1 AA standards.
- **Internationalization (i18n):** Support for multiple languages (initially English, Spanish, and German).
- **Mobile Access:** A Progressive Web App (PWA) for mobile access in the medium term.
- **Data Portability:**
  - Export to CSV and PDF formats.
  - Minimal importers for Jira and GitHub Issues.

### 2.3. Could-Have
- **AI-Powered Features:**
  - Text-to-issue creation.
  - Summarization of long issue threads.
  - Automatic priority classification.
- **Configuration Sandboxes:** A safe environment for testing configuration changes before deploying them to production.
- **Feature Flags:** To enable or disable features at runtime.

### 2.4. Won't-Have (for now)
- **Hard Multi-tenancy:** With complete database isolation. This will be considered in a later phase.
- **Active-Active Clustering:** This will be considered after the product has achieved market fit.
