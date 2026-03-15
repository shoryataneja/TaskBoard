/**
 * Authentication Middleware
 * 
 * JWT verification middleware to protect routes.
 * Verifies JWT tokens and adds user information to request object.
 */

const { verifyToken } = require('../utils/generateToken')

// @desc    Protect routes - verify JWT token
const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = verifyToken(token)
      
      // Add user info to request
      req.user = decoded

      next()
    } catch (error) {
      console.error('Token verification error:', error)
      return res.status(401).json({ 
        message: 'Not authorized, token failed' 
      })
    }
  } else {
    return res.status(401).json({ 
      message: 'Not authorized, no token provided' 
    })
  }
}

module.exports = { protect }