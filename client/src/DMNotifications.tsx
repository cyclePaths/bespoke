import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MessageContext } from './Root'; // Assuming Root and Notification are in the same directory

const DMNotifications = () => {
  const navigate = useNavigate();
  const { message } = useContext(MessageContext);
  const [isNotificationShown, setIsNotificationShown] = useState(false);

  useEffect(() => {
    if (message && !isNotificationShown) {
      toast.success(message.text, {
        onClick: () => {
          // navigate(`/directMessages?receiverId=${message.receiverId}`);
          // navigate('/directMessages', { state: { notificationReceiverId: message.receiverId } });
          navigate('/directMessages', { state: { notificationSenderId: Number(message.senderId) } });

        }
      });

      setIsNotificationShown(true);
    }
  }, [message, navigate, isNotificationShown]);

  return null;
};

export default DMNotifications;

