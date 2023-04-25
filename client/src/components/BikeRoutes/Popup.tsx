import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import '../../styles.css';

interface SaveProps {
  children;
  openPopup: boolean;
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const Popup = ({ children, openPopup, setOpenPopup }: SaveProps) => {
  return (
    <Dialog open={openPopup}>
      <DialogTitle>
        <header className='centered-header-Save'>Save Route</header>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Popup;
