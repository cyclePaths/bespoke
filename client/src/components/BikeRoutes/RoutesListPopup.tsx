import React, { useContext } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../../styles.css';
import { RoutesPopoutProps } from './RouteM';
import { UserContext } from '../../Root';

const RoutesListPopup = ({
  children,
  openSearch,
  setOpenSearch,
  exitListForm,
}: RoutesPopoutProps) => {
  const { isDark } = useContext(UserContext);
  return (
    <Dialog
      open={openSearch}
      sx={{
        '& .MuiPaper-root': {
          alignItems: 'flex-end',
          backgroundColor: isDark ? '#969696' : '#ececec',
          margin: '10px',
          padding: '10px',
          height: '68vh',
        },
      }}
      onClose={() => exitListForm()}
    >
      {children}
    </Dialog>
  );
};

export default RoutesListPopup;
