import React, { useState, useEffect, useContext, createContext } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Profile, { RideStats } from './Profile';
import Root, { UserContext } from '../../Root';
import { exiledRedHeadedStepChildrenValueGroups } from '../../../profile-assets';
import Button from '@mui/material/Button';

export type StopwatchActivity = string;
export type StopwatchDuration = number;
export type StopwatchWeight = number;
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
  swActivity,
  isPickerVisible,
  setIsPickerVisible,
  setValueGroups,
}) => {
  const user = useContext(UserContext);

 const [weight, setWeight] = useState(0);

  let totalTime = 0;

  if (seconds < 30) {
    totalTime = hours * 60 + minutes;
  } else if (seconds >= 30) {
    totalTime = hours * 60 + (minutes + 1);
  }

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/profile/weight')
      .then(({ data }) => {
       setWeight(data.weight)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const workoutStats = () => {
    // const { workout } = valueGroups;
    // let workout = valueGroups.workout;
    let workout = swActivity;

    axios
      .get('/profile/workout', {
        params: {
          // activity: `${workout}`,
          activity: swActivity,
          duration: totalTime,
          weight: weight,
        },
      })
      .then((response) => {

        // console.log('response', response)

        const { total_calories } = response.data;

        if (workout === 'leisure bicycling') {
          workout = '<10 mph average';
        }
        if (workout === 'mph, light') {
          workout = '10-12 mph average';
        }
        if (`${workout}` === '13.9 mph, moderate') {
          workout = '12-14 mph average';
        }
        if (`${workout}` === '15.9 mph, vigorous') {
          workout = '14-16 mph average';
        }
        if (`${workout}` === 'very fast, racing') {
          workout = '16-19 mph average';
        }
        if (`${workout}` === '>20 mph, racing') {
          workout = '20+ mph average';
        }
        if (`${workout}` === 'mountain bike') {
          workout = 'Mountain Biking';
        }

        navigate('/Profile', {
          state: {
            stopwatchActivity: workout,
            stopwatchDuration: totalTime,
            stopwatchWeight: weight,
            stopwatchCalories: total_calories,
          },
        });

        axios
          .post('profile/workout', {
            activity: workout,
            duration: totalTime,
            weight: weight,
            calories: total_calories,
          })
          .then(() => {})
          .catch((err) => {
            console.error('Could not post stats', err);
          });
      })
      .catch((err) => {
        console.error(err, 'got no response');
      });
  };

  return (
    <div>
      <div>
        {isPickerVisible && (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Button
            // sx={{background:
            //   'linear-gradient(128deg, rgb(123, 231, 149) 0%, rgb(42, 164, 71) 100%) rgb(104, 194, 125)',}}
            className='submit-button'
            variant="contained"
            size="small"
            color="success"
              type='button'
              onClick={() => {
                workoutStats();
                setIsPickerVisible(false);
                setValueGroups(exiledRedHeadedStepChildrenValueGroups);
              }}
            >
              Send Stats
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StopwatchStats;
