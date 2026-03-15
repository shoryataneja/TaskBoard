import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { isAuthenticated } from './services/api'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        {/* Root — redirect based on auth status */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated() ? '/dashboard' : '/login'} replace />}
        />

        {/* Public routes — redirect to dashboard if already logged in */}
        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Signup />}
        />

        {/* Protected route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated() ? '/dashboard' : '/login'} replace />}
        />
      </Routes>
    </Router>
  )
}

export default App