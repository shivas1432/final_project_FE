import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../components/HomePage';
import AboutMe from '../components/Aboutme';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Resume from '../components/Resume';
import Reference from '../components/Reference';
import AddReference from '../components/References';
import LoginPage from '../components/login';
import RegisterPage from '../components/register';
import News from '../components/News';
import AIChat from '../components/AIChat';
import EditReference from '../components/EditReference';

const AppRoutes = ({ user, guestName, handleLogout, handleLogin, handleGuestAccessGranted, handleError }) => (
  <Routes>
    <Route 
      path="/" 
      element={<HomePage user={user} guestName={guestName} onLogout={handleLogout} onGuestAccessGranted={handleGuestAccessGranted} />} 
    />
    <Route path="/about" element={<AboutMe user={user || guestName} onLogout={handleLogout} />} />
    <Route path="/projects" element={<Projects user={user || guestName} onLogout={handleLogout} />} />
    <Route path="/contact" element={<Contact user={user || guestName} onLogout={handleLogout} />} />
    <Route path="/resume" element={<Resume user={user || guestName} onLogout={handleLogout} />} />
    <Route path="/references" element={<Reference />} />
    <Route path="/add-references" element={<AddReference user={user || guestName} onLogout={handleLogout} />} />
    <Route path="/login" element={<LoginPage onLogin={handleLogin} onError={handleError} />} />
    <Route path="/register" element={<RegisterPage onLogin={handleLogin} onError={handleError} />} />
    <Route path="/edit-reference/:id" element={<EditReference />} />
    <Route path="/news" element={<News />} />
    <Route path="/ai-chat" element={<AIChat />} />
  </Routes>
);

export default AppRoutes;
