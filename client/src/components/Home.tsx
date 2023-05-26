import React, { useState, useContext, useEffect } from 'react';
import { RootPropsToHome } from '../Root';
import {
  BandAid,
  WeatherWidgetLabel,
  SwipeIcon,
  HomeWeatherWidgetHolder,
  HomePageCompWrapper,
  StatsWrapper,
} from '../StyledComp';
import LeaderBoard from './LeaderBoard/LeaderBoard';
import LeaderBoardPopout from './LeaderBoard/LeaderBoardPopout';
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
  const [routeInfo, setRouteInfo] = useState<BikeRoutes | undefined>(undefined);
  const [randomPost, setRandomPost] = useState<Bulletin | undefined>(undefined);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [leaderBoard, setLeaderBoard] = useState<boolean>(false);
  const [openLeaderBoard, setOpenLeaderBoard] = useState<boolean>(false);

  const handleLeaderBoard = () => {
    setOpenLeaderBoard(true);
    setLeaderBoard(true);
  };

  const handleRouteInfoExpand = () => {
    setExpanded(!expanded);
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
          <SwipeIcon
            isDark={isDark}
            src='https://static.thenounproject.com/png/145048-200.png'
          />
        </HomePageCompWrapper>
        <StatsWrapper>
          <Card
            sx={{
              margin: '10px',
              width: '100%',
              backgroundColor: isDark ? '#cacaca' : '#ececec',
              boxShadow: '0px 0px 8px 2px rgba(0, 0, 0, 0.2)',
            }}
          >
            <CardHeader
              title='Topic of the day'
              sx={{ flexDirection: 'column' }}
            />
            <CardContent sx={{ paddingBottom: '0px', paddingTop: '0px' }}>
              <Typography paragraph>
                {randomPost ? (
                  <div
                    style={{
                      display: 'flex',
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
                    <div>{randomPost.text}</div>
                    <div
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      - {randomPost.creator}
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    No post found. Check the bulletin board or create one.
                  </div>
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
                backgroundColor: isDark ? '#cacaca' : '#ececec',
                boxShadow: '0px 0px 8px 2px rgba(0, 0, 0, 0.2)',
              }}
            >
              <CardHeader
                title='LeaderBoards'
                sx={{
                  padding: '9px',
                  paddingTop: '20px',
                  paddingBottom: '16px',
                  textAlign: 'center',
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
                <Typography sx={{ textAlign: 'center' }}>
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
                backgroundColor: isDark ? '#cacaca' : '#ececec',
                boxShadow: '0px 0px 8px 2px #00000033',
              }}
            >
              <CardHeader
                title='Recent Ride'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              />
              <CardContent
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                {routeInfo ? (
                  <div style={{ textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 'bold' }}>Name</Typography>
                    <Typography>{routeInfo.name}</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>
                      Created On
                    </Typography>
                    <Typography>
                      {dayjs(routeInfo.createdAt).format('MMMM D, YYYY')}
                    </Typography>
                  </div>
                ) : (
                  <Typography>Not Hello</Typography>
                )}
              </CardContent>
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
      </BandAid>
    </div>
  );
};

export default Home;

//old forecastRow on home page:

// <ForecastRow
// rowData={homeForecasts}
// prepareWeatherIcon={prepareWeatherIcon}
// windSpeedMeasurementUnit={windSpeedMeasurementUnit}
// temperatureMeasurementUnit={temperatureMeasurementUnit}
// precipitationMeasurementUnit={precipitationMeasurementUnit}
// sunriseHour={sunriseHour}
// sunsetHour={sunsetHour}
// />
