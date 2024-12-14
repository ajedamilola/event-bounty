import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Clock, FileText, Save, Edit2, Trash2 } from 'lucide-react';

// Demo data - in a real app, this would be fetched from a backend or smart contract
let events = [
  { id: 1, title: 'React Meetup', description: 'A meetup for React developers', date: '2023-07-15' },
  { id: 2, title: 'Blockchain Workshop', description: 'Learn about blockchain technology', date: '2023-07-22' },
  { id: 3, title: 'AI Conference', description: 'Exploring the latest in AI', date: '2023-07-29' },
];

function CreateEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const event = events.find(e => e.id === parseInt(id));
      if (event) {
        setTitle(event.title);
        setDescription(event.description);
        setDate(event.date);
      }
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // Update existing event
      events = events.map(event =>
        event.id === parseInt(id) ? { ...event, title, description, date } : event
      );
    } else {
      // Create new event
      const newEvent = { id: events.length + 1, title, description, date };
      events.push(newEvent);
    }
    // Reset form and redirect
    setTitle('');
    setDescription('');
    setDate('');
    navigate('/');
  };

  const handleDelete = (eventId) => {
    events = events.filter(event => event.id !== eventId);
    navigate('/');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{id ? 'Edit Event' : 'Create New Event'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">Event Title</label>
          <div className="relative">
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block mb-1 font-medium">Description</label>
          <div className="relative">
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
            <FileText className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
        </div>
        <div>
          <label htmlFor="date" className="block mb-1 font-medium">Date</label>
          <div className="relative">
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center">
          <Save className="mr-2" size={20} />
          {id ? 'Update Event' : 'Create Event'}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Your Events</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="border p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-sm text-gray-500 mt-2">Date: {event.date}</p>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => navigate(`/edit/${event.id}`)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 flex items-center"
              >
                <Edit2 className="mr-1" size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center"
              >
                <Trash2 className="mr-1" size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateEvent;
