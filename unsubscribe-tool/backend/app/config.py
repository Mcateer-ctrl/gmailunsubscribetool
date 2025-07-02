import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    google_client_id: str
    google_client_secret: str
    secret_key: str
    frontend_origin: str

    class Config:
        env_file = ".env"

settings = Settings()