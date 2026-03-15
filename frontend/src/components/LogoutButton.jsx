import { useNavigate } from 'react-router-dom'
import { removeToken } from '../services/api'

export default function LogoutButton({ className = '' }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    navigate('/login', { replace: true })
  }

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ${className}`}
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      Logout
    </button>
  )
}