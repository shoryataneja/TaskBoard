/**
 * Database Configuration
 * 
 * Configuration for database connections.
 * Currently using JSON file storage, but can be extended
 * to support MongoDB, PostgreSQL, or other databases.
 */

// Database connection configuration
const dbConfig = {
  // For future database implementation
  // mongodb: {
  //   uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/taskboard',
  //   options: {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   }
  // },
  
  // Current JSON file storage
  storage: {
    type: 'json',
    usersFile: './data/users.json'
  }
}

// @desc    Initialize database connection
const connectDB = async () => {
  try {
    console.log('Using JSON file storage for data persistence')
  } catch (error) {
    console.error('Database connection failed:', error)
    process.exit(1)
  }
}

module.exports = {
  dbConfig,
  connectDB,
}