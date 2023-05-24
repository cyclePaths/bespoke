import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MessageContext } from './Root';
import { Message } from './components/DirectMessages/DirectMessages';

const DMNotifications = ({ setShowConversations }) => {
  const navigate = useNavigate();
  const { message } = useContext(MessageContext);
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);


  useEffect(() => {
    if (message && !receivedMessages.includes(message)) {
      toast.success(message.text, {
        onClick: () => {
          console.log('checking message', message);
          setShowConversations(false);
          navigate('/directMessages', { state: {
            notificationSenderId: Number(message.senderId),
            notificationSenderName: message.senderName,
          } });
        }
      });

      setReceivedMessages(prevMessages => [...prevMessages, message]);
    }
  }, [message, navigate, receivedMessages]);

  return null;
};



export default DMNotifications;
