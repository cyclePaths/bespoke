import {
  makeStyles,
  createStyles,
  Theme,
  createTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

// Define the input text styles
export const inputTextStyle = makeStyles((theme: Theme) => ({
  root: {},
  input: {
    color: 'rgb(253, 251, 251) !important',
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
    width: '100% !important',
  },
  underline: {},
  disabled: {},
}));

const messagesContainerHeight = '70vh';

// Define the component styles
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'transparent',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      marginBottom: theme.spacing(5),
    },

    messagesContainer: {
      flex: 1,
      top: 50,
      bottom: 0,
      overflowY: 'auto',
      padding: theme.spacing(1),
      zIndex: 0,
      maxHeight: messagesContainerHeight,
    },

    '@media screen and (max-height: 900px)': {
      messagesContainer: {
        maxHeight: '72vh',
      },
    },
    '@media screen and (max-height: 860px)': {
      messagesContainer: {
        maxHeight: '71vh',
      },
    },
    '@media screen and (max-height: 750px)': {
      messagesContainer: {
        maxHeight: '69vh',
      },
    },
    '@media screen and (max-height: 700px)': {
      messagesContainer: {
        maxHeight: '65vh',
      },
    },

    message: {
      color: 'white',
      padding: theme.spacing(1),
      wordWrap: 'break-word',
    },
    messageFromMe: {
      color: ' #f0f0f0',
      background: 'linear-gradient(128deg, rgb(43, 139, 195) 0%, rgb(88, 182, 236) 100%) rgb(117, 199, 246)',
      alignSelf: 'flex-end',
      marginLeft: 120,
      marginRight: 10,
      marginTop: 10,
      marginBottom: 10,
      borderRadius: '20px',
      boxShadow: '-4px 6px 6px rgba(0, 0, 0, 0.2)',
      [theme.breakpoints.down('sm')]: {
        marginLeft: 120,
        marginRight: 10,
      },
      [theme.breakpoints.up('md')]: {
        marginLeft: 1100,
        marginRight: 30,
      },
    },
    messageFromOther: {
      alignSelf: 'flex-start',
      color: ' #e8e6e6',
      background:
              'linear-gradient(128deg, rgb(42, 164, 71) 0%, rgb(104, 194, 125) 100%) rgb(123, 231, 149)',
      marginLeft: 10,
      marginRight: 120,
      marginTop: 10,
      marginBottom: 10,
      borderRadius: '20px',
      boxShadow: '4px 6px 6px rgba(0, 0, 0, 0.2)',
      [theme.breakpoints.down('sm')]: {
        marginRight: 120,
        marginLeft: 10,
      },
      [theme.breakpoints.up('md')]: {
        marginLeft: 30,
        marginRight: 1100,
      },
    },
    inputContainer: {
      background:
      'linear-gradient(128deg, rgb(20, 22, 21) 0%, rgb(64, 65, 64) 100%) rgb(46, 48, 47)',
      display: 'flex',
      boxShadow: '6px -6px 6px rgba(0, 0, 0, 0.2)',

      padding: theme.spacing(2.75),
      '& input': {
        color: 'white',
        alignItems: 'left',
      },
    },
    input: {
      left: 0,
    },

    search: {
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      position: 'relative',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      marginTop: theme.spacing(0),
      zIndex: 1000,
    },
  })
);

export const conversationStyle = makeStyles((theme: Theme) => ({
  list: {
    width: '100%',
    maxWidth: 500,
    background:
      'linear-gradient(128deg, rgb(20, 22, 21) 0%, rgb(64, 65, 64) 100%) rgb(46, 48, 47)',
    margin: '0 auto',
  },
}));


