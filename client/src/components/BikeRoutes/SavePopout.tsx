import React, { useContext } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../../styles.css';
import { SavePopoutProps } from './RouteM';
import { UserContext } from '../../Root';

const Popup = ({ children, openPopup, setOpenPopup }: SavePopoutProps) => {
  const { isDark } = useContext(UserContext);
  return (
    <Dialog open={openPopup}>
      <div
        style={{ backgroundColor: isDark ? '#191a35' : 'rgb(133, 211, 255)' }}
      >
        <CloseIcon
          sx={{ color: isDark ? '#e0e0e0' : 'black' }}
          onClick={() => setOpenPopup(false)}
        />
      </div>
      <DialogContent
        style={{
          paddingLeft: '25px',
          paddingBottom: '25px',
          paddingRight: '25px',
          paddingTop: '10px',
          backgroundColor: isDark ? '#191a35' : 'rgb(133, 211, 255)',
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
