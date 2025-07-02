from fastapi import APIRouter, BackgroundTasks, Depends
from ..dependencies import get_gmail_client
from ..models import UnsubscribeRequest

router = APIRouter()

async def _create_filter_and_delete(client, sender: str):
    # create filter
    await client.post('https://gmail.googleapis.com/gmail/v1/users/me/settings/filters', json={
        'criteria': {'from': sender},
        'action': {'removeLabelIds': ['INBOX'], 'addLabelIds': ['TRASH']}
    })
    # fetch message ids
    ids_resp = await client.get('https://gmail.googleapis.com/gmail/v1/users/me/messages', params={'q': f'from:{sender}'})
    ids_resp.raise_for_status()
    ids = [m['id'] for m in ids_resp.json().get('messages', [])]
    if ids:
        await client.post('https://gmail.googleapis.com/gmail/v1/users/me/messages/batchDelete', json={'ids': ids})

@router.post('/api/unsubscribe')
async def unsubscribe(req: UnsubscribeRequest, background_tasks: BackgroundTasks, client=Depends(get_gmail_client)):
    background_tasks.add_task(_create_filter_and_delete, client, req.sender)
    return {'status': 'unsubscribe initiated'}