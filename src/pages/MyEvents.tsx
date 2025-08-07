import React from 'react';
import PageLayout from '../components/PageLayout';
import EventCard from '../components/EventCard';

const MyEvents = () => {
  return (
    <div>
      <h1>My Events</h1>
      {/* Your event cards or list go here */}
    </div>
  );
};



const staticEvents = [
  {
    id: "1",
    title: "Laney's Birthday Bash",
    description: "A pink-themed rooftop party with snacks and games!",
    date: "2025-09-10",
    location: "Las Vegas, NV",
    image: "https://via.placeholder.com/300x200.png?text=Birthday+Party",
    isAttending: true,
  },
  {
    id: "2",
    title: "Movie Night",
    description: "Watching Barbie with the girls + snacks + wine",
    date: "2025-09-18",
    location: "My apartment",
    image: "https://via.placeholder.com/300x200.png?text=Movie+Night",
    isAttending: false,
  }
];

function EventList() {
  return (
    <PageLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {staticEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </PageLayout>
  );
}

export default MyEvents;
