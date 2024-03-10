import React, { useState, useEffect } from 'react';

const API_KEY = 'dea1416da4748a21cb2c8174e1a9446e';
const cities = ['Prague', 'London','Podbořany'];

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const promises = cities.map(city =>
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
          .then(response => response.json())
          .then(data => ({ city, data }))
      );

      const results = await Promise.all(promises);
      setWeatherData(results);
    };

    fetchData();
  }, []);

  return (
    <div className="weather-app">
      {weatherData.map(({ city, data }) => (
        <div key={city} className="weather-card">
          <h2>{city}</h2>
          <p>Temperature: {data.main.temp} °C</p>
          <p>Humidity: {data.main.humidity}%</p>
          <p>Wind Speed: {data.wind.speed} m/s</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherApp;
