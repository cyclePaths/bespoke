import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import { exiledRedHeadedStepChildrenOptionGroups } from '../../../profile-assets';
import StatsDisplay from './StatsDisplay';

const Stats = () => {
  const [open, setOpen] = React.useState(false);
  const [speed, setSpeed] = React.useState<number | string>('');
  const [stats, setStats] = React.useState([]);
  const [isStatsDisplayed, setIsStatsDisplayed] = React.useState(false);
  const { workout } = exiledRedHeadedStepChildrenOptionGroups;


  const handleChange = (event: SelectChangeEvent<typeof speed>) => {
    setSpeed(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setIsStatsDisplayed(false);
  };

  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const getStats = () => {
    axios
      .get('/profile/stats', {
        params: {
          speed: speed,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setStats(data);
        setIsStatsDisplayed(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGridClose = () => {
    setIsStatsDisplayed(false);
  };

  return (
    <>
      <div className='select-stats'>
        <Button variant='contained' color='success' onClick={handleClickOpen}>
          Select Stats
        </Button>
      </div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}

          >
          <DialogTitle
    className='select-stats-dialog'

          >Select Rides By Speed</DialogTitle>
          <DialogContent
          className='select-stats-dialog'
          >
            <Box component='form' sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <FormControl sx={{ m: 1, minWidth: 120 }}

              >
                <InputLabel htmlFor='demo-dialog-native'>Ride Speed</InputLabel>
                <Select
                  native
                  value={speed}
                  onChange={handleChange}
                  input={
                    <OutlinedInput label='Ride Speed' id='demo-dialog-native' />
                  }
                >
                  <option aria-label='None' value='' />
                  {workout.map((activity) => {
                    return (
                      <React.Fragment key={activity.value}>
                        <option value={activity.label}>{activity.label}</option>
                      </React.Fragment>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions
            className='select-stats-dialog'
          >
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={(event) => {
                handleClose(event, 'ok'), getStats();
              }}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        {isStatsDisplayed && <StatsDisplay
        stats={stats}
        handleGridClose={handleGridClose}
        handleClickOpen={handleClickOpen}
        />}
      </div>
    </>
  );
};

export default Stats;
