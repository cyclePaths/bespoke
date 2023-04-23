import React from 'react';
import { Hourly } from '../../Root';
import {
  WeatherIcon,
  ForecastBit,
  ForecastText,
  ForecastHelperIcon,
  ForecastEntry,
} from '../../StyledComp';
import { weatherIcons } from '../../../assets';

interface ForecastProps extends Hourly {
  windSpeedMeasurementUnit: string;
  temperatureMeasurementUnit: string;
  precipitationMeasurementUnit: string;
  prepareWeatherIcon: (
    weather: string,
    isDay: boolean,
    hour: number,
    chanceOfRain: number,
    rainfall: number,
    snowfall: number
  ) => string;
}

const Forecast = ({
  displayIcon,
  time,
  prepareWeatherIcon,
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
  //setting measurement units for temperature/depth/precipitation amount to user selected ones
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

  //display the time as <hour>:00<AM or PM>
  let dateObj = new Date(time);
  const hour = dateObj.getHours();
  let displayTime = '';
  if (hour === 0) {
    displayTime = '12:00AM';
  } else if (hour === 12) {
    displayTime = '12:00PM';
  } else if (hour > 0 && hour < 12) {
    displayTime = hour.toString() + ':00AM';
  } else if (hour > 12) {
    displayTime = (hour - 12).toString() + ':00PM';
  }

  let weatherIcon = prepareWeatherIcon(
    weatherDescription,
    isDay,
    hour,
    precipitationProbability,
    rain,
    snowfall
  );

  return (
    <ForecastEntry>
      <div>
        <WeatherIcon src={weatherIcon} />
      </div>
      <ForecastText>Time: {displayTime}</ForecastText>
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
    </ForecastEntry>
  );
};

export default Forecast;
