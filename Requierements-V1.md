# Comprehensive Analysis of a Leading Issue Tracking System + Requirements Engineering Document
(Merge with “MagnetarAion Project – Initial Scope & Technical Vision v0.1”)

## Objective of the document.
- Consolidate an in-depth analysis of a leading issue tracking system (functional, technical, and operational) as a basis for Requirements Engineering.
- Fill critical "gaps" (Helpdesk/SLA, permissions, notifications, AI, Apps/Marketplace, expanded integrations, NFRs, operation, and governance).
- Integrate the initial scope of MagnetarAion and map parity/roadmap against existing systems.

---

## 1. A Leading System's Fundamental Capabilities

### 1.1 Issue as the central unit: creation, lifecycle, and attributes
- **Definition and versatility.** An issue is a flexible container (bug, task, feature, support ticket, HR request, etc.). It allows modeling diverse processes via custom fields and workflows (low-code + pro-code).
- **Issue creation.**
  - Manual (UI, shortcuts).
  - AI-assisted: text-to-issue, summaries, response suggestions.
  - Programmatic (REST API) for automatic ingestion (monitoring, forms, bots).
- **Attributes and attachments.**
  - Core fields (Summary, Description with rich text/Markdown, Project).
  - Standard fields (Type, Priority, State, Assignee).
  - Drag & drop attachments; complete traceability in history.
- **Search/queries.**
  - Semantic syntax (field:value pairs, aliases, logical and range operators).
  - `has:` (e.g., `has: attachments`), autocomplete, and highlighting.
  - Contextual search (by project/tag/saved search).
  - Same syntax in API (UI–programmatic parity).

### 1.2 Advanced management: collaboration, time tracking, and hierarchies
- **Collaboration.** @mentions, reactions, watch, configurable notifications, AI-powered summaries.
- **Time tracking.** Estimation vs. Time spent (derived from work items), entries via commands, IDEs, integrations; reports and timesheets.
- **Hierarchies and dependencies.** Parent–child (subtasks), effort aggregation to the parent; customizable links (depends on/duplicates/etc.).

### 1.3 Knowledge Base
- **Integrated documentation** (Markdown, rich media: images, videos, Google Docs, Figma, Mermaid, LaTeX).
- Inline comments, version history, drafts, export (PDF/MD).
- Hierarchical tree, drag & drop, public pages (guest), and per-article permissions.

---

## 2. Agile Frameworks and Planning

### 2.1 Agile boards (Scrum/Kanban/Scrumban)
- **Components:** columns↔state, swimlanes (e.g., by epic, assignee), cards with configurable visible fields, real-time updates.
- **Ready-made templates** (Scrum/Kanban/Version-based/Custom).

### 2.2 Scrum
- **Backlog** (saved search), drag & drop prioritization.
- **Sprints** with dates; automatic carry-over.
- **Burndown** by issues, story points/time, or work items.

### 2.3 Kanban
- **Columns** as stages; WIP limits and alerts.
- **Cumulative Flow Diagram**; support for pull systems (ready-to-pull).

### 2.4 Temporal planning and execution
- **Interactive Gantt:** dependencies (via issue links), drag/drop, recalculation.
- **Dashboards:** report widgets (burndown/CFD/time), lists, notes, executive views.
- **Portfolio/multi-project:** cross-cutting epics, master Gantt, aggregated views.

---

## 3. Customization and Automation

### 3.1 Custom fields (expandable data model)
- **Types:** string, text, date, date&time, period, int, float, enum, user, group, state (with isResolved), version, build, ownedField.
- **Levels:** CustomField (global definition) → ProjectCustomField (per-project config) → IssueCustomField (value in an issue).
- **Global/project management,** shared or specific values.

### 3.2 Workflows (no-code / pro-code)
- **Visual builder** (no-code) for typical rules.
- **JavaScript** (modern ECMAScript) with a dedicated scripting API (e.g., `@magnetaraion/scripting-api`) providing access to entities, date-time functions, HTTP requests, and notifications.
- **Types:** on-change, on-schedule, state-machine, action.
- **Libraries** of default and reusable workflows.

### 3.3 Apps / Marketplace (extension)
- **Apps package:** UI widgets (extension points), HTTP endpoints, workflows, SLA rules, importers, reports.
- **Installation/update** from Marketplace; governance of third parties (security/licenses).

