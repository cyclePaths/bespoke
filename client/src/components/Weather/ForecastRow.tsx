import React, { useState, useEffect } from 'react';
import Forecast from './Forecast';
import axios from 'axios';
import { RootProps } from '../../Root';

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weatherdescription: string;
  is_day: number | undefined;
  time: Date;
}

export interface MeasurementUnits {
  temperature: string;
  speed: string;
  precipitation: string;
  visibility: string;
  depth: string;
}

export interface Hourly {
  //May not need the "?"'s
  time?: Date;
  temperature?: number;
  humidity?: number;
  apparentTemperature?: number;
  cloudcover?: number;
  windspeed?: number;
  precipitation?: number;
  snowfall?: number;
  precipitationProbability?: number;
  rain?: number;
  showers?: number;
  weatherDescription?: string;
  snowDepth?: number;
  visibility?: number;
  isDay?: Boolean;
}

export interface ForecastProps extends RootProps {
  currentWeather: CurrentWeather;
  measurementUnits: MeasurementUnits;
  hourlyForecasts: Hourly[];
  setCurrentWeather: (unit: CurrentWeather) => void;
  setMeasurementUnits: (unit: MeasurementUnits) => void;
  setHourlyForecasts: (unit: Hourly[]) => void;
}

const ForecastRow = ({
  windSpeedMeasurementUnit,
  temperatureMeasurementUnit,
  precipitationMeasurementUnit,
  setWindSpeedMeasurementUnit,
  setTemperatureMeasurementUnit,
  setPrecipitationMeasurementUnit,
}: RootProps) => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>({
    temperature: 0,
    windspeed: 0,
    winddirection: 0,
    weatherdescription: '',
    is_day: undefined,
    time: new Date(),
  });
  const [measurementUnits, setMeasurementUnits] = useState<MeasurementUnits>({
    temperature: '',
    speed: '',
    precipitation: '',
    visibility: '',
    depth: '',
  });
  const [hourlyForecasts, setHourlyForecasts] = useState<Hourly[]>([]);

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

  const precipitationUnit = precipitationMeasurementUnit;
  const windSpeedUnit = windSpeedMeasurementUnit;
  const temperatureUnit = temperatureMeasurementUnit;
  const latitude = 30.0;
  const longitude = -90.17;
  const numDaysToForecast = 1;
  const getForecasts = () => {
    //axios request has been tested and is working; states are properly being set with objects containing the required values
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&forecast_days=${numDaysToForecast}&current_weather=true&temperature_unit=${temperatureUnit}&windspeed_unit=${windSpeedUnit}&precipitation_unit=${precipitationUnit}&hourly=temperature_2m&hourly=relativehumidity_2m&hourly=apparent_temperature&hourly=cloudcover&hourly=windspeed_10m&hourly=precipitation&hourly=snowfall&hourly=precipitation_probability&hourly=rain&hourly=showers&hourly=weathercode&hourly=snow_depth&hourly=visibility&hourly=is_day`
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
        let hourly = [
          //one object for each of the 24 hours in a day
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
          {
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
          },
        ];

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
        // console.log(
        //   'here is the Hourly array of objects after the loop runs: ',
        //   hourly
        // );
        setHourlyForecasts(hourly);
      })
      .catch((err) =>
        console.error('There was an error GETting the weather forecasts: ', err)
      );
  };

  // const forecastPropsObj: ForecastProps = {
  //   currentWeather: currentWeather,
  //   measurementUnits: measurementUnits,
  //   hourlyForecasts: hourlyForecasts,
  //   setCurrentWeather: setCurrentWeather,
  //   setMeasurementUnits: setMeasurementUnits,
  //   setHourlyForecasts: setHourlyForecasts,
  // };

  return (
    <div>
      <button onClick={getForecasts}>TEST</button>
      <Forecast
        currentWeather={currentWeather}
        measurementUnits={measurementUnits}
        hourlyForecasts={hourlyForecasts}
        setCurrentWeather={setCurrentWeather}
        setMeasurementUnits={setMeasurementUnits}
        setHourlyForecasts={setHourlyForecasts}
        windSpeedMeasurementUnit={windSpeedMeasurementUnit}
        temperatureMeasurementUnit={temperatureMeasurementUnit}
        precipitationMeasurementUnit={precipitationMeasurementUnit}
        setWindSpeedMeasurementUnit={setWindSpeedMeasurementUnit}
        setTemperatureMeasurementUnit={setTemperatureMeasurementUnit}
        setPrecipitationMeasurementUnit={setPrecipitationMeasurementUnit}
      ></Forecast>
    </div>
  );
};

export default ForecastRow;
