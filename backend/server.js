const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Import configuration
const config = require('./config/config');

// Import database connection
const connectDB = require('./config/database');

// Import routes
const noteRoutes = require('./routes/noteRoutes');

// Import middleware
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');
const requestLogger = require('./middlewares/loggerMiddleware');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors(config.CORS_CONFIG));
app.use(express.json({ limit: config.maxFileSize }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use(requestLogger);

// Routes
app.use('/api/notes', noteRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running!',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    version: '1.0.0'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Simple Notes API',
    version: '1.0.0',
    environment: config.nodeEnv,
    endpoints: {
      health: '/api/health',
      notes: '/api/notes'
    }
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`🚀 Server running in ${config.nodeEnv} mode on port ${config.port}`);
});