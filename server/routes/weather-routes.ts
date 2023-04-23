import express from 'express';
import axios from 'axios';
import { weatherCodes } from '../server-assets';

export const WeatherRoute = express.Router();

WeatherRoute.get('/forecast', (req, res) => {
  const {
    precipitationUnit,
    windSpeedUnit,
    temperatureUnit,
    latitude,
    longitude,
    numDaysToForecast,
  } = req.query;
  //first request, done exclusively to get timezone
  axios
    //note can add '&daily=sunrise&daily=sunset' to endpoint so that sunrise/set and moonrise/set icons can be used, but need timezone to get these; can have user set and then add in to endpoint with '&timezone=<timezone>'
    .get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&daily=sunrise&daily=sunset&forecast_days=${numDaysToForecast}&current_weather=true&temperature_unit=${temperatureUnit}&windspeed_unit=${windSpeedUnit}&precipitation_unit=${precipitationUnit}&hourly=temperature_2m&hourly=relativehumidity_2m&hourly=apparent_temperature&hourly=cloudcover&hourly=windspeed_10m&hourly=precipitation&hourly=snowfall&hourly=precipitation_probability&hourly=rain&hourly=showers&hourly=weathercode&hourly=snow_depth&hourly=visibility&hourly=is_day`
    )
    .then(({ data }) => {
      // console.log(data.hourly.time[1].slice(11, 13));
      const currentWeather = {
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
        winddirection: data.current_weather.winddirection,
        weatherdescription: weatherCodes[data.current_weather.weathercode],
        is_day: data.current_weather.is_day,
        time: data.current_weather.time,
      };
      const hourly = new Array(24).fill(0).map(() => ({
        displayIcon: true,
        time: new Date(),
        temperature: 0,
        humidity: 0,
        apparentTemperature: 0,
        cloudcover: 0,
        windspeed: 0,
        precipitation: 0,
        snowfall: 0,
        precipitationProbability: 0,
        rain: 0,
        showers: 0,
        weatherDescription: '',
        snowDepth: 0,
        visibility: 0,
        isDay: true,
      }));

      for (let key in data.hourly) {
        data.hourly[key].forEach((ele, i) => {
          if (key === 'temperature_2m') {
            hourly[i].temperature = ele;
          } else if (key === 'relativehumidity_2m') {
            hourly[i].humidity = ele;
          } else if (key === 'apparent_temperature') {
            hourly[i].apparentTemperature = ele;
          } else if (key === 'windspeed_10m') {
            hourly[i].windspeed = ele;
          } else if (key === 'precipitation_probability') {
            hourly[i].precipitationProbability = ele;
          } else if (key === 'weathercode') {
            hourly[i].weatherDescription = weatherCodes[ele];
          } else if (key === 'snow_depth') {
            hourly[i].snowDepth = weatherCodes[ele];
          } else if (key === 'is_day') {
            if (ele === 1) {
              hourly[i].isDay = true;
            } else {
              hourly[i].isDay = false;
            }
          } else {
            //covers these keys: time, cloudcover, precipitation, snowfall, rain, showers, visibility
            hourly[i][key] = ele;
          }
        });
      }
      let sunriseHour = new Date(data.daily.sunrise[0]).getHours();
      let sunsetHour = new Date(data.daily.sunset[0]).getHours();
      const responseObj = {
        currentWeather: currentWeather,
        hourly: hourly,
        sunriseHour: sunriseHour,
        sunsetHour: sunsetHour,
      };
      res.status(200).send(responseObj);
    })
    .catch((err) => {
      console.error('There was an error GETting the weather forecasts: ', err);
      res.sendStatus(500);
    });
});
