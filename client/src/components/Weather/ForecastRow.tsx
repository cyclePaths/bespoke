import React, { useState, useEffect } from 'react';
import Forecast from './Forecast';
import axios from 'axios';

const ForecastRow = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecasts, setHourlyForecasts] = useState([]);

  const getForecasts = () => {
    axios
      .get(
        'https://api.open-meteo.com/v1/forecast?latitude=30.00&longitude=-90.17&forecast_days=1&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&hourly=temperature_2m&hourly=relativehumidity_2m&hourly=apparent_temperature&hourly=cloudcover&hourly=windspeed_10m&hourly=precipitation&hourly=snowfall&hourly=precipitation_probability&hourly=rain&hourly=showers&hourly=weathercode&hourly=snow_depth&hourly=visibility&hourly=is_day'
      )
      .then(({ data }) => {
        // console.log(data.hourly.time[1].slice(11, 13));
        setCurrentWeather(data.current_weather);
        let hourly = [
          //one object for each of the 24 hours in a day
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
        ];
        for (let key in data.hourly) {
          data.hourly[key].forEach((ele, i) => {
            //add key/value pairs to hourly[i] based on key
          });
        }
        setHourlyForecasts(hourly);
      })
      .catch((err) =>
        console.error('There was an error GETting the weather forecasts: ', err)
      );
  };

  return (
    <div>
      <button onClick={getForecasts}>TEST</button>
      <Forecast></Forecast>
    </div>
  );
};

export default ForecastRow;
