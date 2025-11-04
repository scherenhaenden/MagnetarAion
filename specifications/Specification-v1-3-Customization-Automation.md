# Specification v1.3: Customization and Automation

This document outlines the specifications for customization and automation features within the MagnetarAion system.

## 1. Custom Fields

### 1.1. Expandable Data Model
- The system will allow the creation of custom fields to extend the issue data model.

### 1.2. Field Types
- A variety of custom field types will be supported:
  - `string`
  - `text`
  - `date`
  - `date&time`
  - `period`
  - `int`
  - `float`
  - `enum` (enumerated type)
  - `user`
  - `group`
  - `state` (with a boolean `isResolved` property)
  - `version`
  - `build`
  - `ownedField`

### 1.3. Field Management
- **Levels of Configuration:**
  - `CustomField`: A global definition of the field.
  - `ProjectCustomField`: A per-project configuration of the field.
  - `IssueCustomField`: The actual value of the custom field within an issue.
- **Scope:** Custom fields can be managed globally or on a per-project basis, with options for shared or project-specific values.

## 2. Workflows

### 2.1. No-Code and Pro-Code Automation
- **Visual Builder:** A no-code, visual workflow builder will be provided for creating typical automation rules.
- **JavaScript Engine:** For more complex scenarios, a pro-code solution using modern ECMAScript (JavaScript) will be available.
  - A dedicated scripting API (e.g., `@magnetaraion/scripting-api`) will provide access to system entities, date-time functions, HTTP requests, and notification services.

### 2.2. Workflow Types
- The system will support different types of workflows:
  - `on-change`: Triggered when an issue is modified.
  - `on-schedule`: Triggered at a specific time or interval.
  - `state-machine`: To define and enforce issue lifecycle transitions.
  - `action`: Manually triggered workflows.

### 2.3. Reusability
- A library of default and reusable workflow templates will be provided to accelerate setup.

## 3. Apps / Marketplace

### 3.1. Extensibility
- The system will be extensible through an "Apps" model, with a future Marketplace for discovering and installing them.

### 3.2. App Package Components
- An app package can include:
  - UI widgets (to extend the user interface at designated extension points).
  - HTTP endpoints.
  - Workflows.
  - SLA (Service Level Agreement) rules.
  - Importers.
  - Custom reports.

### 3.3. Governance
- The system will manage the installation and updates of apps from the Marketplace.
- Governance policies for third-party apps, covering security and licensing, will be established.

## 4. Configuration Governance (Recommended)

### 4.1. Best Practices
- **Naming Conventions:** Establish and enforce naming conventions for projects, states, versions, and other configurable items.
- **Workflow Versioning:** Workflows, especially scripted ones, should be versioned. A review process (e.g., via pull requests) for workflow scripts and a sandbox environment for testing are highly recommended.
- **RACI Matrix:** A RACI (Responsible, Accountable, Consulted, Informed) matrix should be used to manage changes to the system's configuration.
- **Deployment Schedule:** A schedule for deploying configuration changes should be established.
