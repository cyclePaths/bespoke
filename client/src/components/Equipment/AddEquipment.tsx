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
    <Button variant='contained' color='success' style={{ marginTop: '5px', maxHeight: '40px', borderRadius: '4px',}} onClick={() => setOpenEquipmentEntry(true)}>
        <h5 style={{color: '#FFFFFF'}}>Add Parts</h5>
    </Button>
    <EquipmentPopup openEquipmentEntry={openEquipmentEntry} setOpenEquipmentEntry={setOpenEquipmentEntry} exitPopup={exitPopup}>
    <div style={{textAlign: 'center'}}>
    <Button variant='contained' color='success' style={{ marginTop: '0px'}}
              onClick={() => exitPopup()}><div style={{color:'#FFFFFF'}}>Close</div>
    </Button>
    </div>
    </EquipmentPopup>
  </div>
  )
}

export default AddEquipment

