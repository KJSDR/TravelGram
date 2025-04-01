import React, { useState } from 'react';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [style, setStyle] = useState('');

  const trendingDestinations = [
    {
      id: 1,
      name: 'Santorini, Greece',
      description: 'Famous for: Sunsets, Architecture',
      rating: 4.9,
      tag: 'Popular now',
      image: '/public/santorini.jpg'
    },
    {
      id: 2,
      name: 'Kyoto, Japan',
      description: 'Famous for: Temples, Fall Colors',
      rating: 4.8,
      tag: 'Seasonal',
      image: '/public/kyoto.avif'
    },
    {
      id: 3,
      name: 'Banff, Canada',
      description: 'Famous for: Mountains, Lakes',
      rating: 4.9,
      tag: 'Winter peak',
      image: '/public/banff.jpg'
    }
  ];

  const topPhotoSpots = [
    {
      id: 1,
      name: 'Lake Moraine Viewpoint',
      photoCount: '3,240 photos this month',
      image: '/public/lakemoraine.jpg'
    },
    {
      id: 2,
      name: 'Bali Rice Terraces',
      photoCount: '',
      image: '/public/balirice.jpg'
    },
    {
      id: 3,
      name: 'NYC Skyline View',
      photoCount: '',
      image: '/public/nycskyline.jpg'
    }
  ];

  const featuredCreator = {
    name: 'Elena Rodriguez',
    location: 'Barcelona, Spain',
    rating: 4.9,
    reviews: 52,
    specialties: 'Street, Architecture, Portraits',
    avatar: '/public/elena.jpg'
  };

  const handleCreateItinerary = () => {
    console.log('Creating itinerary with:', { destination, startDate, endDate, style });
    // Add your logic here
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header */}
      <header className="flex items-center justify-between py-5 border-b border-gray-200 bg-white">
        <div className="logo-container">
          <h1 className="font-bold text-xl text-gray-800">TravelGram</h1>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex">
            <li className="mx-4"><a href="#discover" className="text-gray-600 font-medium hover:text-blue-500 transition-colors">Discover</a></li>
            <li className="mx-4"><a href="#explore" className="text-gray-600 font-medium hover:text-blue-500 transition-colors">Explore</a></li>
            <li className="mx-4"><a href="#plan" className="text-gray-600 font-medium hover:text-blue-500 transition-colors">Plan</a></li>
            <li className="mx-4"><a href="#creators" className="text-gray-600 font-medium hover:text-blue-500 transition-colors">Creators</a></li>
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
          
          <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
            U
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-200 rounded-lg h-64 my-8 flex items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-5">Curate your perfect photo journey</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-colors">
            Start Planning Your Trip
          </button>
        </div>
      </section>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Trending Destinations */}
        <section className="bg-white rounded-lg p-5 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Trending Photo Destinations</h3>
          
          <div className="space-y-4">
            {trendingDestinations.map((destination) => (
              <div key={destination.id} className="flex bg-gray-50 rounded-lg overflow-hidden">
                <div className="w-24 h-24 bg-gray-200 flex-shrink-0">
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
                  />
                </div>
                
                <div className="p-3">
                  <h4 className="font-semibold text-gray-800">{destination.name}</h4>
                  <p className="text-sm text-gray-600">{destination.description}</p>
                  <div className="flex items-center mt-1 text-sm">
                    <span className="flex items-center">⭐ {destination.rating}</span>
                    <span className="ml-3 bg-gray-200 px-2 py-0.5 rounded-full text-xs">
                      {destination.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Photo Spots */}
        <section className="bg-white rounded-lg p-5 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Top Photo Spots This Month</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {topPhotoSpots.map((spot, index) => (
              <div 
                key={spot.id} 
                className={`relative rounded-lg overflow-hidden ${index === 0 ? "col-span-2 h-40" : "h-28"}`}
              >
                <div className="w-full h-full bg-gray-200">
                  <img 
                    src={spot.image} 
                    alt={spot.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => e.target.src = 'https://via.placeholder.com/300x150'}
                  />
                </div>
                
                <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <h4 className="font-medium text-sm">{spot.name}</h4>
                  {spot.photoCount && (
                    <p className="text-xs opacity-80">📷 {spot.photoCount}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Planning Section */}
        <section className="bg-white rounded-lg p-5 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Start Planning Your Trip</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dates</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Start"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="End"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Photography Style</label>
              <input
                type="text"
                placeholder="Select styles..."
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
              />
            </div>
            
            <button 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
              onClick={handleCreateItinerary}
            >
              Create Itinerary
            </button>
          </div>

          {/* Featured Creator */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-2">Featured Creator</h4>
            <div className="flex items-center bg-gray-50 p-3 rounded-lg">
              <div className="w-14 h-14 bg-gray-200 rounded-full mr-4 overflow-hidden flex-shrink-0">
                <img 
                  src={featuredCreator.avatar} 
                  alt={featuredCreator.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/56'}
                />
              </div>
              
              <div>
                <h5 className="font-semibold">{featuredCreator.name}</h5>
                <p className="text-sm text-gray-600">{featuredCreator.location}</p>
                <p className="text-sm text-gray-600">⭐ {featuredCreator.rating} ({featuredCreator.reviews} reviews)</p>
                <p className="text-sm text-gray-600">Specialties: {featuredCreator.specialties}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;