import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import App from './components/App';
import Home from './components/Home';
import BulletinBoard from './components/BulletinBoard/BulletinBoard';
import Weather from './components/Weather/Weather';
import Profile from './components/Profile/Profile';
import CreateReport from './components/Reports/CreateReport';
import RouteM from './components/BikeRoutes/RouteM';
import Stopwatch from './components/Stopwatch';

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weatherdescription: string;
  is_day: number | undefined;
  time: Date;
}

export interface MeasurementUnits {
  temperature: string;
  speed: string;
  precipitation: string;
  visibility: string;
  depth: string;
}

export interface Hourly {
  //May not need the "?"'s
  time?: Date;
  temperature?: number;
  humidity?: number;
  apparentTemperature?: number;
  cloudcover?: number;
  windspeed?: number;
  precipitation?: number;
  snowfall?: number;
  precipitationProbability?: number;
  rain?: number;
  showers?: number;
  weatherDescription?: string;
  snowDepth?: number;
  visibility?: number;
  isDay?: Boolean;
}

// export interface ForecastProps extends RootProps {
//   currentWeather?: CurrentWeather;
//   hourlyForecasts: Hourly[];
//   setCurrentWeather?: (unit: CurrentWeather) => void;
//   setHourlyForecasts?: (unit: Hourly[]) => void;
// }

export interface RootProps {
  windSpeedMeasurementUnit: string;
  temperatureMeasurementUnit: string;
  precipitationMeasurementUnit: string;
  hourlyForecasts: Hourly[];
  setHourlyForecasts?: (unit: Hourly[]) => void;
  setWindSpeedMeasurementUnit?: (unit: string) => void;
  setTemperatureMeasurementUnit?: (unit: string) => void;
  setPrecipitationMeasurementUnit?: (unit: string) => void;
  getForecasts?: () => void;
}
export interface StopwatchTime {
  hours: number;
  minutes: number;
  seconds: number;
}

const Root = () => {
  const [windSpeedMeasurementUnit, setWindSpeedMeasurementUnit] =
    useState<string>('mph'); //should be either 'mph' or 'kmh',
  const [temperatureMeasurementUnit, setTemperatureMeasurementUnit] =
    useState<string>('fahrenheit'); //should be either 'fahrenheit' or 'celsius'
  const [precipitationMeasurementUnit, setPrecipitationMeasurementUnit] =
    useState<string>('inch'); //should be either 'mm' or 'inch'
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>({
    temperature: 0,
    windspeed: 0,
    winddirection: 0,
    weatherdescription: '',
    is_day: undefined,
    time: new Date(),
  }); //note: currentWeather is only going to be used on the home screen - everything else will just use the hourly breakdown

  const [hourlyForecasts, setHourlyForecasts] = useState<Hourly[]>([]);

  // const weatherCodes = {
  //   //these are what each of the weather codes mean; no codes should be missing even though there are gaps between numbers
  //   0: 'Clear Sky',
  //   1: 'Mainly Clear',
  //   2: 'Partly Cloudy',
  //   3: 'Overcast',
  //   45: 'Fog',
  //   48: 'Depositing Rime Fog',
  //   51: 'Light Drizzle',
  //   53: 'Moderate Drizzle',
  //   55: 'Dense Drizzle',
  //   56: 'Light Freezing Drizzle',
  //   57: 'Dense Freezing Drizzle',
  //   61: 'Light Rain',
  //   63: 'Moderate Rain',
  //   65: 'Heavy Rain',
  //   71: 'Light Snow',
  //   73: 'Moderate Snow',
  //   75: 'Heavy Snow',
  //   77: 'Snow Grains',
  //   80: 'Light Showers',
  //   81: 'Moderate Showers',
  //   82: 'Violent Showers',
  //   85: 'Light Snow Showers',
  //   86: 'Heavy Snow Showers',
  //   95: 'Thunderstorm',
  //   96: 'Thunderstorm With Light Hail',
  //   99: 'Thunderstorm with Heavy Hail',
  // };

  const latitude = 30.0; //will need to be able to update lat/long according to inputted location
  const longitude = -90.17;
  const numDaysToForecast = 1; //this is for if we implement a weekly weather report
  const getForecasts = () => {
    //axios request has been tested and is working; states are properly being set with objects containing the required values
    axios
      .get('/weather/forecast', {
        params: {
          precipitationUnit: precipitationMeasurementUnit,
          windSpeedUnit: windSpeedMeasurementUnit,
          temperatureUnit: temperatureMeasurementUnit,
          latitude: latitude,
          longitude: longitude,
          numDaysToForecast: numDaysToForecast,
        },
      })
      .then(({ data }) => {
        setCurrentWeather(data.currentWeather);
        setHourlyForecasts(data.hourly);
      })
      .catch((err) =>
        console.error(
          'an error occured with clientside GET request for forecasts: ',
          err
        )
      );
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='/home' element={<Home />} />
            <Route path='bulletinBoard' element={<BulletinBoard />} />
            <Route path='routes' element={<RouteM />} />
            <Route
              path='weather'
              element={
                <Weather
                  windSpeedMeasurementUnit={windSpeedMeasurementUnit}
                  temperatureMeasurementUnit={temperatureMeasurementUnit}
                  precipitationMeasurementUnit={precipitationMeasurementUnit}
                  hourlyForecasts={hourlyForecasts}
                  setWindSpeedMeasurementUnit={setWindSpeedMeasurementUnit}
                  setTemperatureMeasurementUnit={setTemperatureMeasurementUnit}
                  setPrecipitationMeasurementUnit={
                    setPrecipitationMeasurementUnit
                  }
                  getForecasts={getForecasts}
                />
              }
            />
            <Route path='profile' element={<Profile />} />
            <Route path='createReport' element={<CreateReport />} />
            <Route path='stopwatch' element={<Stopwatch />} />
          </Route>
        </Routes>
        <Stopwatch />
      </BrowserRouter>
    </div>
  );
};

export default Root;
