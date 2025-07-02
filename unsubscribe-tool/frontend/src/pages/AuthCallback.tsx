import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { handleAuthCallback } from '../services/api'

export const AuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [error, setError] = useState<string|null>(null)

  useEffect(() => {
    const code = searchParams.get('code')
    if (!code) {
      setError('No code returned from Google.')
      return
    }
    handleAuthCallback(code)
      .then(() => navigate('/'))
      .catch(err => {
        console.error(err)
        setError('Authentication failed. Please try again.')
      })
  }, [searchParams, navigate])

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    )
  }
  return (
    <div className="h-screen flex items-center justify-center text-gray-700">
      Signing you in…
    </div>
  )
}
