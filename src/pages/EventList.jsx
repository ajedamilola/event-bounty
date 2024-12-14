import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User } from 'lucide-react';
import { listAllEvents } from '../utils/etherum';

// Demo data
function EventList() {
  const [events, setEvents] = useState([])
  useEffect(() => {
    const fetchEvents = async () => {
      let _events = await listAllEvents();
      _events.reverse()
      setEvents(_events);
    };
    fetchEvents();
  }, []);
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

