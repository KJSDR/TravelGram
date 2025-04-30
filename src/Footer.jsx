import React from 'react';

const Footer = () => {
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
  );
};

export default Footer;