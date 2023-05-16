import React, { useState, useEffect } from 'react';
import { Hourly } from 'client/src/Root';
import {
  HourlyForecastWrapper,
  ForecastItem,
  ForecastHour,
  ForecastTemperature,
} from '../../StyledComp';

interface PropsToWeatherWidget {
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

  return (
    <HourlyForecastWrapper>
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
            <ForecastTemperature>{forecast.temperature}°C</ForecastTemperature>
          </ForecastItem>
        );
      })}
    </HourlyForecastWrapper>
  );
};

export default WeatherWidget;
