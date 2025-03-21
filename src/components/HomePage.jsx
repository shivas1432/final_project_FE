import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from './HeroSection'; // Assuming HeroSection is in a separate file
import '../css/HomePage.css'; // Import the CSS file for styles

function HomePage({ user, onLogout }) {
  const [guestName, setGuestName] = useState('');
  const [error, setError] = useState('');
  const [guestAccessGranted, setGuestAccessGranted] = useState(false);

  // Check if the guest name is stored in local storage and set it when the component loads
  useEffect(() => {
    const storedGuestName = localStorage.getItem('guestName');
    if (storedGuestName) {
      setGuestName(storedGuestName);
      setGuestAccessGranted(true);
    }
  }, []);

  const handleGuestAccess = async () => {
    const regex = /^(?=.*\d.*\d)[a-zA-Z0-9\s]+$/; // Validate name includes at least two digits
    if (!regex.test(guestName)) {
      setError('Please enter a valid name (must include at least two digits)');
      return;
    }

    try {
      const response = await fetch('https://final-project-be-d1bj.onrender.com/api/guests', { // Updated API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: guestName }),
      });
  
      if (response.ok) {
        setGuestAccessGranted(true);
        localStorage.setItem('guestName', guestName); // Save guest name to localStorage
        window.location.reload(); // Reload the page after successful guest sign-in
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save guest name. Please try again.');
      }
    } catch (error) {
      setError('Error: ' + error.message);
    }
  };
  

 
  const handleGuestSignOut = () => {
    setGuestAccessGranted(false);
    setGuestName('');
    localStorage.removeItem('guestName');
    window.location.reload();
  };

  return (
    <div className="scroll-container">
      {/* Pass necessary props to HeroSection */}
      <HeroSection
        user={user}
        guestAccessGranted={guestAccessGranted}
        guestName={guestName}
        onLogout={onLogout}
        handleGuestSignOut={handleGuestSignOut}
        handleGuestAccess={handleGuestAccess}
        setGuestName={setGuestName} // Pass setGuestName to HeroSection
        error={error}
      />

      {/* About Section */}
      <section
        className="section about"
        id="about"
        style={{
          backgroundImage: 'url("/images/2.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h2>About Me</h2>
        <p>
          I am a web developer with a passion for designing and building
          responsive, high-performance applications. I love problem-solving and
          constantly improving my skillset in modern technologies.
        </p>
        <div className="skills">
          <h3 >Skills:</h3>
          <ul>
            <li><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-react"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.306 8.711c-2.602 .723 -4.306 1.926 -4.306 3.289c0 2.21 4.477 4 10 4c.773 0 1.526 -.035 2.248 -.102" /><path d="M17.692 15.289c2.603 -.722 4.308 -1.926 4.308 -3.289c0 -2.21 -4.477 -4 -10 -4c-.773 0 -1.526 .035 -2.25 .102" /><path d="M6.305 15.287c-.676 2.615 -.485 4.693 .695 5.373c1.913 1.105 5.703 -1.877 8.464 -6.66c.387 -.67 .733 -1.339 1.036 -2" /><path d="M17.694 8.716c.677 -2.616 .487 -4.696 -.694 -5.376c-1.913 -1.105 -5.703 1.877 -8.464 6.66c-.387 .67 -.733 1.34 -1.037 2" /><path d="M12 5.424c-1.925 -1.892 -3.82 -2.766 -5 -2.084c-1.913 1.104 -1.226 5.877 1.536 10.66c.386 .67 .793 1.304 1.212 1.896" /><path d="M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913 -1.104 1.226 -5.877 -1.536 -10.66c-.375 -.65 -.78 -1.283 -1.212 -1.897" /><path d="M11.5 12.866a1 1 0 1 0 1 -1.732a1 1 0 0 0 -1 1.732z" /></svg>
            <br />React</li>
            <li><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-javascript"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z" /><path d="M7.5 8h3v8l-2 -1" /><path d="M16.5 8h-2.5a.5 .5 0 0 0 -.5 .5v3a.5 .5 0 0 0 .5 .5h1.423a.5 .5 0 0 1 .495 .57l-.418 2.93l-2 .5" /></svg>
            <br />JavaScript</li>
            <li><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-nodejs"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 9v8.044a2 2 0 0 1 -2.996 1.734l-1.568 -.9a3 3 0 0 1 -1.436 -2.561v-6.635a3 3 0 0 1 1.436 -2.56l6 -3.667a3 3 0 0 1 3.128 0l6 3.667a3 3 0 0 1 1.436 2.561v6.634a3 3 0 0 1 -1.436 2.56l-6 3.667a3 3 0 0 1 -3.128 0" /><path d="M17 9h-3.5a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-3.5" /></svg>
            <br />Node.js</li>
            <li><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-bootstrap"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M2 12a2 2 0 0 0 2 -2v-4a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2" /><path d="M2 12a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-4a2 2 0 0 1 2 -2" /><path d="M9 16v-8h3.5a2 2 0 1 1 0 4h-3.5h4a2 2 0 1 1 0 4h-4z" /></svg>
            <br />Bootstrap</li>
            <li><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-file-type-css"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" /><path d="M8 16.5a1.5 1.5 0 0 0 -3 0v3a1.5 1.5 0 0 0 3 0" /><path d="M11 20.25c0 .414 .336 .75 .75 .75h1.25a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-1a1 1 0 0 1 1 -1h1.25a.75 .75 0 0 1 .75 .75" /><path d="M17 20.25c0 .414 .336 .75 .75 .75h1.25a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-1a1 1 0 0 1 1 -1h1.25a.75 .75 0 0 1 .75 .75" /></svg>
            <br />CSS & SASS</li>
            <li><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-file-type-html"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" /><path d="M2 21v-6" /><path d="M5 15v6" /><path d="M2 18h3" /><path d="M20 15v6h2" /><path d="M13 21v-6l2 3l2 -3v6" /><path d="M7.5 15h3" /><path d="M9 15v6" /></svg>
            <br />HTML</li>
            <li><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-mysql"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 21c-1.427 -1.026 -3.59 -3.854 -4 -6c-.486 .77 -1.501 2 -2 2c-1.499 -.888 -.574 -3.973 0 -6c-1.596 -1.433 -2.468 -2.458 -2.5 -4c-3.35 -3.44 -.444 -5.27 2.5 -3h1c8.482 .5 6.421 8.07 9 11.5c2.295 .522 3.665 2.254 5 3.5c-2.086 -.2 -2.784 -.344 -3.5 0c.478 1.64 2.123 2.2 3.5 3" /><path d="M9 7h.01" /></svg>
            <br />SQL</li>
            <li><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-wash-press"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3.486 7.965c.168 .02 .34 .033 .514 .035c.79 .009 1.539 -.178 2 -.5c.461 -.32 1.21 -.507 2 -.5c.79 -.007 1.539 .18 2 .5c.461 .322 1.21 .509 2 .5c.79 .009 1.539 -.178 2 -.5c.461 -.32 1.21 -.507 2 -.5c.79 -.007 1.539 .18 2 .5c.461 .322 1.21 .509 2 .5c.17 0 .339 -.014 .503 -.034" /><path d="M3 5l1.721 10.329a2 2 0 0 0 1.973 1.671h10.612a2 2 0 0 0 1.973 -1.671l1.721 -10.329" /><path d="M5 20h14" /></svg>
            <br/>Express</li>
               <li><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-python"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 9h-7a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h3" /><path d="M12 15h7a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-3" /><path d="M8 9v-4a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v5a2 2 0 0 1 -2 2h-4a2 2 0 0 0 -2 2v5a2 2 0 0 0 2 2h4a2 2 0 0 0 2 -2v-4" /><path d="M11 6l0 .01" /><path d="M13 18l0 .01" /></svg><br/>Python</li>
            <li><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-inertia"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12.5 8l4 4l-4 4h4.5l4 -4l-4 -4z" /><path d="M3.5 8l4 4l-4 4h4.5l4 -4l-4 -4z" /></svg><br/>java</li>
            <li><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-brand-google"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" /></svg><br/>Google cloud</li>
            <li><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-aws"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 18.5a15.198 15.198 0 0 1 -7.37 1.44a14.62 14.62 0 0 1 -6.63 -2.94" /><path d="M19.5 21c.907 -1.411 1.451 -3.323 1.5 -5c-1.197 -.773 -2.577 -.935 -4 -1" /><path d="M3 11v-4.5a1.5 1.5 0 0 1 3 0v4.5" /><path d="M3 9h3" /><path d="M9 5l1.2 6l1.8 -4l1.8 4l1.2 -6" /><path d="M18 10.25c0 .414 .336 .75 .75 .75h1.25a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-1a1 1 0 0 1 1 -1h1.25a.75 .75 0 0 1 .75 .75" /></svg><br/>AWS(EC2)</li>
            
          </ul>
        </div>
        <Link to="/about" className="btn learn-more">Learn More</Link>
      </section>

      {/* Projects Section */}
      <section className="section projects" id="projects" style={{
        backgroundImage: 'url("/images/2.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
<h2>My Projects</h2>
<div className="projects-container">
  {/* Project containers */}
  <div className="project-item" style={{ backgroundImage: "url('/images/solar.png')" }}>
    <p></p>
    <a href="https://solarssk.netlify.app" target="_blank" rel="noopener noreferrer">
      <h3>Solar</h3>
    </a>
  </div>
  <div className="project-item" style={{ backgroundImage: "url('/images/prohealth.png')" }}>
    <p></p>
    <a href="https://prohealthssk.netlify.app" target="_blank" rel="noopener noreferrer">
      <h3>ProHealth</h3>
    </a>
  </div>
  <div className="project-item" style={{ backgroundImage: "url('/images/musicplayer.png')" }}>
    <p></p>
    <a href="https://musicplayerssk.netlify.app" target="_blank" rel="noopener noreferrer">
      <h3>MelodyPulse</h3>
    </a>
  </div>
</div>


        <Link to="/projects" className="btn more-btn">
          See More Projects
        </Link><br />
        <br />
      
      <footer className="footer">
        <p>&copy; 2024 My Portfolio. All rights reserved.</p>
      </footer>
      </section>

     
    </div>
  );
}

export default HomePage;
