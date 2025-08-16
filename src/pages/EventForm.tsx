import React, { useState, useEffect, FormEvent } from "react";
import "../cute-theme.css"; // Optional custom CSS for cute font

// Define the structure of an Event
export type EventType = {
  id?: number; // Optional because new events won't have an ID yet
  title: string;
  date: string;
  location?: string;
  description?: string;
};

// Props accepted by the EventForm component
type EventFormProps = {
  event?: EventType; // If editing, we pass this
  onSubmit: (data: EventType) => Promise<void> | void; // Function to save form data
  onCancel: () => void; // Function to cancel form
};

const EventForm: React.FC<EventFormProps> = ({ event, onSubmit, onCancel }) => {
  // Local state to hold form data
  const [formData, setFormData] = useState<EventType>({
    title: event?.title || "",
    date: event?.date || "",
    location: event?.location || "",
    description: event?.description || "",
  });

  // If `event` exists (editing), populate form with existing values
  useEffect(() => {
    if (event) setFormData({ ...event });
  }, [event]);

  // Update local state when input values change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="bg-gradient-to-r from-pink-200 via-pink-100 to-blue-200 rounded-3xl p-8 shadow-2xl max-w-xl mx-auto">
      {/* Form heading */}
      <h2 className="text-3xl font-cute font-extrabold text-pink-600 text-center mb-6 drop-shadow-sm">
        {event ? "🎀 Edit Event" : "🎀 Add New Event"}
      </h2>

      {/* Form inputs */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="💖 Event Title"
          required
          className="w-full border-2 border-blue-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-pink-400 bg-white/80 shadow-inner"
        />

        {/* Date */}
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border-2 border-blue-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-pink-400 bg-white/80 shadow-inner"
        />

        {/* Location */}
        <input
          name="location"
          type="text"
          value={formData.location}
          onChange={handleChange}
          placeholder="📍 Location"
          className="w-full border-2 border-blue-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-pink-400 bg-white/80 shadow-inner"
        />

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="📝 Description"
          className="w-full border-2 border-blue-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-pink-400 bg-white/80 shadow-inner"
        />

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white px-8 py-3 rounded-full shadow-lg font-bold transition-all text-lg"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-pink-200 hover:bg-pink-300 text-pink-800 px-8 py-3 rounded-full shadow-lg font-bold transition-all text-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
