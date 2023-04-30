import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';

const contentStyles = makeStyles((theme) => ({
  dialogContent: {
    backgroundColor: '#e0e0e0', // Customize the background color
    color: 'black', // Customize the text color
    padding: theme.spacing(2), // Customize the padding
  },
}));

const LeaderBoardPopout = ({
  children,
  openLeaderBoard,
  setOpenLeaderBoard,
}) => {
  const classes = contentStyles();

  return (
    <Dialog open={openLeaderBoard}>
      <CloseIcon onClick={() => setOpenLeaderBoard(false)} />
      <DialogContent className={classes.dialogContent}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default LeaderBoardPopout;