### 3.4 Configuration Governance (recommended)
- **Naming conventions** (projects/states/versions).
- **Workflow versioning,** PR/review of scripts, sandboxes.
- **RACI for changes;** config deployment schedule.

---

## 4. Integrations and Connectivity

### 4.1 VCS
- **GitHub/GitLab/Bitbucket/Gogs/Gitea/Azure Repos.**
- **Commits ↔ issues** (references in message or branch), commands in commit, PR/MR status embedded in the issue.

### 4.2 CI/CD
- **TeamCity (deep):** fixed-in-build, commands by build, VCS changes.
- **Jenkins/GitHub Actions/GitLab CI/Azure Pipelines:** via plugins/webhooks/API.

### 4.3 IDE Integrations
- **Tasks within the IDE,** issues window, deep-links from stack traces, time tracking.

### 4.4 Chat/ITSM/CRM/Tests
- **Slack/Telegram** (notifs/actions).
- **Zendesk** bidirectional; no-code connectors (Albato/Onlizer) to CRM/marketing.
- **Test management** (TestRail/Qase/…): links, bug creation on test failure.

### 4.5 REST API
- **CRUD of issues/projects/users,** filters with the same syntax as UI.
- **Tokens and OAuth 2.0;** pagination and rate limits (define in NFRs).
- **Schema and examples;** Postman collection and OpenAPI (best practices).

### 4.6 Importers/migration
- **Jira, GitHub/GitLab Issues, Redmine, Zendesk, Bugzilla, Mantis, Trac, Confluence.**
- **Continuous import (sync)** vs. one-time; mapping of fields/users/states.

---

## 5. Administration, Security, Deployment

### 5.1 Access and permissions
- **Model:** Roles (collections of permissions) assigned to users/groups at a global and per-project level; inherent permissions (creator can read).
- **Base roles:** System Admin / Project Admin / Contributor / Issue Creator / Observer + custom.
- **Matrix (simplified example):**
| Role | Create/Edit Issues | Config. Project | View KB | Edit KB | Admin users |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **System Admin** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Project Admin** | ✓ | ✓ (scoped) | ✓ | ✓ | — |
| **Contributor** | ✓ | — | ✓ (if granted) | — | — |
| **Issue Creator** | Create + comment own | — | ✓ (if granted) | — | — |
| **Observer** | View | — | View | — | — |

### 5.2 Authentication and security
- **SSO (SAML 2.0 / OIDC), OAuth 2.0** (Google/GitHub/Azure AD…), **2FA** (mandatory by group if required).
- **Cloud:** encryption at rest (AWS), managed HTTPS; **Server:** customer's responsibility (TLS, disks, firewalls).

### 5.3 Notifications
- **Channels:** email (Freemarker templates), in-app, Slack/Telegram.
- **Subscriptions by user** (saved searches, tags, events).
- **Notifications via Workflows** (custom email).

### 5.4 Cloud vs Server (strategic decision)
- **Cloud:** Managed SaaS (automatic updates/backups/scaling), limitations with closed on-prem services.
- **Server:** Total data control, LAN integration, requires own operation/updates/backups.
- **Migration:** Cloud↔Server, and from third parties (importers).

### 5.5 NFRs (non-functional) recommended
- **Security/compliance:** SSO/2FA; GDPR (retention, anonymization/deletion); visibility control KB/Issues.
- **Performance:** p95 < 2s on typical searches; incremental indexing; API limits and backpressure.
- **Availability:** RTO/RPO defined (Cloud: managed; Server: own policy); daily backup + restoration tests.
- **Observability:** audit logs, metrics, alerts (CPU/RAM/queues), tracing in integrations.
- **Accessibility/localization:** multilingual UI; screen reader compatibility; mobile with push.

### 5.6 Operation (Server)
- **HW/SW requirements,** installation (JAR/ZIP/Docker), HTTPS, SMTP, attachment storage.
- **DEV/UAT/PROD environments,** config promotion, maintenance windows.

---

## 6. Helpdesk & SLA (integrated module)
- **User types:** Unlimited Reporters (external, no cost), Agents (3 free; then licenses), Standard Users.
- **Bidirectional email,** response templates, macros.
- **SLA:** first response/resolution; pauses; automatic escalations.
- **KPIs:** tickets by priority, reopened, time to first response/resolution; support dashboards.
- **Example of SLA requirements**
  - **SLA-1:** 1st response < 1h (Critical), < 4h (High) during business hours.
  - **SLA-2:** Reopening restarts resolution SLA; exclusion of customer waiting time.
  - **SLA-3:** Escalation to L2 after 8h without update; notice to Slack channel.

