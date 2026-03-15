const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong')
    }

    return data
  } catch (error) {
    throw new Error(error.message || 'Network error')
  }
}

// Authentication API functions
export const signupUser = async (userData) => {
  return apiRequest('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  })
}

export const loginUser = async (credentials) => {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export const getUserProfile = async (token) => {
  return apiRequest('/api/auth/profile', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

// Token management
export const getToken = () => {
  return localStorage.getItem('token')
}

export const setToken = (token) => {
  localStorage.setItem('token', token)
}

export const removeToken = () => {
  localStorage.removeItem('token')
}

export const isAuthenticated = () => {
  return !!getToken()
}