import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './components/App';
import Home from './components/Home';
import BulletinBoard from './components/BulletinBoard/BulletinBoard';
import Weather from './components/Weather/Weather';
import Profile from './components/Profile/Profile';
import CreateReport from './components/Reports/CreateReport';

export interface RootProps {
  windSpeedMeasurementUnit: string;
  temperatureMeasurementUnit: string;
  precipitationMeasurementUnit: string;
  setWindSpeedMeasurementUnit: (unit: string) => void;
  setTemperatureMeasurementUnit: (unit: string) => void;
  setPrecipitationMeasurementUnit: (unit: string) => void;
}

const Root = () => {
  const [windSpeedMeasurementUnit, setWindSpeedMeasurementUnit] =
    useState<string>('mph'); //should be either 'mph' or 'kmh',
  const [temperatureMeasurementUnit, setTemperatureMeasurementUnit] =
    useState<string>('fahrenheit'); //should be either 'fahrenheit' or 'celsius'
  const [precipitationMeasurementUnit, setPrecipitationMeasurementUnit] =
    useState<string>('inch'); //should be either 'mm' or 'inch'

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='/home' element={<Home />} />
            <Route path='bulletinBoard' element={<BulletinBoard />} />
            <Route
              path='weather'
              element={
                <Weather
                  windSpeedMeasurementUnit={windSpeedMeasurementUnit}
                  temperatureMeasurementUnit={temperatureMeasurementUnit}
                  precipitationMeasurementUnit={precipitationMeasurementUnit}
                  setWindSpeedMeasurementUnit={setWindSpeedMeasurementUnit}
                  setTemperatureMeasurementUnit={setTemperatureMeasurementUnit}
                  setPrecipitationMeasurementUnit={
                    setPrecipitationMeasurementUnit
                  }
                />
              }
            />
            <Route path='profile' element={<Profile />} />
            <Route path='createReport' element={<CreateReport />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Root;
