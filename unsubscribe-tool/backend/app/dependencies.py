from fastapi import Depends, HTTPException, Cookie
from google.oauth2.credentials import Credentials
from .google_client import build_httpx_client

async def get_credentials(token: str = Cookie(None)) -> Credentials:
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    data = json.loads(token)
    creds = Credentials(
        token=data['token'],
        refresh_token=data['refresh_token'],
        token_uri=data['token_uri'],
        client_id=data['client_id'],
        client_secret=data['client_secret'],
        scopes=data['scopes'],
    )
    return creds

async def get_gmail_client(creds=Depends(get_credentials)):
    client = await build_httpx_client(creds)
    return client