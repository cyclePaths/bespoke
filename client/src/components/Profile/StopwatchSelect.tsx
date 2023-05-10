import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stopwatch from './Stopwatch';
import { exiledRedHeadedStepChildrenOptionGroups } from '../../../profile-assets';

export type Activity = {
  activity: string;
  //  setActiveWatch: React.Dispatch<React.SetStateAction<boolean>>;
}

const StopwatchSelect = ({ activity, setActivity, activityValue, setActivityValue }) => {
  const [age, setAge] = React.useState('');
  // const [activity, setActivity] = React.useState('');

  const { workout } = exiledRedHeadedStepChildrenOptionGroups;

  const handleChange = (event: SelectChangeEvent) => {
    setActivity(event.target.value);
  };

  React.useEffect(() => {
    for (let i = 0; i < workout.length; i++) {
      if (workout[i].label === activity) {
        setActivityValue(workout[i].value)
      }
    }
    console.log('watch', activity);
    console.log('watchagain', activityValue)
  }, [activity, activityValue]);

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
        <InputLabel id='demo-select-small-label'>Ride Speed</InputLabel>
        <Select
          labelId='demo-select-small-label'
          id='demo-select-small'
          // value={activity.value}
          label='Select Workout'
          onChange={handleChange}
        >
          <MenuItem value='' />
          {workout.map((activity) => (
            <MenuItem
              key={activity.value}
              value={activity.label}
              // onChange={(event) => handleChange(event.target.value)}
            >
              {activity.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <Stopwatch activity={activity}   /> */}
    </>
  );
};

export default StopwatchSelect;
