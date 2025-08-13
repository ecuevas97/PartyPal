import React, { useState, useEffect } from "react";

// Event object type
export type EventType = {
  id?: number; // Optional, since new events won't have an ID yet
  title: string;
  date: string;
  location?: string;
  description?: string;
};

// Props the form will accept
type EventFormProps = {
  event?: EventType; // If editing, we pass this
  onSubmit: (formData: EventType) => void; // Function to save form data
  onCancel: () => void; // Function to cancel form
};

export default function EventForm({
  event,
  onSubmit,
  onCancel,
}: EventFormProps) {
  // Local state for form fields
  const [formData, setFormData] = useState<EventType>({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  // If `event` is provided (editing), pre-fill form fields
 useEffect(() => {
  if (event) {
    setFormData({
      title: event.title || "",
      date: event.date || "",
      location: event.location || "",
      description: event.description || "",
      id: event.id,
    });
  }
}, [event]);


  // Handle input changes for text and textarea fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // Send form data up to parent
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-pink-200">
      <h2 className="text-lg font-bold mb-4 text-pink-600">
        {event ? "Edit Event" : "Add New Event"}
      </h2>

      {/* Event form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Event Title"
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          name="location"
          type="text"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border rounded px-3 py-2"
        />

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
