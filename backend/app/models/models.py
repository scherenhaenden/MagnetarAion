import enum
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Enum, Table, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base

user_roles = Table('user_roles', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('role_id', Integer, ForeignKey('roles.id'))
)

project_users = Table('project_users', Base.metadata,
    Column('project_id', Integer, ForeignKey('projects.id')),
    Column('user_id', Integer, ForeignKey('users.id'))
)

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    password = Column(String(256), nullable=False)
    is_active = Column(Boolean, default=True)

    projects = relationship("Project", secondary=project_users, back_populates="users")
    roles = relationship("Role", secondary=user_roles, back_populates="users")
    issues = relationship("Issue", back_populates="assignee")

class Role(Base):
    __tablename__ = 'roles'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False, index=True)
    description = Column(String(255))
    users = relationship("User", secondary=user_roles, back_populates="roles")

class Project(Base):
    __tablename__ = 'projects'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, index=True)
    key = Column(String(10), unique=True, nullable=False, index=True)
    description = Column(Text)
    issues = relationship("Issue", back_populates="project")
    users = relationship("User", secondary=project_users, back_populates="projects")

class StatusEnum(str, enum.Enum):
    OPEN = "Open"
    IN_PROGRESS = "In Progress"
    DONE = "Done"

class PriorityEnum(str, enum.Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"

class Issue(Base):
    __tablename__ = 'issues'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False, index=True)
    description = Column(Text)
    status = Column(Enum(StatusEnum), default=StatusEnum.OPEN, nullable=False)
    priority = Column(Enum(PriorityEnum), default=PriorityEnum.MEDIUM, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    project_id = Column(Integer, ForeignKey('projects.id'))
    project = relationship("Project", back_populates="issues")
    assignee_id = Column(Integer, ForeignKey('users.id'))
    assignee = relationship("User", back_populates="issues")

class PasswordResetToken(Base):
    __tablename__ = "password_reset_tokens"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    token = Column(String, unique=True, index=True, nullable=False)
    expires_at = Column(DateTime, nullable=False)
    used_at = Column(DateTime, nullable=True)

    user = relationship("User")
