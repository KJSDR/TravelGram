import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import MistralService from './mistralService';

// Access the environment variables using Vite's import.meta.env
const MISTRAL_API_KEY = import.meta.env.VITE_MISTRAL_API_KEY;
const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

const PlanItinerariesPage = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [locationCount, setLocationCount] = useState(5); // Default to 5 locations
  const [style, setStyle] = useState('');
  const [generateStatus, setGenerateStatus] = useState('idle'); // idle, loading, success, error
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);
  const [locationImages, setLocationImages] = useState({});
  
  const availableStyles = [
    'Street Photography',
    'Landscape',
    'Architecture',
    'Nature',
    'Portraits',
    'Cultural',
    'Night/Low Light',
    'Minimalist'
  ];

  const fetchImageForLocation = async (locationName, destinationName) => {
    try {
      // Create a good search query combining the location name, destination, and possibly style
      const query = `${locationName} ${destinationName} ${style.includes('Landscape') ? 'landscape' : 'travel'}`;
      
      // Send request to Pixabay API
      const response = await fetch(
        `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&per_page=3`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch from Pixabay API');
      }
      
      const data = await response.json();
      
      // If images found, return the URL of the first one
      if (data.hits && data.hits.length > 0) {
        return data.hits[0].webformatURL;
      } else {
        // Try a more generic search if specific search returned no results
        const fallbackResponse = await fetch(
          `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(destinationName + ' travel')}&image_type=photo&orientation=horizontal&per_page=3`
        );
        
        if (!fallbackResponse.ok) {
          throw new Error('Failed to fetch fallback from Pixabay API');
        }
        
        const fallbackData = await fallbackResponse.json();
        
        if (fallbackData.hits && fallbackData.hits.length > 0) {
          return fallbackData.hits[0].webformatURL;
        }
      }
      
      // Return null if no images found
      return null;
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

  const handleStyleSelect = (selectedStyle) => {
    if (style.includes(selectedStyle)) {
      // Remove style if already selected
      setStyle(style.split(', ').filter(s => s !== selectedStyle).join(', '));
    } else {
      // Add style
      setStyle(style ? `${style}, ${selectedStyle}` : selectedStyle);
    }
  };

  const handleGenerateItinerary = async () => {
    if (!destination) {
      setError('Please enter a destination');
      return;
    }

    setGenerateStatus('loading');
    setError(null);
    setLocationImages({}); // Clear previous images
    
    try {
      const mistralService = new MistralService(MISTRAL_API_KEY);
      
      const messages = [
        {
          role: 'system',
          content: `You are an AI travel advisor specialized in photography-focused travel recommendations.
          Create a curated list of the best photography locations for a specific destination.
          
          Each location in the list should include:
          1. Location name (specific spot, not a general area)
          2. Best time of day for photography (be specific about lighting conditions)
          3. A concise description (max 2 sentences)
          4. A specific photography technique or equipment tip for that location
          5. A short image description that could be used to generate an image of this location (1-2 sentences describing the visual scene)
          
          Format your response as a JSON array with objects containing these fields:
          {
            "locations": [
              {
                "name": "Location Name",
                "bestTime": "Time of day for optimal photos",
                "description": "Max 2 sentences about the spot",
                "photoTip": "A specific photography technique or equipment recommendation",
                "imageDescription": "A visual description of the location for image generation"
              }
            ]
          }
          
          Present this information in a readable format with clear headings and structure.`
        },
        {
          role: 'user',
          content: `Generate a list of ${locationCount} photography-focused locations in ${destination}${
            style ? ` focusing on ${style} photography` : ''
          }.
          
          Please include both iconic shots and hidden gems that would make for excellent photographs.
          For each location, provide specific details about optimal timing, what makes it special, and photography tips.`
        }
      ];
      
      const response = await mistralService.chat(messages, 'mistral-small-latest', {
        temperature: 0.7,
        max_tokens: 2000
      });
      
      if (response.choices && response.choices.length > 0) {
        const content = response.choices[0].message.content;
        
        // Try to parse JSON if it's in JSON format
        try {
          // Extract JSON if wrapped in markdown code blocks
          let jsonContent = content;
          const jsonRegex = /```(?:json)?\s*(\{[\s\S]*?\})\s*```/;
          const match = content.match(jsonRegex);
          if (match && match[1]) {
            jsonContent = match[1];
          }
          
          // Parse the JSON content
          const parsedData = JSON.parse(jsonContent);
          
          // Fetch images for each location
          const imagePromises = parsedData.locations.map(location => 
            fetchImageForLocation(location.name, destination)
          );
          
          // Wait for all image fetches to complete
          const imageResults = await Promise.all(imagePromises);
          
          // Create a map of location index to image URL
          const newLocationImages = {};
          imageResults.forEach((imageUrl, index) => {
            if (imageUrl) {
              newLocationImages[index] = imageUrl;
            }
          });
          
          setLocationImages(newLocationImages);
          
          // Store both original and parsed data
          setItinerary({
            raw: content,
            parsed: parsedData
          });
        } catch (e) {
          // If parsing fails, store just the raw content
          console.log("Failed to parse JSON:", e);
          setItinerary({
            raw: content,
            parsed: null
          });
        }
        
        setGenerateStatus('success');
      }
    } catch (err) {
      console.error('Error generating itinerary:', err);
      setError('Failed to generate itinerary. Please try again later.');
      setGenerateStatus('error');
    }
  };

  const handleSaveItinerary = () => {
    // Get existing itineraries or initialize empty object
    const existingItineraries = JSON.parse(localStorage.getItem('savedItineraries')) || {};
    
    // Add new itinerary
    existingItineraries[destination] = {
      content: itinerary.raw,
      parsedContent: itinerary.parsed,
      photoStyles: style,
      locationCount: locationCount,
      locationImages: locationImages, // Save the image URLs too
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('savedItineraries', JSON.stringify(existingItineraries));
    
    // Navigate to itineraries page
    navigate('/itineraries');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Plan Your Photo Journey</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Planning Form */}
          <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Trip Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Photo Locations</label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="3"
                    max="10"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    value={locationCount}
                    onChange={(e) => setLocationCount(parseInt(e.target.value))}
                  />
                  <span className="ml-3 w-8 text-center font-medium">{locationCount}</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">Select between 3-10 photography locations</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Photography Styles</label>
                <div className="flex flex-wrap gap-2">
                  {availableStyles.map((styleOption) => (
                    <button
                      key={styleOption}
                      type="button"
                      className={`px-3 py-1 text-sm rounded-full ${
                        style.includes(styleOption)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      } transition-colors`}
                      onClick={() => handleStyleSelect(styleOption)}
                    >
                      {styleOption}
                    </button>
                  ))}
                </div>
              </div>
              
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <button
                onClick={handleGenerateItinerary}
                disabled={generateStatus === 'loading'}
                className={`w-full py-3 px-4 rounded-md text-white font-semibold ${
                  generateStatus === 'loading'
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors`}
              >
                {generateStatus === 'loading' ? 'Generating...' : 'Generate Photo Locations'}
              </button>
            </div>
          </div>
          
          {/* Itinerary Display */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Your Photography Locations</h2>
            
            {generateStatus === 'loading' && (
              <div className="py-12 text-center">
                <div className="inline-block w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600">Finding perfect photo spots...</p>
              </div>
            )}
            
            {generateStatus === 'success' && itinerary && (
              <div className="space-y-6">
                {itinerary.parsed ? (
                  <div className="grid grid-cols-1 gap-4">
                    {itinerary.parsed.locations.map((location, locIndex) => (
                      <div key={locIndex} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <div className="flex flex-col md:flex-row gap-4 items-start">
                          <div className="w-full md:w-1/3 mb-3 md:mb-0 flex-shrink-0">
                            {/* Location image from Pixabay API */}
                            <div className="rounded-lg overflow-hidden shadow-md" style={{ height: '200px' }}>
                              <img 
                                src={locationImages[locIndex] || `https://via.placeholder.com/800x600/1E3A8A/FFFFFF?text=Photography+Location`} 
                                alt={`Travel photography - ${location.name}`}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>
                          <div className="w-full md:w-2/3">
                            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-3">{location.name}</h3>
                            <p className="text-sm text-blue-700 mb-2">
                              <span className="inline-block mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </span>
                              Best time: {location.bestTime}
                            </p>
                            <p className="text-gray-700 mb-3">{location.description}</p>
                            <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                              <p className="text-sm font-medium text-gray-800">
                                <span className="inline-block mr-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                </span>
                                Photo Tip: {location.photoTip}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    {itinerary.raw.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph.split('\n').map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            {i < paragraph.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </p>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleSaveItinerary}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Save Locations
                  </button>
                  
                  <button
                    onClick={() => {
                      setGenerateStatus('idle');
                      setItinerary(null);
                      setDestination('');
                      setLocationCount(5);
                      setStyle('');
                      setLocationImages({});
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            )}
            
            {generateStatus === 'idle' && (
              <div className="py-12 text-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-lg">Fill in the details on the left to discover photo-worthy locations</p>
                <p className="mt-2 text-sm">Our AI will generate a personalized list of photography spots with tips</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PlanItinerariesPage;