import React, { useContext } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { UserContext } from '../../Root';

const LeaderBoardPopout = ({
  children,
  openLeaderBoard,
  setOpenLeaderBoard,
  setLeaderBoard,
}) => {
  const { isDark } = useContext(UserContext);

  return (
    <Dialog
      open={openLeaderBoard}
      onClose={() => setOpenLeaderBoard(false)}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: isDark ? '#969696' : '#ececec',
          margin: '20px',
          height: '66vh',
        },
      }}
    >
      {children}
    </Dialog>
  );
};

export default LeaderBoardPopout;
