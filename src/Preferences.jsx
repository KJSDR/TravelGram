import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

const Preferences = () => {
  // User profile state
  const [profileData, setProfileData] = useState({
    name: "Jane Doe",
    email: "janedoe1999@gmail.com",
    profileImage: null
  });
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempName, setTempName] = useState(profileData.name);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Sample preferences data with selected state
  const [categories, setCategories] = useState([
    { name: 'Nature/Landscapes', selected: false },
    { name: 'Food/Drink', selected: false },
    { name: 'Architecture', selected: false },
    { name: 'Beaches/Waterfronts', selected: false },
    { name: 'Music/Live Events', selected: false },
    { name: 'Amusement Parks/Attractions', selected: false },
    { name: 'History/Culture', selected: false },
  ]);
  
  const [accessibility, setAccessibility] = useState([
    { name: 'Wheelchair Accessible', selected: false },
  ]);
  
  const [languages, setLanguages] = useState([
    { name: '🇬🇧 English', selected: false },
    { name: '🇫🇷 French', selected: false },
    { name: '🇪🇸 Spanish', selected: false },
    { name: '🇵🇭 Tagalog', selected: false },
    { name: '🇨🇳 Chinese', selected: false },
    { name: '🇯🇵 Japanese', selected: false }
  ]);
  
  // Handle profile image upload
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Create a preview URL
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };
  
  // Open edit profile modal
  const openModal = () => {
    setTempName(profileData.name);
    setPreviewUrl(profileData.profileImage);
    setIsModalOpen(true);
  };
  
  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  // Save profile changes
  const saveProfile = () => {
    setProfileData({
      ...profileData,
      name: tempName,
      profileImage: previewUrl
    });
    closeModal();
  };
  
  // Handle toggle for categories
  const toggleCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories[index].selected = !updatedCategories[index].selected;
    setCategories(updatedCategories);
  };
  
  // Handle toggle for accessibility
  const toggleAccessibility = (index) => {
    const updatedAccessibility = [...accessibility];
    updatedAccessibility[index].selected = !updatedAccessibility[index].selected;
    setAccessibility(updatedAccessibility);
  };
  
  // Handle toggle for languages
  const toggleLanguage = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index].selected = !updatedLanguages[index].selected;
    setLanguages(updatedLanguages);
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* Use the consistent NavigationBar component */}
      <NavigationBar />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">User Profile / Preferences</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-3 text-gray-800">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index} className="flex items-center">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={category.selected}
                        onChange={() => toggleCategory(index)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">{category.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-3 text-gray-800">Accessibility</h3>
              <ul className="space-y-2">
                {accessibility.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => toggleAccessibility(index)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">{item.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-3 text-gray-800">Language / Region</h3>
              <ul className="space-y-2">
                {languages.map((language, index) => (
                  <li key={index} className="flex items-center">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={language.selected}
                        onChange={() => toggleLanguage(index)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">{language.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Save Preferences
              </button>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-start pt-8">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-600 mb-4 overflow-hidden">
              {profileData.profileImage ? (
                <img 
                  src={profileData.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{profileData.name}</h3>
            <p className="text-gray-600 mb-6">{profileData.email}</p>
            <button 
              onClick={openModal}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </main>

      {/* Use the consistent Footer component */}
      <Footer />

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-[2px] flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Edit Profile</h3>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden relative">
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Profile preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
              
              <div className="flex w-full justify-center mb-4">
                <label className="px-4 py-2 bg-blue-100 text-blue-600 rounded cursor-pointer hover:bg-blue-200 transition-colors">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="hidden" 
                  />
                  Choose Image
                </label>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>
            
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={profileData.email}
                disabled
                className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md"
                placeholder="Your email"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed.</p>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preferences;