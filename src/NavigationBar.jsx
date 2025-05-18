import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const NavigationBar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="border-b border-gray-300 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="logo-container">
          <Link to="/">
            <h1 className="font-bold text-xl text-gray-800">TravelGram</h1>
          </Link>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex">
            <li className="mx-4">
              <Link to="/explore" className="text-gray-600 font-medium hover:text-blue-500 transition-colors">Explore</Link>
            </li>
            <li className="mx-4">
              <Link to="/itineraries" className="text-gray-600 font-medium hover:text-blue-500 transition-colors">Your Adventures</Link>
            </li>
            <li className="mx-4">
              <Link to="/preferences" className="text-gray-600 font-medium hover:text-blue-500 transition-colors">Profile</Link>
            </li>
          </ul>
        </nav>
        
        <div className="flex items-center">
          {isAuthenticated ? (
            <div className="flex items-center">
              <span className="mr-3 text-sm text-gray-600">
                {user.name}
              </span>
              <button 
                onClick={logout}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium mr-3"
              >
                Logout
              </button>
              <Link to="/preferences">
                <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center">
              <Link to="/login" className="text-blue-600 font-medium hover:text-blue-800 mr-2">
                Login
              </Link>
              <span className="text-gray-400 mr-2">|</span>
              <Link to="/signup" className="text-blue-600 font-medium hover:text-blue-800 mr-3">
                Sign Up
              </Link>
              <Link to="/preferences">
                <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;