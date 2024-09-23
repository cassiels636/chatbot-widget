from typing import Optional
from sqlmodel import Session, select
from fastapi import HTTPException

from app.core.security import get_password_hash, verify_password
from app.models import (
    Message,
    MessageCreate,
    MessagePublic,
    MessageUpdate,
    User,
    UserCreate,
)


def get_user(session: Session, user_id: str):
    statement = select(User)
    users = session.exec(statement).all()
    print(User(data=users))
    return session.get(User, user_id)


def create_user(session: Session, user: UserCreate):
    db_user = User(
        username=user.username, hashed_password=get_password_hash(user.password)
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def get_messages(session: Session, user_id: str):
    statement = select(Message).where(Message.user_id == user_id)
    users = session.exec(statement).all()
    return MessagePublic(data=users)


def create_message(session: Session, message: MessageCreate, user_id: str):
    db_message = Message.model_validate(message, update={"user_id": user_id})
    session.add(db_message)
    session.commit()
    session.refresh(db_message)
    return db_message


def update_message(
    session: Session, message_id: str, message_in: MessageUpdate, user_id: str
):
    message = session.get(Message, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    if message.user_id != user_id:
        raise HTTPException(status_code=400, detail="Not enough permissions")

    update_dict = message_in.model_dump(exclude_unset=True)
    message.sqlmodel_update(update_dict)
    session.add(message)
    session.commit()
    session.refresh(message)
    return message


def delete_message(session: Session, message_id: str, user_id: str):
    message = session.get(Message, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    if message.user_id != user_id:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(message)
    session.commit()


def get_user_by_username(*, session: Session, username: str) -> Optional[User]:
    statement = select(User).where(User.username == username)
    session_user = session.exec(statement).first()
    return session_user


def authenticate(*, session: Session, username: str, password: str) -> Optional[User]:
    db_user = get_user_by_username(session=session, username=username)
    if not db_user:
        return None
    if not verify_password(password, db_user.hashed_password):
        return None
    return db_user
