import React, { useState, useEffect } from 'react';
import Forecast from './Forecast';
import axios from 'axios';
import { RootProps } from '../../Root';



const ForecastRow = ({
  windSpeedMeasurementUnit,
  temperatureMeasurementUnit,
  precipitationMeasurementUnit,
}: RootProps) => {


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
      <button onClick={getForecasts}>TEST</button>
      <Forecast
        currentWeather={currentWeather}
        measurementUnits={measurementUnits}
        hourlyForecasts={hourlyForecasts}
        windSpeedMeasurementUnit={windSpeedMeasurementUnit}
        temperatureMeasurementUnit={temperatureMeasurementUnit}
        precipitationMeasurementUnit={precipitationMeasurementUnit}
      ></Forecast>
    </div>
  );
};

export default ForecastRow;
