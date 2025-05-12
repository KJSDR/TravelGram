import React, { useState, useEffect, useRef, useCallback } from 'react';
import MistralService from './mistralService';

// Access the environment variable using Vite's import.meta.env
const MISTRAL_API_KEY = import.meta.env.VITE_MISTRAL_API_KEY;

const AIRecommendations = ({ userPreferences }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const mistralService = useRef(new MistralService(MISTRAL_API_KEY));

  // Default preferences if none provided
  const defaultPreferences = {
    categories: ['Nature/Landscapes', 'Architecture'],
    accessibility: ['Wheelchair Accessible'],
    languages: ['English']
  };

  // Use provided preferences or defaults
  const preferences = userPreferences || defaultPreferences;

  // Use useCallback to memoize the function so it doesn't change on every render
  const generateRecommendations = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Convert preferences object to a string description
      const preferencesDescription = Object.entries(preferences)
        .map(([key, values]) => `${key}: ${values.join(', ')}`)
        .join('; ');

      // Create a prompt for the AI
      const messages = [
        {
          role: 'system',
          content: `You are an AI travel advisor specialized in photography-focused travel recommendations. 
          Provide specific, concise recommendations for photogenic destinations.
          Each recommendation should include: 
          1. Location name
          2. A brief description (max 2 sentences)
          3. Best time of day to take photos 
          4. A short photography tip
          
          Format your response as a JSON array with objects containing these fields:
          { "name": "...", "description": "...", "bestTimeToVisit": "...", "photoTip": "..." }
          
          The response should ONLY contain the JSON array, nothing else.`
        },
        {
          role: 'user',
          content: `Generate 3 destination recommendations based on these preferences: ${preferencesDescription}.
          Make sure the recommendations match these preferences and would be excellent for photography.`
        }
      ];

      // Make API call to Mistral AI
      const response = await mistralService.current.chat(messages, 'mistral-small-latest', {
        temperature: 0.7,
        max_tokens: 1000
      });

      // Parse the AI response to extract the JSON
      if (response.choices && response.choices.length > 0) {
        const content = response.choices[0].message.content;
        
        // Extract JSON from the response (handling cases where AI might add markdown code blocks)
        let jsonStr = content;
        if (content.includes('```json')) {
          jsonStr = content.split('```json')[1].split('```')[0].trim();
        } else if (content.includes('```')) {
          jsonStr = content.split('```')[1].split('```')[0].trim();
        }
        
        try {
          const parsedRecommendations = JSON.parse(jsonStr);
          setRecommendations(parsedRecommendations);
        } catch (jsonError) {
          console.error('Failed to parse AI response as JSON:', jsonError);
          setError('Failed to parse recommendations. Please try again.');
        }
      }
    } catch (err) {
      console.error('Error fetching AI recommendations:', err);
      setError('Failed to generate recommendations. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [preferences]); // Add preferences as a dependency

  // Call generateRecommendations when component mounts or when userPreferences changes
  useEffect(() => {
    generateRecommendations();
  }, [userPreferences, generateRecommendations]); // Now properly include generateRecommendations

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden my-5">
      <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="m-0 text-lg text-slate-800 font-semibold flex items-center">
          <span className="mr-2"></span>
          TravelGram Recommendations
        </h3>
        <button 
          onClick={generateRecommendations}
          disabled={isLoading}
          className={`px-3 py-2 rounded-md text-sm ${
            isLoading 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition-colors'
          }`}
        >
          {isLoading ? 'Generating...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 mx-4 my-4 rounded-md text-sm">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="py-10 px-4 text-center text-slate-500">
          <div className="inline-block w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p>Analyzing your preferences to find perfect photo spots...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {recommendations.map((rec, index) => (
            <div 
              key={index} 
              className="bg-slate-50 border border-slate-200 rounded-lg p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <h4 className="m-0 mb-2 text-lg font-semibold text-slate-900">{rec.name}</h4>
              <p className="m-0 mb-4 text-sm text-slate-700 leading-relaxed">{rec.description}</p>
              
              <div className="mb-2 text-sm flex">
                <span className="font-semibold text-slate-500 w-20 flex-shrink-0">Best time:</span>
                <span className="text-slate-700">{rec.bestTimeToVisit}</span>
              </div>
              
              <div className="mb-2 text-sm flex">
                <span className="font-semibold text-slate-500 w-20 flex-shrink-0">Photo tip:</span>
                <span className="text-slate-700">{rec.photoTip}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;