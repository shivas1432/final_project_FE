
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Sidebar.css';
const Sidebar = ({ isOpen, toggleSidebar, guestAccessGranted }) => {
  return (
    <div className={`popup-menu ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>X</button> 
      {/* Navigation Links */}
      <Link to="/" onClick={toggleSidebar}>Home</Link>
      <Link to="/about" onClick={toggleSidebar}>About Me</Link>
      <Link to="/projects" onClick={toggleSidebar}>Projects</Link>
      <Link to="/contact" onClick={toggleSidebar}>Contact</Link>
      <Link to="/resume" onClick={toggleSidebar}>Resume</Link>
      

      
      <Link to="/references" onClick={toggleSidebar}>Referance</Link> 

      {/* Guest Access Message */}
      {guestAccessGranted && (
        <div className="guest-message">
          <span>You are currently logged in as a guest.</span>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
