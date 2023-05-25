import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { OutlinedInput } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Stopwatch from './Stopwatch';
import { exiledRedHeadedStepChildrenOptionGroups } from '../../../profile-assets';

export type Activity = {
  activity: string;
  //  setActiveWatch: React.Dispatch<React.SetStateAction<boolean>>;
}

const StopwatchSelect = ({ activity, setActivity, activityValue, setActivityValue, isDark }) => {

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
  }, [activity, activityValue]);


  const theme = createTheme({
    components: {
      MuiSelect: {
        styleOverrides: {
          icon: {
            color: isDark ? 'white' : 'black',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <FormControl  sx={{
    m: 1,
    minWidth: 120,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: isDark ? 'white' : 'rgb(117, 117, 117)',
      },
      '&:hover fieldset': {
        borderColor: isDark ? 'white' : 'rgb(117, 117, 117)',
      },
      '&.Mui-focused fieldset': {
        borderColor: isDark ? 'white' : 'rgb(117, 117, 117)',
      },
    },
  }}
      size='small'
      variant="outlined"
      >
        <InputLabel
        id='demo-select-small-label'
        sx={{
          color: isDark ? 'white' : 'black',
          '&.Mui-focused': {
            color: isDark ? 'white' : 'black',
          },
        }}
        >Ride Speed</InputLabel>
        <Select
          labelId='demo-select-small-label'
          id='demo-select-small'
          value={activity.value}
          label='Select Workout'
          onChange={handleChange}
          sx={{
            '.MuiOutlinedInput-root': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: isDark ? 'white' : 'black',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: isDark ? 'white' : 'black',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: isDark ? 'white' : 'black',
              },
            }
          }}
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
    </div>
    </ThemeProvider>
  );
};

export default StopwatchSelect;
