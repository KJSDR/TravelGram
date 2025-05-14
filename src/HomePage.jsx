import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import AIRecommendations from './AIRecommendations';

const HomePage = () => {
  const [travelgramPhotos, setTravelgramPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulating Instagram-like content for the #TravelGram feed
  useEffect(() => {
    // This simulates an API call to fetch Instagram photos
    // In a real implementation, this would be replaced with your Instagram API call
    setTimeout(() => {
      const mockTravelgramPhotos = [
        {
          id: 'tg1',
          imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
          username: 'travelista',
          caption: 'Lost in the beauty of Santorini',
          likes: 1243
        },
        {
          id: 'tg2',
          imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1',
          username: 'nomadlife',
          caption: 'Morning light in the mountains',
          likes: 892
        },
        {
          id: 'tg3',
          imageUrl: 'https://images.unsplash.com/photo-1488085061387-422e29b40080',
          username: 'wanderlust_ph',
          caption: 'City streets have their own magic',
          likes: 765
        },
        {
          id: 'tg4',
          // Fixed this URL to ensure it's different and valid
          imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077',
          username: 'photojourney',
          caption: 'Golden hour at the temple',
          likes: 1518
        },
        {
          id: 'tg5',
          imageUrl: 'https://images.unsplash.com/photo-1534470786806-fd93122d01fd',
          username: 'viewfinder',
          caption: 'Paradise found in Bali',
          likes: 2104
        },
        {
          id: 'tg6',
          // Changed this URL to be unique
          imageUrl: 'https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7',
          username: 'globetrotter',
          caption: 'Sunset over the canyon',
          likes: 1876
        }
      ];
      
      // Only use the first 4 photos for the grid
      setTravelgramPhotos(mockTravelgramPhotos.slice(0, 4));
      setLoading(false);
    }, 500);
  }, []);

  // eslint-disable-next-line no-unused-vars
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
        
        {/* Content Grid - Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Top Photo Spots */}
          <section className="bg-white rounded-lg p-5 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Top Photo Spots This Month</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {topPhotoSpots.map((spot, index) => (
                <div 
                  key={spot.id} 
                  className={`relative rounded-lg overflow-hidden ${index === 0 ? "col-span-2 h-48" : "h-36"}`}
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

          {/* #TravelGram Feed */}
          <section className="bg-white rounded-lg p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">#TravelGram</h3>
              <a href="#" className="text-blue-600 text-sm hover:underline">View all</a>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {travelgramPhotos.map((photo) => (
                  <div key={photo.id} className="overflow-hidden">
                    <div className="relative group">
                      <img 
                        src={photo.imageUrl} 
                        alt={`Photo by ${photo.username}`}
                        className="w-full h-36 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                        // Add error handling for images that fail to load
                        onError={(e) => {
                          console.error(`Failed to load image for ${photo.id}`);
                          e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <p className="text-white text-xs flex items-center">
                          <span className="mr-1">❤️</span> {photo.likes}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 truncate">@{photo.username}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      
      {/* Use the consistent Footer component */}
      <Footer />
    </div>
  );
};

export default HomePage;