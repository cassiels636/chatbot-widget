from collections.abc import Generator
from typing import Optional

import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, delete

from app.core.db import engine, init_db
from app.core.config import settings
from app.crud import get_user_by_username
from app.main import app
from app.models import Message, User


@pytest.fixture(scope="session", autouse=True)
def db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        init_db(session, engine)
        yield session
        statement = delete(Message)
        session.exec(statement)
        session.commit()


@pytest.fixture(scope="module")
def client() -> Generator[TestClient, None, None]:
    with TestClient(app) as c:
        yield c


@pytest.fixture(scope="module")
def user_token_headers(client: TestClient) -> dict[str, str]:
    login_data = {
        "username": settings.FIRST_USER,
        "password": settings.FIRST_USER_PASSWORD,
    }
    r = client.post("/login/access-token", json=login_data)
    tokens = r.json()
    a_token = tokens["access_token"]
    headers = {"Authorization": f"Bearer {a_token}"}
    return headers


@pytest.fixture(scope="module")
def first_user(db: Session) -> Optional[User]:
    return get_user_by_username(session=db, username=settings.FIRST_USER)
