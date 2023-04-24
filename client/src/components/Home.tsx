import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RootPropsToHome } from '../Root';
import ForecastRow from './Weather/ForecastRow';
import { ForecastEntry } from '../StyledComp';

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
      <div>ET Phone Home</div>
      {/* <button type='button'  onClick={() => navigate('/stopwatch')}>Stopwatch</button> */}
      <ForecastRow
        rowData={homeForecasts}
        prepareWeatherIcon={prepareWeatherIcon}
        windSpeedMeasurementUnit={windSpeedMeasurementUnit}
        temperatureMeasurementUnit={temperatureMeasurementUnit}
        precipitationMeasurementUnit={precipitationMeasurementUnit}
      />
    </div>
  );
};

export default Home;
