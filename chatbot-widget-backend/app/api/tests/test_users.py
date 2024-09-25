from typing import Optional
from fastapi.testclient import TestClient
from sqlmodel import Session

from app.crud import get_user_by_username
from app.models import User


def test_read_user(
    client: TestClient,
    db: Session,
    first_user: Optional[User],
    user_token_headers: dict[str, str],
) -> None:
    response = client.get(
        f"/users/{first_user.id}",
        headers=user_token_headers,
    )

    assert response.status_code == 200
    api_user = response.json()
    existing_user = get_user_by_username(session=db, username=first_user.username)
    assert existing_user
    assert existing_user.username == api_user["username"]
