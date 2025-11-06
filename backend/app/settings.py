from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./magnetaraion.db"
    allowed_origins: list[str] = ["http://localhost:4200"]
    # other settings...


settings = Settings()
