from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    """Return a greeting message."""
    return {"Hello": "World"}
