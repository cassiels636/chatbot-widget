from typing import Optional
from fastapi.testclient import TestClient
from sqlmodel import Session

from app.crud import create_message
from app.models import User, MessageCreate


def test_read_messages(
    client: TestClient,
    db: Session,
    first_user: Optional[User],
    user_token_headers: dict[str, str],
) -> None:
    create_message(
        session=db,
        message=MessageCreate(from_chatbot=True, content="How are you?"),
        user_id=first_user.id,
    )
    create_message(
        session=db,
        message=MessageCreate(content="Doing good. And you?"),
        user_id=first_user.id,
    )

    response = client.get(
        "/messages",
        headers=user_token_headers,
    )

    assert response.status_code == 200
    messages = response.json()
    assert len(messages) == 3  # Has 3 messages including the db's default
    assert messages[0]["content"] == "Hello, Ask me a question."
    assert messages[1]["content"] == "How are you?"
    assert messages[2]["content"] == "Doing good. And you?"


def test_send_message(
    client: TestClient,
    user_token_headers: dict[str, str],
) -> None:
    response = client.post(
        "/messages",
        json={"content": "How's the weather?"},
        headers=user_token_headers,
    )

    print(response.json())
    assert response.status_code == 200
    api_message = response.json()
    assert api_message["id"]
    assert not api_message["from_chatbot"]
    assert api_message["content"] == "How's the weather?"


def test_edit_message(
    client: TestClient,
    db: Session,
    first_user: Optional[User],
    user_token_headers: dict[str, str],
) -> None:
    message = create_message(
        session=db,
        message=MessageCreate(content="Hi. How are you?"),
        user_id=first_user.id,
    )

    response = client.patch(
        f"/messages/{message.id}",
        json={"content": "Test test test"},
        headers=user_token_headers,
    )

    assert response.status_code == 200
    api_message = response.json()
    assert api_message["id"] == message.id
    assert api_message["content"] == "Test test test"


def test_delete_message(
    client: TestClient,
    db: Session,
    first_user: Optional[User],
    user_token_headers: dict[str, str],
) -> None:
    message = create_message(
        session=db,
        message=MessageCreate(content="Hi. How are you?"),
        user_id=first_user.id,
    )

    response = client.delete(
        f"/messages/{message.id}",
        headers=user_token_headers,
    )

    assert response.status_code == 200
    response_details = response.json()
    assert response_details["detail"] == "Message deleted successfully"
