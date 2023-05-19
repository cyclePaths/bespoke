import React, { useContext }from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { UserContext } from '../../Root';

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
  const {isDark} = useContext(UserContext)

  const handleClose = () => {
    setOpenLeaderBoard(false);
    setLeaderBoard(false);
  };
  return (
    <Dialog open={openLeaderBoard}>
      <div style={{ backgroundColor: 'rgb(133, 211, 255)', display: 'flex', flexDirection: 'row-reverse' }}>
        <CloseIcon sx={{ color: isDark ? '#e0e0e0' : 'black', fontSize: '2rem' }} onClick={() => handleClose()} />
      </div>
      <DialogContent
        className={classes.dialogContent}
        sx={{ paddingTop: '0px' }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default LeaderBoardPopout;
