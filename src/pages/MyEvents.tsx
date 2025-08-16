import React, { useState, useEffect } from "react";
import EventForm, { EventType } from "../components/EventForm";

const MyEvents: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [editingEvent, setEditingEvent] = useState<EventType | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:3001/events");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = async (newEvent: EventType) => {
    try {
      await fetch("http://localhost:3001/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });
      await fetchEvents();
      setShowForm(false);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleUpdateEvent = async (updatedEvent: EventType) => {
    if (!updatedEvent.id) return;
    try {
      await fetch(`http://localhost:3001/events/${updatedEvent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      });
      await fetchEvents();
      setEditingEvent(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/events/${id}`, { method: "DELETE" });
      await fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-blue-100 p-10">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-pink-600 mb-12 text-center drop-shadow-lg">
        🎀 My Cute Events 🎀
      </h1>

      {/* Add Event Button */}
      {!showForm && (
        <div className="text-center mb-12">
           <button
           onClick={() => {
           setEditingEvent(null);
           setShowForm(true);
           }}
          className="bg-blue-400 hover:bg-blue-500 text-white px-10 py-4 rounded-full shadow-lg transition-all text-lg"
         >
           ➕ Add New Event
        </button>
      </div>
      )}

      {/* Event Form */}
      {showForm && (
        <div className="max-w-xl mx-auto mb-12">
          <EventForm
            event={editingEvent ?? undefined}
            onSubmit={async (formData) => {
              if (editingEvent) {
                await handleUpdateEvent({ ...formData, id: editingEvent.id });
              } else {
                await handleAddEvent(formData);
              }
            }}
            onCancel={() => {
              setShowForm(false);
              setEditingEvent(null);
            }}
          />
        </div>
      )}

      {/* Event List */}
      <ul className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <li
            key={event.id}
            className="bg-white shadow-xl rounded-3xl p-10 m-4 flex flex-col justify-between border border-pink-200 hover:shadow-2xl transition-all"
          >
            <div>
              <h2 className="text-2xl font-bold text-pink-600 mb-3">
                🎉 {event.title}
              </h2>
              <p className="text-gray-600 text-lg mb-2">📅 {event.date}</p>
              {event.location && (
                <p className="text-gray-600 text-lg mb-2">📍 {event.location}</p>
              )}
              {event.description && (
                <p className="mt-4 text-gray-700 text-base leading-relaxed">
                  {event.description}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => {
                  setEditingEvent(event);
                  setShowForm(true);
                }}
                className="bg-yellow-400 hover:bg-yellow-500 px-5 py-2 rounded-full text-sm shadow"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => event.id && handleDeleteEvent(event.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full text-sm shadow"
              >
                🗑 Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyEvents;
