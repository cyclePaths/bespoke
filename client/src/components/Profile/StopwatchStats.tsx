import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';
import Addresses from './Addresses';
import Picker from 'react-scrollable-picker';
import { UserContext } from '../../Root';
import Stopwatch, { StopwatchTime } from '../Stopwatch';
// import { ValueGroup } from './Profile';
import {
  exiledStopwatchStatsRedHeadedStepChildrenOptionGroups,
  exiledRedHeadedStepChildrenValueGroups,
} from '../../../profile-assets';

const StopwatchStats = ({
  optionGroups,
  valueGroups,
  hours,
  minutes,
  seconds,
}) => {
  const user = useContext(UserContext);
  const { weight } = user;

  console.log(valueGroups, 'ANCHORS');

  // console.log(seconds, 'TIME')

  let totalTime = 0;

  if (seconds < 30) {
    totalTime = hours * 60 + minutes;
  } else if (seconds >= 30) {
    totalTime = hours * 60 + (minutes + 1);
  }

  console.log(totalTime);

  const submitSWStats = () => {
    const { workout } = valueGroups;
    axios
      .get('/profile/workout', {
        params: { activity: `${workout}`, duration: totalTime, weight: weight },
      })
      .then((response) => {
        const { total_calories } = response.data;
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
      <button
        type='button'
        onClick={() => {
          submitSWStats();
        }}
      >
        Get Stats
      </button>
    </div>
  );
};

export default StopwatchStats;
