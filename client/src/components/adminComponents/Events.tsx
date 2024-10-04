import { useState, useEffect } from "react";
import events from "../../json/etkinlik.json";
import AddEditEventDialog from "../AddEditEventDialog";
import * as EventsApi from "../../network/notes_api";
import Event from "../Event";
import { Event as EventModel } from "../../models/event";

function Events() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const [showAddEventDialog, setShowAddEventDialog] = useState(false);

  const [etkinlikler, setEtkinlikler] = useState<EventModel[]>([]);

  const [eventToEdit, setEventToEdit] = useState<EventModel | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await EventsApi.fetchEvent();
        setEtkinlikler(events);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };

    loadEvents();
  }, []);

  async function deleteEvent(event: EventModel) {
    try {
      const result = await EventsApi.deleteEvent(event._id);
      setEtkinlikler(
        etkinlikler.filter((existingNote) => existingNote._id !== event._id)
      );
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleSubscribe = () => {
    setSubscribed(true);
  };

  return (
    <div>
      <nav className="bg-gradient-to-r from-green-200 via-purple-200 to-purple-300 p-6 shadow-lg sticky top-0 z-50 h-48">
        <div className="max-w-6xl mx-auto h-full">
          <div className="flex justify-between items-center h-full text-gray-800">
            <div className="flex items-center">
              <div>
                <h1 className="text-5xl ml-4 font-bold text-gray-700">
                  Etkinlikler
                </h1>
              </div>
            </div>
            <div className="hidden md:block">
              <ul className="flex space-x-4 border-2 border-dashed p-4 bg-gray-750 text-lg rounded-full border-gray-700 cursor-pointer">
                <li>Merp Admin Panel</li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="w-full min-h-screen bg-gray-50 cursor-pointer">
        <div className="mx-auto max-w-4xl py-12 px-4">
          <div className="flex gap-4 justify-between my-2">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-700">
              Son Etkinlikler
            </h1>
            <button
              onClick={() => setShowAddEventDialog(true)}
              className="bg-gradient-to-r from-green-200 via-purple-200 to-purple-300 p-6 shadow-md rounded-lg  text-md hover:bg-gray-300 hover:shadow-lg transition-all duration-200"
            >
              Yeni Etkinlik Ekle
            </button>
            {showAddEventDialog && (
              <AddEditEventDialog
                onDismiss={() => setShowAddEventDialog(false)}
                onEventSaved={(newEvent) => {
                  setEtkinlikler([newEvent, ...etkinlikler]);
                  setShowAddEventDialog(false);
                }}
              />
            )}

            {eventToEdit && (
              <AddEditEventDialog
                eventToEdit={eventToEdit}
                onDismiss={() => setEventToEdit(null)}
                onEventSaved={(updatedEvent) => {
                  setEtkinlikler(
                    etkinlikler.map((existingNote) =>
                      existingNote._id === updatedEvent._id
                        ? updatedEvent
                        : existingNote
                    )
                  );
                  setEventToEdit(null);
                }}
              />
            )}
          </div>

          <div className="space-y-6 mb-4">
            {etkinlikler.map((etkinlik, i) => (
              <Event
                event={etkinlik}
                index={i}
                onDeleteEventClicked={deleteEvent}
                onEventClicked={setEventToEdit}
              />
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
