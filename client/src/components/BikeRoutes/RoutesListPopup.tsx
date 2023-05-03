import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../../styles.css';
import { RoutesPopoutProps } from './RouteM';

const RoutesListPopup = ({
  children,
  openSearch,
  setOpenSearch,
  exitListForm,
}: RoutesPopoutProps) => {
  return (
    <Dialog open={openSearch}>
      <div style={{ backgroundColor: 'rgb(133, 211, 255)' }}>
        <CloseIcon sx={{}} onClick={() => exitListForm()} />
      </div>
      <DialogTitle
        style={{
          backgroundColor: 'rgb(133, 211, 255)',
          border: '5px solid rgb(133, 211, 255)',
        }}
      >
        <header
          id='list'
          style={{
            display: '',
            borderRadius: '4px',
            fontSize: '25px',
            padding: '6px',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          Search Routes
        </header>
        <header
          id='results'
          style={{
            display: 'none',
            borderRadius: '4px',
            fontSize: '25px',
            padding: '6px',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          Results
        </header>
      </DialogTitle>
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

export default RoutesListPopup;
