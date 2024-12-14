import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User } from 'lucide-react';

// Demo data
const events = [
  { id: 1, title: 'React Meetup', description: 'A meetup for React developers', date: '2023-07-15' },
  { id: 2, title: 'Blockchain Workshop', description: 'Learn about blockchain technology', date: '2023-07-22' },
  { id: 3, title: 'AI Conference', description: 'Exploring the latest in AI', date: '2023-07-29' },
];

function EventList() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Upcoming Events</h1>
      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="border p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Calendar className="mr-2" size={16} />
              <span>{event.date}</span>
            </div>
            <Link
              to={`/event/${event.id}`}
              className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              <User className="mr-2" size={16} />
              View Details & Register
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;

