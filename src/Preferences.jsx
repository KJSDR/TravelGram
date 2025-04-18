import React from 'react';
import { Link } from 'react-router-dom';

const Preferences = () => {
  // Sample preferences data
  const categories = [
    'Nature/Landscapes',
    'Food/Drink',
    'Architecture',
    'Beaches/Waterfronts',
    'Ecotour Areas'
  ];
  
  const accessibility = [
    'Wheelchair Accessible',
    'Elevation: Low'
  ];
  
  const languages = [
    'English',
    'French',
    'Chinese'
  ];
  
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
    <div className="bg-white text-gray-800 min-h-screen">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="logo-container">
            <Link to="/">
              <h1 className="font-bold text-xl text-gray-800">TravelGram</h1>
            </Link>
          </div>
          
          <nav>
            <ul className="flex">
              <li className="mx-4"><Link to="/" className="text-gray-600 font-medium hover:text-blue-500 transition-colors">Discover</Link></li>
              <li className="mx-4"><Link to="/explore" className="text-gray-600 font-medium hover:text-blue-500 transition-colors">Explore</Link></li>
              <li className="mx-4"><Link to="/itineraries" className="text-gray-600 font-medium hover:text-blue-500 transition-colors">Your Adventures</Link></li>
              <li className="mx-4"><Link to="/preferences" className="text-gray-600 font-medium hover:text-blue-500 transition-colors">Profile</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">User Profile / Preferences</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2 text-gray-800">Categories</h3>
              <ul className="space-y-1 text-gray-600">
                {categories.map((category, index) => (
                  <li key={index}>{category}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2 text-gray-800">Accessibility</h3>
              <ul className="space-y-1 text-gray-600">
                {accessibility.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2 text-gray-800">Language / Region</h3>
              <ul className="space-y-1 text-gray-600">
                {languages.map((language, index) => (
                  <li key={index}>{language}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2 text-gray-800">Travel Preferences (cooking, packing etc...)</h3>
              {/* Add more preferences here */}
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-8 border-t border-gray-200 mt-12">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <span className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            <span className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-gray-600">X</span>
            <span className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <span className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-gray-600">in</span>
          </div>
          
          <div className="grid grid-cols-2 gap-x-12">
            <div>
              <h4 className="font-medium mb-2 text-gray-800">Use cases</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                {footerLinks.useCases.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2 text-gray-800">Explore</h4>
              <ul className="space-y-1 text-sm text-gray-600">
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

export default Preferences;