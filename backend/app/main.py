from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import users, projects, issues
from .database import engine
from .models import models
from . import settings

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

app.include_router(users.router, prefix="/api")
app.include_router(projects.router, prefix="/api")
app.include_router(issues.router, prefix="/api")

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/healthz")
def health_check():
    return {"status": "ok"}


@app.get("/readyz")
def ready_check():
    return {"status": "ok"}
