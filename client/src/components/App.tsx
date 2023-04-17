import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'
import Navbar from './Navbar';

//We will eventually use Link to allow us to create clickable routing
const App = () => {
  const [windSpeedMeasurementUnit, setWindSpeedMeasurementUnit] =
    useState('mph'); //should be either 'mph' or 'kmh',
  const [temperatureMeasurementUnit, setTemperatureMeasurementUnit] =
    useState('fahrenheit'); //should be either 'fahrenheit' or 'celsius'
  const [precipitationMeasurementUnit, setPrecipitationMeasurementUnit] =
    useState('inch'); //should be either 'mm' or 'inch'

  return (
    <div>
      <div>
        <Navbar />
      </div>
    </div>
  );
};

export default App;
