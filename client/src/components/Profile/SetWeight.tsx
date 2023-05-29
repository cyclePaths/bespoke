import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../Root';
import ProfileNav from './ProfileNav';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
// import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});



  const SetWeight = ({ onWeightChange, weightMessage, setWeightMessage }) => {

  const [weightValue, setWeightValue] = useState(0);
  const [weight, setWeight] = useState(0);
  const [openWeight, setOpenWeight] = useState(false);
  const [alertTypeWeight, setAlertTypeWeight] = useState<
    'success' | 'error' | 'warning' | null
  >(null);
  // const [noWeightWarning, setNoWeightWarning] = useState(false);
  // const [weightMessage, setWeightMessage] = useState('');
  const [userId, setUserId] = useState(0);
  const [showDelete, setShowDelete] = useState(false);

    // User Context //
  const { isDark } = useContext(UserContext);

  const goodSet = `Current weight is ${weight} lbs`;
  const badSet = 'Weight must be 50 lbs or higher to track calories!';


  const enterWeight = () => {
    if (weightValue >= 50) {
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
          alertOnClick();
          setWeightMessage(goodSet);
          setShowDelete(true);
          setAlertTypeWeight('success');
        })
        .catch((err) => {
          console.log('Failed to input weight', err);
        });
    } else {
      const input = document.getElementById('weight-input');
      if (input instanceof HTMLInputElement) {
        input.value = '';
        input.blur();
      }
      // setWeightMessage(badSet)
      setAlertTypeWeight('error');
      alertOnClick();
    }
  };

  useEffect(() => {
    axios.get('/profile/weight').then(({ data }) => {
      console.log('Data', data.weight);
      if (data.weight === null) {
        setWeightMessage(badSet);
        setOpenWeight(true);
        // setAlertTypeWeight('warning');
      } else {
        setWeight(data.weight);
        setWeightMessage(goodSet);
        setShowDelete(true);
      }
    });
  }, [weight]);

  useEffect(() => {
    axios
      .get('/profile/user')
      .then(({ data }) => {
        console.log('my id', data.id);
        setUserId(data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const alertOnClick = () => {
    setOpenWeight(true);
  };

  const handleCloseWeight = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenWeight(false);
  };

  const deleteWeight = () => {
    axios
      .delete(`/profile/deleteWeight/${userId}`, {})
      .then(() => {
        setWeightMessage(badSet);
        setShowDelete(false);
        console.log('successful delete');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className='weight-parent'>
        <Box
          component='form'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            // alignItems: 'center',
            // '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete='off'
        >
          <h4 className='current-weight'>{weightMessage}</h4>
          <div className='delete-weight'>
            {showDelete && (
              <Button
                size='small'
                variant='outlined'
                color='error'
                onClick={deleteWeight}
              >
                DELETE
              </Button>
            )}
          </div>
          <div className='weight-input'>
            <TextField
              id='weight-input'
              variant='standard'
              inputProps={{
                style: { color: isDark ? '#ffffff' : '#000000' },
              }}
              placeholder='Update Weight...'
              onChange={(event) => setWeightValue(Number(event.target.value))}
            />

            <Stack direction='row' spacing={5}>
              <Button
                className='saveWeight'
                color='success'
                variant='contained'
                type='button'
                onClick={() => {
                  enterWeight();
                  setWeight(weightValue);
                }}
              >
                Enter
              </Button>
            </Stack>
          </div>
        </Box>
      </div>
      <div className='custom-snackbar'>
        {alertTypeWeight === 'success' && (
          <Snackbar
            open={openWeight}
            autoHideDuration={5000}
            onClose={handleCloseWeight}
            // anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            sx={{ bottom: '150px' }}
          >
            <Alert
              onClose={handleCloseWeight}
              severity='success'
              sx={{ width: '100vw' }}
            >
              Weight successfully updated!
            </Alert>
          </Snackbar>
        )}
        {alertTypeWeight === 'error' && (
          <Snackbar
            open={openWeight}
            autoHideDuration={5000}
            onClose={handleCloseWeight}
            // anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            sx={{ bottom: '150px' }}
          >
            <Alert
              onClose={handleCloseWeight}
              severity='error'
              sx={{ width: '100%' }}
            >
              Weight must be above 50 lbs to track calories!
            </Alert>
          </Snackbar>
        )}

        {/* {noWeightWarning === true && ( */}
        {alertTypeWeight === 'warning' && (
          <Snackbar
            open={openWeight}
            autoHideDuration={5000}
            onClose={handleCloseWeight}
            // anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            sx={{ bottom: '150px' }}
          >
            <Alert
              onClose={handleCloseWeight}
              severity='warning'
              sx={{ width: '100%' }}
            >
              Enter a weight so you can track your stats!
            </Alert>
          </Snackbar>
        )}
      </div>
    </>
  );
};

export default SetWeight;
