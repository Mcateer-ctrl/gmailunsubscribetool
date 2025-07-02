import axios from 'axios';

type EmailsResponse = { sender: string; count: number; lastDate: string; avatarUrl?: string }[];

const instance = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

export interface SenderInfo {
  sender: string;
  count: number;
  lastDate: string;
  avatarUrl?: string;
}

export default {
  async getAuthUrl(): Promise<string> {
    const { data } = await instance.get('/api/auth/url');
    return data.url;
  },
  async getEmails(): Promise<SenderInfo[]> {
    const { data } = await instance.get<EmailsResponse>('/api/emails');
    return data;
  },
  async unsubscribe(sender: string): Promise<void> {
    await instance.post('/api/unsubscribe', { sender });
  },
};

// add these two functions at the bottom of your existing api.ts
export async function getAuthUrl(): Promise<string> {
  const res = await fetch('/api/auth/url', { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to get auth URL')
  const { url } = await res.json()
  return url
}

export async function handleAuthCallback(code: string): Promise<void> {
  const res = await fetch(`/api/auth/callback?code=${encodeURIComponent(code)}`, {
    method: 'GET',
    credentials: 'include'
  })
  if (!res.ok) throw new Error('Auth callback failed')
}