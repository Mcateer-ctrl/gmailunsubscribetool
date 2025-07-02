# Unsubscribe-from-Gmail Tool

## Overview
A simple app to scan your Gmail inbox, group emails by sender, and unsubscribe (trash and filter) from unwanted newsletters in one click.

## Tech Stack
- **Backend**: Python 3.11, FastAPI, Uvicorn/Gunicorn
- **Frontend**: React, Vite, TypeScript, Tailwind CSS, react-icons, React Query
- **Auth & API**: Google OAuth2, Gmail REST API v1
- **DevOps**: Docker, Docker Compose

## Google Cloud Setup
1. Create a Google Cloud project.
2. Enable **Gmail API** in the Google Cloud Console.
3. Under **APIs & Services > Credentials**, create OAuth 2.0 Client IDs:
   - Application type: *Web application*
   - Authorized redirect URIs: `http://localhost:3000/auth/callback`
4. Copy **Client ID** & **Client Secret**.
5. Create a `.env` at `backend/.env`:

   ```dotenv
   GOOGLE_CLIENT_ID=YOUR_CLIENT_ID.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET
   SECRET_KEY=supersecretbackendkey