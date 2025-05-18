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

  // Function to get the first available image URL for an itinerary
  const getItineraryImage = (itineraryData) => {
    // Check if we have location images from Pixabay
    if (itineraryData.locationImages && Object.keys(itineraryData.locationImages).length > 0) {
      // Return the first image URL (index 0)
      return itineraryData.locationImages[0];
    }
    
    // If there's parsed content with locations, try to extract the first location name for a fallback image
    if (itineraryData.parsedContent && itineraryData.parsedContent.locations && itineraryData.parsedContent.locations.length > 0) {
      const firstLocation = itineraryData.parsedContent.locations[0].name;
      return `https://via.placeholder.com/800x600/1E3A8A/FFFFFF?text=${encodeURIComponent(firstLocation)}`;
    }
    
    // Final fallback
    return `https://via.placeholder.com/800x600/1E3A8A/FFFFFF?text=${encodeURIComponent(location)}`;
  };

  // Function to get a summary of the itinerary
  const getItinerarySummary = (itineraryData) => {
    if (itineraryData.parsedContent && itineraryData.parsedContent.locations) {
      const locationCount = itineraryData.parsedContent.locations.length;
      return `${locationCount} photography ${locationCount === 1 ? 'spot' : 'spots'}`;
    }
    return 'Photo spots';
  };

  // Function to toggle completed status
  const toggleCompleted = (location) => {
    const updatedItineraries = {...savedItineraries};
    const itinerary = updatedItineraries[location];
    
    // Toggle completed status
    itinerary.completed = !itinerary.completed;
    
    // If marking as completed, add completion date
    if (itinerary.completed) {
      itinerary.completedDate = new Date().toISOString();
    } else {
      delete itinerary.completedDate;
    }
    
    setSavedItineraries(updatedItineraries);
    localStorage.setItem('savedItineraries', JSON.stringify(updatedItineraries));
  };

  // If no saved itineraries, show a message and link to create one
  if (Object.keys(savedItineraries).length === 0) {
    return (
      <div className="bg-gray-50 text-gray-800 min-h-screen">
        <NavigationBar />
        
        <main className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Your Photo Collections</h2>
          
          <div className="text-center py-16 bg-white rounded-xl shadow-sm p-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-xl font-medium mb-3">No photo collections yet</h3>
            <p className="text-gray-600 mb-6">Discover amazing photography locations for your next trip</p>
            <Link to="/plan">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors">
                Find Photography Locations
              </button>
            </Link>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <NavigationBar />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Your Photo Collections</h2>
          <Link to="/plan">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition-colors">
              Find New Locations
            </button>
          </Link>
        </div>
        
        <div className="mb-8">
          <div className="relative bg-white rounded-full px-4 py-3 w-full max-w-md mx-auto shadow-sm">
            <input
              type="text"
              placeholder="Search your collections"
              className="w-full bg-transparent border-none focus:outline-none text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-4 top-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {filteredItineraries.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-xl shadow-sm">
            <p className="text-gray-600">No collections match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItineraries.map(([location, itineraryData], locationIndex) => (
              <div 
                key={locationIndex} 
                className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ${itineraryData.completed ? 'ring-2 ring-green-500' : ''}`}
              >
                {/* Image Header */}
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={getItineraryImage(itineraryData)} 
                    alt={`Photo locations in ${location}`} 
                    className={`w-full h-full object-cover ${itineraryData.completed ? 'opacity-90' : ''}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  
                  {/* Completed Badge */}
                  {itineraryData.completed && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Completed
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-bold">{location}</h3>
                    <p className="text-sm opacity-90">{getItinerarySummary(itineraryData)}</p>
                    
                    {/* Show completion date if completed */}
                    {itineraryData.completed && itineraryData.completedDate && (
                      <p className="text-xs mt-1 opacity-80">
                        Completed: {new Date(itineraryData.completedDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Card Footer */}
                <div className="p-4">
                  {/* Action Buttons */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => toggleCompleted(location)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        itineraryData.completed 
                          ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      {itineraryData.completed ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Completed</span>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Mark Complete</span>
                        </>
                      )}
                    </button>
                    
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => {
                          // Logic to view full itinerary would go here
                          // For now, we'll just alert
                          alert(`Full collection for ${location}`);
                        }}
                        aria-label="View collection"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      
                      <button 
                        className="text-red-600 hover:text-red-800"
                        onClick={() => {
                          // Remove this itinerary
                          const updatedItineraries = {...savedItineraries};
                          delete updatedItineraries[location];
                          setSavedItineraries(updatedItineraries);
                          localStorage.setItem('savedItineraries', JSON.stringify(updatedItineraries));
                        }}
                        aria-label="Delete collection"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
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