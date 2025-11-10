CREATE TABLE alembic_version (
    version_num VARCHAR(32) NOT NULL, 
    CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num)
);

-- Running upgrade  -> c3f798039793

CREATE TABLE projects (
    id INTEGER NOT NULL, 
    name VARCHAR(100) NOT NULL, 
    "key" VARCHAR(10) NOT NULL, 
    description TEXT, 
    PRIMARY KEY (id)
);

CREATE INDEX ix_projects_id ON projects (id);

CREATE UNIQUE INDEX ix_projects_key ON projects ("key");

CREATE INDEX ix_projects_name ON projects (name);

CREATE TABLE users (
    id INTEGER NOT NULL, 
    username VARCHAR(50) NOT NULL, 
    email VARCHAR(100) NOT NULL, 
    password VARCHAR(256) NOT NULL, 
    PRIMARY KEY (id)
);

CREATE UNIQUE INDEX ix_users_email ON users (email);

CREATE INDEX ix_users_id ON users (id);

CREATE UNIQUE INDEX ix_users_username ON users (username);

CREATE TABLE issues (
    id INTEGER NOT NULL, 
    title VARCHAR(200) NOT NULL, 
    description TEXT, 
    status VARCHAR(11) DEFAULT 'Open' NOT NULL, 
    priority VARCHAR(6) DEFAULT 'Medium' NOT NULL, 
    created_at DATETIME, 
    updated_at DATETIME, 
    project_id INTEGER, 
    assignee_id INTEGER, 
    PRIMARY KEY (id), 
    FOREIGN KEY(assignee_id) REFERENCES users (id), 
    FOREIGN KEY(project_id) REFERENCES projects (id)
);

CREATE INDEX ix_issues_id ON issues (id);

CREATE INDEX ix_issues_title ON issues (title);

INSERT INTO alembic_version (version_num) VALUES ('c3f798039793') RETURNING version_num;

-- Running upgrade c3f798039793 -> 6f913a12175c

UPDATE alembic_version SET version_num='6f913a12175c' WHERE alembic_version.version_num = 'c3f798039793';

-- Running upgrade 6f913a12175c -> bb445797cabc

CREATE TABLE project_users (
    project_id INTEGER, 
    user_id INTEGER, 
    FOREIGN KEY(project_id) REFERENCES projects (id), 
    FOREIGN KEY(user_id) REFERENCES users (id)
);

UPDATE alembic_version SET version_num='bb445797cabc' WHERE alembic_version.version_num = '6f913a12175c';

-- Running upgrade bb445797cabc -> c2a02942c3fc

ALTER TABLE users ADD COLUMN is_active BOOLEAN;

UPDATE alembic_version SET version_num='c2a02942c3fc' WHERE alembic_version.version_num = 'bb445797cabc';

-- Running upgrade c2a02942c3fc -> 0f2b58ea8f95

CREATE TABLE password_reset_tokens (
    id INTEGER NOT NULL, 
    user_id INTEGER NOT NULL, 
    token VARCHAR NOT NULL, 
    expires_at DATETIME NOT NULL, 
    used_at DATETIME, 
    PRIMARY KEY (id), 
    FOREIGN KEY(user_id) REFERENCES users (id)
);

CREATE INDEX ix_password_reset_tokens_id ON password_reset_tokens (id);

CREATE UNIQUE INDEX ix_password_reset_tokens_token ON password_reset_tokens (token);

UPDATE alembic_version SET version_num='0f2b58ea8f95' WHERE alembic_version.version_num = 'c2a02942c3fc';

