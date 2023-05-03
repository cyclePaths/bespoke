import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';

const contentStyles = makeStyles((theme) => ({
  dialogContent: {
    backgroundColor: 'rgb(133, 211, 255)', // Customize the background color
    color: 'black', // Customize the text color
    padding: theme.spacing(2), // Customize the padding
  },
}));

const LeaderBoardPopout = ({
  children,
  openLeaderBoard,
  setOpenLeaderBoard,
  setLeaderBoard,
}) => {
  const classes = contentStyles();

  const handleClose = () => {
    setOpenLeaderBoard(false);
    setLeaderBoard(false);
  };
  return (
    <Dialog open={openLeaderBoard}>
      <CloseIcon onClick={() => handleClose()} />
      <DialogContent className={classes.dialogContent}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default LeaderBoardPopout;
