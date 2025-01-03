import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../css/AboutMe.css';

const AboutMe = () => {
  const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 });
  const [details, setDetails] = useState('');
  const [bgClass, setBgClass] = useState('');

  const locations = [
    {
      id: 'schooling',
      name: 'Schooling',
      grade: '95%',
      place: 'Little Soldier High School, Warangal',
      country: 'India',
      details: 'General Education',
      coords: { lat: 17.9805, lng: 79.5696 },
      bgClass: 'schooling-bg', 
    },
    {
      id: 'highschool',
      name: '12th Grade',
      grade: '94%',
      place: 'SR JUNIOR COLLEGE, Hanamkonda',
      country: 'India',
      details: 'MPC',
      coords: { lat: 18.007202, lng: 79.558296 },
      bgClass: 'highschool-bg', 
    },
    {
      id: 'bachelors',
      name: "Bachelor's Degree",
      grade: '65%',
      place: 'VAAGDEVI ENGINEERING COLLEGE, Warangal',
      country: 'India',
      details: 'Computer Science',
      coords: { lat: 17.8897, lng: 79.6009 },
      bgClass: 'bachelors-bg', 
    },
    {
      id: 'masters',
      name: "Master's Degree",
      grade: '65%',
      place: 'CARDIFF METROPOLITAN UNIVERSITY, Cardiff',
      country: 'UK',
      details: 'Advanced Computer Science',
      coords: { lat: 51.481583, lng: -3.179090 },
      bgClass: 'masters-bg', 
    },
  ];

  const handleLocationClick = (location) => {
    setLocation(location.coords);
    setDetails(
      `<b>Place:</b> ${location.place} <br/>
       <b>Country:</b> ${location.country} <br/>
       <b>Course Details:</b> ${location.details}<br/>
       <b>Grade:</b> ${location.grade} `
    );
    setBgClass(location.bgClass); 
  };

  return (
    <div className="about-me">
      <div className="brief-container">
        <div className="brief-content">
          <h2>About Me</h2>
          <h1>I AM SHIVASHANKER KANUGULA</h1>
          <p>
            Motivated Full-Stack Web Developer skilled in both frontend (HTML, CSS, JavaScript, React)
            and backend (Node.js, Express, MySQL) technologies. Experienced in building responsive, user-centric web applications, optimizing user interfaces, and integrating backend services. Passionate about continuous learning and staying updated with the latest web technologies.
          </p>
          <h4>Technical Skills:</h4>
          <p>
            Frontend Technologies: HTML5, CSS3, JavaScript, React, Bootstrap, jQuery, Responsive Web Design, SASS <br />
            Backend Technologies: Node.js, Express, RESTful APIs, MySQL, MongoDB (Basic) <br />
            Version Control & Tools: Git, GitHub, Postman, Visual Studio Code, Npm <br />
            Other Programming Languages: Python (Basics), Java (Basic)
          </p>
        </div>
        <div className="image-container">
          <img src="/images/pimage1.jpg" alt="Your Name" />
        </div>
      </div>

      <div className="map-details-container">
        <div className={`map-container ${bgClass}`}> 
          <MapContainer
            center={location}
            zoom={13}
            style={{ width: '100%', height: '100%' }}
            key={`${location.lat}-${location.lng}`}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={location} />
          </MapContainer>
        </div>

        <div className="details-container">
          <h2>Details</h2>
          <p dangerouslySetInnerHTML={{ __html: details || 'Select a location to view details' }} />
        </div>
      </div>

      <div className="locations">
        {locations.map((loc) => (
          <div key={loc.id} className="location-button">
            <button onClick={() => handleLocationClick(loc)}>
              Show {loc.name} Location
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutMe;