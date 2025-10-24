const Note = require('../models/Note');
const { HTTP_STATUS, RESPONSE_MESSAGES } = require('../constants');
const { createResponse } = require('../utils/helpers');

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 });
    const response = createResponse(
      true, 
      notes, 
      RESPONSE_MESSAGES.SUCCESS.NOTES_FETCHED, 
      HTTP_STATUS.OK
    );
    response.count = notes.length;
    res.status(HTTP_STATUS.OK).json(response);
  } catch (error) {
    const response = createResponse(
      false, 
      null, 
      error.message, 
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
  }
};

// @desc    Get single note
// @route   GET /api/notes/:id
// @access  Public
const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      const response = createResponse(
        false, 
        null, 
        RESPONSE_MESSAGES.ERROR.NOTE_NOT_FOUND, 
        HTTP_STATUS.NOT_FOUND
      );
      return res.status(HTTP_STATUS.NOT_FOUND).json(response);
    }
    
    const response = createResponse(
      true, 
      note, 
      RESPONSE_MESSAGES.SUCCESS.NOTE_FETCHED, 
      HTTP_STATUS.OK
    );
    res.status(HTTP_STATUS.OK).json(response);
  } catch (error) {
    const response = createResponse(
      false, 
      null, 
      error.message, 
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
  }
};

// @desc    Create new note
// @route   POST /api/notes
// @access  Public
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    const note = await Note.create({ title, content });
    
    const response = createResponse(
      true, 
      note, 
      RESPONSE_MESSAGES.SUCCESS.NOTE_CREATED, 
      HTTP_STATUS.CREATED
    );
    res.status(HTTP_STATUS.CREATED).json(response);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      const response = createResponse(
        false, 
        null, 
        messages.join(', '), 
        HTTP_STATUS.BAD_REQUEST
      );
      return res.status(HTTP_STATUS.BAD_REQUEST).json(response);
    }
    
    const response = createResponse(
      false, 
      null, 
      error.message, 
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
  }
};

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Public
const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!note) {
      const response = createResponse(
        false, 
        null, 
        RESPONSE_MESSAGES.ERROR.NOTE_NOT_FOUND, 
        HTTP_STATUS.NOT_FOUND
      );
      return res.status(HTTP_STATUS.NOT_FOUND).json(response);
    }
    
    const response = createResponse(
      true, 
      note, 
      RESPONSE_MESSAGES.SUCCESS.NOTE_UPDATED, 
      HTTP_STATUS.OK
    );
    res.status(HTTP_STATUS.OK).json(response);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      const response = createResponse(
        false, 
        null, 
        messages.join(', '), 
        HTTP_STATUS.BAD_REQUEST
      );
      return res.status(HTTP_STATUS.BAD_REQUEST).json(response);
    }
    
    const response = createResponse(
      false, 
      null, 
      error.message, 
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
  }
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Public
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    
    if (!note) {
      const response = createResponse(
        false, 
        null, 
        RESPONSE_MESSAGES.ERROR.NOTE_NOT_FOUND, 
        HTTP_STATUS.NOT_FOUND
      );
      return res.status(HTTP_STATUS.NOT_FOUND).json(response);
    }
    
    const response = createResponse(
      true, 
      null, 
      RESPONSE_MESSAGES.SUCCESS.NOTE_DELETED, 
      HTTP_STATUS.OK
    );
    res.status(HTTP_STATUS.OK).json(response);
  } catch (error) {
    const response = createResponse(
      false, 
      null, 
      error.message, 
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(response);
  }
};

module.exports = {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
};
