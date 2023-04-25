import React, { useState, useEffect, useContext, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Home from '../Home';
import StopwatchStats from './StopwatchStats';
import { ThemeButton } from 'styled-components';
import { ThemeContext, ThemeProvider } from './ThemeContext';
import styled from 'styled-components';

import Addresses from './Addresses';
import Picker from 'react-scrollable-picker';
// import Picker from 'react-mobile-picker';
import { UserContext } from '../../Root';
import {
  exiledRedHeadedStepChildrenOptionGroups,
  exiledRedHeadedStepChildrenValueGroups,
} from '../../../profile-assets';

//Setting state types
export type Address = string;
export type SelectedAddress = string;
export type HomeAddress = string;
export type Weight = number;

interface Option {
  value: string;
  label: string;
}

interface OptionGroup {
  [key: string]: Option[];
}

export interface ValueGroup {
  [key: string]: string;
}

export interface RideStats {
  activity: string;
  duration: number;
  weight: number;
  calories: number;
}

const Profile = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const [greeting, setGreeting] = useState('');
  const [address, setAddress] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [weightValue, setWeightValue] = useState(0);
  const [weight, setWeight] = useState(0);
  const [rideStats, setRideStats] = useState<RideStats>({
    activity: '',
    duration: 0,
    weight: 0,
    calories: 0,
});

  const [optionGroups, setOptionGroups] = useState<OptionGroup>(
    exiledRedHeadedStepChildrenOptionGroups
  );

  const [valueGroups, setValueGroups] = useState<ValueGroup>(
    exiledRedHeadedStepChildrenValueGroups
  );

  const user = useContext(UserContext);

  const handleToggleTheme = () => {
    toggleTheme();
  };

  const location = useLocation();
  let stopwatchActivity = location.state && location.state.stopwatchActivity;
  const stopwatchDuration = location.state && location.state.stopwatchDuration;
  const stopwatchCalories = location.state && location.state.stopwatchCalories;
  console.log('Is this activity?', stopwatchActivity)
  console.log(stopwatchDuration)
  console.log(stopwatchCalories)



  if (stopwatchActivity !== '' && stopwatchDuration > 0 && stopwatchCalories > 0) {
    if (stopwatchActivity === 'leisure bicycling') {
      stopwatchActivity = 'Average Speed <10 mph';
    }
    if (stopwatchActivity === 'mph, light') {
      stopwatchActivity = 'Average Speed 10-12 mph';
    }
    if (stopwatchActivity === '13.9 mph, moderate') {
      stopwatchActivity = 'Average Speed 12-14 mph';
    }
    if (stopwatchActivity === '15.9 mph, vigorous') {
      stopwatchActivity = 'Average Speed 14-16 mph';
    }
    if (stopwatchActivity === 'very fast, racing') {
      stopwatchActivity = 'Average Speed 16-19 mph';
    }
    if (stopwatchActivity === '>20 mph, racing') {
      stopwatchActivity = 'Average Speed 20+ mph';
    }
    if (stopwatchActivity === 'mountain bike') {
      stopwatchActivity = 'Mountain Biking';
    }
    rideStats.activity = stopwatchActivity;
    rideStats.duration = stopwatchDuration;
    rideStats.weight = weight;
    rideStats.calories = stopwatchCalories;
  };
  console.log('RideStats', rideStats)

  const workoutStatsRequest = () => {
    const { durationHours, durationMinutes } = valueGroups;
    const numberHours = Number(durationHours);
    const numberMinutes = Number(durationMinutes);
    const totalTime = numberHours + numberMinutes;
    axios
      .get('/profile/workout', {
        params: {
          activity: `${valueGroups.workout}`,
          duration: totalTime,
          weight: weight,
        },
      })
      // console.log('Successful GET of Calories');
      .then(({ data }) => {
        const { total_calories } = data;
        console.log('WHAT IS THE DATA?', data);
        if (`${valueGroups.workout}` === 'leisure bicycling') {
          valueGroups.workout = 'Average Speed <10 mph';
        }
        if (`${valueGroups.workout}` === 'mph, light') {
          valueGroups.workout = 'Average Speed 10-12 mph';
        }
        if (`${valueGroups.workout}` === '13.9 mph, moderate') {
          valueGroups.workout = 'Average Speed 12-14 mph';
        }
        if (`${valueGroups.workout}` === '15.9 mph, vigorous') {
          valueGroups.workout = 'Average Speed 14-16 mph';
        }
        if (`${valueGroups.workout}` === 'very fast, racing') {
          valueGroups.workout = 'Average Speed 16-19 mph';
        }
        if (`${valueGroups.workout}` === '>20 mph, racing') {
          valueGroups.workout = 'Average Speed 20+ mph';
        }
        if (`${valueGroups.workout}` === 'mountain bike') {
          valueGroups.workout = 'Mountain Biking';
        }

        setRideStats(data)

        setRideStats({
          activity: `${valueGroups.workout}`,
          duration: totalTime,
          weight: weight,
          calories: total_calories,
        });
        axios
          .post('profile/workout', {
            activity: `${valueGroups.workout}`,
            duration: totalTime,
            weight: weight,
            calories: total_calories,
          })
          .then(({ data }) => {
            console.log('Am I HERE?', data)

          })
          .catch((err) => {
            console.log('Could not post stats', err);
          });
      })
      .catch((err) => {
        console.log('Failed to GET Calories', err);
      });
  };

  const handleChange = (exercise: string, value: string) => {
    setValueGroups((prevValueGroups) => ({
      ...prevValueGroups,
      [exercise]: value,
    }));
  };

  const enterWeight = () => {
    axios
      .post('/profile/weight', {
        weight: weightValue,
      })
      .then((response) => {
        const input = document.getElementById('weight-input');
        if (input instanceof HTMLInputElement) {
          input.value = '';
          input.blur();
        }
      })
      .catch((err) => {
        console.log('Failed to input weight', err);
      });
  };


  useEffect(() => {
    if (user && user.name) {
      setGreeting(`Hello ${user.name}`);
    }
    // ...
  }, [user]);


  useEffect(() => {
    setGreeting( `Hello ${user.name}`);

    axios.get('/profile/weight').then(({ data }) => {
      setWeight(data.weight);
      console.log(data.weight, 'HEYYYYY');
    });
    axios.get('/profile/lastRide').then(({ data }) => {
      console.log('DATA', data);
      if (data.activity === 'leisure bicycling') {
        data.activity = 'Average Speed <10 mph';
      }
      if (data.activity === 'mph, light') {
        data.activity = 'Average Speed 10-12 mph';
      }
      if (data.activity === '13.9 mph, moderate') {
        data.activity = 'Average Speed 12-14 mph';
      }
      if (data.activity === '15.9 mph, vigorous') {
        data.activity = 'Average Speed 14-16 mph';
      }
      if (data.activity === 'very fast, racing') {
        data.activity = 'Average Speed 16-19 mph';
      }
      if (data.activity === '>20 mph, racing') {
        data.activity = 'Average Speed 20+ mph';
      }
      if (data.activity === 'mountain bike') {
        data.activity = 'Mountain Biking';
      }

      setRideStats(data);
    });
  }, []);


  return (
    <ThemeProvider theme={theme}>
    <div>
      <div>{greeting}</div>
      <img
      style={{borderRadius: '50%', width: '100px', height: '100px'}}
      src={user.thumbnail} alt='avatar'/>
      <div>
        <Addresses
          address={address}
          setAddress={setAddress}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          homeAddress={homeAddress}
          setHomeAddress={setHomeAddress}
        />
      </div>
      <div>
      <ThemeButton onClick={handleToggleTheme}>Toggle Theme</ThemeButton>
      <h1 style={{ color: theme.text }}>Hello World!</h1>
      <p style={{ color: theme.text }}>
        This is an example of styled components with themes.
      </p>
    </div>
    <div>

      <div style={{ position: 'absolute', marginTop: 20 }}>
        <ul>
          <li style={{ listStyleType: 'none' }}>
            {rideStats && `Your last ride was an ${rideStats.activity}`}
          </li>
          <li style={{ listStyleType: 'none' }}>
            {rideStats &&
              `You rode for ${Math.floor(rideStats.duration / 60)} hours and ${
                rideStats.duration % 60
              } minutes`}
          </li>
          <li style={{ listStyleType: 'none' }}>
            {rideStats &&
              `Your weight for this ride was ${rideStats.weight} lbs`}
          </li>
          <li style={{ listStyleType: 'none' }}>
            {rideStats && (
              <>
                You burned {rideStats.calories} calories!
                <br />
                Let's ride some more!
              </>
            )}
          </li>
        </ul>
      </div>
    </div>
      <div style={{ position: 'relative', marginTop: 100 }}>
        <Picker
          optionGroups={optionGroups}
          valueGroups={valueGroups}
          onChange={handleChange}
        />
        <div>
          <button
            type='button'
            onClick={() => {
              workoutStatsRequest(),
                setValueGroups(exiledRedHeadedStepChildrenValueGroups);
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <div
        id='weight'
        className='weight'
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'fixed',
          bottom: 60,
          left: 0,
          right: 0,
        }}
      >
        {/* <div style={{ marginRight: 10 }}>Weight: {weight} lbs</div> */}
        <div>
          <input
            id='weight-input'
            placeholder='update...'
            onChange={(event) => setWeightValue(Number(event.target.value))}
          ></input>
          <button
            type='button'
            onClick={() => {
              enterWeight(), setWeight(weightValue);
            }}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
};

export default Profile;
