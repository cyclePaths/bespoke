import React, {useContext} from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../../styles.css';
import { RoutesPopoutProps } from './RouteM';
import {UserContext} from '../../Root';

const RoutesListPopup = ({
  children,
  openSearch,
  setOpenSearch,
  exitListForm,
}: RoutesPopoutProps) => {

  const {isDark} = useContext(UserContext);
  return (
    <Dialog open={openSearch}>
      <div style={{ backgroundColor: isDark ? '#191a35' : '#85d3ff' }}>
        <CloseIcon sx={{ color: isDark ? '#e0e0e0' : 'black', fontSize: '2rem' }} onClick={() => exitListForm()} />
      </div>
      <DialogTitle
        style={{
          backgroundColor: isDark ? '#191a35' : '#85d3ff',
          padding: '16px 29px'
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
          padding: '30px',
          backgroundColor: isDark ? '#191a35' : '#85d3ff',
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default RoutesListPopup;
