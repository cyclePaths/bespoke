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
  const [openWeight, setOpenWeight] = useState(false);
  const [alertTypeWeight, setAlertTypeWeight] = useState<'success' | 'error' | 'warning' | null>(null);
  // const [noWeightWarning, setNoWeightWarning] = useState(false);
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
      setAlertTypeWeight('success');
      alertOnClick();
    } else {
      const input = document.getElementById('weight-input');
      if (input instanceof HTMLInputElement) {
        input.value = '';
        input.blur();
      };
      setWeightMessage(badSet)
      setAlertTypeWeight('error');
      alertOnClick();
    }

  };

  useEffect(() => {
    axios.get('/profile/weight')
      .then(({ data }) => {
      console.log('Data', data.weight);
        if ( data.weight === null) {
        setWeightMessage(badSet)
        setOpenWeight(true);
        // setAlertTypeWeight('warning');
      } else {
        setWeight(data.weight)
        setWeightMessage(goodSet)
      }
    });
  }, [weight]);



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
          <h4 className='current-weight'>{weightMessage}</h4>
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
  {alertTypeWeight === 'success' && (
    <Snackbar
      open={openWeight}
      autoHideDuration={5000}
      onClose={handleCloseWeight}
      // anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ bottom: '150px' }}
    >
      <Alert onClose={handleCloseWeight} severity='success' sx={{ width: '100vw' }}>
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
      <Alert onClose={handleCloseWeight} severity='error' sx={{ width: '100%' }}>
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
      <Alert onClose={handleCloseWeight} severity='warning' sx={{ width: '100%' }}>
       Enter a weight so you can track your stats!
      </Alert>
    </Snackbar>
  )}
</div>

</>
  );
};

export default SetWeight;
