import React, { useEffect, useState } from 'react';
import AddEditNoteDialog from './AddEditNoteDialog';
import { Note as NoteModel } from '../models/note';
import * as NotesApi from "../network/notes_api";
import Note from './adminComponents/Note'


const NotesPageLoggedInView = () => {
    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null)

    useEffect(() => {
      const loadNotes = async () => {
          try {
            const notes = await NotesApi.fetchNotes();
            setNotes(notes);
          } catch (error) {
            // console.error(error);
            alert(error);
          }
      }
  
      loadNotes();
    }, []);
  
    async function deleteNote(note: NoteModel) {
        try {
          await NotesApi.deleteNote(note._id);
          setNotes(notes.filter(existingNote => existingNote._id !== note._id))
        } catch (error) {
          console.log(error);
          alert(error);
        }
      }

    return (
        <div className='flex'>
          <button
            onClick={() => setShowAddNoteDialog(true)}
            className='bg-gray-200 text-gray-800 p-4 rounded-lg shadow-md text-md hover:bg-gray-300 hover:shadow-lg transition-all duration-200'
          >
           Duyuru Ekle
          </button>
          {showAddNoteDialog && 
            <AddEditNoteDialog 
              onDismiss={() => setShowAddNoteDialog(false)}
              onNoteSaved={(newNote) => {
                setNotes([newNote, ...notes]);
                setShowAddNoteDialog(false)
              }}
            />
          }
          {noteToEdit && 
            <AddEditNoteDialog
              noteToEdit={noteToEdit}
              onDismiss={() => setNoteToEdit(null)}
              onNoteSaved={(updatedNote) => {
                setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote));
                setNoteToEdit(null)
              }}
          />
          } 

            {notes.map((note, i) => (
              <Note 
                note={note} 
                index={i} 
                onDeleteNoteClicked={deleteNote} 
                onNoteClicked={setNoteToEdit} 
              />     
            ))}
            
        </div>
    )
        
}

export default NotesPageLoggedInView;