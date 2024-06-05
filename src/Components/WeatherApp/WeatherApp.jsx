import React, { useState } from 'react';
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

const WeatherApp = () => {
  const api_key = "aa5e05803c5af6d25685cf07b71d2bec";

  const [wicon, setWicon] = useState(cloud_icon);
  const [weatherData, setWeatherData] = useState({
    humidity: '',
    windSpeed: '',
    temperature: '',
    location: 'London'
  });

  const search = async () => {
    const element = document.querySelector('.cityInput');
    if (element.value === "") {
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=metric&appid=${api_key}`;

    try {
      let response = await fetch(url);
      let data = await response.json();

      if (!response.ok) {
        throw new Error('City not found');
      }

      switch (data.weather[0].icon) {
        case "01d":
        case "01n":
          setWicon(clear_icon);
          break;
        case "02d":
        case "02n":
          setWicon(cloud_icon);
          break;
        case "03d":
        case "03n":
        case "04d":
        case "04n":
          setWicon(drizzle_icon);
          break;
        case "09d":
        case "09n":
        case "10d":
        case "10n":
          setWicon(rain_icon);
          break;
        case "13d":
        case "13n":
          setWicon(snow_icon);
          break;
        default:
          setWicon(clear_icon);
          break;
      }

      setWeatherData({
        humidity: `${data.main.humidity} %`,
        windSpeed: `${Math.floor(data.wind.speed)} km/h`,
        temperature: `${Math.floor(data.main.temp)} °C`,
        location: data.name
      });
    } catch (error) {
      console.error("Error fetching the weather data: ", error);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="search" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="weather icon" />
      </div>
      <div className="weather-temp">{weatherData.temperature}</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="humidity icon" className="icon" />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="wind icon" className="icon" />
          <div className="data">
            <div className="wind-rate">{weatherData.windSpeed}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
