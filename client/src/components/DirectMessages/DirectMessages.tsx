import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useStyles, inputTextStyle } from './DMStyles';
import SearchUsers, { Users } from './SearchUsers';
import { ThemeProvider } from '@mui/material/styles';
import io from 'socket.io-client';
import * as SocketIOClient from 'socket.io-client';
import { BandAid } from '../../StyledComp';

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  text: string;
  fromMe: boolean;
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

function Message({ text, fromMe }: Message) {
  const classes = useStyles();

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
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, senderId: 1, receiverId: 2, text: 'Hello!', fromMe: false },
    { id: 2, senderId: 2, receiverId: 1, text: 'Hi there!', fromMe: true },
    { id: 3, senderId: 1, receiverId: 2, text: 'How are you?', fromMe: false },
    {
      id: 4,
      senderId: 2,
      receiverId: 1,
      text: "I'm good, thanks!",
      fromMe: true,
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Users[]>([]);
  const loading = open && options.length === 0;
  const [userId, setUserId] = useState(0);
  const [receiverId, setReceiverId] = useState(0);
  const [receiver, setReceiver] = useState<SelectedUser>();
  const [name, setName] = useState(true);
  const [messageThread, setMessageThread] = useState<Message[]>([]);
  const [isReceiverSelected, setIsReceiverSelected] = useState(false);

  const [socket, setSocket] = useState<SocketIOClient.Socket>();

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const handleSetReceiver = (receiver: SelectedUser | null) => {
    if (receiver !== null) {
      setReceiver(receiver);
      setIsReceiverSelected(true);
    } else {
      setReceiver(undefined);
      setIsReceiverSelected(false);
    }
  };


  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
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
      console.log(options);
      console.log(receiver);
    }
  }, [receiver]);


  useEffect(() => {
    const newSocket = io('http://localhost:8080');

    // Store the Socket.IO client instance in the state variable
    setSocket(newSocket);

    // Listen for incoming 'message' events
    newSocket.on('message', (newMessage: Message) => {
      // Add the new message to the messages array if it's from the targeted receiver
    if (newMessage.senderId === receiverId || newMessage.receiverId === receiverId) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
    });

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, [receiverId]);

  const loadMessages = async () => {
    try {
      const thread = await axios.get('/dms/retrieveMessages', {
        params: { receiverId: receiverId },
      });
      console.log('Thread', thread);
      const { data } = thread;
      console.log('Big thread', thread);

      data.forEach((message) => {
        console.log(message.text);
        // setMessageThread((pevMessages) => [...pevMessages, message.text] as Message[])
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log('check thread', messages);
  useEffect(() => {
    if (receiverId !== 0) {
      loadMessages();
    }
  }, [receiverId]);

  const handleSendMessage = () => {
    if (!socket || !receiver) {
      return;
    }

    const newMessage: Message = {
      id: 0,
      senderId: userId,
      receiverId: receiver?.id ?? 0,
      text: messageInput,
      fromMe: true,
    };

    // Emit a 'message' event to the server
    // socketRef.current?.emit('message', newMessage);
    socket?.emit('message', newMessage);

    axios
      .post('/dms/message', {
        message: newMessage,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    // setMessages([...messages, newMessage]);
    setMessageInput('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <BandAid>
      <div>{`Hello ${name}!`}</div>
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
      ></SearchUsers>
{isReceiverSelected && (
      <Paper className={classes.root} >
        <div className={classes.messagesContainer} ref={messagesContainerRef}>
          {messages.map((message) => (
            <Message
              id={message.id}
              senderId={message.senderId}
              receiverId={message.receiverId}
              text={message.text}
              fromMe={message.senderId === userId}
            />
          ))}
        </div>

        <div className={classes.inputContainer}>
          <TextField
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

