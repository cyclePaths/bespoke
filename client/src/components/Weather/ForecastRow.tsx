import React, { useState, useEffect } from 'react';
import Forecast from './Forecast';
import axios from 'axios';
import { Hourly } from '../../Root';

interface forecastRowProps {
  windSpeedMeasurementUnit: string;
  temperatureMeasurementUnit: string;
  precipitationMeasurementUnit: string;
  rowData: Hourly[];
}

const ForecastRow = ({
  windSpeedMeasurementUnit,
  temperatureMeasurementUnit,
  precipitationMeasurementUnit,
  rowData,
}: forecastRowProps) => {
  // const forecastPropsObj: ForecastProps = {
  //   currentWeather: currentWeather,
  //   measurementUnits: measurementUnits,
  //   hourlyForecasts: hourlyForecasts,
  //   setCurrentWeather: setCurrentWeather,
  //   setMeasurementUnits: setMeasurementUnits,
  //   setHourlyForecasts: setHourlyForecasts,
  // };

  return (
    <div>
      {rowData.map((forecast, i) => {
        return (
          <Forecast
            key={i}
            time={forecast.time}
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
    </div>
  );
};

export default ForecastRow;
