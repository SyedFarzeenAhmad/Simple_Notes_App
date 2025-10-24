import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentNote.title.trim() || !currentNote.content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    try {
      if (editingId) {
        // Update existing note
        await axios.put(`${API_URL}/notes/${editingId}`, currentNote);
        setNotes(notes.map(note => 
          note._id === editingId ? { ...note, ...currentNote } : note
        ));
        setEditingId(null);
      } else {
        // Create new note
        const response = await axios.post(`${API_URL}/notes`, currentNote);
        setNotes([response.data, ...notes]);
      }
      setCurrentNote({ title: '', content: '' });
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Error saving note. Please try again.');
    }
  };

  // Handle edit
  const handleEdit = (note) => {
    setCurrentNote({ title: note.title, content: note.content });
    setEditingId(note._id);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await axios.delete(`${API_URL}/notes/${id}`);
        setNotes(notes.filter(note => note._id !== id));
        if (editingId === id) {
          setCurrentNote({ title: '', content: '' });
          setEditingId(null);
        }
      } catch (error) {
        console.error('Error deleting note:', error);
        alert('Error deleting note. Please try again.');
      }
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    setCurrentNote({ title: '', content: '' });
    setEditingId(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Simple Notes App</h1>
        <p>Create, edit, and manage your notes</p>
      </header>

      <main className="app-main">
        <div className="note-form-container">
          <form onSubmit={handleSubmit} className="note-form">
            <h2>{editingId ? 'Edit Note' : 'Create New Note'}</h2>
            <div className="form-group">
              <input
                type="text"
                placeholder="Note title..."
                value={currentNote.title}
                onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Write your note content here..."
                value={currentNote.content}
                onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                className="form-textarea"
                rows="6"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update Note' : 'Save Note'}
              </button>
              {editingId && (
                <button type="button" onClick={handleCancel} className="btn btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="notes-container">
          <h2>Your Notes ({notes.length})</h2>
          {loading ? (
            <div className="loading">Loading notes...</div>
          ) : notes.length === 0 ? (
            <div className="empty-state">
              <p>No notes yet. Create your first note above!</p>
            </div>
          ) : (
            <div className="notes-grid">
              {notes.map((note) => (
                <div key={note._id} className="note-card">
                  <div className="note-header">
                    <h3 className="note-title">{note.title}</h3>
                    <div className="note-actions">
                      <button
                        onClick={() => handleEdit(note)}
                        className="btn btn-small btn-edit"
                        title="Edit note"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(note._id)}
                        className="btn btn-small btn-delete"
                        title="Delete note"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <div className="note-content">
                    {note.content.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                  <div className="note-footer">
                    <small>
                      Created: {new Date(note.createdAt).toLocaleDateString()}
                      {note.updatedAt !== note.createdAt && (
                        <span> • Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
                      )}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
