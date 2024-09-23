from fastapi import APIRouter, HTTPException
from app.crud import get_user
from app.models import User

from app.api.deps import SessionDep

router = APIRouter()


@router.get("/{user_id}", response_model=User)
def read_user(session: SessionDep, user_id: str):
    print("USER ID: ", user_id)
    
    db_user = get_user(session, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
