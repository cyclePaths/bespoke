import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';
import Addresses from './Addresses';
import Picker from 'react-scrollable-picker';
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

const Profile: React.FC = () => {
  //setting state with hooks
  const [address, setAddress] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [greeting, setGreeting] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [weightValue, setWeightValue] = useState(0);
  const [weight, setWeight] = useState(0);

  const [optionGroups, setOptionGroups] = useState<OptionGroup>(
    exiledRedHeadedStepChildrenOptionGroups
  );

  const [valueGroups, setValueGroups] = useState<ValueGroup>(
    exiledRedHeadedStepChildrenValueGroups
  );

  useEffect(() => {
    axios
      .get('/profile/user')
      .then((response) => {
        console.log('Successful GET of user', response.data);
      })
      .catch((err) => {
        console.log('Could not GET user', err);
      });
  }, []);

  const workoutStatsRequest = () => {
    const { workout, durationHours, durationMinutes } = valueGroups;
    const numberHours = Number(durationHours);
    const numberMinutes = Number(durationMinutes);
    const totalTime = numberHours + numberMinutes;
    axios
      .get('/profile/workout', {
        params: {
          activity: `${workout}`,
          duration: numberHours + numberMinutes,
          weight: weight,
        },
      })
      // console.log('Successful GET of Calories');
      .then((response) => {
        const { total_calories } = response.data;
        console.log(response);
        axios
          .post('profile/workout2', {
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

  const user = useContext(UserContext);

  let userGreeting = `Hello ${user.name}`;

  useEffect(() => {
    axios.get('/profile/weight').then(({ data }) => {
      setWeight(data.weight);
      console.log(data.weight, 'HEYYYYY');
    });
  }, []);

  return (
    <div>
      <div>{userGreeting}</div>
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
        <Picker
          optionGroups={optionGroups}
          valueGroups={valueGroups}
          onChange={handleChange}
        />
        <div>
          <button type='button' onClick={() => {workoutStatsRequest(), setValueGroups(exiledRedHeadedStepChildrenValueGroups);}}>
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
        <div style={{ marginRight: 10 }}>Weight: {weight} lbs</div>
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
  );
};

export default Profile;
