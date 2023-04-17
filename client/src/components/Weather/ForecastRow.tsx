import React, { useState, useEffect } from 'react';
import Forecast from './Forecast';
import axios from 'axios';

const ForecastRow = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [measurementUnits, setMeasurementUnits] = useState({});
  const [hourlyForecasts, setHourlyForecasts] = useState([]);

  const weatherCodes = {
    //these are what each of the weather codes mean; no codes should be missing even though there are gaps between numbers
    0: 'Clear Sky',
    1: 'Mainly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing Rime Fog',
    51: 'Light Drizzle',
    53: 'Moderate Drizzle',
    55: 'Dense Drizzle',
    56: 'Light Freezing Drizzle',
    57: 'Dense Freezing Drizzle',
    61: 'Light Rain',
    63: 'Moderate Rain',
    65: 'Heavy Rain',
    71: 'Light Snow',
    73: 'Moderate Snow',
    75: 'Heavy Snow',
    77: 'Snow Grains',
    80: 'Light Showers',
    81: 'Moderate Showers',
    82: 'Violent Showers',
    85: 'Light Snow Showers',
    86: 'Heavy Snow Showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm With Light Hail',
    99: 'Thunderstorm with Heavy Hail',
  };

  const getForecasts = () => {
    axios
      .get(
        'https://api.open-meteo.com/v1/forecast?latitude=30.00&longitude=-90.17&forecast_days=1&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&hourly=temperature_2m&hourly=relativehumidity_2m&hourly=apparent_temperature&hourly=cloudcover&hourly=windspeed_10m&hourly=precipitation&hourly=snowfall&hourly=precipitation_probability&hourly=rain&hourly=showers&hourly=weathercode&hourly=snow_depth&hourly=visibility&hourly=is_day'
      )
      .then(({ data }) => {
        // console.log(data.hourly.time[1].slice(11, 13));
        setCurrentWeather({
          temperature: data.current_weather.temperature,
          windspeed: data.current_weather.windspeed,
          winddirection: data.current_weather.winddirection,
          weatherdescription: weatherCodes[data.current_weather.weathercode],
          is_day: data.current_weather.is_day,
          time: data.current_weather.time,
        });
        setMeasurementUnits({
          temperature: data.hourly_units.temperature,
          speed: data.hourly_units.windspeed_10m,
          precipitation: data.hourly_units.precipitation,
          visibility: data.hourly_units.visibility,
          depth: data.hourly_units.snow_depth,
        });
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
