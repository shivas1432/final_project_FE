import React, { createContext, useState } from 'react';

// Create AuthContext
export const AuthContext = createContext();

// Create AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (userData) => {
    setUser(userData); // Set user data
    setIsLoggedIn(true); // Mark as logged in
    console.log('User logged in:', userData); // Debug log
  };

  const logout = () => {
    setUser(null); // Clear user data
    setIsLoggedIn(false); // Mark as logged out
    console.log('User logged out'); // Debug log
  };

  console.log('AuthProvider initialized with:', { user, isLoggedIn });

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
