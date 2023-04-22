import React from 'react';
import ForecastRow from './ForecastRow';
import { RootPropsToWeather } from '../../Root';
import { Hourly } from '../../Root';

const Weather = ({
  windSpeedMeasurementUnit,
  temperatureMeasurementUnit,
  precipitationMeasurementUnit,
  sunriseHour,
  sunsetHour,
  hourlyForecasts,
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

  const clickTest = () => {
    console.log('this is the sunrise hour: ', sunriseHour);
    console.log('this is the sunset hour: ', sunsetHour);
  };

  return (
    <div>
      <button onClick={clickTest}>Sunrise and Sunset times</button>
      {forecastRowArrays.map((weatherRow, i) => {
        return (
          <ForecastRow
            key={i}
            windSpeedMeasurementUnit={windSpeedMeasurementUnit}
            temperatureMeasurementUnit={temperatureMeasurementUnit}
            precipitationMeasurementUnit={precipitationMeasurementUnit}
            sunriseHour={sunriseHour}
            sunsetHour={sunsetHour}
            rowData={weatherRow}
          />
        );
      })}
    </div>
  );
};

export default Weather;
