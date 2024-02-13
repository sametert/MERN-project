import React, { useEffect, useState } from 'react';
import { Note } from './models/note';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const loadNotes = async () => {
        try {
          const response = await fetch('/api/notes' , { method: 'GET'}); 
          const notes = await response.json();
          setNotes(notes);
        } catch (error) {
          console.error(error);
          alert(error);
        }
    }

    loadNotes();
  }, []);

  return (
    <div>
        {JSON.stringify(notes)}
    </div>
  );
}

export default App;
