import React, { useState, useEffect } from 'react';
import { Hourly } from 'client/src/Root';
import {
  WeatherIcon,
  WeatherWidgetWrapper,
  ForecastItem,
  ForecastHour,
  ForecastTemperature,
} from '../../StyledComp';
import { weatherIcons } from '../../../assets';

interface PropsToWeatherWidget {
  temperatureMeasurementUnit: string;
  hourlyForecasts: Hourly[];
  prepareWeatherIcon: (
    weather: string,
    isDay: boolean,
    hour: number,
    chanceOfRain: number,
    rainfall: number,
    snowfall: number
  ) => string;
}

const WeatherWidget = ({
  temperatureMeasurementUnit,
  prepareWeatherIcon,
  hourlyForecasts,
}: PropsToWeatherWidget) => {
  const setHour = (hr) => {
    if (hr === 0) {
      return '12AM';
    } else if (hr === 12) {
      return '12PM';
    } else if (hr > 0 && hr < 12) {
      return hr.toString() + 'AM';
    } else if (hr > 12) {
      return (hr - 12).toString() + 'PM';
    }
  };

  let temperatureUnit = '°F';

  if (temperatureMeasurementUnit === 'celsius') {
    temperatureUnit = '°C';
  }
  return (
    <WeatherWidgetWrapper>
      {hourlyForecasts.map((forecast, i) => {
        let dateObj = new Date(forecast.time);
        const hour = dateObj.getHours();
        return (
          <ForecastItem key={i}>
            <img
              src={prepareWeatherIcon(
                forecast.weatherDescription,
                forecast.isDay,
                hour,
                forecast.precipitationProbability,
                forecast.rain,
                forecast.snowfall
              )}
              alt='Weather Icon'
            />
            <ForecastHour>{setHour(hour)}</ForecastHour>
            <ForecastTemperature>
              {forecast.temperature}
              {temperatureUnit}
            </ForecastTemperature>
          </ForecastItem>
        );
      })}
    </WeatherWidgetWrapper>
  );
};

export default WeatherWidget;

// can use this for the Faren/Celsius icon but need to style it:             <WeatherIcon src={temperatureUnit}></WeatherIcon>
