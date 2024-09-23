from typing import Any

from fastapi import APIRouter
from app.crud import get_messages, create_message, update_message, delete_message
from app.models import Message, MessageCreate, MessageUpdate

from app.api.deps import CurrentUser, SessionDep

router = APIRouter()


@router.get("/", response_model=Message)
def read_messages(
    session: SessionDep,
    current_user: CurrentUser,
) -> Any:
    """
    Retrieve messages.
    """
    statement = get_messages(session, current_user.id)
    messages = session.exec(statement).all()
    return Message(data=messages)


@router.post("/", response_model=Message)
def send_message(
    *, session: SessionDep, current_user: CurrentUser, message_in: MessageCreate
) -> Any:
    """
    Create new message.
    """
    return create_message(session, message_in, current_user.id)


@router.put("/{id}", response_model=Message)
def edit_message(
    *,
    session: SessionDep,
    current_user: CurrentUser,
    id: int,
    message_in: MessageUpdate,
) -> Any:
    """
    Update a message.
    """
    return update_message(session, id, message_in, user_id=current_user.id)


@router.delete("/{id}")
def remove_message(session: SessionDep, current_user: CurrentUser, id: int) -> Message:
    """
    Delete an message.
    """
    delete_message(session, id, current_user.id)
    return Message(message="Message deleted successfully")
