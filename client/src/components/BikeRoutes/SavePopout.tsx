import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../../styles.css';
import { SavePopoutProps } from './RouteM';

const Popup = ({ children, openPopup, setOpenPopup }: SavePopoutProps) => {
  return (
    <Dialog open={openPopup}>
      <div style={{ backgroundColor: 'rgb(133, 211, 255)' }}>
        <CloseIcon onClick={() => setOpenPopup(false)} />
      </div>
      <DialogContent
        style={{
          paddingLeft: '25px',
          paddingBottom: '25px',
          paddingRight: '25px',
          paddingTop: '10px',
          backgroundColor: 'rgb(133, 211, 255)',
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
