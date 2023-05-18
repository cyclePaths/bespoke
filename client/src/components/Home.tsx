import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootPropsToHome } from '../Root';
import ForecastRow from './Weather/ForecastRow';
import Forecast from './Weather/Forecast';
import {
  BandAid,
  ForecastEntry,
  HomeWeatherWidgetHolder,
  HomePageCompWrapper,
  StatsWrapper
} from '../StyledComp';
import LeaderBoard from './LeaderBoard/LeaderBoard';
import LeaderBoardPopout from './LeaderBoard/LeaderBoardPopout';
import { UserContext } from '../Root';
import { Card, CardHeader, Collapse, CardContent, CardActions, Typography, IconButton, IconButtonProps } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BikeRoutes } from '@prisma/client';
import axios from 'axios';
import WeatherWidget from './Weather/WeatherWidget';
import {styled} from '@mui/material/styles';
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
  const [expanded, setExpanded] = useState<boolean>(false)
  const [leaderBoard, setLeaderBoard] = useState<boolean>(false);
  const [openLeaderBoard, setOpenLeaderBoard] = useState<boolean>(false);

  const handleLeaderBoard = () => {
    setOpenLeaderBoard(true);
    setLeaderBoard(true);
  };

  const handleRouteInfoExpand = () => {
    setExpanded(!expanded);
  }

  useEffect(() => {
    axios.get('/bikeRoutes/currentRoute')
      .then(({data}) => {
        setRouteInfo(data);
      })
      .catch((err) => {
        console.error('Failed to find most recent route: ', err);
      })

    return () => {
      // console.log('Fetched and cleanup');
    }
  }, [])

  return (
    <div>
      <BandAid>
        <HomePageCompWrapper>
          <HomeWeatherWidgetHolder>
            <WeatherWidget
              prepareWeatherIcon={prepareWeatherIcon}
              hourlyForecasts={hourlyForecasts}
            ></WeatherWidget>
          </HomeWeatherWidgetHolder>
        </HomePageCompWrapper>
        <StatsWrapper>
          <Card>
            <CardHeader title="Most Recent Route"/>
              <CardContent>
                <Typography paragraph sx={{ textAlign: 'center' }}>
                  {routeInfo ? routeInfo.name : "You have not been on a route yet. Please Search a route or create a new route"}
                </Typography>
              </CardContent>
          </Card>
          <IconButton onClick={() => handleLeaderBoard()}>
            <EmojiEventsIcon
              sx={{ color: isDark ? (leaderBoard ? '#ffff00' : '#ececec') : (leaderBoard ? '#ffff00' : '#757575') }}
            />
          </IconButton>
        </StatsWrapper>

        <LeaderBoardPopout
        openLeaderBoard={openLeaderBoard}
        setOpenLeaderBoard={setOpenLeaderBoard}
        setLeaderBoard={setLeaderBoard}
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
