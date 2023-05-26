import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../Root';
import axios from 'axios';
import {
  Button,
  OutlinedInput,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const EquipmentPopup = ({
  children,
  openEquipmentEntry,
  setOpenEquipmentEntry,
  exitPopup
}) => {
  const context = useContext(UserContext);
  const [equipmentDescription, setEquipmentDescription] = useState('');
  const [equipmentType, setEquipmentType] = useState('');



  const handleEquipmentSubmission = () => {
    if (equipmentDescription && equipmentType) {
      axios
        .post('/equipment', {
          equipmentOrigin: context.user.name,
          equipmentDescription: equipmentDescription,
          equipmentType: equipmentType,
        })
        .then(() => {
          context.updateAchievements('Gearhead');
          setEquipmentDescription('');
          setEquipmentType('');
          exitPopup()
        })
        .catch(() => alert('Unable to POST EQUIPMENT!'));
    } else {
      alert('Add description and type to Equipment!');
    }
  };

  const handleSetEquipmentDescription = (e) => {
    setEquipmentDescription(e.target.value);
  };

  const handleSetEquipmentType = (e) => {
    setEquipmentType(e.target.value);
  };

  return (
    <Dialog open={openEquipmentEntry} PaperProps={{ style: { backgroundColor: 'rgb(133, 211, 255)'}}}>
          <div style={{display: 'flex', justifyContent: 'center', marginLeft: '10px', marginTop: '10px', marginRight: '10px', marginBottom: '5px'}}>Enter Equipment Information:</div>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
      <OutlinedInput
        style={{
          backgroundColor: 'rgb(133, 211, 255)',
          marginTop: '10px',
          maxWidth: '175px',
          maxHeight: '25px',
          minWidth: '175px',
          minHeight: '25px',
        }}
        multiline={false}
        rows='1'
        placeholder='description'
        inputProps={{
          maxLength: 100,
          onChange: (e) => handleSetEquipmentDescription(e),
          value: equipmentDescription,
        }}
      />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
      <OutlinedInput
        style={{
          backgroundColor: 'rgb(133, 211, 255)',
          marginTop: '5px',
          maxWidth: '175px',
          maxHeight: '25px',
          minWidth: '175px',
          minHeight: '25px',
        }}
        multiline={false}
        rows='1'
        placeholder='category'
        inputProps={{
          maxLength: 1000,
          onChange: (e) => handleSetEquipmentType(e),
          value: equipmentType,
        }}
      />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
      <Button variant='contained' color='success'
        style={{ marginLeft: '10px', marginTop: '15px', marginRight: '10px', maxWidth: '90%' }}
        onClick={() => handleEquipmentSubmission()}
      >
        Add Equipment
      </Button>
      </div>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
export default EquipmentPopup;
