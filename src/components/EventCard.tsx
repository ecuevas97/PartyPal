// src/components/EventCard.tsx

import React from "react";
import { Link } from "react-router-dom";
import { EventType } from "../services/api"; // Import the EventType definition for type safety

// Define the expected props for this component
type Props = {
  event: EventType; // Single event data
  onDelete?: (id: string) => void; // Optional delete handler function
};

const EventCard: React.FC<Props> = ({ event, onDelete }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      {/* Display the event image if it exists */}
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-40 object-cover rounded mb-2"
        />
      )}

      {/* Event title */}
      <h2 className="text-lg font-semibold">{event.title}</h2>

      {/* Event date and location */}
      <p className="text-sm text-gray-600">
        {event.date} • {event.location}
      </p>

      {/* Event description */}
      <p className="mt-2 text-sm">{event.description}</p>

      {/* Action buttons: Edit and Delete */}
      <div className="mt-3 flex gap-2">
        {/* Edit button navigates to the edit page for this event */}
        <Link to={`/edit/${event.id}`} className="btn btn-sm btn-outline">
          Edit
        </Link>

        {/* Delete button triggers the onDelete callback (if provided) */}
        <button
          onClick={() => onDelete && onDelete(event.id)}
          className="btn btn-sm btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
