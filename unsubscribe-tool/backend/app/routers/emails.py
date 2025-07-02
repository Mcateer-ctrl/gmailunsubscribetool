from fastapi import APIRouter, Depends
from ..dependencies import get_gmail_client
from ..services import group_by_sender

router = APIRouter()

@router.get('/api/emails')
async def list_emails(client=Depends(get_gmail_client)):
    return await group_by_sender(client)