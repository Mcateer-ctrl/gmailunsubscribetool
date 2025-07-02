from fastapi import APIRouter, Depends, Response
from fastapi.responses import JSONResponse
from ..google_client import get_oauth_flow
import json

router = APIRouter(prefix="/api/auth")

@router.get('/url')
async def get_auth_url():
    flow = await get_oauth_flow()
    auth_url, _ = flow.authorization_url(access_type='offline', include_granted_scopes='true')
    return {'url': auth_url}

@router.get('/callback')
async def auth_callback(response: Response, code: str):
    flow = await get_oauth_flow()
    flow.fetch_token(code=code)
    creds = flow.credentials
    # store tokens in secure cookie
    data = json.dumps({
        'token': creds.token,
        'refresh_token': creds.refresh_token,
        'token_uri': creds.token_uri,
        'client_id': creds.client_id,
        'client_secret': creds.client_secret,
        'scopes': creds.scopes,
    })
    response.set_cookie(key='token', value=data, httponly=True, secure=False)
    return JSONResponse({'status': 'ok'})