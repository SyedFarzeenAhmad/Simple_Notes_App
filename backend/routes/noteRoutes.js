const express = require('express');
const {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
} = require('../controllers/noteController');
const { validateNote, validateObjectId } = require('../middlewares/validationMiddleware');

const router = express.Router();

// Routes
router.route('/')
  .get(getAllNotes)
  .post(validateNote, createNote);

router.route('/:id')
  .get(validateObjectId, getNote)
  .put(validateObjectId, validateNote, updateNote)
  .delete(validateObjectId, deleteNote);

module.exports = router;
