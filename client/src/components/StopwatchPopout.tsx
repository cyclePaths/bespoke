import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface StopProps {
  openStopwatch: boolean;
  setOpenStopWatch: React.Dispatch<React.SetStateAction<boolean>>;
  children;
}

const StopwatchPopout = ({
  openStopwatch,
  setOpenStopWatch,
  children,
}: StopProps) => {
  return (
    <Dialog open={openStopwatch}>
      <CloseIcon sx={{}} onClick={() => setOpenStopWatch(false)} />
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

export default StopwatchPopout;
