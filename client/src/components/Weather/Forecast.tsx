import React from 'react';
import { Hourly } from '../../Root';

interface ForecastProps extends Hourly {
  windSpeedMeasurementUnit: string;
  temperatureMeasurementUnit: string;
  precipitationMeasurementUnit: string;
}

const Forecast = ({
  time,
  temperature,
  humidity,
  apparentTemperature,
  cloudcover,
  windspeed,
  precipitation,
  snowfall,
  precipitationProbability,
  rain,
  showers,
  weatherDescription,
  snowDepth,
  visibility,
  isDay,
  windSpeedMeasurementUnit,
  temperatureMeasurementUnit,
  precipitationMeasurementUnit,
}: ForecastProps) => {
  const clickTest = () => {};
  return (
    <div>
      <button onClick={clickTest}>PROPS TEST</button>
      <div>Weather Icon</div>
      <div>Weather Description: {weatherDescription}</div>
      <div>
        Precipitation Chance:{' '}
        {precipitationProbability + precipitationMeasurementUnit}
      </div>
      <div>Temperature: {temperature + temperatureMeasurementUnit}</div>
      <div>
        Feels Like (Apparent Temperature):{' '}
        {apparentTemperature + temperatureMeasurementUnit}
      </div>
      <div>Humidity: {humidity}%</div>
    </div>
  );
};

export default Forecast;
