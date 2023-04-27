import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import '../../styles.css';

export interface SaveProps {
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
        <header id='list' style={{ display: '' }}>
          Find By:
        </header>
        <header id='results' style={{ display: 'none' }}>
          Results
        </header>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default RoutesListPopup;
