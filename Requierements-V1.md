## 🌠 MagnetarAion Project - Initial Scope and Technical Vision Document (v0.1 - Temporal)

This document serves as the **very first draft** outlining the essential requirements, initial technical stack, and foundational principles for the **MagnetarAion** project. It is a **temporal and living document (Version 0.1)** and is expected to evolve significantly as the project matures, requirements are refined, and initial user feedback is incorporated.

### 🎯 Project Goal

To develop a modern, highly functional, and user-friendly issue tracking and project management system comparable to tools like YouTrack, named **MagnetarAion**.

### 📝 Core Functional Requirements (Must-Haves for Initial Release)

The initial version of MagnetarAion must focus on delivering **core, usable functionalities as early as possible** to facilitate iterative development and early integration.

* **User and Project Management:**
* **User Authentication/Authorization:** Ability for users to sign up, log in, and be assigned roles (e.g., Administrator, Developer, Reporter).
* **Project Creation:** Ability to create distinct **Projects** with unique names, keys, and descriptions.
* **Team Assignment:** Ability to assign users to specific Projects.
* **Issue Tracking (The "Ticket" System):**
* **Issue Creation/Viewing:** Ability for users to **create, view, and edit Issues** (or "Tickets") within a Project.
* **Core Issue Fields:** Each Issue must have: a **Title**, a detailed **Description**, an **Assignee**, a **Reporter**, a **Priority** (e.g., High, Medium, Low), a **State** (e.g., Open, In Progress, Resolved), and a **Type** (e.g., Bug, Feature, Task).
* **Activity/Comments:** Ability to add **comments and view the history** of changes (activity stream) on an Issue.
* **Basic Filtering/Search:** Ability to search and filter Issues based on Project, Assignee, State, and Type.
* **Workflow:**
* **Basic State Transitions:** Defined, simple workflow allowing Issues to move through key States (e.g., Open → In Progress → Resolved → Closed).

### ⚙️ Technical Architecture and Stack

MagnetarAion will be built using a **modern, separate Backend and Frontend architecture** to ensure scalability, maintainability, and a responsive user experience.

| Component | Technology | Version | Rationale |
| :--- | :--- | :--- | :--- |
| **Backend** | **Python** (e.g., with Django or FastAPI) | **Modern/Latest Stable** | Chosen for its clarity, vast ecosystem, and rapid development capabilities. |
| **Frontend** | **Angular** | **Modern/Latest Stable** | Chosen for its robust structure, performance, and enterprise-grade tooling for complex applications. |
| **Database** | (TBD, e.g., PostgreSQL) | N/A | Must be a reliable, production-ready system to support growth and data integrity. |

### 🛡️ Quality and Testing Principles

Testing is a **critical, non-negotiable component** of the MagnetarAion development process. Every feature, fix, and change must be accompanied by appropriate tests.

* **Test-Driven Development (TDD) Approach:** Features will ideally be implemented following a TDD methodology where tests are written *before* the production code.
* **Comprehensive Test Coverage:** Implementation of testing at **all relevant levels**:
* **Unit Tests:** For individual functions, methods, and components (Backend and Frontend).
* **Integration Tests:** To ensure separate modules and services work correctly together.
* **End-to-End (E2E) Tests:** Simulating real user scenarios.
* **API Tests:** For the Backend endpoints.

### 🚀 Iterative Development and Early Usability

The development process must prioritize the delivery of **minimal viable, usable functionality (Minimum Usable Feature Set)** early and continuously.

* **Incremental Feature Rollout:** Features will be structured into small, self-contained increments that can be deployed and tested *immediately* upon completion.
* **Early Integration Focus:** The first complete iteration will focus on the **basic Issue creation/viewing cycle**, allowing the team to use the tool to manage its own development process **as early as possible**.

### 🔗 External Integration Requirement: GitHub

To support a modern development workflow, MagnetarAion **must be able to connect to GitHub from an early stage**.

* **Initial GitHub Integration Goals:**
* **Basic Project Linking:** Ability to link a MagnetarAion Project to a specific **GitHub Repository** or **GitHub Project** board.
* **Commit/Branch Tracking (Future):** Long-term goal is to automatically link relevant **code commits/branches** to specific MagnetarAion Issues.
* **User Synchronization (Future):** Potential synchronization of user data or activity between the systems.
