from sqlalchemy import Engine
from sqlmodel import SQLModel, Session, create_engine, select

from app.core.config import settings
from app.crud import create_user
from app.models import User, UserCreate

engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)


def init_db(session: Session, engine: Engine) -> None:
    SQLModel.metadata.create_all(engine)

    user = session.exec(
        select(User).where(User.username == settings.FIRST_USER)
    ).first()
    if user:
        session.delete(user)
        session.commit()

    user_in = UserCreate(
        username=settings.FIRST_USER,
        password=settings.FIRST_USER_PASSWORD,
    )
    user = create_user(session=session, user=user_in)
