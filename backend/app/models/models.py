import enum
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    password = Column(String(256), nullable=False)
    issues = relationship("Issue", back_populates="assignee")

class Project(Base):
    __tablename__ = 'projects'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, index=True)
    key = Column(String(10), unique=True, nullable=False, index=True)
    description = Column(Text)
    issues = relationship("Issue", back_populates="project")

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
    status = Column(Enum(StatusEnum), default=StatusEnum.OPEN)
    priority = Column(Enum(PriorityEnum), default=PriorityEnum.MEDIUM)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    project_id = Column(Integer, ForeignKey('projects.id'))
    project = relationship("Project", back_populates="issues")
    assignee_id = Column(Integer, ForeignKey('users.id'))
    assignee = relationship("User", back_populates="issues")
