import React from 'react';
import { PopoutSaveForm, InputLayout } from '../../StyledComp';
import '../../styles.css';

const SaveForm = () => {
  return (
    <div>
      <PopoutSaveForm>
        <h2 className='centered-header'>Enter Name of Route:</h2>
        <InputLayout />
        <h2>Select Ride Options</h2>
        <div>
          <select></select>
          Set Private?
          <input type='checkbox' />
        </div>
      </PopoutSaveForm>
    </div>
  );
};

export default SaveForm;
