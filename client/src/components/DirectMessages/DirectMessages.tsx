import React, { useState, useRef, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
// import Paper from '@material-ui/core/Paper';
import { Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { useStyles, inputTextStyle } from './DMStyles';
import SearchUsers, { Users } from './SearchUsers';
import { BandAid } from '../../StyledComp';
import Conversations from './Conversations';
import { SocketContext } from '../../SocketContext';
import { Socket } from 'socket.io-client';
import { createDeflate } from 'zlib';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import styled from 'styled-components';


// const MessageContainer = styled(Paper)`
//   display: flex;
//   flex-direction: column;
//   padding: ${({ theme }) => theme.spacing(2)};
//   margin-bottom: ${({ theme }) => theme.spacing(1)};
// `;

// const MessageText = styled.span`
//   margin-bottom: ${({ theme }) => theme.spacing(1)};
// `;

// const MessageDate = styled.span`
//   font-size: 0.8rem;
//   color: #888888;
// `;



export interface Message {
  id: number;
  senderId: number;
  senderName: string;
  receiverId: number;
  receiverName: string;
  text: string;
  //fromMe: boolean;
  userId: number;
  isNotificationClicked: boolean;
  createdAt: Date;
}

interface SelectedUser {
  id: number;
  email: string;
  name: string;
  thumbnail: string;
  weight: number;
  favAddresses: string[];
  homeAddress: string;
  location_lat: number;
  location_lng: number;
  joinDate: Date;
  profileComplete: boolean;
  firstRideCity: string;
  firstRideCountry: string;
  monthlyMiles: number;
  mostMonthlyMiles: number;
  totalMiles: number;
  totalBadWeatherMiles: number;
  totalGoodWeatherMiles: number;
  totalCaloriesBurned: number;
  totalMinutesAboveTime: number;
  highestRideStreak: number;
  mostWeeklyRides: number;
  ridesThisWeek: number;
  totalRides: number;
  totalPosts: number;
  theme: string;
  totalReports: number;
  totalDownvotedReports: number;
  monthlyDownvotedReports: number;
  totalRoutes: number;
  totalLikesGiven: number;
  totalLikesReceived: number;
}


function formatMessageDate(date) {
  const messageDate = dayjs(date);
  const now = dayjs();

  if (messageDate.isSame(now, 'day')) {
    return messageDate.format('[Today], h:mmA');
  } else if (messageDate.isSame(now.subtract(1, 'day'), 'day')) {
    return messageDate.format('[Yesterday], h:mmA');
  } else if (messageDate.isSame(now, 'year')) {
    return messageDate.format('MMM DD, h:mmA');
  } else {
    return messageDate.format('MM/DD/YYYY, h:mmA');
  }
}


// function Message({ text, fromMe }: Message) {
function Message({
  id,
  senderId,
  senderName,
  receiverId,
  receiverName,
  text,
  userId,
  createdAt,
}: Message) {
  const classes = useStyles();
  // const { id: userId } = useContext(UserContext);
  const fromMe = senderId === userId;

    // Format the createdAt date
    // const formattedDate = dayjs(createdAt)
    // .locale('en') // Set the locale to English
    // .format('ddd, h:mmA');

    const formattedDate = formatMessageDate(createdAt);

  return (
    <Paper
      className={`${classes.message} ${
        fromMe ? classes.messageFromMe : classes.messageFromOther
      }`}
    >
       <Typography variant="body1" className={classes.messageText}>
        {text}
      </Typography>
      <Typography variant="caption" className={classes.messageDate}>
        {formattedDate}
      </Typography>
    </Paper>
  );
}

function DirectMessages({ showConversations, setShowConversations, isDark }) {
  const classes = useStyles();
  const inputClasses = inputTextStyle();
  const [messageInput, setMessageInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<Message>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Users[]>([]);
  const loading = open && options.length === 0;
  const [userId, setUserId] = useState(0);
  const [receiverId, setReceiverId] = useState(0);
  const [receiverName, setReceiverName] = useState('');
  const [senderId, setSenderId] = useState(0);
  const [senderName, setSenderName] = useState('');
  const [receiver, setReceiver] = useState<SelectedUser>();
  const [name, setName] = useState('');
  const [messageThread, setMessageThread] = useState<Message[]>([]);
  const [isReceiverSelected, setIsReceiverSelected] = useState(false);
  const [isSenderSelected, setIsSenderSelected] = useState(false);
  const [showMessageContainer, setShowMessageContainer] = useState(false);
  const [userIsSelectingReceiver, setUserIsSelectingReceiver] = useState(false);
  const [isNotificationClicked, setIsNotificationClicked] = useState(false);
  const [showTextField, setShowTextField] = useState(true);
  const [appTheme, setAppTheme] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(true);

  const fromMe = senderId === userId;
  const socket = useContext(SocketContext).socket as Socket | undefined;
  const location = useLocation();
  let notificationSenderId = location?.state?.notificationSenderId;
  let notificationSenderName = location?.state?.notificationSenderName;

  useEffect(() => {
    if (notificationSenderId !== undefined) {
      setReceiverId(notificationSenderId);
      setIsReceiverSelected(true);
    }
    console.log('notificationSenderId', notificationSenderId);
  }, [notificationSenderId]);

  useEffect(() => {
    if (notificationSenderName !== undefined) {
      setReceiverName(notificationSenderName);
      setSenderName(notificationSenderName);
    }
    console.log('notificationSenderId', notificationSenderId);
  }, [notificationSenderId]);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const handleSetReceiver = async (receiver: SelectedUser | null) => {
    if (receiver !== null) {
      setReceiver(receiver);
      setReceiverName(receiver.name);
      setShowMessageContainer(true);
      setIsReceiverSelected(true);
      setUserIsSelectingReceiver(true);
    } else {
      setReceiver(undefined);
      setIsReceiverSelected(false);
      setShowMessageContainer(false);
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    axios
      .get('/profile/user')
      .then(({ data }) => {
        const { id, name } = data;
        setUserId(id);
        setName(name);
      })
      .catch((err) => {
        console.log(err);
      });

    if (receiver) {
      setReceiverId(receiver.id);
    }
  }, [receiver]);

  useEffect(() => {
    if (socket) {
      // Join the room for the current user and receiver
      socket.emit('joinRoom', { userId, receiverId });

      // Listen for incoming 'message' events
      socket.on('message', (newMessage) => {
        // Add the new message to the messages array if it's from the targeted receiver
        if (
          newMessage.senderId === receiverId &&
          newMessage.receiverId === userId
        ) {
          setMessage(newMessage);
        }
      });
    }
  }, [socket, userId, receiverId]);

  useEffect(() => {
    if (message) {
      setMessages((prevMessages) => [...prevMessages, message]);
    }
  }, [message]);

  ///////Below: Loading Messages Thread when user is selected or notification is clicked/////////

  const loadMessages = () => {
    axios
      .get('/dms/retrieveMessages', {
        params: { receiverId: receiverId },
      })
      .then(({ data }) => {
        const sortedMessages = data.sort((a, b) => a.id - b.id);

        setMessages(sortedMessages);

        setShowMessageContainer(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (receiverId !== 0) {
      loadMessages();
      console.log('loadMessages', loadMessages());
    }
  }, [receiverId]);

  ///////Above: Loading Messages Thread when user is selected or notification is clicked/////////
  /// End of Load Mounting ///

  const handleSendMessage = () => {
    const newMessage = {
      senderId: userId,
      senderName: name,
      receiverId: receiverId,
      receiverName: receiverName,
      text: messageInput,
      fromMe: true,
      createdAt: new Date(),
    };

    // Emit a 'message' event to the server
    socket?.emit('message', newMessage);

    axios
      .post('/dms/message', {
        message: newMessage,
      })
      .then(({ data }) => {
        setMessages((current) => [...current, data]);
      })
      .catch((err) => {
        console.error('NOOOOO', err);
      });

    setMessageInput('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleNavigationAway = () => {
    setIsSenderSelected(false); // Reset the flag when user navigates away
    setIsNotificationClicked(false);
    setShowMessageContainer(false);
    notificationSenderId = undefined;
    notificationSenderName = undefined;
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      handleNavigationAway();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <BandAid>
      <div>
        <div style={{ zIndex: 9998 }}>
          <SearchUsers
            open={open}
            setOpen={setOpen}
            options={options}
            setOptions={setOptions}
            loading={loading}
            receiver={receiver}
            setReceiver={setReceiver}
            loadMessages={loadMessages}
            handleSetReceiver={handleSetReceiver}
            setIsReceiverSelected={setIsReceiverSelected}
            setShowMessageContainer={setShowMessageContainer}
            setMessages={setMessages}
            senderName={senderName}
            setShowTextField={setShowTextField}
          ></SearchUsers>
        </div>

        <div style={{ zIndex: 9998 }}>
          <Conversations
            setSenderId={setSenderId}
            setSenderName={setSenderName}
            setReceiverId={setReceiverId}
            setReceiverName={setReceiverName}
            loadMessages={loadMessages}
            setShowMessageContainer={setShowMessageContainer}
            isReceiverSelected={isReceiverSelected}
            setIsReceiverSelected={setIsReceiverSelected}
            showConversations={showConversations}
            setShowConversations={setShowConversations}
            setShowTextField={setShowTextField}
          />
        </div>
        {isReceiverSelected && showMessageContainer && (
          <Paper className={classes.root} key={receiver?.id}>
            <div
              className={classes.messagesContainer}
              ref={messagesContainerRef}
            >
              {messages.map((message) => (
                <Message
                  id={message.id}
                  senderId={message.senderId}
                  senderName={message.senderName}
                  receiverId={message.receiverId}
                  receiverName={message.receiverName}
                  text={message.text}
                  userId={userId}
                  isNotificationClicked={isNotificationClicked}
                  createdAt={message.createdAt}
                />
              ))}
            </div>
            {showTextField && (
              <div className={classes.inputContainer}>
                <TextField
                  fullWidth
                  id='fullWidth'
                  InputProps={{
                    classes: {
                      root: inputClasses.root,
                      input: inputClasses.input,
                      underline: inputClasses.underline,
                      disabled: inputClasses.disabled,
                    },
                  }}
                  placeholder='Type your message...'
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  multiline
                  minRows={1}
                  maxRows={18}
                  inputRef={inputRef}
                />
                <IconButton color="primary" aria-label="send button" onClick={handleSendMessage}>
                  <SendIcon
                  fontSize='large'
                  sx={{
                    marginLeft: '20px',
                    marginBottom: '10px',
                  }}
                  />
                  </IconButton>
              </div>
            )}
          </Paper>
        )}
      </div>
    </BandAid>
  );
}

export default DirectMessages;
