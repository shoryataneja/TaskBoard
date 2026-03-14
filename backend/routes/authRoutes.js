/**
 * Authentication Routes
 * 
 * Defines API routes for authentication:
 * - POST /api/auth/signup - User registration
 * - POST /api/auth/login - User login
 * - GET /api/auth/profile - Get user profile (protected)
 */

const express = require('express')
const router = express.Router()
const { signup, login, getProfile } = require('../controllers/authController')
const { protect } = require('../middleware/authMiddleware')

// Public routes
router.post('/signup', signup)
router.post('/login', login)

// Protected routes
router.get('/profile', protect, getProfile)

module.exports = router