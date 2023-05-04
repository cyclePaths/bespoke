import React, { useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';

interface WeightTabProps {
  weight: number;
  onWeightChange: (value: number) => void;
}


const SetWeight = (props: WeightTabProps) => {
  // const { weightChange, onWeightChange } = props;

  const [weightValue, setWeightValue] = useState(0);
  const [weight, setWeight] = useState(0);

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


return (
  <div>
      <Typography>Weight: {weight} lbs</Typography>
      {/* <input type="number" value={weight} onChange={(e) => onWeightChange(Number(e.target.value))} /> */}
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
)
}


export default SetWeight;