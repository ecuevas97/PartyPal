import React, { useState, useEffect } from "react";
import EventForm, { EventType } from "../components/EventForm";

const MyEvents: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [editingEvent, setEditingEvent] = useState<EventType | null>(null);
  const [showForm, setShowForm] = useState(false);
console.log(events)
  // Fetch events from API
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

  const handleAddEvent = async (newEvent: EventType | null) => {
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

  const handleUpdateEvent = async (updatedEvent: EventType | null) => {
    if (!editingEvent?.id) return;
    try {
      await fetch(`http://localhost:3001/events/${editingEvent.id}`, {
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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Events</h1>

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Add New Event
        </button>
      )}

      {showForm && (
        <EventForm
          event={editingEvent ?? undefined}
          //@ts-ignore
          onSubmit={()=> editingEvent ? handleUpdateEvent(editingEvent.id): handleAddEvent(editingEvent)}
          onCancel={() => {
            setShowForm(false);
            setEditingEvent(null);
          }}
        />
      )}
      <ul className="space-y-2">
        {events.map(event => (
          <li
            key={event.id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{event.title}</h2>
              <p>{event.date}</p>
              {event.location && <p>{event.location}</p>}
              {event.description && <p>{event.description}</p>}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingEvent(event);
                  setShowForm(true);
                }}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => event.id && handleDeleteEvent(event.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyEvents;
