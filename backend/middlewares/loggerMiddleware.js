const morgan = require('morgan');

// Custom morgan token for request ID
morgan.token('id', (req) => req.id);

// Custom morgan format
const morganFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms';

// Request logging middleware
const requestLogger = morgan(morganFormat, {
  skip: (req, res) => {
    // Skip logging for health checks
    return req.url === '/api/health';
  }
});

module.exports = requestLogger;
