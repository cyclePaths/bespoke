import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useStyles, inputTextStyle } from './DMStyles';
import SearchUsers, { Users } from './SearchUsers';
import { ThemeProvider } from '@mui/material/styles';
import { io } from 'socket.io-client';
import * as SocketIOClient from 'socket.io-client';
import { BandAid } from '../../StyledComp';
import Conversations from './Conversations';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SocketContext } from '../../SocketContext';
import { Socket } from 'socket.io-client';
import { UserContext } from '../../Root';

export interface Message {
  id: number;
  senderId: number;
  senderName: string;
  receiverId: number;
  receiverName: string;
  text: string;
  // fromMe: boolean;
  userId: number;
  isNotificationClicked: boolean;
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



// function Message({ text, fromMe }: Message) {
  function Message({ id, senderId, senderName, receiverId, receiverName, text, userId }: Message) {

  const classes = useStyles();
  // const { id: userId } = useContext(UserContext);
  const fromMe = senderId === userId;

  return (
    <Paper
      className={`${classes.message} ${
        fromMe ? classes.messageFromMe : classes.messageFromOther
      }`}
    >
      {text}
    </Paper>
  );
}

function DirectMessages() {
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
  const [senderId, setSenderId] = useState(0);
  const [receiver, setReceiver] = useState<SelectedUser>();
  const [name, setName] = useState('');
  const [messageThread, setMessageThread] = useState<Message[]>([]);
  const [isReceiverSelected, setIsReceiverSelected] = useState(false);
  const [isSenderSelected, setIsSenderSelected] = useState(false);
  const [showMessageContainer, setShowMessageContainer] = useState(false);
  const [storedNotificationSenderId, setStoredNotificationSenderId] = useState(null);
  const [userIsSelectingReceiver, setUserIsSelectingReceiver] = useState(false);
  const [isNotificationClicked, setIsNotificationClicked] = useState(false);

  const fromMe = senderId === userId;


  const socket = useContext(SocketContext).socket as Socket | undefined;

  const location = useLocation();

  // const notificationReceiverId = location?.state?.notificationReceiverId || 0;
  const notificationSenderId = location?.state?.notificationSenderId;
  // console.log('location', location.state);


  // const [socket, setSocket] = useState<SocketIOClient.Socket>();






  console.log('setNotification', isNotificationClicked);



  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const handleSetReceiver = async (receiver: SelectedUser | null) => {
    if (receiver !== null) {
      setReceiver(receiver);
      setIsReceiverSelected(true);
      setUserIsSelectingReceiver(true);
    } else {
      setReceiver(undefined);
      setIsReceiverSelected(false);
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
        console.log(id);
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

///////Below: Loading Messages Thread when user is selected/////////


  const loadMessages = async () => {


    try {
      const thread = await axios.get('/dms/retrieveMessages', {
        params: { receiverId: receiverId },
      });
      const { data } = thread;
      console.log('receiverThread', thread)

      // Now set the new messages and show the container
      setMessages(data);
      console.log('messages', messages)
      // setReceiver(data[0]?.receiver); // Set the receiver based on the retrieved messages
      // setIsReceiverSelected(true);
      setShowMessageContainer(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (receiverId !== 0) {
      loadMessages();
    }
  }, [receiverId]);

///////Above: Loading Messages Thread when user is selected/////////



///////Below: Loading Messages Thread when Notification is clicked/////////


  useEffect(() => {
    // if we have notificationSenderId available, and it's different from the one stored in state
    if (notificationSenderId && notificationSenderId !== storedNotificationSenderId) {
      setSenderId(notificationSenderId);  // update senderId
      setStoredNotificationSenderId(notificationSenderId); // remember this notificationSenderId
      loadNotificationMessages();  // run your function
    }
    // setIsNotificationClicked(true);
  }, [notificationSenderId]);


  const loadNotificationMessages = async () => {
    // if (senderId !== 0) {
      console.log('sender', senderId)
      setIsSenderSelected(true);
      try {
        const thread = await axios.get('/dms/retrieveNotificationMessages', {

          params: { senderId: senderId },
        });
        console.log('notification thread', thread)
        const { data } = thread;
        // Now set the new messages and show the container
        setMessages(data);
        console.log('Messages', messages)

        setShowMessageContainer(true);
        // setIsSenderSelected(false);
      } catch (err) {
        console.log('Notification error', err);
      }
    // }

  };

  useEffect(() => {
    console.log('setSender', isSenderSelected);
    // console.log('setNotification', isNotificationClicked);
  }, [isSenderSelected])

  // useEffect(() => {
    // setShowMessageContainer(true);
    // console.log('Updated Messages:', messages);
  // }, [messages]);

  useEffect(() => {
    if (senderId !== 0) {
      loadNotificationMessages();
    }
}, [senderId,isSenderSelected]);  // We watch for senderId changes here

///////Above: Loading Messages Thread when Notification is clicked/////////




  /// End of Load Mounting ///

  const handleSendMessage = () => {
    if (!socket || !receiver) {
      return;
    }
    const newMessage = {
      senderId: userId,
      senderName: name,
      receiverId: receiver?.id ?? 0,
      receiverName: receiver.name,
      text: messageInput,
      fromMe: true,
    };

    // Emit a 'message' event to the server
    socket.emit('message', newMessage);


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

    // setMessages([...messages, newMessage]);
    setMessageInput('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // useEffect(() => {
  //   return () => {
  //     if (socket) {
  //       socket.disconnect();
  //     }
  //   };
  // }, [socket]);



  const handleNavigationAway = () => {
    setIsSenderSelected(false); // Reset the flag when user navigates away
    setIsNotificationClicked(false);
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
      {/* <div>{`Hello ${name}!`}</div> */}

      <SearchUsers
        open={open}
        setOpen={setOpen}
        options={options}
        setOptions={setOptions}
        loading={loading}
        receiver={receiver}
        setReceiver={setReceiver}
        // setReceiverId={setReceiverId}
        loadMessages={loadMessages}
        handleSetReceiver={handleSetReceiver}
        setIsReceiverSelected={setIsReceiverSelected}
        setShowMessageContainer={setShowMessageContainer}
        setMessages={setMessages}
      ></SearchUsers>
      {/* <Conversations /> */}
      {/* {isReceiverSelected && showMessageContainer && ( */}
      {((isReceiverSelected || isSenderSelected) && showMessageContainer) && (
        <Paper className={classes.root} key={receiver?.id} >
          <div
          className={classes.messagesContainer}
          // className='dm-container'
          ref={messagesContainerRef}>
            {messages.map((message) => (
              <Message
                id={message.id}
                senderId={message.senderId}
                senderName={message.senderName}
                receiverId={message.receiverId}
                receiverName={message.receiverName}
                text={message.text}
                // fromMe={message.senderId === userId}
                userId={userId}
                isNotificationClicked={isNotificationClicked}
              />
            ))}
          </div>

          <div className={classes.inputContainer}>
            <TextField
            fullWidth
            id="fullWidth"
              // {...props}
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
            <Button
            style={{left: 0}}
              variant='contained'
              color='primary'
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </div>
        </Paper>
      )}

    </BandAid>
  );
}

export default DirectMessages;
