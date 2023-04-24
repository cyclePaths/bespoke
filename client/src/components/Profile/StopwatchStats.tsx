import React, { useState, useEffect, useContext, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Profile, { RideStats } from './Profile';
import Root, { UserContext } from '../../Root';
import {
  exiledRedHeadedStepChildrenValueGroups,
} from '../../../profile-assets';

export type StopwatchActivity = string;
export type StopwatchDuration = number;
export type StopwatchCalories = number;

interface StopwatchStatsProps {
  optionGroups: any;
  valueGroups: any;
  hours: number;
  minutes: number;
  seconds: number;
  isPickerVisible: boolean;
  setIsPickerVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setValueGroups: React.Dispatch<React.SetStateAction<any>>;
  // setRideStats: React.Dispatch<React.SetStateAction<RideStats>>;
  // rideStats: RideStats;
}

const StopwatchStats = ({
  optionGroups,
  valueGroups,
  hours,
  minutes,
  seconds,
  isPickerVisible,
  setIsPickerVisible,
  setValueGroups,
  // rideStats,
  // setRideStats,
}) => {
  const user = useContext(UserContext);

  let weight = user?.weight ?? 0;


  const [stopwatchActivity, setStopwatchActivity] = useState('');
  const [stopwatchDuration, setStopwatchDuration] = useState(0);
  const [stopwatchCalories, setStopwatchCalories] = useState(0);

// const propsToProfile: PropsToProfile = {
//   stopwatchActivity: stopwatchActivity,
//   stopwatchDuration: stopwatchDuration,
//   stopwatchCalories: stopwatchCalories,

// }


  let totalTime = 0;

  if (seconds < 30) {
    totalTime = hours * 60 + minutes;
  } else if (seconds >= 30) {
    totalTime = hours * 60 + (minutes + 1);
  }

  const workoutStats = () => {
    const { workout } = valueGroups;
    axios
      .get('/profile/workout', {
        params: {
          activity: `${workout}`,
          duration: totalTime,
          weight: weight,
        },
      })
      .then((response) => {
        const { total_calories } = response.data;

        setStopwatchActivity(`${workout}`);
        setStopwatchDuration(totalTime);
        setStopwatchCalories(total_calories)

        console.log(response);
        axios
          .post('profile/workout', {
            activity: `${workout}`,
            duration: totalTime,
            weight: weight,
            calories: total_calories,
          })
          .then(() => {})
          .catch((err) => {
            console.log('Could not post stats', err);
          });
      })
      .catch((err) => {
        console.log(err, 'got no response');
      });
  };

  return (
    <div>
      {/* <Profile propsToProfile={propsToProfile} /> */}
      {/* <Routes>
      <Route
      path='/Profile'
      element={<Profile propsToProfile={propsToProfile} />}
      />
      </Routes> */}
    <div>
      {isPickerVisible && (
        <div>
          <button
            type='button'
            onClick={() => {
              workoutStats();
              setIsPickerVisible(false);
              setValueGroups(exiledRedHeadedStepChildrenValueGroups);
            }}
          >
            Get Stats
          </button>
        </div>
      )}
    </div>
    <div>
      {/* <Profile stopwatchActivity={stopwatchActivity} stopwatchDuration={stopwatchDuration} stopwatchCalories={stopwatchCalories}/> */}
    </div>
    </div>
  );
};

export default StopwatchStats;
