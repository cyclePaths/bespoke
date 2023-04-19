import express from 'express';
import axios from 'axios';

export const WeatherRoute = express.Router();

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

WeatherRoute.get('/forecast', (req, res) => {
  const {
    precipitationUnit,
    windSpeedUnit,
    temperatureUnit,
    latitude,
    longitude,
    numDaysToForecast,
  } = req.query;
  console.log('forecast request received!');
  axios
    .get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&forecast_days=${numDaysToForecast}&current_weather=true&temperature_unit=${temperatureUnit}&windspeed_unit=${windSpeedUnit}&precipitation_unit=${precipitationUnit}&hourly=temperature_2m&hourly=relativehumidity_2m&hourly=apparent_temperature&hourly=cloudcover&hourly=windspeed_10m&hourly=precipitation&hourly=snowfall&hourly=precipitation_probability&hourly=rain&hourly=showers&hourly=weathercode&hourly=snow_depth&hourly=visibility&hourly=is_day`
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
      const measurementUnits = {
        temperature: data.hourly_units.temperature,
        speed: data.hourly_units.windspeed_10m,
        precipitation: data.hourly_units.precipitation,
        visibility: data.hourly_units.visibility,
        depth: data.hourly_units.snow_depth,
      };
      console.log(
        'Here is a Current Weather object from the data received via the GET request: ',
        {
          temperature: data.current_weather.temperature,
          windspeed: data.current_weather.windspeed,
          winddirection: data.current_weather.winddirection,
          weatherdescription: weatherCodes[data.current_weather.weathercode],
          is_day: data.current_weather.is_day,
          time: data.current_weather.time,
        }
      );
      console.log(
        'Here is a Measurement Units object from the data received via the GET request: ',
        {
          temperature: data.hourly_units.temperature,
          speed: data.hourly_units.windspeed_10m,
          precipitation: data.hourly_units.precipitation,
          visibility: data.hourly_units.visibility,
          depth: data.hourly_units.snow_depth,
        }
      );

      const hourly = new Array(24).fill(0).map(() => ({
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
      const responseObj = {
        currentWeather: currentWeather,
        measurementUnits: measurementUnits,
        hourly: hourly,
      };
      res.status(200).send(responseObj);
    })
    .catch((err) => {
      console.error('There was an error GETting the weather forecasts: ', err);
      res.sendStatus(500);
    });
});
