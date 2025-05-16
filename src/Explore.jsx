import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);
  
  // Extended destination data with more information for the modal
  const topDestinations = [
    { 
      id: 1, 
      name: 'Copenhagen', 
      image: `/copenhagen.jpg`,
      description: 'Beautiful Nordic city with colorful harbor houses',
      fullDescription: 'Copenhagen, the capital of Denmark, is known for its colorful Nyhavn harbor, excellent food scene, and bicycle-friendly streets. The city combines modern Scandinavian design with historical architecture and a relaxed lifestyle. Visit Tivoli Gardens, the second-oldest operating amusement park in the world, or explore the autonomous Freetown Christiania.',
      attractions: ['Nyhavn', 'Tivoli Gardens', 'The Little Mermaid', 'Christiania', 'Rosenborg Castle'],
      bestTimeToVisit: 'May to September',
      language: 'Danish (English widely spoken)',
      currency: 'Danish Krone (DKK)'
    },
    { 
      id: 2, 
      name: 'Paris', 
      image: `/paris.avif`,
      description: 'Romantic city with iconic architecture and cuisine',
      fullDescription: 'Paris, the City of Light, captivates visitors with its iconic landmarks, world-class museums, and charming neighborhoods. From the majestic Eiffel Tower to the artistic treasures of the Louvre, Paris offers endless cultural experiences. The city is also renowned for its exquisite culinary scene, fashion houses, and the romantic ambiance of its tree-lined boulevards and Seine River.',
      attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Montmartre', 'Champs-Élysées'],
      bestTimeToVisit: 'April to June, September to October',
      language: 'French',
      currency: 'Euro (EUR)'
    },
    { 
      id: 3, 
      name: 'Rome', 
      image: `/rome.jpg`,
      description: 'Ancient city with classical ruins and vibrant culture',
      fullDescription: 'Rome, the Eternal City, is a living museum where ancient history and modern life coexist. Walk through the ruins of the Roman Forum and the iconic Colosseum, toss a coin in the Trevi Fountain, and explore Vatican City, the smallest country in the world. Romes excellent cuisine, vibrant piazzas, and artistic treasures make it an unforgettable destination.',
      attractions: ['Colosseum', 'Vatican City', 'Roman Forum', 'Trevi Fountain', 'Pantheon'],
      bestTimeToVisit: 'April to May, September to October',
      language: 'Italian',
      currency: 'Euro (EUR)'
    },
    { 
      id: 4, 
      name: 'Tokyo', 
      image: `/tokyo.jpeg`,
      description: 'Modern metropolis with stunning blend of old and new',
      fullDescription: 'Tokyo, Japan\'s bustling capital, seamlessly blends ultramodern and traditional aspects. This dynamic city offers cutting-edge technology, vibrant pop culture, ancient temples, and exceptional cuisine. Explore the neon-lit districts of Shibuya and Shinjuku, visit the serene Meiji Shrine, and experience the world\'s most efficient public transportation system.',
      attractions: ['Shibuya Crossing', 'Tokyo Skytree', 'Meiji Shrine', 'Senso-ji Temple', 'Akihabara'],
      bestTimeToVisit: 'March to April (cherry blossoms), October to November',
      language: 'Japanese',
      currency: 'Japanese Yen (JPY)'
    },
    { 
      id: 5, 
      name: 'San Francisco', 
      image: `/sanfrancisco.webp`,
      description: 'Scenic bay city known for fog and steep hills',
      fullDescription: 'San Francisco, nestled on the hills of a peninsula between the Pacific Ocean and San Francisco Bay, is famous for its iconic Golden Gate Bridge, colorful Victorian houses, and cable cars. The city offers a diverse culinary scene, world-class museums, and charming neighborhoods like Chinatown and North Beach. Just outside the city, you\'ll find beautiful nature and the renowned wine country.',
      attractions: ['Golden Gate Bridge', 'Alcatraz Island', 'Fisherman\'s Wharf', 'Chinatown', 'Painted Ladies'],
      bestTimeToVisit: 'September to November',
      language: 'English',
      currency: 'US Dollar (USD)'
    },
    { 
      id: 6, 
      name: 'London', 
      image: `/london.jpeg`,
      description: 'Historic city with iconic landmarks and diverse cultural scenes',
      fullDescription: 'London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times. The city is home to iconic landmarks such as the Tower of London, Buckingham Palace, and the British Museum. With its diverse neighborhoods, West End theater district, and countless pubs and restaurants, London offers something for every visitor.',
      attractions: ['Tower of London', 'British Museum', 'Buckingham Palace', 'London Eye', 'Hyde Park'],
      bestTimeToVisit: 'May to September',
      language: 'English',
      currency: 'British Pound (GBP)'
    }
  ];

  // Function to open modal with destination details
  const openModal = (destination) => {
    setSelectedDestination(destination);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedDestination(null);
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <NavigationBar />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Explore</h2>
        
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

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Top Destinations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {topDestinations.map((destination) => (
              <div 
                key={destination.id} 
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-300 cursor-pointer transform transition-all duration-300 hover:shadow-md hover:scale-105"
                onClick={() => openModal(destination)}
              >
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to a placeholder if image fails to load
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/400x300?text=${destination.name}`;
                    }}
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-gray-800">{destination.name}</h4>
                  <p className="text-sm text-gray-600">{destination.description}</p>
                  <p className="text-xs text-blue-600 mt-2">Click for more details</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for destination details */}
        {selectedDestination && (
          <div className="fixed inset-0 backdrop-blur-sm bg-transparent flex items-center justify-center z-50 p-4" onClick={closeModal}>
            <div 
              className="bg-white rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto shadow-xl" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={selectedDestination.image} 
                    alt={selectedDestination.name}
                    className="w-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://via.placeholder.com/800x400?text=${selectedDestination.name}`;
                    }}
                  />
                </div>
                <button 
                  className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full p-2 shadow-md z-10"
                  onClick={closeModal}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6 relative z-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedDestination.name}</h3>
                
                <div className="mb-4">
                  <p className="text-gray-700 leading-relaxed">{selectedDestination.fullDescription}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Top Attractions</h4>
                  <ul className="list-disc pl-5 text-gray-700">
                    {selectedDestination.attractions.map((attraction, index) => (
                      <li key={index}>{attraction}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <h4 className="font-semibold">Best Time to Visit</h4>
                    <p>{selectedDestination.bestTimeToVisit}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Language</h4>
                    <p>{selectedDestination.language}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Currency</h4>
                    <p>{selectedDestination.currency}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                    onClick={() => {/* This could link to a detailed page or booking form */}}
                  >
                    Plan Your Trip
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Explore;