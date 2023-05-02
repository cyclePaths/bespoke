import { makeStyles, createStyles, Theme, createTheme, ThemeProvider } from '@material-ui/core/styles';

// Define a custom theme with breakpoints for small (sm) and medium (md) screens
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
      light: '#7986cb',
      dark: '#303f9f',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

// Define the input text styles
export const inputTextStyle = makeStyles((theme: Theme) => ({
  root: {
    // width: '100%',
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

// Define the component styles
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
      color: 'white',
      backgroundColor: '#65CF22',
      marginLeft: 10,
      marginRight: 120,
      marginTop: 10,
      marginBottom: 10,
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
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(1),
      '& input': {
        color: 'white',
      },
    },
    input: {},
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
    },
  })
);
