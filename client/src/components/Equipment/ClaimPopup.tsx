import React, { useState, useContext, useEffect} from 'react';
import { UserContext } from '../../Root';
import axios from 'axios';
import { Button, OutlinedInput, Dialog, DialogContent, DialogTitle } from '@mui/material';


const ClaimPopup = ({ children, openEquipmentClaim, setOpenEquipmentClaim }) => {
    const context = useContext(UserContext)




    return (


        <Dialog open={openEquipmentClaim} style={{backgroundColor: '#5555556e'}}>

        <DialogContent>{children}</DialogContent>
        </Dialog>

      )
}
export default ClaimPopup