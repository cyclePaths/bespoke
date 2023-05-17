import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootPropsToHome } from '../Root';
import ForecastRow from './Weather/ForecastRow';
import Forecast from './Weather/Forecast';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
  BandAid,
  ForecastEntry,
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

const Home = ({
  homeForecasts,
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
          <Forecast
            displayIcon={homeForecasts[0].displayIcon}
            time={homeForecasts[0].time}
            prepareWeatherIcon={prepareWeatherIcon}
            temperature={homeForecasts[0].temperature}
            humidity={homeForecasts[0].humidity}
            apparentTemperature={homeForecasts[0].apparentTemperature}
            cloudcover={homeForecasts[0].cloudcover}
            windspeed={homeForecasts[0].windspeed}
            precipitation={homeForecasts[0].precipitation}
            snowfall={homeForecasts[0].snowfall}
            precipitationProbability={homeForecasts[0].precipitationProbability}
            rain={homeForecasts[0].rain}
            showers={homeForecasts[0].showers}
            weatherDescription={homeForecasts[0].weatherDescription}
            snowDepth={homeForecasts[0].snowDepth}
            visibility={homeForecasts[0].visibility}
            isDay={homeForecasts[0].isDay}
            windSpeedMeasurementUnit={windSpeedMeasurementUnit}
            temperatureMeasurementUnit={temperatureMeasurementUnit}
            precipitationMeasurementUnit={precipitationMeasurementUnit}
            sunriseHour={sunriseHour}
            sunsetHour={sunsetHour}
          />
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
