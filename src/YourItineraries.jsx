import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

const YourItineraries = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [savedItineraries, setSavedItineraries] = useState({});
  
  // Load saved itineraries from localStorage on component mount
  useEffect(() => {
    const storedItineraries = localStorage.getItem('savedItineraries');
    if (storedItineraries) {
      setSavedItineraries(JSON.parse(storedItineraries));
    }
  }, []);
  
  // Filter itineraries based on search query
  const filteredItineraries = Object.entries(savedItineraries).filter(([location]) => 
    location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If no saved itineraries, show a message and link to create one
  if (Object.keys(savedItineraries).length === 0) {
    return (
      <div className="bg-white text-gray-800 min-h-screen">
        <NavigationBar />
        
        <main className="max-w-6xl mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Itineraries</h2>
          
          <div className="text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-xl font-medium mb-3">No itineraries yet</h3>
            <p className="text-gray-600 mb-6">Start planning your photo journey to create your first itinerary</p>
            <Link to="/plan">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors">
                Create Your First Itinerary
              </button>
            </Link>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <NavigationBar />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Itineraries</h2>
          <Link to="/plan">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">
              Create New Itinerary
            </button>
          </Link>
        </div>
        
        <div className="mb-6">
          <div className="relative bg-gray-100 rounded-full px-4 py-2 w-64 mx-auto">
            <input
              type="text"
              placeholder="Search your itineraries"
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

        {filteredItineraries.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No itineraries match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredItineraries.map(([location, itineraryData], locationIndex) => (
              <div key={locationIndex} className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">{location}</h3>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                  <div className="p-4">
                    <div className="text-sm font-medium mb-3 text-gray-700">
                      {itineraryData.dates ? (
                        <span>{itineraryData.dates}</span>
                      ) : (
                        <span>No dates specified</span>
                      )}
                    </div>
                    
                    {itineraryData.photoStyles && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {itineraryData.photoStyles.split(',').map((style, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {style.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="text-sm text-gray-600 max-h-32 overflow-y-auto mb-3">
                      {itineraryData.content ? (
                        <div>
                          {itineraryData.content.split('\n\n').slice(0, 1).map((paragraph, index) => (
                            <p key={index} className="mb-2">
                              {paragraph}
                            </p>
                          ))}
                          {itineraryData.content.split('\n\n').length > 1 && (
                            <p className="text-blue-600 text-xs cursor-pointer">View more...</p>
                          )}
                        </div>
                      ) : (
                        <p>No details available</p>
                      )}
                    </div>
                    
                    <div className="flex justify-between">
                      <button 
                        className="text-sm text-blue-600 hover:text-blue-800"
                        onClick={() => {
                          // Logic to view full itinerary would go here
                          // For now, we'll just alert
                          alert(`Full itinerary for ${location}`);
                        }}
                      >
                        View Full Itinerary
                      </button>
                      
                      <button 
                        className="text-sm text-red-600 hover:text-red-800"
                        onClick={() => {
                          // Remove this itinerary
                          const updatedItineraries = {...savedItineraries};
                          delete updatedItineraries[location];
                          setSavedItineraries(updatedItineraries);
                          localStorage.setItem('savedItineraries', JSON.stringify(updatedItineraries));
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default YourItineraries;