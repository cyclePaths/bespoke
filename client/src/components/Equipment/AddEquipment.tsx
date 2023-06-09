import React, { useContext, useState } from 'react';
import { UserContext } from '../../Root';
import { Button } from '@mui/material'
import EquipmentPopup from './EquipmentPopup'


const AddEquipment = (props) => {
  const context = useContext(UserContext)
  const [openEquipmentEntry, setOpenEquipmentEntry] = useState(false);
  const updateEquipment = props.updateEquipment
  const exitPopup= () => {
    setOpenEquipmentEntry(false);
  };

  return (
  <div>
    <Button variant='contained' color='success' style={{
        marginTop: '5px', marginBottom: '5px', marginRight: '10px', maxHeight: '25px', borderRadius: '4px'}}
        onClick={() => setOpenEquipmentEntry(true)}>
      <h5 style={{color: '#FFFFFF'}}>Add</h5>
    </Button>
    <EquipmentPopup openEquipmentEntry={openEquipmentEntry}
           updateEquipment={updateEquipment} exitPopup={exitPopup}>
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

