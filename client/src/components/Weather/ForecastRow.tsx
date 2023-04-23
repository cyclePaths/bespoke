import React, { useState, useEffect } from 'react';
import Forecast from './Forecast';
import { Hourly } from '../../Root';
import { ForecastRowContainer } from '../../StyledComp';

interface forecastRowProps {
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
  rowData: Hourly[];
}

const ForecastRow = ({
  windSpeedMeasurementUnit,
  temperatureMeasurementUnit,
  precipitationMeasurementUnit,
  prepareWeatherIcon,
  rowData,
}: forecastRowProps) => {
  return (
    <ForecastRowContainer>
      <ForecastRowContainer>
        {rowData.slice(0, 2).map((forecast, i) => {
          return (
            <Forecast
              key={i}
              displayIcon={forecast.displayIcon}
              time={forecast.time}
              prepareWeatherIcon={prepareWeatherIcon}
              temperature={forecast.temperature}
              humidity={forecast.humidity}
              apparentTemperature={forecast.apparentTemperature}
              cloudcover={forecast.cloudcover}
              windspeed={forecast.windspeed}
              precipitation={forecast.precipitation}
              snowfall={forecast.snowfall}
              precipitationProbability={forecast.precipitationProbability}
              rain={forecast.rain}
              showers={forecast.showers}
              weatherDescription={forecast.weatherDescription}
              snowDepth={forecast.snowDepth}
              visibility={forecast.visibility}
              isDay={forecast.isDay}
              windSpeedMeasurementUnit={windSpeedMeasurementUnit}
              temperatureMeasurementUnit={temperatureMeasurementUnit}
              precipitationMeasurementUnit={precipitationMeasurementUnit}
            ></Forecast>
          );
        })}
      </ForecastRowContainer>
      <ForecastRowContainer>
        {rowData.slice(2).map((forecast, i) => {
          return (
            <Forecast
              key={i}
              displayIcon={forecast.displayIcon}
              time={forecast.time}
              prepareWeatherIcon={prepareWeatherIcon}
              temperature={forecast.temperature}
              humidity={forecast.humidity}
              apparentTemperature={forecast.apparentTemperature}
              cloudcover={forecast.cloudcover}
              windspeed={forecast.windspeed}
              precipitation={forecast.precipitation}
              snowfall={forecast.snowfall}
              precipitationProbability={forecast.precipitationProbability}
              rain={forecast.rain}
              showers={forecast.showers}
              weatherDescription={forecast.weatherDescription}
              snowDepth={forecast.snowDepth}
              visibility={forecast.visibility}
              isDay={forecast.isDay}
              windSpeedMeasurementUnit={windSpeedMeasurementUnit}
              temperatureMeasurementUnit={temperatureMeasurementUnit}
              precipitationMeasurementUnit={precipitationMeasurementUnit}
            ></Forecast>
          );
        })}
      </ForecastRowContainer>
    </ForecastRowContainer>
  );
};

export default ForecastRow;
