import React, { useState, useEffect } from "react";
import EventForm, { EventType } from "../components/EventForm";

const MyEvents: React.FC = () => {
  // State for events list
  const [events, setEvents] = useState<EventType[]>([]);
  // Event being edited (or null if adding a new one)
  const [editingEvent, setEditingEvent] = useState<EventType | null>(null);
  // Whether to show the form
  const [showForm, setShowForm] = useState(false);

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:3001/events");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Run once on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Add new event
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

  // Update existing event
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

  // Delete event
  const handleDeleteEvent = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/events/${id}`, { method: "DELETE" });
      await fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="p-4">
      {/* Page title */}
      <h1 className="text-xl font-bold mb-4">My Events</h1>

      {/* Add button */}
      {!showForm && (
        <button
          onClick={() => {
            setEditingEvent(null); // Make sure it's a fresh form
            setShowForm(true);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Add New Event
        </button>
      )}

      {/* Event form */}
      {showForm && (
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

      )}

      {/* Event list */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <li
            key={event.id}
            className="bg-white shadow-lg rounded-xl p-4 flex flex-col justify-between border border-pink-200"
          >
            <div>
              <h2 className="text-lg font-bold text-pink-600">🎉 {event.title}</h2>
              <p className="text-gray-600 mt-1">📅 {event.date}</p>
              {event.location && <p className="text-gray-600">📍 {event.location}</p>}
              {event.description && (
                <p className="mt-2 text-gray-700">{event.description}</p>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  setEditingEvent(event);
                  setShowForm(true);
                }}
                className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded text-sm"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => event.id && handleDeleteEvent(event.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
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
