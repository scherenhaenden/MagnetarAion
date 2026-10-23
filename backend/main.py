from fastapi import FastAPI

__version__ = "0.1.0"

app = FastAPI(
    title="MagnetarAion",
    version=__version__,
)

@app.get("/")
def read_root():
    """Return a greeting message."""
    return {"Hello": "World"}
