import React, { useContext } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../../styles.css';
import { SavePopoutProps } from './RouteM';
import { UserContext } from '../../Root';

const SavePopout = ({ children, openPopup, setOpenPopup }: SavePopoutProps) => {
  const { isDark } = useContext(UserContext);
  return (
    <Dialog
      open={openPopup}
      sx={{
        '& .MuiPaper-root': {
          alignItems: 'flex-end',
          backgroundColor: isDark ? '#707070' : '#ececec',
        },
      }}
    >
      <CloseIcon
        sx={{ color: isDark ? '#e0e0e0' : 'black', fontSize: '2rem' }}
        onClick={() => setOpenPopup(false)}
      />
      {children}
    </Dialog>
  );
};

export default SavePopout;
