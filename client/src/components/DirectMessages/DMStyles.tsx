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

// const heightSm = 390;
// const heightMd = 900;

const messagesContainerHeight = '75vh';

// Define the component styles
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: 'white',
      // backgroundColor: '#212321',
      background: 'linear-gradient(128deg, rgb(42, 164, 71) 0%, rgb(104, 194, 125) 100%) rgb(123, 231, 149)',
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
      // overscrollBehavior: 'contain',
      // marginTop: theme.spacing(35),
      padding: theme.spacing(1),
      zIndex: 0,
      // marginTop: theme.spacing(25),
      maxHeight: messagesContainerHeight,
    },



    // '@media screen and (max-height: 920px)': {
    //   messagesContainer: {
    //     maxHeight: '80vh',
    //   },
    // },
    // '@media screen and (max-height: 900px)': {
    //   messagesContainer: {
    //     maxHeight: '79vh',
    //   },
    // },
    // '@media screen and (max-height: 750px)': {
    //   messagesContainer: {
    //     maxHeight: '76vh',
    //   },
    // },
    // '@media screen and (max-height: 700px)': {
    //   messagesContainer: {
    //     maxHeight: '75vh',
    //   },
    // },


    message: {
      color: 'white',
      padding: theme.spacing(1),
      wordWrap: 'break-word',
    },
    messageFromMe: {
      color: ' #f0f0f0',
      backgroundColor: theme.palette.primary.light,
      // backgroundColor: '#1e212d',
      alignSelf: 'flex-end',
      marginLeft: 120,
      marginRight: 10,
      marginTop: 10,
      marginBottom: 10,
      borderRadius: '20px',
      boxShadow: '-8px 6px 6px rgba(0, 0, 0, 0.2)',
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
      // backgroundColor: '#65CF22',
      backgroundColor: '#4b3464',
      marginLeft: 10,
      marginRight: 120,
      marginTop: 10,
      marginBottom: 10,
      borderRadius: '20px',
      boxShadow: '8px 6px 6px rgba(0, 0, 0, 0.2)',
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
      // alignItems: 'center',

      padding: theme.spacing(2.75),
      '& input': {
        color: 'white',
        alignItems: 'left',
      },
    },
    input: {
      left: 0,
    },


    // searchContainer: {
    //   height: 80,
    //   margin: 'auto',
    //   display: 'flex',
    //   flexDirection: 'column',
    //   justifyContent: 'space-evenly',
    //   position: 'absolute',
    //   // top: 0,
    //   left: 0,
    //   right: 0,
    //   width: '100%',
    //   marginTop: theme.spacing(0.15),
    //   borderRadius: '15px',
    //   background: 'linear-gradient(128deg, rgb(42, 164, 71) 0%, rgb(104, 194, 125) 100%) rgb(123, 231, 149)',
    //   zIndex: 1000,
    // },

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
  }),
);

export const conversationStyle = makeStyles((theme: Theme) => ({


}))