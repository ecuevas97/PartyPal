// src/pages/EventForm.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import { createEvent, getEvent, updateEvent, EventType } from "../services/api";

export default function EventForm() {
  // useParams returns a record of params; id may be undefined
  const params = useParams();
  const id = params.id; // string | undefined
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  // Form state (omit id and createdAt)
  const [form, setForm] = useState<Omit<EventType, "id" | "createdAt">>({
    title: "",
    description: "",
    date: "",
    location: "",
    image: "",
    isAttending: false,
  });
  const [loading, setLoading] = useState(false);

  // When editing, fetch the existing event and populate the form
  useEffect(() => {
    if (!id) return; // nothing to fetch when creating
    (async () => {
      setLoading(true);
      try {
        const res = await getEvent(id);
        const data = res.data;
        setForm({
          title: data.title ?? "",
          description: data.description ?? "",
          date: data.date ?? "",
          location: data.location ?? "",
          image: data.image ?? "",
          isAttending: Boolean(data.isAttending),
        });
      } catch (err) {
        console.error("Failed to load event:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Handler for text inputs and textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Handler for checkbox specifically (typed as HTMLInputElement)
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: checked }));
  };

  // Submit (create or update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && id) {
        await updateEvent(id, form);
      } else {
        await createEvent(form);
      }
      navigate("/events");
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  // Simple loading UI
  if (loading) {
    return (
      <PageLayout>
        <p>Loading event…</p>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <h1 className="mb-4">{isEditing ? "Edit Event" : "Add Event"}</h1>

      <form onSubmit={handleSubmit} className="space-y-3 max-w-xl">
        <input
          name="title"
          value={form.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="border p-2 w-full"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="border p-2 w-full"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleInputChange}
          className="border p-2 w-full"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleInputChange}
          placeholder="Location"
          className="border p-2 w-full"
        />

        <input
          name="image"
          value={form.image}
          onChange={handleInputChange}
          placeholder="Image URL"
          className="border p-2 w-full"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isAttending"
            checked={form.isAttending}
            onChange={handleCheckboxChange}
          />
          <span>I'm attending</span>
        </label>

        <div className="flex gap-2">
          <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded">
            Save
          </button>
          <button type="button" onClick={() => navigate("/events")} className="px-4 py-2 border rounded">
            Cancel
          </button>
        </div>
      </form>
    </PageLayout>
  );
}
