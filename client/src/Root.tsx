import React, { useState, useContext, useEffect, createContext } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { weatherIcons } from '../assets';
import App from './components/App';
import Home from './components/Home';
import BulletinBoard from './components/BulletinBoard/BulletinBoard';
import Weather from './components/Weather/Weather';
import Profile from './components/Profile/Profile';
import CreateReport from './components/Reports/CreateReport';
import Stopwatch from './components/Stopwatch';
import RouteM from './components/BikeRoutes/RouteM';
import Reports from './components/Reports/Reports';
import ReportsMap from './components/Reports/ReportsMap';

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
  displayIcon: boolean;
  time: Date;
  temperature: number;
  humidity: number;
  apparentTemperature: number;
  cloudcover: number;
  windspeed: number;
  precipitation: number;
  snowfall: number;
  precipitationProbability: number;
  rain: number;
  showers: number;
  weatherDescription: string;
  snowDepth: number;
  visibility: number;
  isDay: boolean;
}

export interface RootPropsToWeather {
  windSpeedMeasurementUnit: string;
  temperatureMeasurementUnit: string;
  precipitationMeasurementUnit: string;
  sunriseHour: number;
  sunsetHour: number;
  hourlyForecasts: Hourly[];
  prepareWeatherIcon: (
    weather: string,
    isDay: boolean,
    hour: number,
    chanceOfRain: number,
    rainfall: number,
    snowfall: number
  ) => string;
  setHourlyForecasts?: (unit: Hourly[]) => void;
  setWindSpeedMeasurementUnit?: (unit: string) => void;
  setTemperatureMeasurementUnit?: (unit: string) => void;
  setPrecipitationMeasurementUnit?: (unit: string) => void;
  getForecasts?: () => void;
}

