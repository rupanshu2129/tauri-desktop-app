import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { invoke } from '@tauri-apps/api/core';
import './App.css'; // We'll define the CSS in the next step

// Define the Note type
interface Note {
  id: string;
  content: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<string>('');
  const [editNoteId, setEditNoteId] = useState<string | null>(null); // Track which note is being edited

  // Load notes from the backend on component mount
  useEffect(() => {
    invoke<Note[]>('load_notes')
      .then((loadedNotes) => {
        if (loadedNotes) {
          setNotes(loadedNotes);
        }
      })
      .catch((err) => {
        console.error('Error loading notes:', err);
      });
  }, []);

  const addNote = async () => {
    if (currentNote.trim() === '') return;

    let newNotes: Note[];

    if (editNoteId) {
      // Edit mode: Update existing note
      newNotes = notes.map((note) =>
        note.id === editNoteId ? { ...note, content: currentNote } : note
      );
      setEditNoteId(null); // Exit edit mode
    } else {
      // Add new note
      const newNote: Note = { id: uuidv4(), content: currentNote };
      newNotes = [...notes, newNote];
    }

    setNotes(newNotes);
    setCurrentNote(''); // Clear input

    try {
      // Save notes to the backend after state is updated
      await invoke('save_notes', { notes: newNotes });
    } catch (err) {
      console.error('Error saving notes:', err);
    }
  };

  const deleteNote = async (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);

    try {
      // Save the updated notes to the backend after deleting
      await invoke('save_notes', { notes: updatedNotes });
    } catch (err) {
      console.error('Error saving notes:', err);
    }
  };

  const editNote = (id: string, content: string) => {
    setCurrentNote(content); // Load the note content into the input for editing
    setEditNoteId(id); // Track which note is being edited
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1>📝 My Notes App</h1>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="note-editor">
          <textarea
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            placeholder="Write your note here..."
            rows={4}
            className="note-textarea"
          />
          <button onClick={addNote} className="add-note-btn">
            {editNoteId ? 'Save Edit' : 'Add Note'}
          </button>
        </div>

        {/* List of Notes */}
        <div className="notes-list">
          <h2>Your Notes</h2>
          {notes.length === 0 && <p>No notes yet. Start adding some!</p>}
          <ul>
            {notes.map((note) => (
              <li key={note.id} className="note-item">
                <p>{note.content}</p>
                <div className="note-actions">
                  <button
                    onClick={() => editNote(note.id, note.content)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Made with ❤️ using Tauri and React</p>
      </footer>
    </div>
  );
}

export default App;
