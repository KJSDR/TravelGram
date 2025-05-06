import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import MistralService from './mistralService';

// Access the environment variable using Vite's import.meta.env
const MISTRAL_API_KEY = import.meta.env.VITE_MISTRAL_API_KEY;

const PlanItinerariesPage = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [style, setStyle] = useState('');
  const [generateStatus, setGenerateStatus] = useState('idle'); // idle, loading, success, error
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);
  
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
    
    try {
      const mistralService = new MistralService(MISTRAL_API_KEY);
      
      const prompt = `Create a photography-focused travel itinerary for ${destination}${
        startDate && endDate ? ` from ${startDate} to ${endDate}` : ''
      }${style ? ` focusing on ${style} photography` : ''}.
      
      The itinerary should include:
      1. Top photo spots and best times to visit them
      2. Local cultural considerations for photographers
      
      
      Format as specific locations with a brief summary on the location.`;
      
      const messages = [
        {
          role: 'system',
          content: `You are an AI travel planning assistant that specializes in creating photography-focused travel itineraries.
          Your itineraries should be concise, practical, and specifically tailored to photographers.
          Include specific photo spots and optimal shooting times.`
        },
        {
          role: 'user',
          content: prompt
        }
      ];
      
      const response = await mistralService.chat(messages, 'mistral-small-latest', {
        temperature: 0.7,
        max_tokens: 2000
      });
      
      if (response.choices && response.choices.length > 0) {
        setItinerary(response.choices[0].message.content);
        setGenerateStatus('success');
      }
    } catch (err) {
      console.error('Error generating itinerary:', err);
      setError('Failed to generate itinerary. Please try again later.');
      setGenerateStatus('error');
    }
  };

  const handleSaveItinerary = () => {
    // In a real app, you would save to a database
    // For now, just navigate back to the itineraries page
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
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
                {generateStatus === 'loading' ? 'Generating...' : 'Generate Itinerary'}
              </button>
            </div>
          </div>
          
          {/* Itinerary Display */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Your Photo Itinerary</h2>
            
            {generateStatus === 'loading' && (
              <div className="py-12 text-center">
                <div className="inline-block w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600">Crafting your photography adventure...</p>
              </div>
            )}
            
            {generateStatus === 'success' && itinerary && (
              <div className="space-y-6">
                <div className="prose max-w-none">
                  {itinerary.split('\n\n').map((paragraph, index) => (
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
                
                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleSaveItinerary}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Save Itinerary
                  </button>
                  
                  <button
                    onClick={() => setGenerateStatus('idle')}
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
                <p className="text-lg">Fill in the details on the left to create your custom photo itinerary</p>
                <p className="mt-2 text-sm">Our AI will generate a personalized plan optimized for photography</p>
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