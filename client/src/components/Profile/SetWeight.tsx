import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

interface WeightTabProps {
  weight: number;
  onWeightChange: (value: number) => void;
}

const SetWeight = (props: WeightTabProps) => {
  // const { weightChange, onWeightChange } = props;

  const [weightValue, setWeightValue] = useState(0);
  const [weight, setWeight] = useState(0);
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);
  const [weightMessage, setWeightMessage] = useState('');

  const goodSet = `Current weight is ${weight} lbs`
  const badSet = 'Weight must be 50 lbs or higher to track calories!'

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
        };
        alertOnClick();
      })
      .catch((err) => {
        console.log('Failed to input weight', err);
      });
      setWeightMessage(goodSet)
      setAlertType('success');
      alertOnClick();
    } else {
      const input = document.getElementById('weight-input');
      if (input instanceof HTMLInputElement) {
        input.value = '';
        input.blur();
      };
      setWeightMessage(badSet)
      setAlertType('error');
      alertOnClick();
    }

  };

  useEffect(() => {
    axios.get('/profile/weight').then(({ data }) => {
      console.log(data);
      setWeight(data.weight);
    });
    if (weightValue < 50 && weightValue > 0) {
      setWeightMessage(badSet)
    } else {
      setWeightMessage(goodSet)
    }
    // setWeightMessage(goodSet)
  }, [weight]);

  const alertOnClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <div>
          <Typography className='current-weight'>{weightMessage}</Typography>
        </div>
        <div className='weight-input'>
          <TextField
            id='weight-input'
            variant='standard'
            placeholder='update weight...'
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
  {alertType === 'success' && (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      // anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ bottom: '150px' }}
    >
      <Alert onClose={handleClose} severity='success' sx={{ width: '100vw' }}>
        Weight successfully updated!
      </Alert>
    </Snackbar>
  )}
  {alertType === 'error' && (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      // anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ bottom: '150px' }}
    >
      <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
        Weight must be above 50 lbs to track calories!
      </Alert>
    </Snackbar>
  )}
</div>

</>
  );
};

export default SetWeight;
