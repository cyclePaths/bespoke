import React, { useState, useContext, useEffect } from 'react';
import { RootPropsToHome } from '../Root';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  BandAid,
  WeatherWidgetLabel,
  SwipeIcon,
  HomeWeatherWidgetHolder,
  HomePageCompWrapper,
  StatsWrapper,
  HomeSwipe,
} from '../StyledComp';
import LeaderBoard from './LeaderBoard/LeaderBoard';
import LeaderBoardPopout from './LeaderBoard/LeaderBoardPopout';
import RouteExpandedPopout from './LeaderBoard/RouteExpandedPopout';
import { UserContext } from '../Root';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material';
import { BikeRoutes, Bulletin } from '@prisma/client';
import axios from 'axios';
import WeatherWidget from './Weather/WeatherWidget';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/en'; // Import the locale you want to use for month names
import 'dayjs/plugin/customParseFormat'; // Import the plugin for custom format parsing
import 'dayjs/plugin/localizedFormat'; // Import the plugin for localized format

dayjs.extend(require('dayjs/plugin/customParseFormat')); // Extend dayjs with the customParseFormat plugin
dayjs.extend(require('dayjs/plugin/localizedFormat')); // Extend dayjs with the localizedFormat plugin

dayjs.extend(utc);

const Home = ({
  currentTimeIndex,
  hourlyForecasts,
  windSpeedMeasurementUnit,
  temperatureMeasurementUnit,
  precipitationMeasurementUnit,
  sunriseHour,
  sunsetHour,
  prepareWeatherIcon,
  setHomeCoordinates,
}: RootPropsToHome) => {
  const { user, isDark } = useContext(UserContext);
  const [routeInfo, setRouteInfo] = useState<any>(undefined);
  const [randomPost, setRandomPost] = useState<Bulletin | undefined>(undefined);
  const [info, setInfo] = useState<any>(undefined);
  const [leaderBoard, setLeaderBoard] = useState<boolean>(false);
  const [openLeaderBoard, setOpenLeaderBoard] = useState<boolean>(false);
  const [openRouteInfo, setOpenRouteInfo] = useState<boolean>(false);

  const handleLeaderBoard = () => {
    setOpenLeaderBoard(true);
    setLeaderBoard(true);
  };

  const fetchRouteInfo = () => {
    if (!routeInfo) {
      return null;
    }

    const origin = JSON.parse(routeInfo.origin);
    const destination = JSON.parse(routeInfo.destination);
    let waypoints;

    if (routeInfo.waypoints.length > 0) {
      waypoints = routeInfo.waypoints;

      const service = new google.maps.DirectionsService();
      service.route(
        {
          origin: origin,
          destination: destination,
          waypoints: waypoints,
          travelMode: google.maps.TravelMode.BICYCLING,
        },
        (result, status) => {
          if (status === 'OK' && result) {
            const startArr =
              result.routes[0].legs[0].start_address.split(', USA');
            const endArr =
              result.routes[0].legs[
                result.routes[0].legs.length - 1
              ].start_address.split(', USA');
            let routeTotalDist = 0;
            let routeTotalDur = 0;

            result.routes[0].legs.forEach((route) => {
              routeTotalDist += route.distance!.value;
              routeTotalDur += route.duration!.value;
            });
            setInfo({
              distance: `${(routeTotalDist * 0.000621371).toFixed(1)} miles`,
              duration: `${Math.ceil(routeTotalDur / 60)} mins`,
              startAddress: startArr[0],
              endAddress: endArr[0],
            });
          }
        }
      );
    } else {
      const service = new google.maps.DirectionsService();
      service.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.BICYCLING,
        },
        (result, status) => {
          if (status === 'OK' && result) {
            const startArr =
              result.routes[0].legs[0].start_address.split(', USA');
            const endArr =
              result.routes[0].legs[
                result.routes[0].legs.length - 1
              ].start_address.split(', USA');
            let routeTotalDist = 0;
            let routeTotalDur = 0;

            result.routes[0].legs.forEach((route) => {
              routeTotalDist += route.distance!.value;
              routeTotalDur += route.duration!.value;
            });
            setInfo({
              distance: `${(routeTotalDist * 0.000621371).toFixed(1)} miles`,
              duration: `${Math.ceil(routeTotalDur / 60)} mins`,
              startAddress: startArr[0],
              endAddress: endArr[0],
            });
          }
        }
      );
    }
  };

  const handleExpandedInfo = () => {
    setOpenRouteInfo(true);
  };

  useEffect(() => {
    axios
      .get('/bikeRoutes/currentRoute')
      .then(({ data }) => {
        setRouteInfo(data);
      })
      .catch((err) => {
        console.error('Failed to find most recent route: ', err);
      });

    return () => {
      // console.log('Fetched and cleanup');
    };
  }, []);

  useEffect(() => {
    fetchRouteInfo();
  }, [routeInfo]);

  useEffect(() => {
    axios
      .get('/bulletin/randomPost')
      .then(({ data }) => {
        setRandomPost(data);
      })
      .catch((err) => {
        console.error('Failed to get a bulletin Post: ', err);
      });
  }, []);

  return (
    <div>
      <BandAid>
        <HomePageCompWrapper>
          <WeatherWidgetLabel>
            <strong>Weather Snapshot:</strong>
          </WeatherWidgetLabel>

          <HomeWeatherWidgetHolder>
            <WeatherWidget
              currentTimeIndex={currentTimeIndex}
              temperatureMeasurementUnit={temperatureMeasurementUnit}
              prepareWeatherIcon={prepareWeatherIcon}
              hourlyForecasts={hourlyForecasts}
            ></WeatherWidget>
          </HomeWeatherWidgetHolder>
          <HomeSwipe>
            <ArrowBackIcon sx={{ fontSize: '2rem' }} />
            Swipe
            <ArrowForwardIcon sx={{ fontSize: '2rem' }} />
          </HomeSwipe>
        </HomePageCompWrapper>
        <StatsWrapper>
          <Card
            sx={{
              margin: '10px',
              width: '100%',
              background: isDark
                ? 'linear-gradient(145deg, #1E2062, #030312)'
                : 'linear-gradient(145deg, #3CC6F6, #D8F1FF)',
              boxShadow: isDark
                ? '1.25em 1.25em 3.75em rgb(40, 43, 113), -0.625em -0.625em 1.3125em #282B71'
                : '-8px 2px 6px rgba(0, 0, 0, 0.3)',
            }}
          >
            <CardHeader
              title='Topic of the day'
              sx={{
                flexDirection: 'column',
                color: isDark ? '#ffffff' : 'black',
              }}
            />
            <CardContent
              sx={{
                paddingBottom: '0px',
                paddingTop: '0px',
                color: isDark ? '#ffffff' : 'black',
              }}
            >
              <Typography paragraph>
                {randomPost ? (
                  <div
                    style={{
                      fontFamily: 'roboto',
                      minWidth: '100%',
                      maxWidth: '100%',
                      border: '0px solid #000000',
                      borderRadius: '4px',
                      background: isDark
                        ? 'linear-gradient(145deg, #1e2062, #030312)'
                        : 'linear-gradient(145deg, #3cc6f6, #d8f1ff)',
                      boxShadow: isDark
                        ? '1.25em 1.25em 3.75em rgb(40, 43, 113)'
                        : '-8px 2px 6px rgba(0, 0, 0, 0.3)',
                      color: isDark ? '#FFFFFF' : '#000000',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: '20px',
                        fontWeight: 'bold',
                      }}
                    >
                      {randomPost.topic}
                    </div>

                    <div
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      - {randomPost.creator}
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center' }}>No post found.</div>
                )}
              </Typography>
            </CardContent>
          </Card>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '35vh',
            }}
          >
            <Card
              sx={{
                margin: '10px',
                maxWidth: '45%',
                background: isDark
                  ? 'linear-gradient(145deg, #1E2062, #030312)'
                  : 'linear-gradient(145deg, #3CC6F6, #D8F1FF)',
                boxShadow: isDark
                  ? '1.25em 1.25em 3.75em rgb(40, 43, 113), -0.625em -0.625em 1.3125em #282B71'
                  : '-8px 2px 6px rgba(0, 0, 0, 0.3)',
              }}
            >
              <CardHeader
                title='LeaderBoards'
                sx={{
                  padding: '9px',
                  paddingTop: '20px',
                  paddingBottom: '16px',
                  textAlign: 'center',
                  color: isDark ? '#ffffff' : 'black',
                }}
              />
              <CardContent
                sx={{
                  height: '12vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    textAlign: 'center',
                    color: isDark ? '#ffffff' : 'black',
                  }}
                >
                  See our top 10 users in select categories
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small' onClick={handleLeaderBoard}>
                  Expand LeaderBoard
                </Button>
              </CardActions>
            </Card>
            <Card
              sx={{
                margin: '10px',
                maxWidth: '45%',
                background: isDark
                  ? 'linear-gradient(145deg, #1E2062, #030312)'
                  : 'linear-gradient(145deg, #3CC6F6, #D8F1FF)',
                boxShadow: isDark
                  ? '1.25em 1.25em 3.75em rgb(40, 43, 113), -0.625em -0.625em 1.3125em #282B71'
                  : '-8px 2px 6px rgba(0, 0, 0, 0.3)',
              }}
            >
              <CardHeader
                title='Recent Ride'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  color: isDark ? '#ffffff' : 'black',
                }}
              />
              <CardContent sx={{ paddingTop: '10px', paddingBottom: '5px' }}>
                {routeInfo ? (
                  <div
                    style={{
                      textAlign: 'center',
                      color: isDark ? '#ffffff' : 'black',
                    }}
                  >
                    <Typography sx={{ fontWeight: 'bold' }}>Name</Typography>
                    <Typography>{routeInfo.name}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>
                      Created On
                    </Typography>
                    <Typography>
                      {dayjs(routeInfo.createdAt).format('MMMM D, YYYY')}
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>
                      Created By
                    </Typography>
                    <Typography>{routeInfo.user.name}</Typography>
                  </div>
                ) : (
                  <Typography>Take a Ride</Typography>
                )}
              </CardContent>
              {routeInfo ? (
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button size='small' onClick={handleExpandedInfo}>
                    Expand
                  </Button>
                </CardActions>
              ) : (
                <></>
              )}
            </Card>
          </div>
        </StatsWrapper>
        <LeaderBoardPopout
          setLeaderBoard={setLeaderBoard}
          setOpenLeaderBoard={setOpenLeaderBoard}
          openLeaderBoard={openLeaderBoard}
        >
          <LeaderBoard />
        </LeaderBoardPopout>
        <RouteExpandedPopout
          openRouteInfo={openRouteInfo}
          setOpenRouteInfo={setOpenRouteInfo}
          routeInfo={routeInfo}
          info={info}
        />
      </BandAid>
    </div>
  );
};

export default Home;
