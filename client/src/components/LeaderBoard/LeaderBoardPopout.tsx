import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

const LeaderBoardPopout = ({
  children,
  openLeaderBoard,
  setOpenLeaderBoard,
}) => {
  return (
    <Dialog open={openLeaderBoard}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default LeaderBoardPopout;
