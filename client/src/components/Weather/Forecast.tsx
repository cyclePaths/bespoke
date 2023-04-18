import React from 'react';
import {
  CurrentWeather,
  MeasurementUnits,
  Hourly,
  ForecastProps,
} from './ForecastRow';

export interface PropsInterface {
  forecastPropsObj: ForecastProps;
}

const Forecast = ({
  currentWeather,
  measurementUnits,
  hourlyForecasts,
  setCurrentWeather,
  setMeasurementUnits,
  setHourlyForecasts,
}: ForecastProps) => {
  const clickTest = () => {
    console.log(currentWeather);
  };
  return (
    <div>
      <button onClick={clickTest}>PROPS TEST</button>
      <div>Weather Icon</div>
      <div>{currentWeather.weatherdescription}</div>
      <div>Precipitation Chance (if any)</div>
      <div>Temperature</div>
      <div>Wind Chill/Heat Index</div>
      <div>Humidity</div>
    </div>
  );
};

export default Forecast;
