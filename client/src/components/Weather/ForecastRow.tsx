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
      .get('/weather/forecast', {
        params: {
          precipitationUnit: precipitationUnit,
          windSpeedUnit: windSpeedUnit,
          temperatureUnit: temperatureUnit,
          latitude: latitude,
          longitude: longitude,
          numDaysToForecast: numDaysToForecast,
        },
      })
      .then(({ data }) => {
        setCurrentWeather(data.currentWeather);
        setMeasurementUnits(data.measurementUnits);
        setHourlyForecasts(data.hourly);
      })
      .catch((err) =>
        console.error(
          'an error occured with clientside GET request for forecasts: ',
          err
        )
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
