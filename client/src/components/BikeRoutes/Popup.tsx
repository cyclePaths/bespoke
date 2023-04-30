import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../../styles.css';

interface SaveProps {
  children;
  openPopup: boolean;
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const Popup = ({ children, openPopup, setOpenPopup }: SaveProps) => {
  return (
    <Dialog open={openPopup}>
      <CloseIcon onClick={() => setOpenPopup(false)} />
      <DialogTitle style={{ padding: '5px', backgroundColor: '#0088d5' }}>
        <header className='centered-header-Save'>Save Route:</header>
      </DialogTitle>
      <DialogContent
        style={{
          paddingLeft: '25px',
          paddingBottom: '25px',
          paddingRight: '25px',
          paddingTop: '10px',
          backgroundColor: '#0088d5',
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
