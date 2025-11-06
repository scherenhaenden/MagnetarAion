# MagnetarAion Project

[![Backend CI](https://github.com/scherenhaenden/MagnetarAion/actions/workflows/backend.yml/badge.svg)](https://github.com/scherenhaenden/MagnetarAion/actions/workflows/backend.yml)
[![Frontend CI](https://github.com/scherenhaenden/MagnetarAion/actions/workflows/frontend.yml/badge.svg)](https://github.com/scherenhaenden/MagnetarAion/actions/workflows/frontend.yml)

## 🎯 Project Goal

To develop **MagnetarAion**, a modern, highly functional, and user-friendly issue tracking and project management system comparable to other leading systems.

## 📝 Feature Status

This table provides a high-level overview of the implementation status of MagnetarAion's features, based on the roadmap outlined in the project's requirements documentation.

| Feature Area | Status | Details |
| :--- | :--- | :--- |
| **Core Issue Management** | | |
| Issue Model (Core Fields) | In Progress | Create, view, and edit issues with core fields (Title, Description, Assignee, Reporter, Priority, State, Type). |
| Issue Model (Custom Fields) | Not Started | Basic custom fields (enum/text/date) planned for M1. |
| Search (Basic Filters) | Next Up | Basic filtering by Project, Assignee, State, and Type. |
| Search (Advanced Query DSL) | Not Started | A more powerful query language is planned for M1. |
| Collaboration (Comments) | In Progress | Users can comment on issues and view a history of changes. |
| Collaboration (@mentions) | Not Started | @mentions and in-app notifications are planned for M1. |
| Time Tracking | Not Started | Basic time tracking (work items) is planned for M1. |
| **Agile Frameworks** |
| Agile Boards (Kanban) | Next Up | A basic Kanban board is planned for M1. |
| Agile Boards (Scrum) | Not Started | Scrum boards with sprints and burndown charts are planned for M2. |
| Gantt Charts | Not Started | A static Gantt chart report is planned for M1, with an interactive version in M2. |
| **Knowledge Base** |
| Knowledge Base | Not Started | A basic Markdown-based knowledge base is planned for M1. |
| **Helpdesk & SLA** |
| Helpdesk (Mail-in) | Not Started | The ability to create tickets from emails is planned for M2. |
| SLA Management | Not Started | SLA tracking and management are planned for M3. |
| **Integrations** |
| GitHub Integration | Not Started | Basic repository linking is planned for the MVP. |
| **Administration & Security** |
| Users and Projects | In Progress | User authentication, project creation, and team assignment. |
| Security (Basic Roles) | In Progress | Basic roles (Admin, Developer, Reporter). |
| Security (Advanced) | Not Started | Granular permissions, SSO, and 2FA are planned for M2/M3. |
| **API** |
| REST API (CRUD) | In Progress | Basic REST API for CRUD operations on issues. |

## ⚙️ Technical Architecture and Stack

| Component  | Technology                             |
| :--- |:--- |
| **Backend**  | **Python** (FastAPI)    |
| **Frontend** | **Angular**                            |
| **Database** | **PostgreSQL** (recommended)           |

## 🛡️ Quality and Testing Principles

Testing is a critical, non-negotiable component of the development process. We will follow a Test-Driven Development (TDD) approach and ensure comprehensive test coverage, including unit, integration, end-to-end (E2E), and API tests.

## 🚀 Iterative Development and Early Usability

The development process will prioritize the delivery of a Minimum Usable Feature Set to allow the team to use the tool to manage its own development process as early as possible.
