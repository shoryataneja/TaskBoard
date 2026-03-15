/**
 * User Model
 * 
 * Handles user data operations including:
 * - Creating new users
 * - Finding users by email
 * - Validating user credentials
 * - Reading/writing to users.json file
 */

const fs = require('fs').promises
const path = require('path')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')

const USERS_FILE = path.join(__dirname, '../data/users.json')

// @desc    Get all users from JSON file
const getUsers = async () => {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    // If file doesn't exist or is empty, return empty array
    if (error.code === 'ENOENT') {
      return []
    }
    console.error('Error reading users file:', error)
    return []
  }
}

// @desc    Find user by email
const findUserByEmail = async (email) => {
  try {
    const users = await getUsers()
    return users.find(user => user.email === email) || null
  } catch (error) {
    console.error('Error finding user:', error)
    return null
  }
}

// @desc    Find user by ID
const findUserById = async (id) => {
  try {
    const users = await getUsers()
    return users.find(user => user.id === id) || null
  } catch (error) {
    console.error('Error finding user by ID:', error)
    return null
  }
}

// @desc    Create new user
const createUser = async (userData) => {
  try {
    const { name, email, password } = userData
    
    // Check if user already exists
    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      throw new Error('User already exists with this email')
    }
    
    // Hash password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    
    // Create new user object
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword
    }
    
    // Get existing users and add new user
    const users = await getUsers()
    users.push(newUser)
    
    // Save updated users array
    await saveUsers(users)
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser
    return userWithoutPassword
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

// @desc    Validate user password
const validatePassword = async (email, password) => {
  try {
    const user = await findUserByEmail(email)
    if (!user) {
      return null
    }
    
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return null
    }
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    console.error('Error validating password:', error)
    return null
  }
}

// @desc    Save users to JSON file
const saveUsers = async (users) => {
  try {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2))
  } catch (error) {
    console.error('Error saving users:', error)
    throw error
  }
}

module.exports = {
  getUsers,
  findUserByEmail,
  findUserById,
  createUser,
  validatePassword,
  saveUsers,
}