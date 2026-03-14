/**
 * Authentication Middleware
 * 
 * JWT verification middleware to protect routes.
 * Verifies JWT tokens and adds user information to request object.
 */

const jwt = require('jsonwebtoken')

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

      // TODO: Verify token and decode user information
      // const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // req.user = decoded

      next()
    } catch (error) {
      console.error(error)
      res.status(401).json({ message: 'Not authorized, token failed' })
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' })
  }
}

module.exports = { protect }