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
  text: string;
  fromMe: boolean;
}

function Message({ text, fromMe }: Message) {
  const classes = useStyles();

  return (
    <Paper className={`${classes.message} ${fromMe ? classes.messageFromMe : classes.messageFromOther}`}>
      {text}
    </Paper>
  );
}

function DirectMessages() {
  const classes = useStyles();
  const inputClasses = inputTextStyle();
  const [messageInput, setMessageInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello!", fromMe: false },
    { id: 2, text: "Hi there!", fromMe: true },
    { id: 3, text: "How are you?", fromMe: false },
    { id: 4, text: "I'm good, thanks!", fromMe: true },
  ]);
  const [selectedUser, setSelectedUser] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Users[]>([]);
  const loading = open && options.length === 0;


  const getUser = () => {
    // axios.get(`/dms/findUser/:${selectedUser}`)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
  }

  useEffect(() => {
    if (selectedUser) {
      console.log(options)
      console.log(selectedUser)
      getUser()
    }
  }, [selectedUser]);

  const handleSendMessage = () => {
    const newMessage: Message = { id: 0, text: messageInput, fromMe: true };
    axios.post('/dms/message', {
      message: messageInput,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err)
      })


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
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        getUser={getUser}
        ></SearchUsers>


    <Paper className={classes.root}>
      <div className={classes.messagesContainer}>
        {messages.map((message) => (
          <Message id={message.id} text={message.text} fromMe={message.fromMe} />
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
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          multiline
          minRows={1}
          maxRows={18}
          inputRef={inputRef}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </div>

    </Paper>

    </div>
  );
}

export default DirectMessages;



