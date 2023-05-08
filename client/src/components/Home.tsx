import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootPropsToHome } from '../Root';
import ForecastRow from './Weather/ForecastRow';
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
  const { user } = useContext(UserContext);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const navigate = useNavigate();

  // This is to get a geolocation of the user's home //
  const handleRoutingHome = () => {
    if (user.homeAddress === null) {
      setShowWarning(true);

      setTimeout(() => {
        setShowWarning(false);
      }, 5000);
    } else {
      geocodeByAddress(user.homeAddress).then((result) => {
        getLatLng(result[0]).then((coordinates) => {
          setHomeCoordinates(coordinates);
          navigate('/bikeRoutes'); // Navigates to the bikeRoutes view to chart a way home
        });
      });
    }
  };

  return (
    <div>
      <BandAid>
        <HomePageCompWrapper>
          <ForecastRow
            rowData={homeForecasts}
            prepareWeatherIcon={prepareWeatherIcon}
            windSpeedMeasurementUnit={windSpeedMeasurementUnit}
            temperatureMeasurementUnit={temperatureMeasurementUnit}
            precipitationMeasurementUnit={precipitationMeasurementUnit}
            sunriseHour={sunriseHour}
            sunsetHour={sunsetHour}
          />
          {/* <Button
            onClick={() => {
              handleRoutingHome();
            }}
          >
            <GoHomeIcon src='https://cdn-icons-png.flaticon.com/512/69/69947.png' />
          </Button> */}
          {/* <Modal
            open={showWarning}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Warning:
              </Typography>
              <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                You have not set a home. Please go to the profile and set your
                current home
              </Typography>
            </Box>
          </Modal> */}
        </HomePageCompWrapper>
        {/* <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
          <StatsDivs>
            This is a new Element. Dont know what will go here?
          </StatsDivs>
          <StatsDivs>
            This is another New Element. Again dont know what do display here?
          </StatsDivs>
        </div> */}
      </BandAid>
    </div>
  );
};

export default Home;
