import React from 'react'
import { getAuthUrl } from '../services/api'
import { FcGoogle } from 'react-icons/fc'

export const SignInButton: React.FC = () => {
  const [loading, setLoading] = React.useState(false)
  const onClick = async () => {
    setLoading(true)
    try {
      const url = await getAuthUrl()
      window.location.href = url
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <button
        onClick={onClick}
        disabled={loading}
        className="flex items-center px-6 py-3 bg-white border border-gray-300 rounded shadow hover:bg-gray-100 transition"
      >
        <FcGoogle className="mr-3 text-2xl" />
        {loading ? 'Redirecting…' : 'Sign in with Google'}
      </button>
    </div>
  )
}
