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
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            isAuthenticated() ? <Navigate to="/" replace /> : <Login />
          } 
        />
        <Route 
          path="/signup" 
          element={
            isAuthenticated() ? <Navigate to="/" replace /> : <Signup />
          } 
        />
        
        {/* Protected Routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all route - redirect to dashboard if authenticated, login if not */}
        <Route 
          path="*" 
          element={
            <Navigate to={isAuthenticated() ? "/" : "/login"} replace />
          } 
        />
      </Routes>
    </Router>
  )
}

export default App