---

## 7. Licensing and TCO (high level)
- **Free ≤10 users** (full core + 3 helpdesk agents).
- **Cloud:** subscription per user/month (volume/startup/NGO/education discounts).
- **Server:** perpetual license per pack + annual maintenance; CAPEX/OPEX control.
- **Evaluate TCO** vs. multiple ecosystems (e.g., Jira+Confluence+Service Desk) by replacing tools.

---
---

## PART B — MagnetarAion: Initial Scope & Technical Vision (Merge + Mapping)

*This section integrates the document “MagnetarAion Project – Initial Scope and Technical Vision (v0.1)” translated and aligned to the requirements framework.*

### B.1 Project Goal
Develop **MagnetarAion**, a modern issue tracking and project management system comparable to other leading systems, focused on early usability, and a scalable and extensible architecture.

### B.2 Core Functional Requirements (MVP – Must-Have)
- **Users and Projects**
  - Registration/login; roles: Administrator, Developer, Reporter (and extensible).
  - Create Projects (name, key, description).
  - Assign teams to projects.
- **Issues (Tickets)**
  - Create / view / edit.
  - Core fields: Title, Description, Assignee, Reporter, Priority (High/Med/Low), State (Open/In Progress/Resolved/Closed), Type (Bug/Feature/Task).
  - Activity/Comments + change history.
- **Search/Filtering** by Project, Assignee, State, Type.
- **Workflow**
  - Basic transitions: Open→In Progress→Resolved→Closed (with minimal validations).

### B.3 Technical Architecture and Stack
| Component | Technology | Version | Rationale |
| :--- | :--- | :--- | :--- |
| **Backend** | **Python** (FastAPI or Django REST) | LTS stable | Development speed, ecosystem, typing + Pydantic/FastAPI. |
| **Frontend** | **Angular** | LTS stable | Enterprise structure, tooling, i18n, testing. |
| **DB** | **PostgreSQL** (recommended) | — | ACID, JSONB, extensions (TS vector for search), vertical scalability. |

- **Key Patterns**
  - FE/BE separation, API-first (OpenAPI), JWT/OAuth2 authentication.
  - **Infra:** Docker Compose (dev) → Kubernetes (prod) in the medium term.
  - **Observability:** structured logs (JSON), metrics (Prometheus), tracing (OTel).

### B.4 Quality and Testing Principles
- **TDD/ATDD** when feasible.
- **Unit, integration, e2e (Cypress/Playwright), API (contract tests) coverage.**
- **CI (GitHub Actions)** from day 1; tests + lint + SCA + containers.

### B.5 Iterative Development and Early Usability
- **Minimum Usable Feature Set:** create/view issue cycle + comments + basic filter for the team to manage its own backlog ASAP.
- **Small, deployable deliveries** (feature flags if applicable).

### B.6 External Integration: GitHub (Early Phase)
- **V1:** link project with repo/Project Board; show links.
- **V2:** auto-link commits/branch→issue by convention in messages.
- **V3:** selective synchronization of users/activity (opt-in).

### B.7 Parity & Roadmap against Leading Systems
- **Capability Map (partial)**
| Area | Leading Systems (reference) | MagnetarAion – MVP | M1 (3–4 sprints) | M2 (6–8 sprints) |
| :--- | :--- | :--- | :--- | :--- |
| **Issue Model** | Core + custom fields | Core fields | Basic custom fields (enum/text/date) | Advanced types (state/version/build/owned) |
| **Search** | Rich language, `has:` | Basic filters | Simple Query DSL + autocomplete | DSL parity + API filters |
| **Collaboration**| @mention, reactions | Comments | @mention + in-app notifs | Templates, AI (summary) |
| **Time Tracking**| Estimation/work items | — | Work items + basic time report | Timesheets + categories |
| **Agile** | Scrum/Kanban Boards | — | Basic Kanban (columns=state) | Scrum (sprints, burndown) |
| **Gantt** | Interactive | — | Static report | Interactive Gantt with dependencies |
| **KB** | Integrated Wiki | — | Markdown pages | Tree, inline comments, public |
| **Helpdesk/SLA**| External tickets, 3 agents| — | Mail-in → create tickets | SLA, macros, portal |
| **Notifications**| Email/Slack/Telegram | In-app | Templated Email | Slack integration |
| **Security** | SSO/2FA, fine permissions| Basic roles | Granular matrix per project | SSO/OIDC + 2FA |
| **API** | Full REST | Basic REST CRUD | OpenAPI + tokens | Rate limits + webhooks |
| **Integrations**| VCS/CI/IDE/CRM | GitHub link | Commits→issue | PR/MR status, CI hooks |
| **Apps/Workflows**| No-code + JS | — | Basic rules (no-code) | JS Scripts + internal Marketplace |

