// src/pages/MyEvents.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link to create navigation links
import PageLayout from "../components/PageLayout"; // Layout wrapper component
import EventCard from "../components/EventCard"; // Card component to display each event
import { getEvents, deleteEvent, EventType } from "../services/api"; // API functions and types

export default function MyEvents() {
  // State to store the list of events fetched from API
  const [events, setEvents] = useState<EventType[]>([]);
  // State to track loading status for showing a loading message
  const [loading, setLoading] = useState(true);
  // State to track errors and show error messages
  const [error, setError] = useState<string | null>(null);

  // useEffect runs once after component mounts to fetch events from API
  useEffect(() => {
    async function load() {
      try {
        setLoading(true); // Set loading state true before API call
        const res = await getEvents(); // Fetch events from MockAPI
        setEvents(res.data); // Store events data in state
      } catch (err) {
        console.error(err);
        setError("Failed to load events."); // Show error message if fetch fails
      } finally {
        setLoading(false); // Stop loading spinner/message
      }
    }
    load();
  }, []);

  // Function to handle event deletion
  const handleDelete = async (id: string) => {
    try {
      await deleteEvent(id); // Call API to delete event
      setEvents((prev) => prev.filter((e) => e.id !== id)); // Remove deleted event locally
    } catch (err) {
      console.error(err);
      setError("Failed to delete event."); // Show error message on failure
    }
  };

  // Show loading message while fetching data
  if (loading) return <PageLayout><p>Loading events…</p></PageLayout>;
  // Show error message if API call or delete failed
  if (error) return <PageLayout><p>{error}</p></PageLayout>;

  return (
    <PageLayout>
      {/* Header and Add Event button container */}
      <div className="flex justify-between items-center mb-4">
        {/* Page title */}
        <h1 className="text-2xl font-semibold">My Events</h1>
        {/* Link styled as a button that navigates to "/add" for creating new events */}
        <Link
          to="/add"
          className="btn btn-primary px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          + Add Event
        </Link>
      </div>

      {/* Grid container for EventCards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {/* Show message if no events */}
        {events.length === 0 ? (
          <p>No events yet. Add one!</p>
        ) : (
          // Map over events and render an EventCard for each
          events.map((event) => (
            <EventCard key={event.id} event={event} onDelete={handleDelete} />
          ))
        )}
      </div>
    </PageLayout>
  );
}
