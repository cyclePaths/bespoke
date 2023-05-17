import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootPropsToHome } from '../Root';
import ForecastRow from './Weather/ForecastRow';
import Forecast from './Weather/Forecast';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
  BandAid,
  ForecastEntry,
  HomeWeatherWidgetHolder,
  HomePageCompWrapper,
  GoHomeIcon,
  StatsDivs,
} from '../StyledComp';
import LeaderBoard from './LeaderBoard/LeaderBoard';
import LeaderBoardPopout from './LeaderBoard/LeaderBoardPopout';
import { UserContext } from '../Root';
import { Box, Button, Modal, Typography } from '@mui/material';
import { BikeRoutes } from '@prisma/client';
import axios from 'axios';
import WeatherWidget from './Weather/WeatherWidget';

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

  useEffect(() => {
    axios.get('/bikeRoutes/currentRoute')
      .then(({data}) => {
        console.log(data);
      })
      .catch((err) => {
        console.error('Failed to find most recent route: ', err);
      })

    return () => {
      console.log('Fetched and cleanup');
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
        <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
          <StatsDivs>
            This is a new Element. Dont know what will go here?
          </StatsDivs>
        </div>
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
