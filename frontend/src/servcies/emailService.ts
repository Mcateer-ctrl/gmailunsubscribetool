// frontend/src/services/emailService.ts

import type { EmailSummary } from '../types'

/**
 * Fetches the list of senders (with counts & last‐seen dates).
 */
export async function getEmails(): Promise<EmailSummary[]> {
  const res = await fetch('/api/emails', {
    credentials: 'include',    // ← include cookies so backend can auth you
  })
  if (!res.ok) throw new Error('Failed to fetch emails')
  return res.json()
}

/**
 * Tells the backend to create a filter + delete existing messages
 * from the given sender.
 */
export async function unsubscribe(sender: string): Promise<void> {
  const res = await fetch('/api/unsubscribe', {
    method: 'POST',
    credentials: 'include',    // ← include cookies so backend knows who you are
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sender }),
  })
  if (!res.ok) throw new Error('Failed to unsubscribe')
}
