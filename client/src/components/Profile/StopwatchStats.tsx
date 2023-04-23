import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../Root';
import {
  exiledRedHeadedStepChildrenValueGroups,
} from '../../../profile-assets';

const StopwatchStats = ({
  optionGroups,
  valueGroups,
  hours,
  minutes,
  seconds,
  isPickerVisible,
  setIsPickerVisible,
  setValueGroups,
}) => {
  const user = useContext(UserContext);
  const { weight } = user;



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
  );
};

export default StopwatchStats;
