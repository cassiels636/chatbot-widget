import secrets
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_ignore_empty=True, extra="ignore"
    )
    SECRET_KEY: str = secrets.token_urlsafe(32)
    # 60 minutes * 24 hours * 8 days = 8 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    FRONTEND_HOST: str = "http://localhost:5173"
    ENVIRONMENT: Literal["local", "staging", "production"] = "local"

    SQLALCHEMY_DATABASE_URI: str = "sqlite:///./chatbot-widget-app.db"

    FIRST_USER: str = "admin-dev"
    FIRST_USER_PASSWORD: str = "gtgd%&^im2o3r4&6"


settings = Settings()  # type: ignore
