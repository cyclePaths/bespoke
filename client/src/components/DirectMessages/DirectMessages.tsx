import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useStyles, inputTextStyle } from './DMStyles';
import SearchUsers, { Users } from './SearchUsers';
import { ThemeProvider } from '@mui/material/styles';

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

  useEffect(() => {
    axios
      .get('/profile/user')
      .then(({ data }) => {
        const { id } = data.id
        setUserId(id);
      })
      .catch((err) => {
        console.log(err);
      });

    if (receiver) {
      setReceiverId(receiver.id)
      console.log(options);
      console.log(receiver);
    }
  }, [receiver]);

  const handleSendMessage = () => {
    const newMessage: Message = {
      id: 0,
      senderId: userId,
      receiverId: receiver?.id ?? 0,
      text: messageInput,
      fromMe: true,
    };
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

    setMessages([...messages, newMessage]);
    setMessageInput('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <SearchUsers
        open={open}
        setOpen={setOpen}
        options={options}
        setOptions={setOptions}
        loading={loading}
        receiver={receiver}
        setReceiver={setReceiver}
      ></SearchUsers>

      <Paper className={classes.root}>
        <div className={classes.messagesContainer}>
          {messages.map((message) => (
            <Message
              id={message.id}
              senderId={message.senderId}
              receiverId={message.receiverId}
              text={message.text}
              fromMe={message.fromMe}
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
    </div>
  );
}

export default DirectMessages;
