import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../Root';
import { Button } from '@mui/material'
import EquipmentPopup from './EquipmentPopup'

const AddEquipment = () => {
  const context = useContext(UserContext)

  const [openEquipmentEntry, setOpenEquipmentEntry] = useState(false);

  const exitPopup= () => {
    setOpenEquipmentEntry(false);
  };

  return (
  <div>
    <Button style={{backgroundColor: '#17332c', marginTop: '5px'}} onClick={() => setOpenEquipmentEntry(true)}>
        Add Equipment
    </Button>
    <EquipmentPopup openEquipmentEntry={openEquipmentEntry} setOpenEquipmentEntry={setOpenEquipmentEntry}>
    <div style={{textAlign: 'center'}}>
    <Button style={{backgroundColor: '#17332c', marginTop: '5px'}}
              onClick={() => exitPopup()}>Cancel
    </Button>
    </div>
    </EquipmentPopup>
  </div>
  )
}

export default AddEquipment

