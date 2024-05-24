import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useMainStore } from "../store/store";
import events from "../json/etkinlik.json";
import AddNoteDialog from './AddNoteDialog';
import * as NotesApi from "../network/notes_api";
import Event from './Event'

function Events() {
  const userValues = useMainStore((state) => state.userValues);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  const [etkinlikler, setEtkinlikler] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
        try {
          const notes = await NotesApi.fetchNotes();
          setEtkinlikler(notes);
        } catch (error) {
          // console.error(error);
          alert(error);
        }
    }

    loadNotes();
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubscribe = () => {
    // Burada e-posta adresini bir veritabanına kaydetme veya e-posta servis sağlayıcınıza iletim yapma kodu gelebilir.
    // Örneğin:
    // fetch('/api/subscribe', {
    //   method: 'POST',
    //   body: JSON.stringify({ email }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(response => {
    //   if (response.ok) {
    //     setSubscribed(true);
    //   }
    // });

    // Abone olunduğunu işaretlemek için:
    setSubscribed(true);
  };

  return (
    <div>
      <nav className="bg-gradient-to-r from-green-200 via-purple-200 to-purple-300 p-6 shadow-lg sticky top-0 z-50 h-48">
        <div className="max-w-6xl mx-auto h-full">
          <div className="flex justify-between items-center h-full text-gray-800">
            <div className="flex items-center">
              {/* <img src={eventLogo} alt="Event Logo" className="align-middle w-20"/> */}
              <div>
                <h1 className="text-5xl ml-4 font-bold text-gray-700">
                  Events
                </h1>
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

      <div className="w-full min-h-screen bg-gray-50 cursor-pointer">
        <div className="mx-auto max-w-4xl py-12 px-4">
          <div className="flex gap-4 justify-between my-2">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-700">
              Upcoming Events
            </h1>
            <button
              onClick={() => setShowAddNoteDialog(true)}
              className="bg-gradient-to-r from-green-200 via-purple-200 to-purple-300 p-6 shadow-md rounded-lg  text-md hover:bg-gray-300 hover:shadow-lg transition-all duration-200"
            >
              Add new note
            </button>
            {showAddNoteDialog && (
              <AddNoteDialog
                onDismiss={() => setShowAddNoteDialog(false)}
                onNoteSaved={(newNote) => {
                  setEtkinlikler([newNote, ...etkinlikler]);
                  setShowAddNoteDialog(false);
                }}
              />
            )}
          </div>

          <div className="space-y-6 mb-4">
            {etkinlikler.map((etkinlik, i) => (
               <Event note={etkinlik} index={i} />
            ))}
          </div>

          <div className="space-y-6">
            {events.map((event, i) => (
              <div
                key={event.etkinlik_id}
                className={`p-6 rounded-lg shadow-md flex gap-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl ${
                  i % 2 === 0 ? "bg-green-100" : "bg-purple-100"
                }`}
              >
                <div
                  className={`flex-shrink-0 ${
                    i % 2 === 0 ? "text-green-600" : "text-purple-600"
                  }`}
                >
                  <div className="text-sm">{event.tarih}</div>
                  <h2 className="text-2xl font-semibold">{event.baslik}</h2>
                </div>
                <div
                  className={`w-0.5 ${
                    i % 2 === 0 ? "bg-green-600" : "bg-purple-600"
                  }`}
                ></div>
                <div className="flex-grow">
                  <p className="text-gray-700">{event.icerik}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-lg font-semibold mb-4">Bültenimize Abone Olun</h2>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="email"
              placeholder="E-posta adresinizi girin"
              value={email}
              onChange={handleEmailChange}
              className="flex-grow md:w-96 px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
            />
            <button
              onClick={handleSubscribe}
              className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 focus:outline-none"
            >
              Abone Ol
            </button>
          </div>
          {subscribed && (
            <p className="mt-2 text-green-600">Başarıyla abone oldunuz!</p>
          )}
        </div>
      </footer>
    </div>
  );
}

export default Events;
