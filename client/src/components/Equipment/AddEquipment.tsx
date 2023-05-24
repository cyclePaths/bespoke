import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../Root';
import { Button } from '@mui/material'
import EquipmentPopup from './EquipmentPopup'
import ThemeProvider from '@mui/material';
import { Gradient } from '@mui/icons-material';

const AddEquipment = () => {
  const context = useContext(UserContext)
  const [openEquipmentEntry, setOpenEquipmentEntry] = useState(false);

  const exitPopup= () => {
    setOpenEquipmentEntry(false);
  };

  return (
  <div>
    <Button style={{backgroundColor: '#17332c', marginTop: '5px', maxHeight: '40px', borderRadius: '5px',
                    background: 'linear-gradient(145deg, #19372f, #152e28)'}} onClick={() => setOpenEquipmentEntry(true)}>
        <h5 style={{color: 'rgb(133, 211, 255)'}}>Add Parts</h5>
    </Button>
    <EquipmentPopup openEquipmentEntry={openEquipmentEntry} setOpenEquipmentEntry={setOpenEquipmentEntry} exitPopup={exitPopup}>
    <div style={{textAlign: 'center'}}>
    <Button style={{backgroundColor: '#17332c', marginTop: '5px'}}
              onClick={() => exitPopup()}><div style={{color:'rgb(133, 211, 255)'}}>Close</div>
    </Button>
    </div>
    </EquipmentPopup>
  </div>
  )
}

export default AddEquipment

