import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const LeaderBoardPopout = ({
  children,
  openLeaderBoard,
  setOpenLeaderBoard,
}) => {
  return (
    <Dialog open={openLeaderBoard}>
      <CloseIcon onClick={() => setOpenLeaderBoard(false)} />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default LeaderBoardPopout;
