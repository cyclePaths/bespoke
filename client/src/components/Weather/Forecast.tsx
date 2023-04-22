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
  sunriseHour: number;
  sunsetHour: number;
}

const Forecast = ({
  time,
  sunriseHour,
  sunsetHour,
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

  //setting weather icon
  const prepareWeatherIcon = (weather: string) => {
    //setting time of day
    let timeOfDay = 'generic';
    if (isDay === true) {
      timeOfDay = 'day';
    } else if (isDay === false) {
      timeOfDay = 'night';
    }
    let weatherIcon = weatherIcons.day.clear;
    if (weather === 'Clear Sky' || weather === 'Mainly Clear') {
      weatherIcon = weatherIcons[timeOfDay].clear;
    } else if (weather === 'Partly Cloudy') {
      weatherIcon = weatherIcons[timeOfDay].partlyCloudy.base;
    } else if (weather === 'Overcast') {
      weatherIcon = weatherIcons[timeOfDay].overcast;
    } else if (weather === 'Fog') {
      weatherIcon = weatherIcons[timeOfDay].fog;
    } else if (weather === 'Depositing Rime Fog') {
      weatherIcon = weatherIcons[timeOfDay].haze;
    } else if (
      weather === 'Light Drizzle' ||
      weather === 'Moderate Drizzle' ||
      weather === 'Dense Drizzle'
    ) {
      weatherIcon = weatherIcons[timeOfDay].drizzle;
    } else if (
      weather === 'Light Freezing Drizzle' ||
      weather === 'Dense Freezing Drizzle'
    ) {
      weatherIcon = weatherIcons[timeOfDay].sleet;
    } else if (
      weather === 'Light Rain' ||
      weather === 'Moderate Rain' ||
      weather === 'Heavy Rain' ||
      weather === 'Light Showers' ||
      weather === 'Moderate Showers' ||
      weather === 'Violent Showers'
    ) {
      weatherIcon = weatherIcons[timeOfDay].rain;
    } else if (
      weather === 'Moderate Snow' ||
      weather === 'Heavy Snow' ||
      weather === 'Snow Grains' ||
      weather === 'Light Snow Showers' ||
      weather === 'Heavy Snow Showers'
    ) {
      weatherIcon = weatherIcons[timeOfDay].snow;
    } else if (weather === 'Thunderstorm') {
      if (precipitationProbability >= 50) {
        if (rain > 0) {
          weatherIcon = weatherIcons[timeOfDay].thunderstorm.rain;
        } else if (snowfall > 0) {
          weatherIcon = weatherIcons[timeOfDay].thunderstorm.snow;
        }
      } else {
        weatherIcon = weatherIcons[timeOfDay].thunderstorm.base;
      }
    } else if (
      weather === 'Thunderstorm With Light Hail' ||
      weather === 'Thunderstorm With Heavy Hail'
    ) {
      weatherIcon = weatherIcons[timeOfDay].thunderstorm.snow;
    }
    //control for sunrise/sunset (these are almost certainly wrong - there's something off with the 'isDay' data from the weather API)
    const moonriseHour = sunsetHour + 1;
    const moonsetHour = sunriseHour - 1;
    const pertinentWeather = !(
      weather === 'Clear Sky' ||
      weather === 'Mainly Clear' ||
      weather === 'Fog' ||
      weather === 'Partly Cloudy'
    );
    if (hour === sunriseHour && !pertinentWeather) {
      weatherIcon = weatherIcons.day.sunrise;
    } else if (hour === sunsetHour && !pertinentWeather) {
      weatherIcon = weatherIcons.day.sunset;
    } else if (hour === moonriseHour && !pertinentWeather) {
      weatherIcon = weatherIcons.night.moonrise;
    } else if (hour === moonsetHour && !pertinentWeather) {
      weatherIcon = weatherIcons.night.moonset;
    }
    return weatherIcon;
  };

  let weatherIcon = prepareWeatherIcon(weatherDescription);

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
