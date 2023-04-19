import React from 'react';
import ForecastRow from './ForecastRow';
import { RootProps } from '../../Root';
import { Hourly } from '../../Root';

const Weather = ({
  windSpeedMeasurementUnit,
  temperatureMeasurementUnit,
  precipitationMeasurementUnit,
  hourlyForecasts,
  setWindSpeedMeasurementUnit,
  setTemperatureMeasurementUnit,
  setPrecipitationMeasurementUnit,
  getForecasts,
}: RootProps) => {
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

  // let counter = 0;
  // let hourlyIndex = 0;
  // for(let i = 0; i < 6; i++){
  //   let start = hourlyIndex;
  //   let forecastRow = []
  //   for(let i = start; i < start + 4; i++){
  //     hourlyIndex = i;
  //     forecastRow.push(hourlyForecasts[i]);
  //   }
  // }

  return (
    <div>
      {forecastRowArrays.forEach((weatherRow) => {
        <ForecastRow
          key={weatherRow[0].time}
          windSpeedMeasurementUnit={windSpeedMeasurementUnit}
          temperatureMeasurementUnit={temperatureMeasurementUnit}
          precipitationMeasurementUnit={precipitationMeasurementUnit}
          hourlyForecasts={hourlyForecasts}
          getForecasts={getForecasts}
        />;
      })}
      <ForecastRow
        windSpeedMeasurementUnit={windSpeedMeasurementUnit}
        temperatureMeasurementUnit={temperatureMeasurementUnit}
        precipitationMeasurementUnit={precipitationMeasurementUnit}
        hourlyForecasts={hourlyForecasts}
        getForecasts={getForecasts}
      />
    </div>
  );
};

export default Weather;
