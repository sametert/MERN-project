import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/note';
import Note from './components/Note'
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from './styles/NotePage.module.css';
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from './components/AddNoteDialog';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
        try {
          const notes = await NotesApi.fetchNotes();
          setNotes(notes);
        } catch (error) {
          console.error(error);
          alert(error);
        }
    }

    loadNotes();
  }, []);

  return (
    <Container>
      <Button onClick={() => setShowAddNoteDialog(true)}>
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={styles.note} />
          </Col>
        ))}
      </Row>
      {showAddNoteDialog && 
        <AddNoteDialog 
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote])
            setShowAddNoteDialog(false)
          }}
        />
      }
    </Container>
  );
}

export default App;
function createHttpError(arg0: number) {
  throw new Error('Function not implemented.');
}

