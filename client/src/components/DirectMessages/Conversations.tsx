import * as React from 'react';
import axios from 'axios';
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
// import DMNotifications from '../../DMNotifications';

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
    // Add other properties as needed
  };
  receiverId: number;
  receiverName: string;
  sender: {
    id: number;
    email: string;
    name: string;
    thumbnail: string;
    weight: number;
    // Add other properties as needed
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
  setShowConversations:(showConversations: boolean) => void;
  setShowTextField:(boolean) => void;
}


const Conversations: React.FC<ConversationsProps> = ({
  setSenderId,
  setSenderName,
  setReceiverId,
  setReceiverName,
  loadMessages,
  setShowMessageContainer,
  isReceiverSelected,
  setIsReceiverSelected,
  showConversations,
  setShowConversations,
  setShowTextField,
}) => {
  const [myConversations, setMyConversations] = React.useState<Conversation[]>(
    []
  );
  const [myUserId, setMyUserId] = React.useState(0);
  // const [showConversations, setShowConversations] = React.useState(true);
  const [showMessageThread, setShowMessageThread] = React.useState(false);
  // const [isHandleConvoClicked, setIsHandleConvoClicked] = React.useState(false);
  const [selectedConversationId, setSelectedConversationId] = React.useState<number | null>(null);



  // let myConversations = []
  const convos = () => {
    axios
      .get('/dms/conversations')
      .then(({ data }) => {
        console.log('convos', data);
        setMyConversations(data);
        // data.forEach((current) => {
        //   myConversations.push(current)
        // })
        console.log('myConversations', myConversations);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleConvoClick = async (convo: Conversation) => {
    setSelectedConversationId(null);
    // await loadMessages();
    // setIsHandleConvoClicked(true);
    setSenderId(convo.senderId);
    // setSenderName(convo.senderName);
    setReceiverId(convo.receiverId);
    console.log("Selected Sender ID: ", convo.senderId);
    console.log("Selected Receiver ID: ", convo.receiverId);
    setReceiverName(convo.receiverName);
    setSelectedConversationId(convo.id);
    setShowConversations(false);
    setShowMessageThread(true);
    setShowTextField(true);
    setIsReceiverSelected(true);


      await loadMessages();

  }


  React.useEffect(() => {
    const isNotEdge = !window.navigator.userAgent.includes('Edg');

    if (isReceiverSelected && isNotEdge) {
      console.log('check me');
      loadMessages();
    }
  }, [isReceiverSelected]);


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
    // setReceiverId(0);
  }

  React.useEffect(() => {

    axios.get('/profile/user')
      .then(({ data }) => {
        setMyUserId(data.id)
      })
      .catch((err) => {

      })

    convos();
    // console.log('convos?', myConversations);
  }, []);


  // React.useEffect(() => {
  //   if (isReceiverSelected) {
  //     setShowMessageContainer(true);
  //   }
  // }, [isReceiverSelected]);


  return (
    <>
    {!isReceiverSelected && showConversations ? (
      <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'gray', margin: '0 auto' }}>
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
                    alt={convo.senderId === myUserId ? convo.receiverName : convo.senderName}
                    src={convo.senderId === myUserId ? convo.receiver.thumbnail : convo.sender.thumbnail}
                  />
                </ListItemAvatar>
                <Typography variant="body2" sx={{ textTransform: 'none' }}>
                <ListItemText
                  primary={convo.receiverName}
                  secondary={
                    <React.Fragment>

                      {convo.text.length > 35
                        ? `${convo.text.slice(0, 35)}...`
                        : convo.text}
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
    {/* <DMNotifications setShowConversations={setShowConversations} /> */}
  </>
  );
};

export default Conversations;
