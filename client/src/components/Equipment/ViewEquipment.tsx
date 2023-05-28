import React, { useContext, useState } from 'react';
import { UserContext } from '../../Root';
import { Button } from '@mui/material'
import ViewPopup from './ViewPopup'


const ViewEquipment = (props) => {
  const context = useContext(UserContext)
  const [openViewEquipment, setOpenViewEquipment] = useState(false);
  const equipment = props.equipment

  const exitPopup= () => {
    setOpenViewEquipment(false);
  };

  return (
  <div>
    <Button variant='contained' color='success' style={{
        marginTop: '5px', marginBottom: '5px', marginRight: '10px', maxHeight: '25px', borderRadius: '4px'}}
        onClick={() => setOpenViewEquipment(true)}>
      <h5 style={{color: '#FFFFFF'}}>View</h5>
    </Button>
    <ViewPopup openViewEquipment={openViewEquipment} setOpenViewEquipment={setOpenViewEquipment}
        equipment={equipment} exitPopup={exitPopup}>
    <div style={{textAlign: 'center'}}>
    <Button variant='contained' color='success' style={{ marginTop: '0px'}}
              onClick={() => exitPopup()}><div style={{color:'#FFFFFF'}}>Close</div>
    </Button>
    </div>
    </ViewPopup>
  </div>
  )
}

export default ViewEquipment