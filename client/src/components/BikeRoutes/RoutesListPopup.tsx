import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import '../../styles.css';

interface SaveProps {
  children;
  openSearch: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoutesListPopup = ({
  children,
  openSearch,
  setOpenSearch,
}: SaveProps) => {
  return (
    <Dialog open={openSearch}>
      <DialogTitle>
        <header className='list'>Find By:</header>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default RoutesListPopup;
