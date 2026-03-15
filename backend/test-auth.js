/**
 * Test script for authentication endpoints
 * Run this after starting the server to test the API
 */

const testSignup = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: '123456'
      })
    })
    
    const data = await response.json()
    console.log('Signup Response:', response.status, data)
    return data.token
  } catch (error) {
    console.error('Signup Error:', error)
  }
}

const testLogin = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: '123456'
      })
    })
    
    const data = await response.json()
    console.log('Login Response:', response.status, data)
    return data.token
  } catch (error) {
    console.error('Login Error:', error)
  }
}

const testProfile = async (token) => {
  try {
    const response = await fetch('http://localhost:3001/api/auth/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    
    const data = await response.json()
    console.log('Profile Response:', response.status, data)
  } catch (error) {
    console.error('Profile Error:', error)
  }
}

// Run tests
const runTests = async () => {
  console.log('🧪 Testing Authentication API...\n')
  
  console.log('1. Testing Signup...')
  const signupToken = await testSignup()
  
  console.log('\n2. Testing Login...')
  const loginToken = await testLogin()
  
  if (loginToken) {
    console.log('\n3. Testing Protected Profile Route...')
    await testProfile(loginToken)
  }
  
  console.log('\n✅ Tests completed!')
}

// Only run if this file is executed directly
if (require.main === module) {
  runTests()
}

module.exports = { testSignup, testLogin, testProfile }