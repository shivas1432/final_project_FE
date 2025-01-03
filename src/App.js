import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import { ThemeProvider } from './components/ThemeContext';
import './css/App.css';
import AppRoutes from './routes/AppRoutes'; // Import the extracted AppRoutes

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [guestName, setGuestName] = useState(null);

  useEffect(() => {
    const storedGuestName = localStorage.getItem('guestName');
    if (storedGuestName) {
      setGuestName(storedGuestName);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setError(null);
    setGuestName(null);
    localStorage.removeItem('guestName');
  };

  const handleLogout = () => {
    setUser(null);
    setGuestName(null);
    localStorage.removeItem('guestName');
  };

  const handleGuestAccessGranted = (name) => {
    setGuestName(name);
    localStorage.setItem('guestName', name);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          {error && <div className="alert alert-danger">{error}</div>}
          <Layout user={user || guestName} onLogout={handleLogout}>
            {/* Use the extracted routes */}
            <AppRoutes
              user={user}
              guestName={guestName}
              handleLogout={handleLogout}
              handleLogin={handleLogin}
              handleGuestAccessGranted={handleGuestAccessGranted}
              handleError={handleError}
            />
          </Layout>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
