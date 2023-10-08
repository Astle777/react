import React,{ useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

interface Note {
  id: string;
  content: string;
  timestamp: number;
}


function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>("");

  useEffect(() => {
    // Load notes from local storage on component mount
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    // Save notes to local storage whenever the notes state changes
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.trim() === "") return;

    const newNoteObj: Note = {
      id: Date.now().toString(),
      content: newNote,
      timestamp: Date.now(),
    };

    setNotes([...notes, newNoteObj]);
    setNewNote("");
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };
  

  return (
    <div className="App">
    <h1>Simple Note-Taking App</h1>
    <div className="note-form">
      <textarea
        placeholder="Enter your note"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      ></textarea>
      <button onClick={addNote}>Add Note</button>
    </div>
    <div className="note-list">
      {notes.map((note) => (
        <div key={note.id} className="note">
          <p>{note.content}</p>
          <button onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  </div>
  );

}


export default App;
