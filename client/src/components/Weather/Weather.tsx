import React from 'react';
import ForecastRow from './ForecastRow';
import { RootPropsToWeather } from '../../Root';
import { Hourly } from '../../Root';

const Weather = ({
  windSpeedMeasurementUnit,
  temperatureMeasurementUnit,
  precipitationMeasurementUnit,
  hourlyForecasts,
  prepareWeatherIcon,
  setWindSpeedMeasurementUnit,
  setTemperatureMeasurementUnit,
  setPrecipitationMeasurementUnit,
  getForecasts,
}: RootPropsToWeather) => {
  //need to break up hourly forecasts into chunks of 4 forecasts each for the ForecastRow to map through

  let forecastRowArrays: Hourly[][] = [];
  let forecastArray: Hourly[] = [];

  hourlyForecasts.forEach((ele: Hourly, i: number) => {
    if ((i + 1) % 4 === 0) {
      forecastArray.push(ele);
      forecastRowArrays.push(forecastArray);
      forecastArray = new Array();
    } else {
      forecastArray.push(ele);
    }
  });
  forecastRowArrays.push(forecastArray);

  return (
    <div>
      {forecastRowArrays.map((weatherRow, i) => {
        return (
          <ForecastRow
            key={i}
            windSpeedMeasurementUnit={windSpeedMeasurementUnit}
            temperatureMeasurementUnit={temperatureMeasurementUnit}
            precipitationMeasurementUnit={precipitationMeasurementUnit}
            prepareWeatherIcon={prepareWeatherIcon}
            rowData={weatherRow}
          />
        );
      })}
    </div>
  );
};

export default Weather;
