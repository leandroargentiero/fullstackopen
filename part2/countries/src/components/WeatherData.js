import { useState, useEffect } from 'react';
import axios from 'axios';

import {
  convertDegreeToCompassPoint,
  convertMetersPerSecToKMH,
} from '../utils';

const api_key = process.env.REACT_APP_API_KEY;

const WeatherData = ({ city }) => {
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${api_key}&units=metric`
      )
      .then((response) => setWeatherData(response.data));
  }, [city]);

  if (!weatherData) return <p>Loading...</p>;

  const temperature = Math.round(weatherData.main.temp);
  const weahterIconUrl = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  const windSpeed = convertMetersPerSecToKMH(weatherData.wind.speed);
  const windDirection = convertDegreeToCompassPoint(weatherData.wind.deg);

  return (
    <>
      <h3>Weather in {city}</h3>
      <p>
        <strong>temperature: </strong>
        {temperature} Celsius
      </p>
      <img src={weahterIconUrl} alt="" />
      <p>
        <strong>wind: </strong>
        {windSpeed}km/h direction {windDirection}
      </p>
    </>
  );
};

export default WeatherData;
