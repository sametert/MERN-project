import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from '../models/note';
import Note from './Note'
import { Button, Col, Container, Row } from 'react-bootstrap';
// import styles from './styles/NotePage.module.css';
import * as NotesApi from "../network/notes_api";
import AddNoteDialog from './AddNoteDialog';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useMainStore } from "../store/store";
import megaphone from "../images/megaphone.jpeg";
import duyurular from "../json/duyurular.json"

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  console.log(notes);
  const userValues = useMainStore((state) => state.userValues);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <div>
      <nav className="bg-gray-200 p-6 shadow-md sticky top-0 z-50 h-48">
        <div className="max-w-6xl mx-auto h-full">
          <div className="flex justify-between items-center h-full text-gray-800">
            <div className="flex items-center">
              <img src={megaphone} alt="Megaphone" className="align-middle w-20"/>
              <div>
                <h1 className="text-5xl ml-4 font-bold">Announcements</h1>
              </div>
            </div>
            <div className="relative">
            <div
                className="flex flex-col items-center justify-center gap-1 cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <p className="text-lg font-semibold">{userValues.name} {userValues.secondname.toUpperCase()}</p>
                <p className="text-sm">{userValues.department} Bölümü</p>
                <p className="text-sm">{userValues.classYear}. Sınıf</p>
              </div>
              {menuOpen && (
                <div className="absolute right-0 bg-white rounded-md shadow-md mt-2 w-40">
                  <div className="py-2">
                    <Link
                      // onClick={handleLogout}
                      to="/"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                    >
                      Çıkış Yap
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="w-full min-h-screen bg-gray-100">
        <div className="mx-auto max-w-4xl py-12 px-4">
          <div className='flex gap-4 justify-between my-2'>
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Announcements</h1>       
            <button
              onClick={() => setShowAddNoteDialog(true)}
              className='bg-gray-200 text-gray-800 p-4 rounded-lg shadow-md text-md hover:bg-gray-300 hover:shadow-lg transition-all duration-200'
            >
              Add new note
            </button>
            {showAddNoteDialog && 
            <AddNoteDialog 
              onDismiss={() => setShowAddNoteDialog(false)}
              onNoteSaved={(newNote) => {
                setNotes([newNote, ...notes]);
                setShowAddNoteDialog(false)
              }}
            />
      } 
          </div>
          <div className="space-y-6 mb-4">
            {notes.map((note, i) => (
              <Note note={note} index={i} />     
            ))}
          </div>
          <div className='space-y-6'>
            {duyurular.map((duyuru,i) => (
               <div key={i} className={`p-6 rounded-lg shadow-md flex gap-4 hover:shadow-lg transition-shadow ${i % 2 === 0 ? 'bg-blue-100' : 'bg-yellow-100'}`}>
               <div className={`w-32 flex-shrink-0 ${i % 2 === 0 ? 'text-blue-600' : 'text-yellow-600'}`}>{duyuru.tarih}</div>
               <div className={`w-0.5 ${i % 2 === 0 ? 'bg-blue-600' : 'bg-yellow-600'}`}></div>
               <div>
                 <h2 className="text-xl font-semibold cursor-pointer hover:underline">{duyuru.baslik}</h2>
                 <p className="mt-2 text-gray-700">{duyuru.icerik}</p>
               </div>
             </div> 
            ))}
          </div>
        </div>
      </div>

      {/* <Row xs={1} md={2} xl={3} className='g-4'>
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note}  />
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
      } */}
    </div>
  );
}

export default App;
function createHttpError(arg0: number) {
  throw new Error('Function not implemented.');
}


