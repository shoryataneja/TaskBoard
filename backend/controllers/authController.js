/**
 * Authentication Controller
 * 
 * Contains business logic for user authentication including:
 * - User registration (signup)
 * - User login
 * - Password hashing and verification
 * - JWT token generation
 */

const { createUser, validatePassword, findUserById } = require('../models/userModel')
const { generateToken } = require('../utils/generateToken')

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Please provide name, email, and password'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Please provide a valid email address'
      })
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters long'
      })
    }

    // Create user
    const user = await createUser({ name, email, password })

    // Generate JWT token
    const token = generateToken(user.id)

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Signup error:', error)
    
    if (error.message === 'User already exists with this email') {
      return res.status(400).json({
        message: 'User already exists with this email'
      })
    }
    
    res.status(500).json({
      message: 'Server error during signup'
    })
  }
}

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide email and password'
      })
    }

    // Validate user credentials
    const user = await validatePassword(email, password)
    
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    // Generate JWT token
    const token = generateToken(user.id)

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      message: 'Server error during login'
    })
  }
}

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.userId)
    
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Profile error:', error)
    res.status(500).json({
      message: 'Server error getting profile'
    })
  }
}

module.exports = {
  signup,
  login,
  getProfile,
}