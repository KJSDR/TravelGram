import React, { useState, useContext, createContext } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Provider component that wraps your app and makes auth object available to any child component that calls useAuth().
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Call this function when you want to authenticate the user
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    // You might want to store in localStorage or sessionStorage for persistence
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
  };

  // Call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Remove from storage
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  };

  // Check if there's a user in localStorage on initial load
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAuth = localStorage.getItem('isAuthenticated');
    
    if (storedUser && storedAuth === 'true') {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for components to get the auth object and re-render when it changes
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};