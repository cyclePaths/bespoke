import React, { useContext } from 'react';
import { Hourly, UserContext } from '../../Root';
import {
  WeatherIcon,
  WeatherIconFrame,
  ForecastBit,
  ForecastStatsBox,
  WeatherDescription,
  ForecastText,
  ForecastTime,
  MainTemperature,
  MainTemperatureFrame,
  MainTemperatureText,
  AdjustedTemperature,
  AdjustedTemperatureText,
  AdjustedTemperatureHelperIcon,
  ForecastHelperIcon,
  ConditionalHelperIcon,
  BigTemperatureHelperIcon,
  ForecastEntry,
} from '../../StyledComp';
import { weatherIcons } from '../../../assets';

interface ForecastProps extends Hourly {
  windSpeedMeasurementUnit: string;
  temperatureMeasurementUnit: string;
  precipitationMeasurementUnit: string;
  sunriseHour: number;
  sunsetHour: number;
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
  sunriseHour,
  sunsetHour,
}: ForecastProps) => {
  const { isDark } = useContext(UserContext);
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
    displayTime = '12AM';
  } else if (hour === 12) {
    displayTime = '12PM';
  } else if (hour > 0 && hour < 12) {
    displayTime = hour.toString() + 'AM';
  } else if (hour > 12) {
    displayTime = (hour - 12).toString() + 'PM';
  }

  let weatherIcon = prepareWeatherIcon(
    weatherDescription,
    isDay,
    hour,
    precipitationProbability,
    rain,
    snowfall
  );

  //sets conditional icon for sunrise, sunset, etc.
  const displayConditionalIcon = () => {
    if (hour === sunriseHour) {
      return (
        <ConditionalHelperIcon
          src={weatherIcons.day.sunrise}
        ></ConditionalHelperIcon>
      );
    } else if (hour === sunsetHour) {
      return (
        <ConditionalHelperIcon
          src={weatherIcons.day.sunset}
        ></ConditionalHelperIcon>
      );
    } else if (hour === sunsetHour + 1) {
      return (
        <ConditionalHelperIcon
          src={weatherIcons.night.moonrise}
        ></ConditionalHelperIcon>
      );
    } else if (hour === sunriseHour - 1) {
      return (
        <ConditionalHelperIcon
          src={weatherIcons.night.moonset}
        ></ConditionalHelperIcon>
      );
    }
  };

  return (
    <ForecastEntry isDark={isDark}>
      <ForecastBit>
        <WeatherIconFrame isDark={isDark}>
          <WeatherIcon src={weatherIcon} />
        </WeatherIconFrame>
        <ForecastTime>{displayTime}</ForecastTime>
      </ForecastBit>
      <ForecastBit>
        <MainTemperatureFrame isDark={isDark}>
          <MainTemperature>
            <MainTemperatureText>
              <strong>{Math.round(temperature)}</strong>
            </MainTemperatureText>
            <BigTemperatureHelperIcon src={temperatureUnit} />
          </MainTemperature>
        </MainTemperatureFrame>
      </ForecastBit>
      <AdjustedTemperature>
        {displayConditionalIcon()}
        <AdjustedTemperature>
          <AdjustedTemperatureText>
            <strong>{Math.round(apparentTemperature)}</strong>
          </AdjustedTemperatureText>
        </AdjustedTemperature>
        <AdjustedTemperatureHelperIcon src={temperatureUnit} />
      </AdjustedTemperature>
      <WeatherDescription>{weatherDescription}</WeatherDescription>
      <ForecastStatsBox isDark={isDark}>
        <ForecastBit>
          <ForecastText>Precipitation: {precipitationProbability}</ForecastText>
          <ForecastHelperIcon src={weatherIcons.misc.humidity} />
        </ForecastBit>
        <ForecastBit>
          <ForecastText>Humidity: {humidity}</ForecastText>
          <ForecastHelperIcon src={weatherIcons.misc.humidity} />
        </ForecastBit>
      </ForecastStatsBox>
    </ForecastEntry>
  );
};

export default Forecast;
