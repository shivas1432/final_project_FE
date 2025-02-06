import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherSection = ({ guestAccessGranted, user }) => {
  const [ukCities, setUkCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loadingCities, setLoadingCities] = useState(true);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUkCities = async () => {
      try {
        // Replaced localhost URL with Render server URL
        const response = await axios.get('https://final-project-be-d1bj.onrender.com/api/uk-cities');
        setUkCities(response.data);
      } catch (err) {
        setError('Failed to load city data. Please try again.');
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
      setError('Unable to fetch weather data. Please try again.');
    } finally {
      setLoadingWeather(false);
    }
  };

  const handleCitySelect = (event) => {
    const city = event.target.value;
    const selected = ukCities.find((c) => c.city === city);
    if (selected) {
      setSelectedCity(selected.city);
      fetchWeatherData(selected.lat, selected.lng);
    } else {
      setWeatherData(null);
    }
  };

  return (
    guestAccessGranted || user ? (
      <section className="weather-section">
        <h2>Weather Information</h2>
        {loadingCities ? (
          <p>Loading cities...</p>
        ) : (
          <div>
            <label htmlFor="city-select">Select a city:</label>
            <select id="city-select" value={selectedCity} onChange={handleCitySelect}>
              <option value="">-- Select a city --</option>
              {ukCities.map((city, index) => (
                <option key={index} value={city.city}>{city.city}</option>
              ))}
            </select>
          </div>
        )}
        {loadingWeather ? (
          <p>Loading weather data...</p>
        ) : (
          weatherData && (
            <div className="weather-details">
              <h3>Weather in {weatherData.name}</h3>
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Weather: {weatherData.weather[0].description}</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            </div>
          )
        )}
        {error && <p className="error-message">{error}</p>}
      </section>
    ) : null
  );
};

export default WeatherSection;
