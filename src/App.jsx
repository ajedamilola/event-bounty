import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Calendar, PlusCircle, Home } from 'lucide-react';
import CreateEvent from './pages/CreateEvent';
import EventList from './pages/EventList';
import EventDetails from './pages/EventDetails';
import WalletConnection from './components/WalletConnection';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
        <WalletConnection />
        <div className="container mx-auto p-4">
          <nav className="mb-8 bg-white shadow-md rounded-lg p-4">
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800">
                  <Home className="mr-2" size={20} />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800">
                  <Calendar className="mr-2" size={20} />
                  Events
                </Link>
              </li>
              <li>
                <Link to="/create" className="flex items-center text-indigo-600 hover:text-indigo-800">
                  <PlusCircle className="mr-2" size={20} />
                  Create Event
                </Link>
              </li>
            </ul>
          </nav>

          <div className="bg-white shadow-md rounded-lg p-6">
            <Routes>
              <Route path="/" element={<EventList />} />
              <Route path="/create" element={<CreateEvent />} />
              <Route path="/edit/:id" element={<CreateEvent />} />
              <Route path="/event/:id" element={<EventDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

