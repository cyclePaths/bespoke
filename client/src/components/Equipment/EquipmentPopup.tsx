import React, { useState, useContext, useEffect} from 'react';
import { UserContext } from '../../Root';
import axios from 'axios';
import { Button, OutlinedInput, Dialog, DialogContent, DialogTitle } from '@mui/material';


const EquipmentPopup = ({ children, openEquipmentEntry, setOpenEquipmentEntry }) => {
    const context = useContext(UserContext)
    const [equipmentDescription, setEquipmentDescription] = useState('')
    const [equipmentType, setEquipmentType] = useState('')


const handleEquipmentSubmission = () => {
    if (equipmentDescription && equipmentType) {
      axios.post('/equipment', {
         equipmentOrigin: context.user.name,
         equipmentDescription: equipmentDescription,
         equipmentType: equipmentType
       })
       .then(() => {
         setEquipmentDescription('');
         setEquipmentType('')
       })
       .catch(() => alert('Unable to POST EQUIPMENT!'));
    } else {
      alert('Add description and type to Equipment!')
     }
 }

 const handleSetEquipmentDescription = (e) => {
    setEquipmentDescription(e.target.value)
};

const handleSetEquipmentType = (e) => {
    setEquipmentType(e.target.value)
}

    return (
        <Dialog open={openEquipmentEntry} PaperProps={{style: {backgroundColor: '#757575'}}}>
           <OutlinedInput
            style={{ backgroundColor: 'rgb(133, 211, 255)', marginTop: '10px',
                     maxWidth: '175px', maxHeight: '25px', minWidth: '175px', minHeight: '25px' }}
            multiline={false}
            rows='1'
            placeholder='description'
            inputProps={{
              maxLength: 100,
              onChange: (e) => handleSetEquipmentDescription(e),
              value: equipmentDescription,
            }}
            />
          <OutlinedInput style={{ backgroundColor: 'rgb(133, 211, 255)', marginTop: '5px',
                               maxWidth: '175px', maxHeight: '25px', minWidth: '175px', minHeight: '25px' }}
            multiline={false}
            rows='1'
            placeholder='category'
            inputProps={{
              maxLength: 1000,
              onChange: (e) => handleSetEquipmentType(e),
              value: equipmentType,
            }}
            />
            <Button style={{backgroundColor: '#17332c',  marginTop: '5px'}}
              onClick={() => handleEquipmentSubmission()}>
            <div style={{color: 'rgb(133, 211, 255)'}}>Add Equipment</div>
            </Button>
          <DialogContent>{children}</DialogContent>
        </Dialog>
      )
}
export default EquipmentPopup