import * as React from 'react';
import { UserContext } from '../../Root';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { exiledRedHeadedStepChildrenOptionGroups } from '../../../profile-assets';
import StatsDisplay from './StatsDisplay';

const Stats = () => {
  const [open, setOpen] = React.useState(false);
  const [speed, setSpeed] = React.useState<number | string>('');
  const [stats, setStats] = React.useState([]);
  const [isStatsDisplayed, setIsStatsDisplayed] = React.useState(false);
  const { workout } = exiledRedHeadedStepChildrenOptionGroups;

  // User Context //
  const { isDark } = React.useContext(UserContext);

  const handleChange = (event: SelectChangeEvent<typeof speed>) => {
    setSpeed(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setIsStatsDisplayed(false);
  };

  const handleClose = () => {
    setOpen(false);
    setSpeed('');
  };

  const handleGridClose = () => {
    setIsStatsDisplayed(false);
  };

  const handleOkClick = () => {
    getStats();
    setSpeed('');
  };

  const getStats = () => {
    axios
      .get('/profile/stats', {
        params: {
          speed: speed,
        },
      })
      .then(({ data }) => {
        console.log('unique', data);
        setStats(data);
        setIsStatsDisplayed(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    <>
      <ThemeProvider theme={theme}>
        <div className='select-stats'>
          <Button variant='contained' color='success' onClick={handleClickOpen}>
            Select Stats
          </Button>
        </div>
        <div>
          <Dialog
            sx={{
              '& .MuiPaper-root': {
                margin: '10px',
                padding: '10px',
                color: isDark ? 'white' : 'black',
                background: isDark
                  ? 'linear-gradient(145deg, #1e2062, #030312)'
                  : 'linear-gradient(145deg, #3cc6f6, #d8f1ff)',
                boxShadow: isDark
                  ? '1.25em 1.25em 3.75em rgb(40, 43, 113), -0.625em -0.625em 1.3125em #282b71'
                  : '-8px 2px 6px rgba(0, 0, 0, 0.3)',
                '&.Mui-focused': {
                  boxShadow: isDark
                    ? '1.25em 1.25em 3.75em rgb(40, 43, 113), -0.625em -0.625em 1.3125em #282b71'
                    : '-8px 2px 6px rgba(0, 0, 0, 0.3)',
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              },

            }}
            open={open}
            onClose={handleClose}
          >
            <DialogTitle
              className='select-stats-dialog'
              sx={{ color: isDark ? 'white' : 'black', }}
            >
              Select Rides By Speed
            </DialogTitle>
            <DialogContent className='select-stats-dialog' sx={{ margin: '0' }}>
              <Box component='form' sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <FormControl
                  sx={{
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
                >
                  <InputLabel
                    htmlFor='demo-dialog-native'
                    sx={{
                      color: isDark ? 'white' : 'black',
                      '&.Mui-focused': {
                        color: isDark ? 'white' : 'black',
                      },
                    }}
                  >
                    Ride Speed
                  </InputLabel>
                  <Select
                    value={speed}
                    onChange={handleChange}
                    input={
                      <OutlinedInput
                        label='Ride Speed'
                        id='demo-dialog-native'
                      />
                    }
                    sx={{ width: 200, color: isDark ? 'white' : 'black', }}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {workout.map((activity) => {
                      return (
                        <MenuItem key={activity.value} value={activity.label}>
                          {activity.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions
              className='select-stats-dialog'
              sx={{ justifyContent: 'center', }}
            >
              <Button
                color='success'
                variant='contained'
                onClick={(event) => {
                  handleOkClick();
                  handleClose();
                }}
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
          {isStatsDisplayed && (
            <StatsDisplay
              stats={stats}
              handleGridClose={handleGridClose}
              handleClickOpen={handleClickOpen}
            />
          )}
        </div>
      </ThemeProvider>
    </>
  );
};

export default Stats;
