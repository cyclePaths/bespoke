import * as React from 'react';
import axios from 'axios';
import { UserContext } from '../../Root';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Message } from './DirectMessages';
import { conversationStyle } from './DMStyles';

interface Conversation {
  createdAt: string;
  fromMe: boolean;
  id: number;
  receiver: {
    id: number;
    email: string;
    name: string;
    thumbnail: string;
    weight: null | number;
  };
  receiverId: number;
  receiverName: string;
  sender: {
    id: number;
    email: string;
    name: string;
    thumbnail: string;
    weight: number;
  };
  senderId: number;
  senderName: string;
  text: string;
}

interface ConversationsProps {
  setSenderId: (senderId: number) => void;
  setSenderName: (senderName: string) => void;
  setReceiverId: (receiverId: number) => void;
  setReceiverName: (receiverName: string) => void;
  loadMessages: () => void;
  setShowMessageContainer: (boolean) => void;
  isReceiverSelected: boolean;
  setIsReceiverSelected: (isReceiverSelected: boolean) => void;
  showConversations: boolean;
  setShowConversations: (showConversations: boolean) => void;
  setShowTextField: (boolean) => void;
}

const Conversations: React.FC<ConversationsProps> = ({
  setSenderId,
  setReceiverId,
  loadMessages,
  setShowMessageContainer,
  isReceiverSelected,
  setIsReceiverSelected,
  setShowTextField,
  setReceiverName,
}) => {
  const [myConversations, setMyConversations] = React.useState<Conversation[]>(
    []
  );
  const [myUserId, setMyUserId] = React.useState(0);
  const [myUserName, setMyUserName] = React.useState('');
  const [showMessageThread, setShowMessageThread] = React.useState(false);
  const [selectedConversationId, setSelectedConversationId] = React.useState<
    number | null
  >(null);
  const [clickedConversation, setClickedConversation] = React.useState<
    Message[]
  >([]);
  const [showConversations, setShowConversations] = React.useState(true);


  // User Context //
  const { user, isDark } = React.useContext(UserContext);

  const classes = conversationStyle();

  const convos = () => {
    axios
      .get('/dms/conversations')
      .then(({ data }) => {
        console.log('convos', data);
        setMyConversations(data);
        console.log('myConversations', myConversations);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleConvoClick = async (convo: Conversation) => {
    setSelectedConversationId(null);
    setReceiverId(
      convo.receiverId === myUserId ? convo.senderId : convo.receiverId
    );
    setReceiverName(
      convo.receiver.name === myUserName
        ? convo.sender.name
        : convo.receiver.name
    );
    setMyUserName(myUserName);
    setSelectedConversationId(convo.id);
    setShowConversations(false);
    setShowMessageThread(true);
    setShowTextField(true);
    setIsReceiverSelected(true);
  };

  React.useEffect(() => {
    const isNotEdge = !window.navigator.userAgent.includes('Edg');

    if (isReceiverSelected && isNotEdge) {
      console.log('check me');
      loadMessages();
    }
  }, [clickedConversation]);

  const handleBackClick = () => {
    setShowConversations(true); // Show the conversation list
    setShowMessageThread(false); // Hide the message thread
    setSenderId(0);
    setReceiverId(0);
    setIsReceiverSelected(false);
    setShowTextField(false);
    setShowMessageContainer(false);
  };

  if (isReceiverSelected === false) {
    setShowMessageContainer(false);
  }

  React.useEffect(() => {
    axios
      .get('/profile/user')
      .then(({ data }) => {
        setMyUserId(data.id);
        setMyUserName(data.name);
      })
      .catch((err) => {});
    convos();
  }, [myUserName]);

  React.useEffect(() => {
    if (isReceiverSelected) {
      setShowMessageContainer(true);
    }
  }, [isReceiverSelected]);

  const handleNavigationAway = () => {
    setShowConversations(true);
    setIsReceiverSelected(false);
    setShowMessageThread(false);
  };

  React.useEffect(() => {
    const handleBeforeUnload = () => {
      handleNavigationAway();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      {!isReceiverSelected && showConversations ? (
         <div
         style={{
           display: 'flex',
           justifyContent: 'center',
         }}
       >
        <List className={classes.list}
          sx={{ boxShadow: isDark ? '1.25em 1.25em 3.75em rgb(40, 43, 113), -0.625em -0.625em 1.3125em #282b71' : '6px 6px 6px rgba(0, 0, 0, 0.4)',}}
        >
          {myConversations.map((convo, index) => (
            <React.Fragment key={index}>
              <Button
                component='li'
                onClick={() => handleConvoClick(convo)}
                sx={{ width: '100%', textAlign: 'left' }}
              >
                <ListItem alignItems='flex-start'>
                  <ListItemAvatar>
                    <Avatar
                      alt={
                        convo.senderId === myUserId
                          ? convo.receiverName
                          : convo.senderName
                      }
                      src={
                        convo.senderId === myUserId
                          ? convo.receiver.thumbnail
                          : convo.sender.thumbnail
                      }
                    />
                  </ListItemAvatar>
                  <Typography
                    variant='body2'
                    sx={{ textTransform: 'none', color: 'rgb(217, 211, 211)' }}
                  >
                    <ListItemText
                      primary={
                        convo.senderId === myUserId
                          ? convo.receiverName
                          : convo.senderName
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            variant='body2'
                            sx={{
                              textTransform: 'none',
                              color: 'rgb(191, 186, 186)',
                            }}
                          >
                            {convo.text.length > 35
                              ? `${convo.text.slice(0, 35)}...`
                              : convo.text}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </Typography>
                </ListItem>
              </Button>
              {index !== myConversations.length - 1 && (
                <Divider variant='inset' component='li' />
              )}
            </React.Fragment>
          ))}
        </List>
        </div>
      ) : (
        <Fab
          sx={{ top: '20px', boxShadow: '6px 6px 6px rgba(0, 0, 0, 0.2)' }}
          color='secondary'
          size='small'
          aria-label='back'
          onClick={handleBackClick}
        >
          <ArrowBackIosNewIcon fontSize='small' />
        </Fab>
      )}
    </>
  );
};

export default Conversations;
