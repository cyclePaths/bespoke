import React from 'react';
import { Hourly } from '../../Root';
import { WeatherIcon } from '../../StyledComp';

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
  let temperatureUnit: string = '';
  let speedUnit: string = windSpeedMeasurementUnit;
  let precipitationUnit: string = '';
  let depthUnit: string = '';
  if (temperatureMeasurementUnit === 'fahrenheit') {
    temperatureUnit = '°F';
  } else if (temperatureMeasurementUnit === 'celsius') {
    temperatureUnit = '°C';
  }
  if (precipitationMeasurementUnit === 'mm') {
    depthUnit = 'cm';
    precipitationUnit = 'mm';
  } else if (precipitationMeasurementUnit === 'inch') {
    depthUnit = 'ft';
    precipitationUnit = 'in';
  }

  return (
    <div>
      <div>
        Weather Icon:
        <WeatherIcon src='https://basmilius.github.io/weather-icons/production/fill/all/clear-day.svg' />
      </div>
      <div>Weather Description: {weatherDescription}</div>
      <div>Precipitation Chance: {precipitationProbability}%</div>
      <div>Temperature: {temperature + temperatureUnit}</div>
      <div>
        Feels Like (Apparent Temperature):{' '}
        {apparentTemperature + temperatureUnit}
      </div>
      <div>Humidity: {humidity}%</div>
    </div>
  );
};

export default Forecast;
