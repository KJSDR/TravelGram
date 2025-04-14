import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const YourItineraries = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample itinerary locations data
  const itineraryLocations = {
    'San Francisco': [
      { id: 1, description: 'Description', image: '/placeholder.jpg' },
      { id: 2, description: 'Description', image: '/placeholder.jpg' }
    ],
    'Monterey': [
      { id: 3, description: 'Description', image: '/placeholder.jpg' },
      { id: 4, description: 'Description', image: '/placeholder.jpg' }
    ],
    'San Diego': [
      { id: 5, description: 'Description', image: '/placeholder.jpg' },
      { id: 6, description: 'Description', image: '/placeholder.jpg' }
    ]
  };

  // Footer links data
  const footerLinks = {
    useCases: [
      'UI design',
      'UX design',
      'Wireframing',
      'Diagramming',
      'Brainstorming'
    ],
    explore: [
      'Design',
      'Prototyping',
      'Development features',
      'Design systems',
      'Collaboration features'
    ]
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="logo-container">
            <Link to="/">
              <h1 className="font-bold text-xl">TravelGram</h1>
            </Link>
          </div>
          
          <nav>
            <ul className="flex">
              <li className="mx-4"><Link to="/" className="text-gray-300 hover:text-white transition-colors">Discover</Link></li>
              <li className="mx-4"><Link to="/explore" className="text-gray-300 hover:text-white transition-colors">Explore</Link></li>
              <li className="mx-4"><Link to="/itineraries" className="text-gray-300 hover:text-white transition-colors">Your Adventures</Link></li>
              <li className="mx-4"><Link to="/preferences" className="text-gray-300 hover:text-white transition-colors">Profile</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6">Your Itineraries</h2>
        
        <div className="mb-6">
          <div className="relative bg-gray-800 rounded-full px-4 py-2 w-64 mx-auto">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent border-none focus:outline-none text-sm text-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(itineraryLocations).map(([location, spots], locationIndex) => (
            <div key={locationIndex} className="space-y-4">
              <h3 className="text-xl font-semibold">{location}</h3>
              {spots.map((spot) => (
                <div key={spot.id} className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="p-4 text-center">
                    <div className="text-sm font-medium mb-1">Location</div>
                    <div className="w-full h-32 bg-gray-700 flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-sm text-gray-400">{spot.description}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-800 mt-12">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <span className="w-6 h-6 flex items-center justify-center bg-gray-800 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            <span className="w-6 h-6 flex items-center justify-center bg-gray-800 rounded-full">X</span>
            <span className="w-6 h-6 flex items-center justify-center bg-gray-800 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <span className="w-6 h-6 flex items-center justify-center bg-gray-800 rounded-full">in</span>
          </div>
          
          <div className="grid grid-cols-2 gap-x-12">
            <div>
              <h4 className="font-medium mb-2">Use cases</h4>
              <ul className="space-y-1 text-sm text-gray-400">
                {footerLinks.useCases.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Explore</h4>
              <ul className="space-y-1 text-sm text-gray-400">
                {footerLinks.explore.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default YourItineraries;