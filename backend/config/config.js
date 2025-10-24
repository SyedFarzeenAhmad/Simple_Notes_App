const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const config = {
  // Server configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database configuration
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/notesapp',
  
  // CORS configuration
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  
  // Rate limiting (if implemented later)
  rateLimitWindowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 minutes
  rateLimitMax: process.env.RATE_LIMIT_MAX || 100, // limit each IP to 100 requests per windowMs
  
  // JWT configuration (for future authentication)
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpire: process.env.JWT_EXPIRE || '30d',
  
  // File upload limits
  maxFileSize: process.env.MAX_FILE_SIZE || '10mb',
  
  // Pagination defaults
  defaultPageSize: process.env.DEFAULT_PAGE_SIZE || 10,
  maxPageSize: process.env.MAX_PAGE_SIZE || 100
};

module.exports = config;
