# Specification v1.2: Agile Frameworks and Planning

This document details the specifications for Agile frameworks and planning tools within the MagnetarAion system.

## 1. Agile Boards

### 1.1. Core Components
- **General:** The system will support Scrum, Kanban, and Scrumban boards.
- **Columns:** Board columns will be mapped to issue states.
- **Swimlanes:** Swimlanes will be available to group issues by various criteria, such as epics or assignees.
- **Cards:** Issue cards on the board will be configurable to display a selection of fields.
- **Real-time Updates:** Boards will update in real-time as changes are made to the issues.

### 1.2. Board Templates
- The system will provide ready-made templates for common Agile methodologies, including:
    - Scrum
    - Kanban
    - Version-based tracking
    - Custom board configurations

## 2. Scrum Framework

### 2.1. Backlog
- The backlog will be represented as a saved search, allowing for powerful filtering and ordering.
- Users will be able to prioritize the backlog using drag-and-drop functionality.

### 2.2. Sprints
- **Sprint Management:** Users can create sprints with defined start and end dates.
- **Issue Carry-over:** Unfinished issues can be automatically carried over to the next sprint.
- **Burndown Charts:** The system will generate burndown charts to track progress within a sprint, with options to measure progress by the number of issues, story points, or time.

## 3. Kanban Framework

### 3.1. Columns and WIP Limits
- Kanban board columns represent the stages of the workflow.
- **WIP (Work in Progress) Limits:** Users can set WIP limits for each column, and the system will provide visual alerts when these limits are exceeded.

### 3.2. Cumulative Flow Diagram
- A Cumulative Flow Diagram (CFD) will be available to visualize the flow of work through the Kanban system over time.
- The system will support pull systems with "ready-to-pull" indicators.

## 4. Temporal Planning and Execution

### 4.1. Interactive Gantt Charts
- **Dependencies:** Gantt charts will visualize dependencies between issues, based on the issue link relationships.
- **Interactive Planning:** Users will be able to adjust the timeline and dependencies using drag-and-drop, with automatic recalculation of the project schedule.

### 4.2. Dashboards
- **Customizable Dashboards:** Users can create personalized dashboards to get an overview of project status.
- **Widgets:** Dashboards will be composed of various widgets, including:
    - Burndown charts
    - Cumulative Flow Diagrams
    - Time tracking reports
    - Issue lists
    - Notes and other informational widgets

### 4.3. Portfolio and Multi-Project Management
- **Cross-cutting Epics:** The system will support epics that span multiple projects.
- **Master Gantt Charts:** A master Gantt chart will be available to visualize the timeline of multiple projects in a single view.
- **Aggregated Views:** Dashboards and reports will provide aggregated views of data from multiple projects.
