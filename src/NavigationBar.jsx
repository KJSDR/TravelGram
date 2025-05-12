import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="logo-container">
          <Link to="/">
            <h1 className="font-bold text-xl text-gray-800">TravelGram</h1>
          </Link>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex">
            <li className="mx-4">
              <Link to="/explore" className="text-gray-600 font-medium hover:text-blue-500 transition-colors">Explore</Link>
            </li>
            <li className="mx-4">
              <Link to="/itineraries" className="text-gray-600 font-medium hover:text-blue-500 transition-colors">Your Adventures</Link>
            </li>
            <li className="mx-4">
              <Link to="/preferences" className="text-gray-600 font-medium hover:text-blue-500 transition-colors">Profile</Link>
            </li>
          </ul>
        </nav>
        
        <div className="flex items-center">
          <div className="relative bg-gray-100 rounded-full px-4 py-2 w-64 mr-4">
            <input
              type="text"
              placeholder="Search photogenic places..."
              className="w-full bg-transparent border-none focus:outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          
          <Link to="/preferences">
            <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;