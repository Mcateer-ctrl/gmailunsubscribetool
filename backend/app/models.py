from pydantic import BaseModel, EmailStr, HttpUrl
from datetime import datetime

class SenderInfo(BaseModel):
    sender: EmailStr
    count: int
    lastDate: datetime
    avatarUrl: HttpUrl | None = None

class UnsubscribeRequest(BaseModel):
    sender: EmailStr