import React from 'react';
import { Hourly } from '../../Root';
import {
  WeatherIcon,
  ForecastBit,
  ForecastText,
  ForecastHelperIcon,
} from '../../StyledComp';
import { weatherIcons } from '../../../assets';

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
    temperatureUnit = weatherIcons.misc.degreesFahrenheit;
  } else if (temperatureMeasurementUnit === 'celsius') {
    temperatureUnit = weatherIcons.misc.degreesCelsius;
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
      <ForecastBit>Weather Description: {weatherDescription}</ForecastBit>
      <ForecastBit>
        <ForecastText>
          Precipitation Chance: {precipitationProbability}
        </ForecastText>
        <ForecastHelperIcon src={weatherIcons.misc.humidity} />
      </ForecastBit>
      <ForecastBit>
        <ForecastText>Temperature: {temperature}</ForecastText>
        <ForecastHelperIcon src={temperatureUnit} />
      </ForecastBit>
      <ForecastBit>
        <ForecastText>Adj Temp: {apparentTemperature}</ForecastText>
        <ForecastHelperIcon src={temperatureUnit} />
      </ForecastBit>
      <ForecastBit>
        <ForecastText>Humidity: {humidity}</ForecastText>
        <ForecastHelperIcon src={weatherIcons.misc.humidity} />
      </ForecastBit>
    </div>
  );
};

export default Forecast;
