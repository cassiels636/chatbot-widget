from typing import Any, Optional
from pydantic import BaseModel
from sqlmodel import Field, Relationship, SQLModel


class UserBase(SQLModel):
    username: str = Field(unique=True, index=True, max_length=255)
    is_active: bool = True


class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=40)


class UserRegister(SQLModel):
    username: str = Field(max_length=255)
    password: str = Field(min_length=8, max_length=40)


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str
    messages: list["Message"] = Relationship(back_populates="user", cascade_delete=True)


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: int


class MessageBase(SQLModel):
    content: str = Field(min_length=1, max_length=255)


class MessageCreate(MessageBase):
    from_chatbot: bool = False


class MessageUpdate(MessageBase):
    pass


# Database model, database table inferred from class name
class Message(MessageBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    from_chatbot: bool = False
    user_id: int = Field(foreign_key="user.id", nullable=False, ondelete="CASCADE")
    user: Optional[User] = Relationship(back_populates="messages")


# Properties to return via API, id is always required
class MessagePublic(MessageBase):
    id: int
    user_id: int
    from_chatbot: bool


class MessagesPublic(BaseModel):
    data: list[MessagePublic]


# JSON payload containing access token
class Token(SQLModel):
    access_token: str


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: Optional[str] = None


class ResponseDetails(SQLModel):
    detail: str
