// src/App.tsx
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useQuery } from 'react-query'

import { getEmails } from './services/emailService'
import { SignInButton } from './components/SignInButton'
import { AuthCallback } from './pages/AuthCallback'
import { EmailList } from './components/EmailList'
import type { EmailSummary } from './types'

// The root App component sets up routing and guards
const App: React.FC = () => {
  // Try fetching the user's grouped emails; if 401 or network error, we'll show SignInButton
  const {
    data: emails,
    error,
    isLoading,
  } = useQuery<EmailSummary[], Error>(
    'emails',
    () => getEmails({ credentials: 'include' }),
    { retry: false } // don't endlessly retry on 401
  )

  return (
    <BrowserRouter>
      <Routes>
        {/* 1) OAuth redirect URI handler */}
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* 2) All other routes */}
        <Route
          path="/*"
          element={
            isLoading ? (
              <div className="h-screen flex items-center justify-center">
                Loading…
              </div>
            ) : error ? (
              // On any error (e.g. 401), treat as "not signed in"
              <SignInButton />
            ) : emails && emails.length > 0 ? (
              // Authenticated and have data
              <EmailList emails={emails} />
            ) : (
              // Authenticated but no senders found
              <div className="h-screen flex items-center justify-center text-gray-500">
                No subscriptions found.
              </div>
            )
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
