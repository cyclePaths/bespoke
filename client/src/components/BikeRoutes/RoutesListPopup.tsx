import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../../styles.css';

export interface SaveProps {
  children;
  openSearch: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  exitListForm: () => void;
}

const RoutesListPopup = ({
  children,
  openSearch,
  setOpenSearch,
  exitListForm,
}: SaveProps) => {
  return (
    <Dialog open={openSearch}>
      <CloseIcon sx={{}} onClick={() => exitListForm()} />
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
