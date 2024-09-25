import random
from typing import Any

from fastapi import APIRouter
from app.crud import get_messages, create_message, update_message, delete_message
from app.models import (
    Message,
    MessageCreate,
    MessageUpdate,
    MessagePublic,
    ResponseDetails,
)

from app.api.deps import CurrentUser, SessionDep

router = APIRouter()


@router.get("/", response_model=list[MessagePublic])
def read_messages(
    session: SessionDep,
    current_user: CurrentUser,
):
    """
    Retrieve messages.
    """
    return get_messages(session, current_user.id)


@router.post("/", response_model=MessagePublic)
def send_message(
    *, session: SessionDep, current_user: CurrentUser, message_in: MessageCreate
):
    """
    Create new message.
    """
    message = create_message(session, message_in, current_user.id)

    trigger_chatbot_response(session, current_user.id)
    return message


@router.patch("/{id}", response_model=MessagePublic)
def edit_message(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: int,
    message_in: MessageUpdate,
):
    """
    Update a message.
    """
    return update_message(session, id, message_in, user_id=current_user.id)


@router.delete("/{id}")
def remove_message(session: SessionDep, current_user: CurrentUser, id: int):
    """
    Delete an message.
    """
    delete_message(session, id, current_user.id)
    return ResponseDetails(detail="Message deleted successfully")


def trigger_chatbot_response(session: SessionDep, user_id: str):
    test_messages = [
        "I am good. How are you today?",
        "How's the weather?",
        "Cloudy with a chance of rain. Sunshine in the afternoon.",
    ]

    create_message(
        session,
        MessageCreate(content=random.choice(test_messages), from_chatbot=True),
        user_id,
    )
