import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../Root';
import axios from 'axios';
import { Dialog, DialogContent } from '@mui/material';
import Equipment from './Equipment';

const ViewPopup = ({
  children,
  openViewEquipment,
  setOpenViewEquipment,
  exitPopup,
  equipment
}) => {
  const context = useContext(UserContext);



  return (
    <Dialog open={openViewEquipment} PaperProps={{ style: { backgroundColor: context.isDark ? '#757575' : '#ECECEC' }}}>
          <div style={{display: 'flex', justifyContent: 'center', marginLeft: '10px', marginTop: '10px',
                         marginRight: '10px', marginBottom: '5px'}}>Available Community Equipment:</div>
      {equipment.map((equipment, i) => (<Equipment equipment={equipment} key={ i }/>))}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
export default ViewPopup