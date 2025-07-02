import os
import json
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from httpx import AsyncClient
from .config import settings

SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.settings.basic',
]

async def get_oauth_flow():
    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": settings.google_client_id,
                "client_secret": settings.google_client_secret,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
            }
        }, scopes=SCOPES,
        redirect_uri="http://localhost:3000/auth/callback"
    )
    return flow

async def build_httpx_client(credentials: Credentials) -> AsyncClient:
    async def refresh(request):
        credentials.refresh(request)
    # Wrap with auto-refresh
    client = AsyncClient(
        headers={"Authorization": f"Bearer {credentials.token}"},
        event_hooks={"request": [refresh]}
    )
    return client