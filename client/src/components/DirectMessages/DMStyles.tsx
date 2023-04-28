import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import { createTheme } from '@mui/material/styles';


export const inputTextStyle = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  input: {
    color: 'white',
    '&::placeholder': {
      color: 'white',
      marginRight: theme.spacing(1),
      flex: 1,
      resize: 'none',
    },
    '&$underline:before': {
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
    '&$underline:hover:not($disabled):before': {
      borderBottom: `2px solid ${theme.palette.primary.dark}`,
    },
    width: '100% !important', // added width property
  },
  underline: {},
  disabled: {},
}));



export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: 'white',
      backgroundColor: '#212321',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      // width: '100%',
      // height: '90%',
      marginBottom: theme.spacing(10),
    },
    messagesContainer: {
      flex: 1,
      bottom: 0,
      overflowY: 'auto',
      padding: theme.spacing(1),
    },
    message: {
      color: 'white',
      padding: theme.spacing(1),
      // marginBottom: theme.spacing(1),
      wordWrap: 'break-word',

    },
    messageFromMe: {
      color: 'white',
      backgroundColor: theme.palette.primary.light,
      alignSelf: 'flex-end',
      marginLeft: 120,
      marginRight: 10,
      marginTop: 10,
      marginBottom: 10,
    },
    messageFromOther: {
      // backgroundColor: theme.palette.secondary.light,
      alignSelf: 'flex-start',
      // backgroundColor: 'green',
      color: 'white',
      backgroundColor: '#65CF22',
      marginLeft: 10,
      marginRight: 120,
      marginTop: 10,
      marginBottom: 10,
    },
    inputContainer: {

      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(1),
      '& input': {
        color: 'white',
      },
    },
    input: {
      // color: 'white !important',
      // marginRight: theme.spacing(1),
      // flex: 1,
      // resize: 'none',
    },
    search: {
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      marginTop: theme.spacing(12),
    }
  })
);
