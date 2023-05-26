import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import axios from 'axios';
import {
  weatherIcons,
  badgeInfo,
  standardTiers,
  weeklyTiers,
  badgesWithSpecialTiers,
} from '../assets';
import App from './components/App';
import Home from './components/Home';
import BulletinBoard from './components/BulletinBoard/BulletinBoard';
import Weather from './components/Weather/Weather';
import Profile from './components/Profile/Profile';
import CreateReport from './components/Reports/CreateReport';
import Report from './components/Reports/Report';
import RouteM, { LatLngLiteral } from './components/BikeRoutes/RouteM';
import ReportsMap from './components/Reports/ReportsMap';
import DirectMessages from './components/DirectMessages/DirectMessages';
import { GlobalStyleLight, GlobalStyleDark } from './ThemeStyles';
import { ThemeProvider, useTheme } from './components/Profile/ThemeContext';
import { toast } from 'react-toastify';
import { SocketContext } from './SocketContext';
import { Socket } from 'socket.io-client';
import { SocketProvider } from './SocketContext';
import DMNotifications from './DMNotifications';
import { useStyles } from './components/DirectMessages/DMStyles';

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
  time: Date;
  temperature: number;
  previousTemperature: number;
  humidity: number;
  apparentTemperature: number;
  directRadiation: number;
  diffuseRadiation: number;
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
  currentTimeIndex: number;
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
  currentTimeIndex: number;
  hourlyForecasts: Hourly[];
  windSpeedMeasurementUnit: string;
  temperatureMeasurementUnit: string;
  precipitationMeasurementUnit: string;
  sunriseHour: number;
  sunsetHour: number;
  prepareWeatherIcon: (
    weather: string,
    isDay: boolean,
    hour: number,
    chanceOfRain: number,
    rainfall: number,
    snowfall: number
  ) => string;
  setHomeCoordinates: React.Dispatch<
    React.SetStateAction<google.maps.LatLngLiteral | undefined>
  >;
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

export interface Badge {
  id: number;
  name: string;
  badgeIcon: string;
  tier?: number;
}

export interface BadgeWithAdditions extends Badge {
  counter?: number;
  description?: string;
}

export const UserContext = createContext<any>(Object());

export const MessageContext = createContext<any>(Object());
// const MessageContext = createContext<MessageContextType | undefined>(undefined);

// let selectedTheme;

// export const currentTheme = selectedTheme;

