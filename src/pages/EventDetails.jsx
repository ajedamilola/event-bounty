import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { getEvent, listAllEvents, registerForEvent } from '../utils/etherum';

// Demo data

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [registered, setRegistered] = useState(false);

  const [event, setEvent] = useState(null)

  async function fetchData() {
    //FIXME: Fix this up later
    let _events = await listAllEvents();
    _events.reverse()
    setEvent(_events.find(e => e.id == id))
    const data = await getEvent(Number(id));
    console.log(data)
  }


  useEffect(() => {
    fetchData()
  }, [])

  if (!event) {
    return <div>Event not found</div>;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    await registerForEvent(id, name);
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
          <button type="submit" onClick={handleRegister} className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 flex items-center">
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

