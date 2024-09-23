from sqlmodel import Session, create_engine

from app.core.config import settings
from app.core.db import init_db


def init() -> None:
    engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)

    with Session(engine) as session:
        init_db(session, engine)


def main() -> None:
    print("Creating initial data")
    init()
    print("Initial data created")


if __name__ == "__main__":
    main()
