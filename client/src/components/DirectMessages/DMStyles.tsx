import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      // width: '100%',
      marginBottom: theme.spacing(10),
    },
    messagesContainer: {
      flex: 1,
      overflowY: 'auto',
      padding: theme.spacing(1),
    },
    message: {
      padding: theme.spacing(1),
      // marginBottom: theme.spacing(1),
      wordWrap: 'break-word',

    },
    messageFromMe: {
      backgroundColor: theme.palette.primary.light,
      alignSelf: 'flex-end',
    },
    messageFromOther: {
      // backgroundColor: theme.palette.secondary.light,
      alignSelf: 'flex-start',
      // backgroundColor: 'green',
      backgroundColor: '#65CF22',
    },
    inputContainer: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(1),
    },
    input: {
      marginRight: theme.spacing(1),
      flex: 1,
      resize: 'none',
    },
  })
);
