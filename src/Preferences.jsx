import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

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
  
  // Categories, accessibility and languages data is already defined above

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* Use the consistent NavigationBar component */}
      <NavigationBar />

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

      {/* Use the consistent Footer component */}
      <Footer />
    </div>
  );
};

export default Preferences;