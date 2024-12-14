import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';

// Demo data
const events = [
  { id: 1, title: 'React Meetup', description: 'A meetup for React developers', date: '2023-07-15' },
  { id: 2, title: 'Blockchain Workshop', description: 'Learn about blockchain technology', date: '2023-07-22' },
  { id: 3, title: 'AI Conference', description: 'Exploring the latest in AI', date: '2023-07-29' },
];

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [registered, setRegistered] = useState(false);

  const event = events.find(e => e.id === parseInt(id));

  if (!event) {
    return <div>Event not found</div>;
  }

  const handleRegister = (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend or smart contract
    console.log(`Registering ${name} for event ${id}`);
    setRegistered(true);
  };

  return (
    <div>
      <button
        onClick={() => navigate('/')}
        className="mb-4 flex items-center text-indigo-600 hover:text-indigo-800"
      >
        <ArrowLeft className="mr-2" size={20} />
        Back to Events
      </button>

      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-600 mb-6 text-lg">{event.description}</p>

      <div className="flex items-center text-gray-500 mb-6">
        <Calendar className="mr-2" size={20} />
        <span>{event.date}</span>
      </div>

      {!registered ? (
        <form onSubmit={handleRegister} className="mt-8 space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">Your Name</label>
            <div className="relative">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 flex items-center">
            <User className="mr-2" size={20} />
            Register for Event
          </button>
        </form>
      ) : (
        <div className="mt-8 p-4 bg-green-100 text-green-700 rounded-md flex items-center">
          <User className="mr-2" size={20} />
          You have successfully registered for this event!
        </div>
      )}
    </div>
  );
}

export default EventDetails;

