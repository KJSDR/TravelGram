import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

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

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* Use the consistent NavigationBar component */}
      <NavigationBar />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Itineraries</h2>
        
        <div className="mb-6">
          <div className="relative bg-gray-100 rounded-full px-4 py-2 w-64 mx-auto">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent border-none focus:outline-none text-sm text-gray-700"
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
              <h3 className="text-xl font-semibold text-gray-800">{location}</h3>
              {spots.map((spot) => (
                <div key={spot.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                  <div className="p-4 text-center">
                    <div className="text-sm font-medium mb-1 text-gray-700">Location</div>
                    <div className="w-full h-32 bg-gray-200 flex items-center justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-sm text-gray-600">{spot.description}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>

      {/* Use the consistent Footer component */}
      <Footer />
    </div>
  );
};

export default YourItineraries;