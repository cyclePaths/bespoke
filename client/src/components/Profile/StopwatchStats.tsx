import React, { useState, useEffect, useContext, createContext } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
}) => {
  const user = useContext(UserContext);

  let weight = user?.weight ?? 0;

  let totalTime = 0;

  if (seconds < 30) {
    totalTime = hours * 60 + minutes;
  } else if (seconds >= 30) {
    totalTime = hours * 60 + (minutes + 1);
  }

  const navigate = useNavigate();

  const workoutStats = () => {
    // const { workout } = valueGroups;
    let workout = valueGroups.workout;

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

        if (workout === 'leisure bicycling') {
          workout = 'Average Speed <10 mph';
        }
        if (workout === 'mph, light') {
          workout = 'Average Speed 10-12 mph';
        }
        if (`${workout}` === '13.9 mph, moderate') {
          workout = 'Average Speed 12-14 mph';
        }
        if (`${workout}`=== '15.9 mph, vigorous') {
          workout = 'Average Speed 14-16 mph';
        }
        if (`${workout}` === 'very fast, racing') {
          workout = 'Average Speed 16-19 mph';
        }
        if (`${workout}` === '>20 mph, racing') {
          workout = 'Average Speed 20+ mph';
        }
        if (`${workout}` === 'mountain bike') {
          workout = 'Mountain Biking';
        }

        navigate('/Profile', {state:{
          stopwatchActivity: workout,
          stopwatchDuration: totalTime,
          stopwatchCalories: total_calories
        }

        })


        console.log(response);
        axios
          .post('profile/workout', {
            activity: `${workout}`,
            duration: totalTime,
            weight: weight,
            calories: total_calories,
          })
          .then(() => {
          })
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
    </div>
  );
};

export default StopwatchStats;