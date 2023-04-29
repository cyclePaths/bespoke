import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootPropsToHome } from '../Root';
import ForecastRow from './Weather/ForecastRow';
import { ForecastEntry } from '../StyledComp';
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
  const [openLeaderBoard, setOpenLeaderBoard] = useState<boolean>(false);

  const handleLeaderBoard = () => {
    setOpenLeaderBoard(false);
  };

  return (
    <div>
      <button onClick={() => setOpenLeaderBoard(true)}>Show LeaderBoard</button>
      {/* <button type='button'  onClick={() => navigate('/stopwatch')}>Stopwatch</button> */}
      <div>
        <ForecastRow
          rowData={homeForecasts}
          prepareWeatherIcon={prepareWeatherIcon}
          windSpeedMeasurementUnit={windSpeedMeasurementUnit}
          temperatureMeasurementUnit={temperatureMeasurementUnit}
          precipitationMeasurementUnit={precipitationMeasurementUnit}
        />

        <LeaderBoardPopout
          openLeaderBoard={openLeaderBoard}
          setOpenLeaderBoard={setOpenLeaderBoard}
        >
          <LeaderBoard />
          <button onClick={() => handleLeaderBoard()}>Exit</button>
        </LeaderBoardPopout>
      </div>
    </div>
  );
};

export default Home;
