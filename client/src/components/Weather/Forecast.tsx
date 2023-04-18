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

const Forecast = ({ forecastPropsObj }: PropsInterface) => {
  return (
    <div>
      <div>Weather Icon</div>
      <div>Current Weather Description</div>
      <div>Precipitation Chance (if any)</div>
      <div>Temperature</div>
      <div>Wind Chill/Heat Index</div>
      <div>Humidity</div>
    </div>
  );
};

export default Forecast;
