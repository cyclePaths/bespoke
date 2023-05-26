import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootPropsToHome } from '../Root';
import Forecast from './Weather/Forecast';
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
  Collapse,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  IconButtonProps,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BikeRoutes, Bulletin } from '@prisma/client';
import axios from 'axios';
import WeatherWidget from './Weather/WeatherWidget';
import { styled } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

// For the expandable cards on the home page //
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

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
                  <div>
                    No post found. Check the bulletin board or create one.
                  </div>
                )}
              </Typography>
            </CardContent>
          </Card>
          <div style={{ display: 'flex' }}>
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
                  paddingTop: '16px',
                  paddingBottom: '16px',
                  textAlign: 'center',
                }}
              />
              <CardContent sx={{ paddingBottom: '0px' }}>
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
                boxShadow: '0px 0px 8px 2px rgba(0, 0, 0, 0.2)',
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
              <CardContent>
                <Typography paragraph sx={{ textAlign: 'center' }}>
                  {routeInfo
                    ? routeInfo.name
                    : 'You have not been on a route yet. Please search a route or create a new route'}
                </Typography>
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
