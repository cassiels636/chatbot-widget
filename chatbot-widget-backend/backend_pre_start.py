from sqlalchemy import Engine
from sqlmodel import Session, select

from app.core.db import engine


def init(db_engine: Engine) -> None:
    try:
        with Session(db_engine) as session:
            # Try to create session to check if DB is awake
            session.exec(select(1))
    except Exception as e:
        print(e)
        raise e


def main() -> None:
    print("Initializing service")
    init(engine)
    print("Service finished initializing")


if __name__ == "__main__":
    main()
