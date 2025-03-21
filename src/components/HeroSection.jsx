import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = ({
  user,
  guestAccessGranted,
  guestName,
  onLogout,
  handleGuestSignOut,
  handleGuestAccess,
  setGuestName,
  error,
}) => {
  const [videoPlayed, setVideoPlayed] = useState(false); // Track if video has played

  // Handle video end, show image
  const handleVideoEnd = () => {
    setVideoPlayed(true); // Show the image when video ends
  };

  // Handle click on image to play the video again
  const handleImageClick = () => {
    setVideoPlayed(false); // Reset to play video
  };

  return (
    <section className="section hero">
      <div
        className="hero-left"
        style={{ flex: 7, padding: '20px', color: 'white' }}
      >
        <header className="home-header">
          <h1>Welcome to My Portfolio</h1>
          {user ? (
            <div className="user-greeting">
              <h2>Hello, {user.name}!</h2>
              <button onClick={onLogout} className="btn btn-warning">
                Logout
              </button>
            </div>
          ) : (
            <div>
              {guestAccessGranted ? (
                <div>
                  <h2>Hello, {guestName}!</h2>
                  <button
                    onClick={handleGuestSignOut}
                    className="btn btn-warning"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div>
                  <p>
                    Please log in or register to access more features, or use
                    guest access!
                  </p>
                  <div className="guest-access">
                    <input
                      className="guestname"
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Enter your name (must include at least two digits)"
                      required
                    />
                    <button onClick={handleGuestAccess} className="btn btn-guest">
                      Guest Access
                    </button>
                    {error && <p className="error-message">{error}</p>}
                  </div>
                </div>
              )}
            </div>
          )}
        </header>
        <h1>
          Hi, I'm <span>SHIVASHANKER</span>
        </h1>
        <p>
         I'm a Full-Stack Web Developer with experience in React, Node.js, Express, and MySQL, specializing in building responsive, high-performance web applications. 
          I focus on creating seamless user experiences through clean, secure code and efficient cloud deployments (AWS, GCP). With a strong background in API integrations, authentication, and data analysis, 
          I'm passionate about solving complex problems and optimizing both front-end and back-end systems to deliver robust, scalable solutions.
        </p>
        {(user || guestAccessGranted) && (
          <div className="cta-buttons">
            <Link to="/projects" className="btn">
              View My Work
            </Link>
            <a href="cv.pdf" className="btn" download>
              Download Resume
            </a>
          </div>
        )}
      </div>

      <div className="hero-right">
        <div
          className="video-container"
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {!videoPlayed ? (
            // Video player
            <video
              src="/videos/dance.mp4" // Path to your local video in the public folder
              autoPlay
              muted
              onEnded={handleVideoEnd} // Call handleVideoEnd when video ends
              playsInline
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '750px',
                borderRadius: '20px',
              }}
            />
          ) : (
            // Image displayed after video ends
            <img
              src="/images/pimage.jpg" // Path to your image in the public folder
              alt="Video Ended"
              onClick={handleImageClick} // When user clicks on the image, video plays again
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '750px',
                borderRadius: '20px',
                cursor: 'pointer',
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
