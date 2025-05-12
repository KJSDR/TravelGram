import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const topDestinations = [
    { 
      id: 1, 
      name: 'Copenhagen', 
      image: `/copenhagen.jpg`,
      description: 'Beautiful Nordic city with colorful harbor houses' 
    },
    { 
      id: 2, 
      name: 'Paris', 
      image: `/paris.avif`,
      description: 'Romantic city with iconic architecture and cuisine' 
    },
    { 
      id: 3, 
      name: 'Rome', 
      image: `/rome.jpg`,
      description: 'Ancient city with classical ruins and vibrant culture' 
    },
    { 
      id: 4, 
      name: 'Tokyo', 
      image: `/tokyo.jpeg`,
      description: 'Modern metropolis with stunning blend of old and new' 
    },
    { 
      id: 5, 
      name: 'San Francisco', 
      image: `/sanfrancisco.webp`,
      description: 'Scenic bay city known for fog and steep hills' 
    },
    { 
      id: 6, 
      name: 'London', 
      image: `/london.jpeg`,
      description: 'Historic city with iconic landmarks and diverse cultural scenes' 
    }
  ];

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
              <div key={destination.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Explore;