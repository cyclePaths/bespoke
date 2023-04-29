import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'
import Navbar from './Navbar';
import { StopwatchTime } from '../Root';
import Stopwatch from './Stopwatch';

export interface AppProps {
  windSpeedMeasurementUnit: string;
  temperatureMeasurementUnit: string;
  precipitationMeasurementUnit: string;
  setWindSpeedMeasurementUnit: (unit: string) => void;
  setTemperatureMeasurementUnit: (unit: string) => void;
  setPrecipitationMeasurementUnit: (unit: string) => void;
}

//We will eventually use Link to allow us to create clickable routing
const App = () => {
  const [windSpeedMeasurementUnit, setWindSpeedMeasurementUnit] =
    useState('mph'); //should be either 'mph' or 'kmh',
  const [temperatureMeasurementUnit, setTemperatureMeasurementUnit] =
    useState('fahrenheit'); //should be either 'fahrenheit' or 'celsius'
  const [precipitationMeasurementUnit, setPrecipitationMeasurementUnit] =
    useState('inch'); //should be either 'mm' or 'inch'
  // const [stopwatchState, setStopwatchState] =
  // useState<StopwatchTime>({ hours: 0, minutes: 0, seconds: 0 });

  const appPropsObj: AppProps = {
    windSpeedMeasurementUnit: windSpeedMeasurementUnit,
    temperatureMeasurementUnit: temperatureMeasurementUnit,
    precipitationMeasurementUnit: precipitationMeasurementUnit,
    setWindSpeedMeasurementUnit: setWindSpeedMeasurementUnit,
    setTemperatureMeasurementUnit: setTemperatureMeasurementUnit,
    setPrecipitationMeasurementUnit: setPrecipitationMeasurementUnit,
  };

  return (
    <div>
      <div>
        <Navbar appPropsObj={appPropsObj} />
      </div>
      <div>
        {/* <Stopwatch stopwatchState={stopwatchState} setStopwatchState={setStopwatchState} /> */}
      </div>
    </div>
  );
};

export default App;
