// Application constants

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

const RESPONSE_MESSAGES = {
  SUCCESS: {
    NOTE_CREATED: 'Note created successfully',
    NOTE_UPDATED: 'Note updated successfully',
    NOTE_DELETED: 'Note deleted successfully',
    NOTES_FETCHED: 'Notes fetched successfully',
    NOTE_FETCHED: 'Note fetched successfully'
  },
  ERROR: {
    NOTE_NOT_FOUND: 'Note not found',
    INVALID_ID: 'Invalid note ID format',
    VALIDATION_ERROR: 'Validation error',
    SERVER_ERROR: 'Internal server error',
    MISSING_FIELDS: 'Title and content are required',
    EMPTY_FIELDS: 'Title and content cannot be empty',
    TITLE_TOO_LONG: 'Title cannot exceed 100 characters',
    CONTENT_TOO_LONG: 'Content cannot exceed 5000 characters'
  }
};

const VALIDATION_LIMITS = {
  TITLE_MAX_LENGTH: 100,
  CONTENT_MAX_LENGTH: 5000,
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100
};

const DATABASE_CONFIG = {
  CONNECTION_OPTIONS: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  }
};

const CORS_CONFIG = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = {
  HTTP_STATUS,
  RESPONSE_MESSAGES,
  VALIDATION_LIMITS,
  DATABASE_CONFIG,
  CORS_CONFIG
};
