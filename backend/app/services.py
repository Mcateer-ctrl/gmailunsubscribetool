import asyncio
from httpx import AsyncClient
from .models import SenderInfo
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime

executor = ThreadPoolExecutor()

async def fetch_message_ids(client: AsyncClient):
    resp = await client.get('https://gmail.googleapis.com/gmail/v1/users/me/messages')
    resp.raise_for_status()
    return [m['id'] for m in resp.json().get('messages', [])]

async def fetch_message_detail(client: AsyncClient, msg_id: str):
    resp = await client.get(f'https://gmail.googleapis.com/gmail/v1/users/me/messages/{msg_id}?format=metadata&metadataHeaders=From&metadataHeaders=Date')
    resp.raise_for_status()
    return resp.json()

async def group_by_sender(client: AsyncClient) -> list[SenderInfo]:
    ids = await fetch_message_ids(client)
    # batch detail concurrently
    tasks = [fetch_message_detail(client, m) for m in ids]
    details = await asyncio.gather(*tasks)

    def _group():
        groups: dict[str, dict] = {}
        for m in details:
            headers = {h['name']: h['value'] for h in m['payload']['headers']}
            sender = headers.get('From')
            date = datetime.fromisoformat(headers.get('Date'))
            g = groups.setdefault(sender, {'count': 0, 'last': date})
            g['count'] += 1
            if date > g['last']:
                g['last'] = date
        return [SenderInfo(sender=from_, count=data['count'], lastDate=data['last']) for from_, data in groups.items()]

    return await asyncio.get_event_loop().run_in_executor(executor, _group)