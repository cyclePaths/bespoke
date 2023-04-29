import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootPropsToHome } from '../Root';
import ForecastRow from './Weather/ForecastRow';
import { BandAid, ForecastEntry } from '../StyledComp';
import LeaderBoard from './LeaderBoard/LeaderBoard';
import LeaderBoardPopout from './LeaderBoard/LeaderBoardPopout';

const Home = ({
  homeForecasts,
  windSpeedMeasurementUnit,
  temperatureMeasurementUnit,
  precipitationMeasurementUnit,
  prepareWeatherIcon,
}: RootPropsToHome) => {
  const navigate = useNavigate();

  return (
    <div>
      {/* <button type='button'  onClick={() => navigate('/stopwatch')}>Stopwatch</button> */}
      <BandAid>
        <ForecastRow
          rowData={homeForecasts}
          prepareWeatherIcon={prepareWeatherIcon}
          windSpeedMeasurementUnit={windSpeedMeasurementUnit}
          temperatureMeasurementUnit={temperatureMeasurementUnit}
          precipitationMeasurementUnit={precipitationMeasurementUnit}
        />
      </BandAid>
    </div>
  );
};

export default Home;
