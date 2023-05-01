import React, { useState, useEffect, useContext, createContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from '../Home';
import StopwatchStats from './StopwatchStats';
import styled from 'styled-components';
import { useTheme } from './ThemeContext';
// import { ToggleSwitch } from '../../StyledComp';
import { ToggleSwitch } from '../../ThemeStyles';
// import { GlobalStyleLight, GlobalStyleDark } from './ThemeStyles';
import { BadgesOnUsers, Badge } from '@prisma/client';
import Addresses from './Addresses';
import Picker from 'react-scrollable-picker';
// import Picker from 'react-mobile-picker';
import Scrollers from './Scrollers';
import '../../styles.css';
import { UserContext } from '../../Root';
import {
  exiledRedHeadedStepChildrenOptionGroups,
  exiledRedHeadedStepChildrenValueGroups,
} from '../../../profile-assets';
import { BandAid } from '../../StyledComp';
import {
  AchievementBadgeByName,
  AchievementBadge,
  AchievementBadgeHolder,
} from '../../StyledComp';
import { useRadioGroup } from '@material-ui/core';

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

const Profile = ({ handleToggleStyle, isDark, setIsDark }) => {
  //Context
  const {
    userBadges,
    setUserBadges,
    getBadgesOnUser,
    selectedBadge,
    setSelectedBadge,
    tickBadgeCounter,
    addBadge,
    tierCheck,
  } = useContext(UserContext);
  //State values with useState hook.
  const [user, setUser] = useState(true);
  const [theme, setTheme] = useState();
  const [photo, setPhoto] = useState('');
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

  //holds toggle-able value to control whether badges are displaying on profile page or not
  const [badgeDisplay, setBadgeDisplay] = useState<string>('none');
  //temporary - used for manually adding badges
  const [tier, setTier] = useState(0);
  const [inputBox, setInputBox] = useState('');

  //functions

  const saveTheme = () => {
    axios.post('/profile/theme', {
      theme: isDark,
    });
  };

  // const navigate = useNavigate();

  /////////////////////////////////////////////////////////////////////////
  ////// This function grabs ride stats from StopwatchStats.tsx////////////
  const location = useLocation();
  let stopwatchActivity = location.state && location.state.stopwatchActivity;
  const stopwatchDuration = location.state && location.state.stopwatchDuration;
  const stopwatchCalories = location.state && location.state.stopwatchCalories;

  if (
    stopwatchActivity !== '' &&
    stopwatchDuration > 0 &&
    stopwatchCalories > 0
  ) {
    rideStats.activity = stopwatchActivity;
    rideStats.duration = stopwatchDuration;
    rideStats.weight = weight;
    rideStats.calories = stopwatchCalories;
  }
  //.................................................

  /////////////////////////////////////////////////////////////////////////
  /*
 This function makes an API request to get calories stats. It then posts
 those stats to the database and then the server sends back the stats
 to display on the page.
 */
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
      .then(({ data }) => {
        const { total_calories } = data;
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

        setRideStats(data);
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
          .then(({ data }) => {})
          .catch((err) => {
            console.log('Could not post stats', err);
          });
      })
      .catch((err) => {
        console.log('Failed to GET Calories', err);
      });
  };
  //........................................................

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

  //show/hide badges on user profile page
  const badgesToggle = () => {
    if (badgeDisplay === 'none') {
      setBadgeDisplay('block');
    } else {
      setBadgeDisplay('none');
    }
    document.getElementById('badges')!.style.display = badgeDisplay;
  };

  const displayNoBadgeIfEmpty = () => {
    if (
      selectedBadge &&
      selectedBadge !==
        'https://www.baptistpress.com/wp-content/uploads/images/IMG201310185483HI.jpg'
    ) {
      return <AchievementBadgeByName src={selectedBadge} />;
    }
  };

  ///////////////////////////////////////////////////////////
  /*
Elements that should render on loading the page
Name, Weight, Thumbnail, Theme Preference, Most recent Ride
*/
  useEffect(() => {
    axios
      .get('/profile/user')
      .then(({ data }) => {
        let splitNames = data.name.split(' ');
        setUser(splitNames[0]);
        setPhoto(data.thumbnail);
        setTheme(data.theme);
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get('/profile/weight').then(({ data }) => {
      setWeight(data.weight);
    });
    axios.get('/profile/lastRide').then(({ data }) => {
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
      getBadgesOnUser();
      badgesToggle(); //fixes weird problem where first trigger of this function does not work for some reason; now first trigger is on load!
    });
  }, []);

  useEffect(() => {}, [inputBox]);

  useEffect(() => {}, [tier]);

  //..................................................

  return (
    <BandAid>
      <div>{`Hello ${user}!`}</div>
      <div>{displayNoBadgeIfEmpty()}</div>
      <img
        style={{ borderRadius: '50%', width: '100px', height: '100px' }}
        src={photo}
        alt='avatar'
      />

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
      <div id='profile'>
        {/* <button onClick={() => {
        handleToggleStyle(),
        saveTheme()
        }
        }>{isDark ? 'Light Mode' : 'Dark Mode'}</button> */}
        <ToggleSwitch>
          <input
            type='checkbox'
            onChange={() => {
              handleToggleStyle(), saveTheme();
            }}
          />
          <span />
        </ToggleSwitch>
        {/* <div className='toggle-switch'>
        <ToggleSwitch>
          <input
            type='checkbox'
            onChange={() => {
              handleToggleStyle(), saveTheme();
            }}
          />
          <span />
        </ToggleSwitch>
        {/* <div className='toggle-switch'>
      <input className='toggle-switch' type="checkbox"  onChange={() => {handleToggleStyle(), saveTheme()}}/>
      <span />
    </div> */}

    </div>

    <div>

      {/* <div style={{ position: 'absolute', marginTop: 20 }}>
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
      </div> */}

    </div>

<Scrollers />

      {/* </div> */}

      <div>Achievement Badges:</div>

      <button onClick={badgesToggle}>Show Badges</button>
      <button
        onClick={() => {
          addBadge(inputBox, tier);
        }}
      >
        Add Badge
      </button>
      <input
        type='text'
        onChange={(event) => {
          setInputBox(event.target.value);
        }}
      ></input>
      <select
        onChange={(event) => {
          setTier(parseInt(event.target.value));
        }}
      >
        <option value={0}>No Tier</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </select>

      <AchievementBadgeHolder id='badges'>
        {userBadges.map((badge) => {
          if (badge.badgeIcon !== 'url') {
            return (
              <AchievementBadge
                key={badge.id}
                onClick={() => {
                  setSelectedBadge(badge.badgeIcon);
                }}
                src={badge.badgeIcon}
              />
            );
          }
        })}
      </AchievementBadgeHolder>
      <div>
        <div style={{ position: 'absolute', marginTop: 20 }}>
          <ul>
            <li style={{ listStyleType: 'none' }}>
              {rideStats && `Your last ride was an ${rideStats.activity}`}
            </li>
            <li style={{ listStyleType: 'none' }}>
              {rideStats &&
                `You rode for ${Math.floor(
                  rideStats.duration / 60
                )} hours and ${rideStats.duration % 60} minutes`}
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
    </BandAid>
  );
};

export default Profile;
