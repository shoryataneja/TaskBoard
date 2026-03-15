const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

// MongoDB connection (required for deployment)
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("✅ MongoDB connected")
})
.catch((err) => {
  console.log("❌ MongoDB connection error:", err)
})

// Middleware
app.use(cors())
app.use(express.json())

// Add request logging for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// Routes
app.use('/api/auth', require('./routes/authRoutes'))

// Basic health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'TaskBoard API Server is running',
    version: '1.0.0',
    endpoints: {
      signup: 'POST /api/auth/signup',
      login: 'POST /api/auth/login',
      profile: 'GET /api/auth/profile (Protected)'
    }
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack)
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  })
})

// 404 handler - must be last
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" })
})

app.listen(PORT, () => {
  console.log(`🚀 TaskBoard API Server running on port ${PORT}`)
  console.log(`📍 Health check: http://localhost:${PORT}`)
  console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth`)
  console.log(`\n📋 Available endpoints:`)
  console.log(`   POST http://localhost:${PORT}/api/auth/signup`)
  console.log(`   POST http://localhost:${PORT}/api/auth/login`)
  console.log(`   GET  http://localhost:${PORT}/api/auth/profile (Protected)`)
  console.log(`\n🔍 Request logging enabled`)
})