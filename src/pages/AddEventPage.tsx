import React from "react";
import { useNavigate } from "react-router-dom";
import EventForm, { EventType } from "../components/EventForm";

export default function AddEventPage() {
  const navigate = useNavigate();

  // When form submits, save event then go home (or wherever)
  const handleSubmit = async (eventData: EventType) => {
    await fetch("http://localhost:3001/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
    navigate("/"); // Redirect after save
  };

  // Cancel goes back to previous page or home
  const handleCancel = () => {
    navigate("/");
  };

  // Pass handlers to form
  return <EventForm onSubmit={handleSubmit} onCancel={handleCancel} />;
}
