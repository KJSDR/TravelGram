import React, { useState, useRef } from 'react';
import MistralService from './mistralService';

// Browser-safe way to access environment variables in React
const MISTRAL_API_KEY = import.meta.env?.VITE_MISTRAL_API_KEY || 
                       window.env?.REACT_APP_MISTRAL_API_KEY || 
                       'your_api_key_here';

const PhotoAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const mistralService = useRef(new MistralService(MISTRAL_API_KEY));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      setError('Please select an image file (JPEG, PNG, etc.)');
      return;
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }
    
    setSelectedImage(file);
    setError(null);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      setError('Please select an image to analyze');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    
    try {
      // Convert image to base64 for text description
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      
      reader.onloadend = async () => {
        const base64Image = reader.result.split(',')[1]; // Remove the data:image/jpeg;base64, part
        
        // Create prompt for Mistral AI
        const messages = [
          {
            role: 'system',
            content: `You are a professional photography analyzer and advisor. 
            Analyze the provided image and give constructive feedback and advice.
            Include these sections in your analysis:
            1. Subject & Composition: What's the main subject and how is it composed?
            2. Lighting: Evaluate the lighting conditions and quality
            3. Technical Assessment: Evaluate focus, exposure, etc.
            4. Improvements: Suggest 2-3 specific ways to improve this photo
            5. Similar Locations: Suggest 2-3 similar photogenic locations to the one in the image`
          },
          {
            role: 'user',
            content: `Please analyze this photograph and provide feedback to help me improve my photography skills.
            
            I'm using the TravelGram app to find photogenic locations. Based on this image, can you also suggest similar locations I might want to visit?
            
            [Image data: ${base64Image.substring(0, 100)}... (truncated)]`
          }
        ];
        
        // Call Mistral AI API
        const response = await mistralService.current.chat(messages, 'mistral-small-latest', {
          temperature: 0.7,
          max_tokens: 1000
        });
        
        if (response.choices && response.choices.length > 0) {
          setAnalysis(response.choices[0].message.content);
        }
        
        setIsLoading(false);
      };
    } catch (err) {
      console.error('Error analyzing image:', err);
      setError('Failed to analyze image. Please try again later.');
      setIsLoading(false);
    }
  };

  const resetAnalyzer = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysis(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden my-5">
      <div className="bg-slate-50 p-4 border-b border-slate-200">
        <h3 className="m-0 text-lg text-slate-800 font-semibold flex items-center">
          <span className="mr-2">📸</span>
          Photo Analyzer & Location Recommendations
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Upload your photo to get professional analysis and discover similar photogenic locations.
        </p>
      </div>

      <div className="p-4">
        {/* Image Upload Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Upload a photograph
          </label>
          <div className="flex items-center">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {selectedImage && (
              <button
                onClick={resetAnalyzer}
                className="ml-2 px-3 py-2 text-xs text-red-600 border border-red-300 rounded-md hover:bg-red-50"
              >
                Reset
              </button>
            )}
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-4">
            <div className="mt-2 max-w-full">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-64 rounded-lg object-contain"
              />
              <button
                onClick={analyzeImage}
                disabled={isLoading}
                className={`mt-3 px-4 py-2 rounded-md text-white text-sm font-medium 
                  ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isLoading ? 'Analyzing...' : 'Analyze Photo'}
              </button>
            </div>
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="py-8 text-center text-slate-500">
            <div className="inline-block w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p>Analyzing your photo and finding similar locations...</p>
          </div>
        )}

        {/* Analysis Results */}
        {analysis && !isLoading && (
          <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="text-md font-semibold text-slate-800 mb-2">Analysis Results</h4>
            <div className="prose prose-sm max-w-none">
              {analysis.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-2 text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Add animation utilities for Tailwind that might not be available
const tailwindSpinAnimation = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
`;

// Add the animation styles to the document
const injectSpinStyles = () => {
  if (!document.getElementById('tailwind-spin-animation')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'tailwind-spin-animation';
    styleEl.innerHTML = tailwindSpinAnimation;
    document.head.appendChild(styleEl);
  }
};

// Call the function when the component is imported
injectSpinStyles();

export default PhotoAnalyzer;