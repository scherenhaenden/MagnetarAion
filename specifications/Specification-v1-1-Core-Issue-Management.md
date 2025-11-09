# Specification v1.1: Core Issue Management

This document outlines the core specifications for issue management within the MagnetarAion system, based on the analysis of leading issue tracking systems and the project's initial scope.

## 1. The Issue as the Central Unit

### 1.1. Definition and Versatility
- An **issue** is a flexible container for various work items, including but not limited to bugs, tasks, features, support tickets, and HR requests.
- The system will allow for modeling diverse processes through the use of custom fields and workflows.

### 1.2. Issue Creation
- **Manual Creation:** Users can create issues through the user interface, utilizing shortcuts for efficiency.
- **Programmatic Creation:** A REST API will be available for automatic issue ingestion from external sources like monitoring systems, web forms, or bots.
- **AI-Assisted Creation (Future):** Future iterations will explore AI-assisted issue creation, such as text-to-issue conversion, automated summaries, and response suggestions.

### 1.3. Issue Attributes and Attachments
- **Core Fields:**
    - `Summary`: A brief, descriptive title for the issue.
    - `Description`: A detailed explanation of the issue, supporting rich text and Markdown.
    - `Project`: The project to which the issue belongs.
- **Standard Fields:**
    - `Type`: The category of the issue (e.g., Bug, Feature, Task).
    - `Priority`: The urgency of the issue (e.g., High, Medium, Low).
    - `State`: The current status of the issue in its lifecycle (e.g., Open, In Progress, Resolved, Closed).
    - `Assignee`: The user responsible for the issue.
    - `Reporter`: The user who created the issue.
- **Attachments:**
    - Users can drag and drop files to attach them to an issue.
    - The issue's history will maintain a complete and traceable record of all attachments.

### 1.4. Search and Queries
- **Semantic Syntax:** A powerful search syntax will be implemented, allowing users to query issues using `field:value` pairs, logical operators (AND, OR, NOT), and range operators.
- **Contextual Search:** Searches can be scoped by project, tags, or saved search queries.
- **API Parity:** The same search syntax will be available through the REST API, ensuring consistency between the UI and programmatic access.

## 2. Advanced Management Features

### 2.1. Collaboration
- **@mentions:** Users can mention other users in comments and descriptions to notify them.
- **Watch:** Users can "watch" an issue to receive notifications about any updates.
- **Configurable Notifications:** Users will have control over the notifications they receive.

### 2.2. Time Tracking
- **Estimation vs. Time Spent:** The system will track estimated time versus actual time spent on an issue. Time can be logged through various means, including commands, IDE integrations, and other tools.
- **Reporting:** Time tracking data will be available in reports and timesheets.

### 2.3. Hierarchies and Dependencies
- **Parent-Child Relationships:** The system will support subtasks, allowing for a hierarchical breakdown of work. Effort from subtasks will aggregate to the parent issue.
- **Customizable Links:** Users can define custom relationships between issues, such as "depends on," "duplicates," or "is blocked by."

## 3. Integrated Knowledge Base

### 3.1. Documentation
- **Rich Content:** The knowledge base will support Markdown and rich media, including images, videos, and embedded content from other platforms (e.g., Google Docs, Figma). It will also support technical notations like Mermaid diagrams and LaTeX.
- **Collaboration Features:** Inline comments, version history, and draft saving will be available for articles.
- **Exporting:** Articles can be exported to PDF or Markdown formats.
- **Organization:** The knowledge base will have a hierarchical tree structure, with drag-and-drop functionality for easy organization.
- **Permissions:** The system will support public (guest) pages and per-article permissions.

## 4. MVP Core Functional Requirements (In Progress)

- **Users and Projects:**
    - User registration and login.
    - Predefined roles: Administrator, Developer, Reporter.
    - Project creation with a name, key, and description.
    - Assignment of teams to projects.
- **Issues (Tickets):**
    - Full CRUD (Create, Read, Update, Delete) functionality for issues.
    - Core fields for MVP: Title, Description, Assignee, Reporter, Priority (High/Med/Low), State (Open/In Progress/Resolved/Closed), and Type (Bug/Feature/Task).
    - A comprehensive activity log and commenting system with a full change history.
- **Search and Filtering:**
    - Basic search and filtering capabilities by Project, Assignee, State, and Type.
- **Workflow:**
    - A basic, non-configurable workflow for the MVP: Open → In Progress → Resolved → Closed.

## 5. Data Model Summary

- **Issue:**
    - Core fields (as defined above).
    - `IssueCustomFields[]`: A collection of custom fields associated with the issue.
    - `WorkItems[]`: A collection of work items for time tracking.
    - `Links[]`: A collection of links to other issues, defining dependencies and relationships.
- **WorkItem:**
    - `spent`: The amount of time spent.
    - `category`: The category of the work.
    - `author`: The user who logged the time.
    - `at`: The timestamp of the log entry.
- **Article (KB):**
    - The main content of the knowledge base article.
    - Associated comments and attachments.
