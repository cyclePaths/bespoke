import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'
import Navbar from './Navbar';

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
    </div>
  );
};

export default App;
