import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateEvent from './pages/CreateEvent';
import EventList from './pages/EventList';
import EventDetails from './pages/EventDetails';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-blue-500 hover:text-blue-700">Events</Link>
            </li>
            <li>
              <Link to="/create" className="text-blue-500 hover:text-blue-700">Create Event</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/event/:id" element={<EventDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

