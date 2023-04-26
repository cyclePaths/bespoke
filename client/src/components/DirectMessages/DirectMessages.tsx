import React, { useState, useRef } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useStyles } from './DMStyles';

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
  const [messageInput, setMessageInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

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
    <Paper className={classes.root}>
      <div className={classes.messagesContainer}>
        {messages.map((message) => (
          <Message id={message.id} text={message.text} fromMe={message.fromMe} />
        ))}
      </div>
      <div className={classes.inputContainer}>
        <TextField
          className={classes.input}
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
  );
}

export default DirectMessages;
