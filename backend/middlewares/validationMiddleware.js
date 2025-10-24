const { HTTP_STATUS, RESPONSE_MESSAGES, VALIDATION_LIMITS } = require('../constants');
const { createResponse } = require('../utils/helpers');

const validateNote = (req, res, next) => {
  const { title, content } = req.body;
  
  // Check if title and content exist
  if (!title || !content) {
    const response = createResponse(
      false, 
      null, 
      RESPONSE_MESSAGES.ERROR.MISSING_FIELDS, 
      HTTP_STATUS.BAD_REQUEST
    );
    return res.status(HTTP_STATUS.BAD_REQUEST).json(response);
  }
  
  // Check if title and content are not empty strings
  if (title.trim().length === 0 || content.trim().length === 0) {
    const response = createResponse(
      false, 
      null, 
      RESPONSE_MESSAGES.ERROR.EMPTY_FIELDS, 
      HTTP_STATUS.BAD_REQUEST
    );
    return res.status(HTTP_STATUS.BAD_REQUEST).json(response);
  }
  
  // Check length limits
  if (title.length > VALIDATION_LIMITS.TITLE_MAX_LENGTH) {
    const response = createResponse(
      false, 
      null, 
      RESPONSE_MESSAGES.ERROR.TITLE_TOO_LONG, 
      HTTP_STATUS.BAD_REQUEST
    );
    return res.status(HTTP_STATUS.BAD_REQUEST).json(response);
  }
  
  if (content.length > VALIDATION_LIMITS.CONTENT_MAX_LENGTH) {
    const response = createResponse(
      false, 
      null, 
      RESPONSE_MESSAGES.ERROR.CONTENT_TOO_LONG, 
      HTTP_STATUS.BAD_REQUEST
    );
    return res.status(HTTP_STATUS.BAD_REQUEST).json(response);
  }
  
  next();
};

const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  
  // Check if id is a valid MongoDB ObjectId
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    const response = createResponse(
      false, 
      null, 
      RESPONSE_MESSAGES.ERROR.INVALID_ID, 
      HTTP_STATUS.BAD_REQUEST
    );
    return res.status(HTTP_STATUS.BAD_REQUEST).json(response);
  }
  
  next();
};

module.exports = {
  validateNote,
  validateObjectId
};
