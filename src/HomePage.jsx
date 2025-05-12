import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import AIRecommendations from './AIRecommendations';

const HomePage = () => {
  const trendingDestinations = [
    {
      id: 1,
      name: 'Santorini, Greece',
      description: 'Famous for: Sunsets, Architecture',
      rating: 4.9,
      tag: 'Popular now',
      image: '/santorini.jpg'
    },
    {
      id: 2,
      name: 'Kyoto, Japan',
      description: 'Famous for: Temples, Fall Colors',
      rating: 4.8,
      tag: 'Seasonal',
      image: '/kyoto.avif'
    },
    {
      id: 3,
      name: 'Banff, Canada',
      description: 'Famous for: Mountains, Lakes',
      rating: 4.9,
      tag: 'Winter peak',
      image: '/banff.jpg'
    }
  ];

  const topPhotoSpots = [
    {
      id: 1,
      name: 'Lake Moraine Viewpoint',
      photoCount: '3,240 photos this month',
      image: '/lakemoraine.jpg'
    },
    {
      id: 2,
      name: 'Bali Rice Terraces',
      photoCount: '',
      image: '/balirice.jpg'
    },
    {
      id: 3,
      name: 'NYC Skyline View',
      photoCount: '',
      image: '/nycskyline.jpg'
    }
  ];

  const featuredCreator = {
    name: 'Elena Rodriguez',
    location: 'Barcelona, Spain',
    rating: 4.9,
    reviews: 52,
    specialties: 'Street, Architecture, Portraits',
    avatar: '/elena.jpg'
  };
  
  // User preferences for AI recommendations
  const userPreferences = {
    categories: ['Nature/Landscapes', 'Architecture'],
    accessibility: ['Wheelchair Accessible'],
    languages: ['English']
  };

  const heroBackgroundImage = 'public/sanfranggb.jpeg';

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* Use the consistent NavigationBar component */}
      <NavigationBar />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Hero Section - Now with background image */}
        <section 
          className="rounded-lg h-64 my-8 flex items-center justify-center text-center bg-cover bg-center relative overflow-hidden"
          style={{ backgroundImage: `url(${heroBackgroundImage})` }}
        >
          <div className="relative z-10">
            <h2 className="text-2xl font-semibold text-white mb-5">Curate your perfect photo journey</h2>
            <Link to="/plan">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-colors">
                Start Planning Your Trip
              </button>
            </Link>
          </div>
        </section>

        {/* AI Recommendations Section */}
        <AIRecommendations userPreferences={userPreferences} />
        
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

          {/* Featured Creator */}
          <section className="bg-white rounded-lg p-5 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">#TravelGram</h3>
            
            <div className="flex items-center bg-gray-50 p-3 rounded-lg mb-4">
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
            
            
          </section>
        </div>
      </main>
      
      {/* Use the consistent Footer component */}
      <Footer />
    </div>
  );
};

export default HomePage;