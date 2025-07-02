import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_get_auth_url():
    async with AsyncClient(app=app, base_url='http://test') as ac:
        res = await ac.get('/api/auth/url')
    assert res.status_code == 200
    assert 'url' in res.json()