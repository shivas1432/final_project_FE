import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext'; // Import useTheme to access theme context
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import FloatingIcon from './FloatingIcon';
import '../css/Layout.css'; // Include your layout-specific styles here

const Layout = ({ user, onLogout, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar is hidden by default
  const [guestAccessGranted, setGuestAccessGranted] = useState(false); // Check for guest access
  const { isDarkMode } = useTheme(); // Use theme context

  // Check for guest access or logged-in user on component mount
  useEffect(() => {
    const storedGuestName = localStorage.getItem('guestName');
    if (user || storedGuestName) {
      setGuestAccessGranted(true); // If a user or guest is found, grant access
    }
  }, [user]);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`layout-container ${isDarkMode ? 'dark' : ''}`}> 
      <Navbar user={user} onLogout={onLogout} />
      <main className="layout-content">
        {children} {/* Render the child components here */}
      </main>

      {/* Only show the floating icon and sidebar if user or guest access is granted */}
      {guestAccessGranted && (
        <>
          {/* Floating Icon to Open Sidebar */}
          <FloatingIcon onClick={toggleSidebar} />

          {/* Sidebar Component */}
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </>
      )}
    </div>
  );
};

export default Layout;
