import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventForm, { EventType } from "../components/EventForm";

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>(); // Get event ID from URL
  const navigate = useNavigate();

  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the event data once
  useEffect(() => {
    async function fetchEvent() {
      if (!id) return;
      try {
        const res = await fetch(`http://localhost:3001/events/${id}`);
        if (!res.ok) throw new Error("Event not found");
        const data: EventType = await res.json();
        setEvent(data);
      } catch (error) {
        console.error("Failed to fetch event:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [id]);

  // Update event handler
  const handleSubmit = async (updatedEvent: EventType) => {
    try {
      await fetch(`http://localhost:3001/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      });
      navigate("/"); // Go back after save
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  // Cancel goes back without saving
  const handleCancel = () => {
    navigate("/");
  };

  if (loading) return <p>Loading event data...</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <EventForm event={event} onSubmit={handleSubmit} onCancel={handleCancel} />
  );
}