const Root = () => {
  /////////// LIGHT/DARK MODE///////////////
  const [isDark, setIsDark] = useState(false);

  // selectedTheme = isDark;
  // export const currentTheme = isDark;

  const handleToggleStyle = () => {
    setIsDark((prevIsDark) => !prevIsDark);

    // const currentTheme = isDark ? GlobalStyleDark : GlobalStyleLight;

    // const location = useLocation();
    // let savedTheme = location.state && location.state.savedTheme;
    // setIsDark(savedTheme);
  };

  // useEffect(() => {
  //   console.log('theme', selectedTheme)
  //   // export selectedTheme
  // }, [isDark])
  //.........................................

  // Created User Info and Geolocation for context //
  const [user, setUser] = useState<User>();
  const [geoLocation, setGeoLocation] = useState<geoLocation>();
  const LocationContext = createContext(geoLocation);
  const [error, setError] = useState<string | undefined>(undefined);
  //holds all badge objects
  const [allBadges, setAllBadges] = useState<Badge[]>([
    {
      id: 0,
      name: 'No Achievements',
      badgeIcon:
        'https://www.baptistpress.com/wp-content/uploads/images/IMG201310185483HI.jpg',
      tier: 0,
    },
  ]);
  //holds badge objects associated with user
  const [userBadges, setUserBadges] = useState<BadgeWithAdditions[]>([
    {
      id: 0,
      name: 'No Achievements',
      badgeIcon:
        'https://www.baptistpress.com/wp-content/uploads/images/IMG201310185483HI.jpg',
      tier: 0,
      counter: 0,
      description: '',
    },
  ]);
  //holds URL of badge to display by username
  const [selectedBadge, setSelectedBadge] = useState<string>(
    'https://www.baptistpress.com/wp-content/uploads/images/IMG201310185483HI.jpg'
  );

  //stately variables to save the units of measurement the user wishes weather related figures to be displayed in
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

  //marks the index of the entry for the current time among the Hourly forecasts
  const [currentTimeIndex, setCurrentTimeIndex] = useState<number>(0);

  //stately variables for the 24 hourly forecasts in a given day as well as that day's sunrise and sunset times
  const [hourlyForecasts, setHourlyForecasts] = useState<Hourly[]>([]);
  const [sunriseHour, setSunriseHour] = useState<number>(0);
  const [sunsetHour, setSunsetHour] = useState<number>(0);
  const [homeCoordinates, setHomeCoordinates] = useState<LatLngLiteral>();

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
          latitude: geoLocation!.lat,
          longitude: geoLocation!.lng,
          numDaysToForecast: numDaysToForecast,
        },
      })
      .then(({ data }) => {
        setSunriseHour(data.sunriseHour);
        setSunsetHour(data.sunsetHour);
        setCurrentWeather(data.currentWeather);
        setHourlyForecasts(data.hourly);
        setCurrentTimeIndex(data.currentTimeIndex);
      })
      .catch((err) =>
        console.error(
          'an error occured with clientside GET request for forecasts: ',
          err
        )
      );
  };

  //function to set the weather icon based on the weather for the hour in question
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
      if (timeOfDay === 'day') {
        weatherIcon = weatherIcons[timeOfDay].clear;
      } else {
        weatherIcon = weatherIcons[timeOfDay].starry;
      }
    } else if (weather === 'Partly Cloudy') {
      weatherIcon = weatherIcons[timeOfDay].partlyCloudy.base;
    } else if (weather === 'Overcast') {
      weatherIcon = weatherIcons[timeOfDay].overcast;
    } else if (weather === 'Fog') {
      weatherIcon = weatherIcons[timeOfDay].fog;
    } else if (weather === 'Rime Fog') {
      weatherIcon = weatherIcons[timeOfDay].haze;
    } else if (
      weather === 'Light Drizzle' ||
      weather === 'Moderate Drizzle' ||
      weather === 'Dense Drizzle'
    ) {
      weatherIcon = weatherIcons[timeOfDay].drizzle;
    } else if (weather === 'Freezing Drizzle' || weather === 'Freezing Rain') {
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
      weather === 'Moderate Snowfall' ||
      weather === 'Snow Showers' ||
      weather === 'Heavy Snow Showers' ||
      weather === 'Snow Grains' ||
      weather === 'Light Snowfall' ||
      weather === 'Heavy Snowfall'
    ) {
      weatherIcon = weatherIcons[timeOfDay].snow;
    } else if (
      weather === 'Thunderstorms' ||
      weather === 'Moderate Thunderstorms' ||
      weather === 'Heavy Thunderstorms'
    ) {
      if (chanceOfRain >= 50) {
        weatherIcon = weatherIcons[timeOfDay].thunderstorm.rain;
      } else {
        weatherIcon = weatherIcons[timeOfDay].thunderstorm.base;
      }
    }
    return weatherIcon;
  };

  /*
  Below is the functionality for direct message notifications. handleMessageData is a call back
  function passed to DirectMessages to capture the user id of a receiver in order to filter
  the notifications so that they display only for a receiver, and not for everyone.
  */

  // Keep the interface
  interface RootMessage {
    senderId: number;
    senderName: string;
    receiverId: number;
    receiverName: string;
    text: string;
    fromMe: boolean;
  }

  // Keep the socket and state variables
  const socket = useContext(SocketContext).socket as Socket | undefined;
  const [rootNewMessage, setRootNewMessage] = useState<RootMessage | null>(
    null
  );
  const [showConversations, setShowConversations] = React.useState(true);

  // Keep the socket event handling
  useEffect(() => {
    if (socket && user) {
      socket.on('message', handleReceivedMessage);
    }
      return () => {
        if (socket) {
          socket.off('message', handleReceivedMessage);
        }
      };
    }, [socket, user]);

  // Adjust handleReceivedMessage
  const handleReceivedMessage = (newMessage: RootMessage) => {
    console.log('Received message:', newMessage);
    // Only set the state here, don't show notifications or navigate
    if (
      newMessage.senderId !== user?.id &&
      newMessage.receiverId === user?.id
    ) {
      setRootNewMessage(newMessage);
    }
  };

  /*
  /*
  Above is the functionality for direct message notifications. handleMessageData is a call back
  function passed to DirectMessages to capture the user id of a receiver in order to filter
  the notifications so that they display only for a receiver, and not for everyone.
  */

  //gets all badge objects on database as well as all badges the user has earned
  const getBadges = () => {
    axios
      .get('badges/all-badges')
      .then(({ data }) => {
        setAllBadges(data.allBadges);
        //add descriptions to the Badge objects for use in Tooltips
        if (data.earnedBadges.length > 0) {
          let earnedBadges = data.earnedBadges.map((ele) => {
            for (let i = 0; i < badgeInfo.length; i++) {
              if (badgeInfo[i].name === ele.name) {
                ele.description = badgeInfo[i].description;
              }
            }
            return ele;
          });
          //add current count for all counters on all user badges that have counters
          data.joinTableBadges.forEach((ele) => {
            for (let i = 0; i < earnedBadges.length; i++) {
              if (earnedBadges[i].counter) {
                if (earnedBadges[i].id === ele.badgeId) {
                  earnedBadges[i].counter = ele.counter;
                }
              }
            }
          });
          setUserBadges(earnedBadges);
        }
      })
      .catch((err) => {
        console.error('Failed to get badges from database: ', err);
      });
  };

  //function to ensure user's selected badge is displayed by their name
  //Note that this will not affect other users' display badges - that functionality must be programmed elsewhere
  const getSelectedBadge = () => {
    axios
      .get('/badges/selected-badge')
      .then(({ data }) => {
        setSelectedBadge(data);
      })
      .catch((err) => {
        console.error('Failed to get badges on user: ', err);
      });
  };

  //function to check if tier should increase (and increase it if so)
  const tierCheck = (badgeName, tier) => {
    let badgeId = 0;
    //look through all of the badges to find the one with this badge name and tier; get its id
    for (let i = 0; i < allBadges.length; i++) {
      if (allBadges[i].tier) {
        if (allBadges[i].tier === tier && allBadges[i].name === badgeName) {
          badgeId = allBadges[i].id;
          break;
        }
      }
    }
    if (badgeId === 0) {
      console.error('There is no tier to check!');
      return;
    }
    let tiersObj = standardTiers;
    if (badgesWithSpecialTiers[badgeName] !== undefined) {
      tiersObj = badgesWithSpecialTiers[badgeName];
    }
    let config = {
      badgeId: badgeId,
      tiers: {
        ...tiersObj,
      },
    };
    axios
      .post('/badges/tier', config)
      .then(({ data }) => {
        if (data.tierUp) {
          toast(`You have just achieved tier ${data.tier} on ${badgeName}!`);
        }
        getBadges(); //update allBadges and badgesOnUser with new DB info
      })
      .catch((err) =>
        console.error('there was an error when checking/updating tiers: ', err)
      );
  };

  //function to add or remove (or update?) badges for users
  const addBadge = (badgeName, tier = undefined) => {
    //will not attempt to add badge if it already exists on user
    const badgeNamesOnUser = userBadges.map((ele) => {
      return ele.name;
    });
    if (!badgeNamesOnUser.includes(badgeName)) {
      let badgeId = 0;
      for (let i = 0; i < allBadges.length; i++) {
        if (allBadges[i].tier) {
          if (allBadges[i].tier === tier && allBadges[i].name === badgeName) {
            badgeId = allBadges[i].id;
            break;
          }
        } else {
          if (allBadges[i].name === badgeName) {
            badgeId = allBadges[i].id;
            break;
          }
        }
      }
      axios
        .post('/badges/add', {
          badgeId: badgeId,
        })
        .then(() => {
          if (tier) {
            toast(`New Achievement Earned: ${badgeName} Tier ${tier}!`);
          } else {
            toast(`New Achievement Earned: ${badgeName}!`);
          }
          getBadges(); //update allBadges and badgesOnUser with new DB info
        })
        .catch((err) =>
          console.error(
            `an error has occurred adding badge with ID ${badgeId} to user`,
            err
          )
        );
    } else {
      console.error(`User has already earned ${badgeName}!`);
    }
  };

  //function to increment or decrement values on the User table used for achievements/badges
  //will change counter by +1 by default. Enter number to change by as final argument to increase by more than one (or decrease if negative number is passed)
  const updateBadgeCounter = (badgeName, tier = undefined, change = 1) => {
    let badgeId = 0;
    for (let i = 0; i < allBadges.length; i++) {
      if (allBadges[i].tier) {
        if (allBadges[i].tier === tier && allBadges[i].name === badgeName) {
          badgeId = allBadges[i].id;
          break;
        }
      } else {
        if (allBadges[i].name === badgeName) {
          badgeId = allBadges[i].id;
          break;
        }
      }
    }
    axios
      .patch('/badges/counter', {
        badgeId: badgeId,
        change: change,
      })
      .then(() =>
        console.log(`successfully updated badge with ID ${badgeId} on user`)
      )
      .catch((err) =>
        console.error(
          `an error occurred attempting to increment/decrement counter for user's badge with id ${badgeId}`,
          err
        )
      );
  };

  //if only a badgeName is passed in, will add badge to user
  //if badgeName and change are passed in, will add the badge (if not already earned) and update the counter on the badge by the value of change (if not 0)
  //If counter is updating, tier should also be passed in - function will check to see if tier should be updated in that case and will update if appropriate
  const updateAchievements = async (
    badgeName,
    tier = undefined,
    change = 0
  ) => {
    try {
      if (!badgeName) {
        console.error('You need to pass in a badge name!');
        return;
      } else {
        await addBadge(badgeName, tier); //won't fire if badge is already on user
      }
    } catch (err) {
      console.error(`was not able to add ${badgeName} to user!`);
    }
    try {
      if (change !== 0) {
        await updateBadgeCounter(badgeName, tier, change);
        if (tier) {
          await tierCheck(badgeName, tier);
        }
      }
    } catch (err) {
      console.error(
        'an error has occurred while attempting to update the database with achievement related info',
        err
      );
    }
  };

  const findContext = () => {
    axios
      .get('auth/user')
      .then(({ data }) => {
        setUser(data);
        setIsDark(!data.theme);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          setGeoLocation({ lat: latitude, lng: longitude });
        },
        (error: GeolocationPositionError) => setError(error.message)
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const updateUserLocation = (geoObj: geoLocation) => {
    const id = user?.id;
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
    if (geoLocation !== undefined) {
      updateUserLocation(geoLocation);
      getForecasts();
    }
  }, [geoLocation]);

  useEffect(() => {
    getLocation();
    findContext();
    getBadges();
    getSelectedBadge();
  }, []);

  //function to watch userBadges and allBadges so that if badges update (new badge earned) it will update the displayed badges too
  useEffect(() => {
    // console.log('use effect watching user/allBadges has been called');
  }, [userBadges, allBadges]);

  //sets user's displayed icon to their selected one; should update when the state variable for the badge URL changes
  useEffect(() => {
    if (
      selectedBadge !==
      'https://www.baptistpress.com/wp-content/uploads/images/IMG201310185483HI.jpg'
    ) {
      axios
        .patch('/badges/set', {
          iconURL: selectedBadge!,
        })
        .then() //log success?
        .catch((err) =>
          console.error(
            `an error has occurred when PATCHing User with new badge URL: ${selectedBadge}`,
            err
          )
        );
    }
  }, [selectedBadge]);

  let homeForecasts: Hourly[] = new Array(4).fill(0).map(() => ({
    time: new Date(),
    temperature: 0,
    previousTemperature: 0,
    humidity: 0,
    apparentTemperature: 0,
    directRadiation: 0,
    diffuseRadiation: 0,
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

  const reports = [];
  const [monthReports, setMonthReports] = useState<Report[]>([]);

  const fetchThisMonthReports = async () => {
    try {
      const response = await axios.get('/reports/thisMonth');
      setMonthReports(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchThisMonthReports();
  }, []);

  return (
    <div className={isDark ? 'dark' : 'light'}>
      <UserContext.Provider
        value={{
          user,
          geoLocation,
          userBadges,
          setUserBadges,
          selectedBadge,
          setSelectedBadge,
          updateBadgeCounter,
          addBadge,
          tierCheck,
          updateAchievements,
          isDark,
        }}
      >
        <MessageContext.Provider value={{ message: rootNewMessage }}>
          <BrowserRouter>
            <DMNotifications setShowConversations={setShowConversations} />
            <Routes>
              <Route path='/' element={<App />}>
                <Route
                  path='/home'
                  element={
                    <Home
                      currentTimeIndex={currentTimeIndex}
                      hourlyForecasts={hourlyForecasts}
                      windSpeedMeasurementUnit={windSpeedMeasurementUnit}
                      temperatureMeasurementUnit={temperatureMeasurementUnit}
                      precipitationMeasurementUnit={
                        precipitationMeasurementUnit
                      }
                      prepareWeatherIcon={prepareWeatherIcon}
                      setHomeCoordinates={setHomeCoordinates}
                      sunriseHour={sunriseHour}
                      sunsetHour={sunsetHour}
                    />
                  }
                />
                <Route path='bulletinBoard' element={<BulletinBoard />} />
                <Route
                  path='bikeRoutes'
                  element={
                    <RouteM
                      homeCoordinates={homeCoordinates!}
                      setHomeCoordinates={setHomeCoordinates}
                    />
                  }
                />
                <Route
                  path='weather'
                  element={
                    <Weather
                      currentTimeIndex={currentTimeIndex}
                      windSpeedMeasurementUnit={windSpeedMeasurementUnit}
                      temperatureMeasurementUnit={temperatureMeasurementUnit}
                      precipitationMeasurementUnit={
                        precipitationMeasurementUnit
                      }
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
                <Route
                  path='profile'
                  element={
                    <Profile
                      handleToggleStyle={handleToggleStyle}
                      isDark={isDark}
                      setIsDark={setIsDark}
                      // homeAddress={homeAddress}
                      // setHomeAddress={setHomeAddress}
                      // weight={weight}
                      // setWeight={setWeight}
                    />
                  }
                />

                {/* <Route path='directMessages' element={<DirectMessages />} /> */}
                <Route
                  path='directMessages'
                  element={
                    <DirectMessages
                      setShowConversations={setShowConversations}
                      showConversations={showConversations}
                      isDark={isDark}
                    />
                  }
                />
                <Route
                  path='createReport'
                  element={
                    <CreateReport
                      fetchThisMonthReports={fetchThisMonthReports}
                    />
                  }
                />
                <Route
                  path='reportsMap'
                  element={
                    <ReportsMap
                      monthReports={monthReports}
                      fetchThisMonthReports={fetchThisMonthReports}
                    />
                  }
                />
                {/* <Route path='directMessages' element={<DirectMessages />} /> */}
                <Route path='report' element={<Report />} />
                <Route
                  path='createReport'
                  element={
                    <CreateReport
                      fetchThisMonthReports={fetchThisMonthReports}
                    />
                  }
                />
                <Route
                  path='reportsMap'
                  element={
                    <ReportsMap
                      monthReports={monthReports}
                      fetchThisMonthReports={fetchThisMonthReports}
                    />
                  }
                />
              </Route>
            </Routes>
            {isDark ? <GlobalStyleDark /> : <GlobalStyleLight />}
          </BrowserRouter>
        </MessageContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default Root;
