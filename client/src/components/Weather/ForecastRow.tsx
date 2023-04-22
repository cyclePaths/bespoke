import React, { useState, useEffect } from 'react';
import Forecast from './Forecast';
import { Hourly } from '../../Root';
import { ForecastRowContainer } from '../../StyledComp';

interface forecastRowProps {
  windSpeedMeasurementUnit: string;
  temperatureMeasurementUnit: string;
  precipitationMeasurementUnit: string;
  sunriseHour: number;
  sunsetHour: number;
  rowData: Hourly[];
}

const ForecastRow = ({
  windSpeedMeasurementUnit,
  temperatureMeasurementUnit,
  precipitationMeasurementUnit,
  sunriseHour,
  sunsetHour,
  rowData,
}: forecastRowProps) => {
  return (
    <ForecastRowContainer>
      <ForecastRowContainer>
        {rowData.slice(0, 2).map((forecast, i) => {
          return (
            <Forecast
              key={i}
              time={forecast.time}
              sunriseHour={sunriseHour}
              sunsetHour={sunsetHour}
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
              time={forecast.time}
              sunriseHour={sunriseHour}
              sunsetHour={sunsetHour}
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
