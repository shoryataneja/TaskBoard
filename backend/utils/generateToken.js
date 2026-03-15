/**
 * JWT Token Generation Utility
 * 
 * Helper functions for generating and managing JWT tokens
 */

const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'taskboard_secret'
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d'

// @desc    Generate JWT token
// @param   {string} userId - User ID to encode in token
// @returns {string} JWT token
const generateToken = (userId) => {
  try {
    return jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    })
  } catch (error) {
    console.error('Error generating token:', error)
    throw error
  }
}

// @desc    Verify JWT token
// @param   {string} token - JWT token to verify
// @returns {object} Decoded token payload
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    console.error('Error verifying token:', error)
    throw error
  }
}

module.exports = {
  generateToken,
  verifyToken,
}