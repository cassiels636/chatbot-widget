from datetime import timedelta
from fastapi import APIRouter, HTTPException

from app.crud import authenticate
from app.api.deps import SessionDep
from app.core import security
from app.core.config import settings
from app.models import Token, UserRegister

router = APIRouter()


@router.post("/login/access-token")
def login_access_token(session: SessionDep, user_login: UserRegister) -> Token:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = authenticate(
        session=session, username=user_login.username, password=user_login.password
    )
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return Token(
        access_token=security.create_access_token(
            user.id, expires_delta=access_token_expires
        )
    )