export interface RootPropsToHome {
  homeForecasts: Hourly[];
  windSpeedMeasurementUnit: string;
  temperatureMeasurementUnit: string;
  precipitationMeasurementUnit: string;
  prepareWeatherIcon: (
    weather: string,
    isDay: boolean,
    hour: number,
    chanceOfRain: number,
    rainfall: number,
    snowfall: number
  ) => string;
}
export interface StopwatchTime {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface StopwatchStatsProps {
  stopwatchActivity: string;
  stopwatchDuration: number;
  stopwatchCalories: number;
}

export interface User {
  email?: string;
  id?: number;
  name?: string;
  thumbnail?: any;
  weight?: any;
  homeAddress?: string;
  location_lat: number;
  location_lng: number;
}

export interface geoLocation {
  lat: number;
  lng: number;
}

export const UserContext = createContext<any>(Object());

const Root = () => {
  // Created User Info and Geolocation for context //
  const [user, setUser] = useState<any>();
  const [geoLocation, setGeoLocation] = useState<any>();
  const [error, setError] = useState<string | undefined>(undefined);

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
  const [sunriseHour, setSunriseHour] = useState<number>(0);
  const [sunsetHour, setSunsetHour] = useState<number>(0);
  //coordinates for Marcus: latitude = 30.0; longitude = -90.17;
  const numDaysToForecast: number = 1; //this is for if we implement a weekly weather report
  const getForecasts = () => {
    //axios request has been tested and is working; states are properly being set with objects containing the required values
    axios
      .get('/weather/forecast', {
        params: {
          precipitationUnit: precipitationMeasurementUnit,
          windSpeedUnit: windSpeedMeasurementUnit,
          temperatureUnit: temperatureMeasurementUnit,
          latitude: geoLocation.lat,
          longitude: geoLocation.lng,
          numDaysToForecast: numDaysToForecast,
        },
      })
      .then(({ data }) => {
        setSunriseHour(data.sunriseHour);
        setSunsetHour(data.sunsetHour);
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

  const prepareWeatherIcon = (
    weather: string,
    isDay: boolean,
    hour: number,
    chanceOfRain: number,
    rainfall: number,
    snowfall: number
  ) => {
    //setting time of day
    let timeOfDay = 'generic';
    if (isDay === true) {
      timeOfDay = 'day';
    } else if (isDay === false) {
      timeOfDay = 'night';
    }
    //setting weather icon
    let weatherIcon = weatherIcons.day.clear;
    if (weather === 'Clear Sky' || weather === 'Mainly Clear') {
      weatherIcon = weatherIcons[timeOfDay].clear;
    } else if (weather === 'Partly Cloudy') {
      weatherIcon = weatherIcons[timeOfDay].partlyCloudy.base;
    } else if (weather === 'Overcast') {
      weatherIcon = weatherIcons[timeOfDay].overcast;
    } else if (weather === 'Fog') {
      weatherIcon = weatherIcons[timeOfDay].fog;
    } else if (weather === 'Depositing Rime Fog') {
      weatherIcon = weatherIcons[timeOfDay].haze;
    } else if (
      weather === 'Light Drizzle' ||
      weather === 'Moderate Drizzle' ||
      weather === 'Dense Drizzle'
    ) {
      weatherIcon = weatherIcons[timeOfDay].drizzle;
    } else if (
      weather === 'Light Freezing Drizzle' ||
      weather === 'Dense Freezing Drizzle'
    ) {
      weatherIcon = weatherIcons[timeOfDay].sleet;
    } else if (
      weather === 'Light Rain' ||
      weather === 'Moderate Rain' ||
      weather === 'Heavy Rain' ||
      weather === 'Light Showers' ||
      weather === 'Moderate Showers' ||
      weather === 'Violent Showers'
    ) {
      weatherIcon = weatherIcons[timeOfDay].rain;
    } else if (
      weather === 'Moderate Snow' ||
      weather === 'Heavy Snow' ||
      weather === 'Snow Grains' ||
      weather === 'Light Snow Showers' ||
      weather === 'Heavy Snow Showers'
    ) {
      weatherIcon = weatherIcons[timeOfDay].snow;
    } else if (weather === 'Thunderstorm') {
      if (chanceOfRain >= 50) {
        if (rainfall > 0) {
          weatherIcon = weatherIcons[timeOfDay].thunderstorm.rain;
        } else if (snowfall > 0) {
          weatherIcon = weatherIcons[timeOfDay].thunderstorm.snow;
        }
      } else {
        weatherIcon = weatherIcons[timeOfDay].thunderstorm.base;
      }
    } else if (
      weather === 'Thunderstorm With Light Hail' ||
      weather === 'Thunderstorm With Heavy Hail'
    ) {
      weatherIcon = weatherIcons[timeOfDay].thunderstorm.snow;
    }
    //control for sunrise/sunset
    const moonriseHour = sunsetHour + 1;
    const moonsetHour = sunriseHour - 1;
    const pertinentWeather = !(
      weather === 'Clear Sky' ||
      weather === 'Mainly Clear' ||
      weather === 'Fog' ||
      weather === 'Partly Cloudy'
    );
    if (hour === sunriseHour && !pertinentWeather) {
      weatherIcon = weatherIcons.day.sunrise;
    } else if (hour === sunsetHour && !pertinentWeather) {
      weatherIcon = weatherIcons.day.sunset;
    } else if (hour === moonriseHour && !pertinentWeather) {
      weatherIcon = weatherIcons.night.moonrise;
    } else if (hour === moonsetHour && !pertinentWeather) {
      weatherIcon = weatherIcons.night.moonset;
    }
    return weatherIcon;
  };

  const updateUserModelCounter = (userId, key, increase = true) => {
    const change = increase ? 1 : -1;
    axios
      .patch('/badges', {
        userId: userId,
        key: key,
        change: change,
      })
      .then()
      .catch((err) =>
        console.error(
          `an error occurred attempting to increment/decrement counter on User model for userId ${userId}`,
          err
        )
      );
  };

  const findContext = () => {
    axios
      .get('auth/user')
      .then(({ data }) => {
        setUser({
          email: data.email,
          id: data.id,
          name: data.name,
          thumbnail: data.thumbnail,
          weight: data.weight,
          homeAddress: data.homeAddress,
          location_lat: parseFloat(data.location_lat),
          location_lng: parseFloat(data.location_lng),
        });
        console.log(user);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getLocation = () => {
    console.log('root.tsx getLocation');
    let interval: any | undefined;
    if (navigator.geolocation) {
      interval = setInterval(() => {
        if (!navigator.geolocation) {
          setError('Geolocation is not supported by this browser.');
          clearInterval(interval!);
          return;
        }
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setGeoLocation({ lat: latitude, lng: longitude });
            clearInterval(interval!);
            interval = null;
          },
          (error) => setError(error.message)
        );
      }, 1000);
    } else {
      setError('Geolocation is not supported by this browser.');
    }
    return () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };
  };

  const updateUserLocation = (geoObj: geoLocation) => {
    const id = user!.id;
    const updatedData = {
      location_lat: geoObj.lat,
      location_lng: geoObj.lng,
    };
    axios
      .put(`/home/user/${id}`, updatedData)
      .then(() => findContext())
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (geoLocation) {
      updateUserLocation(geoLocation);
      getForecasts();
    }
  }, [geoLocation]);

  useEffect(() => {
    getLocation();
    findContext();
  }, []);

  let homeForecasts: Hourly[] = new Array(4).fill(0).map(() => ({
    displayIcon: true,
    time: new Date(),
    temperature: 0,
    humidity: 0,
    apparentTemperature: 0,
    cloudcover: 0,
    windspeed: 0,
    precipitation: 0,
    snowfall: 0,
    precipitationProbability: 0,
    rain: 0,
    showers: 0,
    weatherDescription: '',
    snowDepth: 0,
    visibility: 0,
    isDay: true,
  }));

  let found = false;
  let countIndex = 0;
  hourlyForecasts.forEach((ele) => {
    if (found === true && countIndex < 4) {
      homeForecasts[countIndex] = ele;
      countIndex++;
    }
    if (ele.time === currentWeather.time) {
      found = true;
      homeForecasts[countIndex] = ele;
      countIndex++;
    }
  });

  homeForecasts.forEach((ele, i) => {
    if (i !== 0) {
      ele.displayIcon = false;
    }
  });

  return (
    <div>
      <UserContext.Provider
        value={{ user, geoLocation, updateUserModelCounter }}
      >
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />}>
              <Route
                path='/home'
                element={
                  <Home
                    homeForecasts={homeForecasts}
                    windSpeedMeasurementUnit={windSpeedMeasurementUnit}
                    temperatureMeasurementUnit={temperatureMeasurementUnit}
                    precipitationMeasurementUnit={precipitationMeasurementUnit}
                    prepareWeatherIcon={prepareWeatherIcon}
                  />
                }
              />
              <Route path='bulletinBoard' element={<BulletinBoard />} />
              <Route path='bikeRoutes' element={<RouteM />} />
              <Route
                path='weather'
                element={
                  <Weather
                    windSpeedMeasurementUnit={windSpeedMeasurementUnit}
                    temperatureMeasurementUnit={temperatureMeasurementUnit}
                    precipitationMeasurementUnit={precipitationMeasurementUnit}
                    sunriseHour={sunriseHour}
                    sunsetHour={sunsetHour}
                    hourlyForecasts={hourlyForecasts}
                    prepareWeatherIcon={prepareWeatherIcon}
                    setWindSpeedMeasurementUnit={setWindSpeedMeasurementUnit}
                    setTemperatureMeasurementUnit={
                      setTemperatureMeasurementUnit
                    }
                    setPrecipitationMeasurementUnit={
                      setPrecipitationMeasurementUnit
                    }
                    getForecasts={getForecasts}
                  />
                }
              />
              <Route path='profile' element={<Profile />} />
              <Route path='createReport' element={<CreateReport />} />
              <Route path='reports' element={<Reports />} />
              <Route path='reportsMap' element={<ReportsMap />} />
              <Route path='stopwatch' element={<Stopwatch />} />
            </Route>
          </Routes>
          <Stopwatch />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
};

export default Root;

// stopwatchActivity={stopwatchActivity} stopwatchDuration={stopwatchDuration} stopwatchCalories={stopwatchCalories}
