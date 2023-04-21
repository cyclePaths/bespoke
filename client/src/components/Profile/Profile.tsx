import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Addresses from './Addresses';
import Picker from 'react-scrollable-picker';
// import { HTMLElement } from 'lib.dom';

//Setting state types
export type Address = string;
export type SelectedAddress = string;

// const optionGroups = {};
// const valueGroups = {};

interface Option {
  value: string;
  label: string;
}

interface OptionGroup {
  [key: string]: Option[];
}

interface ValueGroup {
  [key: string]: string;
}

// interface ExerciseState {
//   optionGroups: OptionGroup;
//   valueGroups: ValueGroup;
// }

const Profile: React.FC = () => {
  //setting state with hooks
  const [address, setAddress] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [optionGroups, setOptionGroups] = useState<OptionGroup>({
    workout: [
      { value: '', label: 'Average Speed' },
      { value: 'leisure bicycling', label: '<10 mph' },
      { value: 'mph, light', label: '10-12 mph' },
      { value: '13.9 mph, moderate', label: '12-14 mph' },
      { value: '15.9 mph, vigorous', label: '14-16 mph' },
      { value: 'very fast, racing', label: '16-19 mph' },
      { value: '>20 mph, racing', label: '20+ mph' },
      { value: 'mountain bike', label: 'Mountain Biking' },
    ],
    durationHours: [
      { value: '0', label: 'hours' },
      { value: '60', label: '1' },
      { value: '120', label: '2' },
      { value: '180', label: '3' },
      { value: '240', label: '4' },
      { value: '300', label: '5' },
      { value: '360', label: '6' },
      { value: '420', label: '7' },
      { value: '480', label: '8' },
      { value: '540', label: '9' },
      { value: '600', label: '10' },
      { value: '660', label: '11' },
      { value: '720', label: '12' },
      { value: '780', label: '13' },
      { value: '840', label: '14' },
      { value: '900', label: '15' },
      { value: '960', label: '16' },
      { value: '1020', label: '17' },
      { value: '1080', label: '18' },
      { value: '1140', label: '19' },
      { value: '1200', label: '20' },
      { value: '1260', label: '21' },
      { value: '1320', label: '22' },
      { value: '1380', label: '23' },
      { value: '1440', label: '24' },
    ],
    durationMinutes: [
      { value: '0', label: 'minutes' },
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
      { value: '5', label: '5' },
      { value: '6', label: '6' },
      { value: '7', label: '7' },
      { value: '8', label: '8' },
      { value: '9', label: '9' },
      { value: '10', label: '10' },
      { value: '11', label: '11' },
      { value: '12', label: '12' },
      { value: '13', label: '13' },
      { value: '14', label: '14' },
      { value: '15', label: '15' },
      { value: '16', label: '16' },
      { value: '17', label: '17' },
      { value: '18', label: '18' },
      { value: '19', label: '19' },
      { value: '20', label: '20' },
      { value: '21', label: '21' },
      { value: '22', label: '22' },
      { value: '23', label: '23' },
      { value: '24', label: '24' },
      { value: '25', label: '25' },
      { value: '26', label: '26' },
      { value: '27', label: '27' },
      { value: '28', label: '28' },
      { value: '29', label: '29' },
      { value: '30', label: '30' },
      { value: '31', label: '31' },
      { value: '32', label: '32' },
      { value: '33', label: '33' },
      { value: '34', label: '34' },
      { value: '35', label: '35' },
      { value: '36', label: '36' },
      { value: '37', label: '37' },
      { value: '38', label: '38' },
      { value: '39', label: '39' },
      { value: '40', label: '40' },
      { value: '41', label: '41' },
      { value: '42', label: '42' },
      { value: '43', label: '43' },
      { value: '44', label: '44' },
      { value: '45', label: '45' },
      { value: '46', label: '46' },
      { value: '47', label: '47' },
      { value: '48', label: '48' },
      { value: '49', label: '49' },
      { value: '50', label: '50' },
      { value: '51', label: '51' },
      { value: '52', label: '52' },
      { value: '53', label: '53' },
      { value: '54', label: '54' },
      { value: '55', label: '55' },
      { value: '56', label: '56' },
      { value: '57', label: '57' },
      { value: '58', label: '58' },
      { value: '59', label: '59' },
    ],

    // valueGroups: {
    //   workout: 'Averaging 12-14 mph',
    //   duration: '30',
    // },
  });

  const [valueGroups, setValueGroups] = useState<ValueGroup>({
    workout: '',
    durationHours: '',
    durationMinutes: '',
  });

  const [weight, setWeight] = useState(0);

  // console.log(typeof valueGroups)
  console.log(valueGroups.workout);
  console.log(valueGroups.durationHours);
  console.log(valueGroups.durationMinutes);

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

  const calorieRequest = () => {
    const { workout, durationHours, durationMinutes} = valueGroups;
    const numberHours = Number(durationHours);
    const numberMinutes = Number(durationMinutes);
    axios.get('/profile/calories', {
      params: {activity: `${workout}`, weight: weight, duration: (numberHours + numberMinutes)}
    })
      .then(() => {
        console.log('Successful GET of Calories');
      })
      .catch((err) => {
        console.log('Failed to GET Calories', err);
      })

  }

  const handleChange = (exercise: string, value: string) => {
    setValueGroups((prevValueGroups) => ({
      ...prevValueGroups,
      [exercise]: value,
    }));
  };

  const enterWeight = () => {
    axios.post('/profile/weight', {
      weight: weight
    })
      .then(() => {})
      .catch((err) => {
        console.log('Failed to input weight', err)
      })
  }

  useEffect(() => {
    setWeight(200)
  }, [])



  return (
    <div>
      <div>Hello from Profile</div>
      <div>
        <Addresses
          address={address}
          setAddress={setAddress}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
      </div>
      <div
      // className='profile-container' onScroll={handleScroll}
      >
        {/* <div className='average-speed'>Average Speed</div> */}
        <Picker
          optionGroups={optionGroups}
          valueGroups={valueGroups}
          onChange={handleChange}
        />
        <div>
          <button type='button'>Submit</button>
        </div>
      </div>
      <div>Current Weight: {weight} lbs</div>
      <div>
        <input
        placeholder='update...' onChange={(event) => setWeight(Number(event.target.value))}
        >
        </input>
        <button type='button' onClick={() => {enterWeight()}}>Enter</button>
      </div>
      <div>
        <div>New weight:</div>
      </div>
    </div>
  );
};

export default Profile;