- **Proposed Milestones**
  - **MVP (Sprints 1–3):** Users/roles, projects, core issues, comments, basic filters, CRUD API, CI.
  - **M1 (Sprints 4–7):** Kanban, initial custom fields, email notifs, GitHub commits→issue, basic time tracking, per-project roles.
  - **M2 (Sprints 8–12):** Scrum (sprints/burndown), static→interactive Gantt, search DSL, basic KB, Helpdesk mail-in, advanced API with webhooks, no-code rules.
  - **M3 (Sprints 13+):** SLA, public KB/helpdesk portal, SSO/2FA, Apps/JS workflows, internal Marketplace, expanded CI integrations.

### B.8 Non-Functional Requirements (MagnetarAion)
- **Must**
  - **Security:** JWT/OAuth2, secure hashing, RBAC per project, auditing.
  - **Performance:** p95 < 2s on lists of 1–5k issues; pagination; indexes.
  - **Availability:** daily backups, tested restoration; health checks; zero-downtime deploy (blue/green).
  - **Observability:** structured logs, metrics (latency, errors, queues), alerts.
- **Should**
  - **Accessibility** WCAG AA; i18n (ES/EN/DE); mobile apps (PWA) in the medium term.
  - **CSV/PDF export;** minimal importers (Jira/GitHub).
- **Could**
  - **AI:** text-to-issue, thread summaries, priority classifier.
  - **Configuration sandboxes;** feature flags.
- **Won’t (now)**
  - **Hard multi-tenancy** with DB isolation (later phase).
  - **Active-active clustering** (post-PMF).

### B.9 User Stories (samples with acceptance criteria)
- **Create issue (PM/Dev)**
  - *Given* I am in a project, *when* I complete Title/Description/Type/State/Assignee, *then* the issue is created and appears in the list with a unique ID; and the history records the action.
- **Filter issues**
  - *Given* a list of >1000 issues, *when* I filter by Assignee=me AND State!=Closed, *then* the response arrives in <2s p95, and the filter can be saved as a view.
- **Kanban WIP**
  - *Given* WIP=5 in “In Progress”, *when* I try to move the 6th card, *then* I receive a visual alert; if WIP is hard, the move is blocked.
- **Commit→Issue (GitHub)**
  - *Given* a commit with “AION-123”, *when* it is pushed to main, *then* issue AION-123 shows the linked commit and updates the activity stream.

### B.10 Data Model (summary)
- **User, Group, Role, Permission (RBAC).**
- **Project** (key, name, settings, ProjectFields).
- **Issue** (core fields + IssueCustomFields[], WorkItems[], Links[]).
- **WorkItem** (spent, category, author, at).
- **Article (KB)** + Comment, Attachment.
- **Board/Sprint** (future), Gantt (dependencies by Links).

### B.11 Risks & Early Decisions
- **Cloud vs On-prem** (for existing systems) and **SaaS vs Self-host** (for Aion).
- **Configuration governance** (avoid config sprawl).
- **Notifications** (noise vs. visibility).
- **AI Privacy** (sensitive data).
- **TCO** (replacing other tools vs. build-cost of Aion).

### Conclusion
This analysis of a leading issue tracking system sets the right focus: the issue as a flexible unit, powerful automation, and an ecosystem of integrations, with KB/Helpdesk as TCO accelerators. The merge adds: Helpdesk+SLA, fine-grained permissions, notifications/templates, AI, Apps/Marketplace, importers, NFRs, and operation. The MagnetarAion section is now integrated and mapped to a pragmatic roadmap to achieve progressive parity and ensure early usability.
