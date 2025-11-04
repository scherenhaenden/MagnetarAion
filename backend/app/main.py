from fastapi import FastAPI
from .api import users, projects, issues
from .database import engine
from .models import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(users.router, prefix="/api")
app.include_router(projects.router, prefix="/api")
app.include_router(issues.router, prefix="/api")

@app.get("/")
def read_root():
    return {"Hello": "World"}
