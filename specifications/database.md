# Database Schema

This document outlines the database schema for the MagnetarAion application. The schema is defined using SQLAlchemy ORM.

## Tables

### `users`

This table stores information about the users of the application.

| Column   | Type         | Constraints                | Description                               |
|----------|--------------|----------------------------|-------------------------------------------|
| id       | Integer      | Primary Key, Index         | The unique identifier for the user.       |
| username | String(50)   | Unique, Not Null, Index    | The username of the user.                 |
| email    | String(100)  | Unique, Not Null, Index    | The email address of the user.            |
| password | String(256)  | Not Null                   | The hashed password for the user.         |

### `projects`

This table stores information about the projects in the application.

| Column      | Type        | Constraints                | Description                                   |
|-------------|-------------|----------------------------|-----------------------------------------------|
| id          | Integer     | Primary Key, Index         | The unique identifier for the project.        |
| name        | String(100) | Not Null, Index            | The name of the project.                      |
| key         | String(10)  | Unique, Not Null, Index    | A short, unique key for the project (e.g., "MAG"). |
| description | Text        |                            | A detailed description of the project.        |

### `issues`

This table stores information about the issues or tasks within a project.

| Column      | Type        | Constraints                      | Description                                                  |
|-------------|-------------|----------------------------------|--------------------------------------------------------------|
| id          | Integer     | Primary Key, Index               | The unique identifier for the issue.                         |
| title       | String(200) | Not Null, Index                  | The title of the issue.                                      |
| description | Text        |                                  | A detailed description of the issue.                         |
| status      | Enum        | Default: 'Open'                  | The current status of the issue (e.g., 'Open', 'In Progress', 'Done'). |
| priority    | Enum        | Default: 'Medium'                | The priority of the issue (e.g., 'Low', 'Medium', 'High').   |
| created_at  | DateTime    | Default: `datetime.utcnow`     | The timestamp when the issue was created.                    |
| updated_at  | DateTime    | Default: `datetime.utcnow`       | The timestamp when the issue was last updated.               |
| project_id  | Integer     | Foreign Key (`projects.id`)      | The ID of the project this issue belongs to.                 |
| assignee_id | Integer     | Foreign Key (`users.id`)         | The ID of the user this issue is assigned to.                |

## Relationships

- A `User` can be assigned to many `Issues`.
- A `Project` can have many `Issues`.
- An `Issue` belongs to one `Project` and can be assigned to one `User`.
