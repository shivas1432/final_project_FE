import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from './ThemeContext';
import '../css/Navbar.css';
import { FaSun, FaMoon } from 'react-icons/fa';
import AIChat from './AIChat';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const [ukCities, setUkCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loadingCities, setLoadingCities] = useState(true);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [error, setError] = useState('');
  const [showWeatherPopup, setShowWeatherPopup] = useState(false);
  const [showAIChatPopup, setShowAIChatPopup] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [isArrowUp, setIsArrowUp] = useState(false);

  const { toggleTheme, isDarkMode } = useTheme();

  useEffect(() => {
    const fetchUkCities = async () => {
      try {
        // Replace local URL with Render server URL
        const response = await axios.get('https://final-project-be-d1bj.onrender.com/api/uk-cities');
        setUkCities(response.data);
      } catch (err) {
        setError('Failed to load city data.');
      } finally {
        setLoadingCities(false);
      }
    };
    fetchUkCities();
  }, []);

  const fetchWeatherData = async (lat, lng) => {
    setLoadingWeather(true);
    try {
      const apiKey = 'd64f16538655b7a8d0b91db23b1cc0c6';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      setError('Unable to fetch weather data.');
    } finally {
      setLoadingWeather(false);
    }
  };

  const handleCitySelect = (event) => {
    const cityName = event.target.value;
    const selected = ukCities.find((c) => c.city === cityName);
    if (selected) {
      setSelectedCity(selected.city);
      fetchWeatherData(selected.lat, selected.lng);
    } else {
      setWeatherData(null);
    }
  };

  const toggleWeatherPopup = () => setShowWeatherPopup((prev) => !prev);
  const toggleAIChatPopup = () => setShowAIChatPopup((prev) => !prev);
  const handleSignOut = () => {
    onLogout();
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const intervalId = setInterval(updateTime, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return `☀️Good Morning, ${user?.name || user}!`;
    if (currentHour < 17) return `🌞Good Afternoon, ${user?.name || user}!`;
    return `🌃Good Evening, ${user?.name || user}!`;
  };

  const toggleArrowDirection = () => setIsArrowUp((prev) => !prev);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="btn-home">Home</Link>
        <button onClick={toggleTheme} className="theme-toggle">
          {isDarkMode ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
        </button>
      </div>
      <div className="navbar-links">
        <Link to="/news" className="btn btn-info">Live News</Link>
        {user && (
          <div className="navsection">
            <button onClick={toggleAIChatPopup} className="ask-button">Ask Me!</button>
            <div className="country-selector">
              <select id="city-select" value={selectedCity} onChange={handleCitySelect}>
                <option value="">SELECT CITY</option>
                {loadingCities ? <option disabled>Loading cities...</option> : 
                  ukCities.map((city, index) => <option key={index} value={city.city}>{city.city}</option>)}
              </select>
            </div>
          </div>
        )}
        {user && (
          <div className="weather-info" onClick={toggleWeatherPopup}>
            {loadingWeather ? <p>Loading weather...</p> : weatherData ? (
              <>
                <div className="weather" onClick={toggleArrowDirection}>
                  <span className="arrow">{isArrowUp ? '▲' : '▼'}</span>
                  <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="Weather Icon" className="weather-icon" />
                  <span>{weatherData.main.temp}°C</span>
                </div>
                <span className="current-time">🕒 {currentTime}</span>
              </>
            ) : <p></p>}
          </div>
        )}
        {user ? (
          <div>
            <span>{getGreeting()}</span>
            <button onClick={handleSignOut} className="btn btn-danger btn-logout">Sign Out</button>
          </div>
        ) : (
          <div>
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-secondary">Register</Link>
          </div>
        )}
        {showWeatherPopup && weatherData && (
          <div className="weather-popup" style={{ backgroundImage: `url(${new Date().getHours() >= 18 || new Date().getHours() < 6 ? "/gifs/night.gif" : weatherData.weather[0].main === "Rain" ? "/gifs/rainy.gif" : weatherData.weather[0].main === "Clear" ? "/gifs/sunny.gif" : "/gifs/default-weather.gif"})` }}>
            <div className="popup-content">
              <span className="close-popup" onClick={toggleWeatherPopup}>&times;</span>
              <h3 className="w-title">Weather in {weatherData.name}</h3>
              <p>{weatherData.weather[0].main === "Rain" && "🌧️ It's rainy! Don't forget to carry an umbrella."}</p>
              <p>{weatherData.weather[0].main === "Clear" && "☀️ Enjoy the sunny day!"}</p>
              <p>{weatherData.weather[0].main === "Thunderstorm" && "⛈️ Thunderstorms expected!"}</p>
              <p>{weatherData.weather[0].main === "Clouds" && "☁️ It's cloudy outside."}</p>
              <p>{weatherData.main.temp < 5 && "❄️ Brrr... it's cold!"}</p>
              <p>🌡️ Temperature: {weatherData.main.temp}°C</p>
              <p>☁️ Weather: {weatherData.weather[0].description}</p>
              <p>🫧 Humidity: {weatherData.main.humidity}%</p>
              <p>🌬️ Wind Speed: {weatherData.wind.speed} m/s</p>
            </div>
          </div>
        )}
        {showAIChatPopup && <AIChat isOpen={showAIChatPopup} onClose={toggleAIChatPopup} />}
        {error && <p className="error-message">{error}</p>}
      </div>
    </nav>
  );
}

export default Navbar;
