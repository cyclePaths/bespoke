import React, { useEffect, useState } from 'react';
import { RouteList } from '../../StyledComp';
import { IconButton, Box } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import axios from 'axios';

interface RouteProps {
  route: any;
}

const RouteInfo = ({ route }) => {
  const [date, setDate] = useState<string>(route.createdAt);
  const [like, setLike] = useState<boolean>(false);

  const checkForLikes = () => {
    axios
      .get('/bikeRoute/likes')
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.error('Failed to get: ', err);
      });
  };

  useEffect(() => {
    const date = new Date(route.createdAt);
    const readableDate = date.toLocaleDateString();
    setDate(readableDate);
  }, []);

  useEffect(() => {}, [like]);

  return (
    <div style={{ width: '100%' }}>
      <Box
        component='span'
        sx={{
          display: 'flex',
          width: '250px',
          borderStyle: 'solid',
          borderColor: 'gray',
          borderRadius: '3px',
          marginY: '5px',
          justifyContent: 'space-evenly',
        }}
      >
        <div style={{ marginTop: '10px' }}>{date}:</div>
        <div style={{ marginTop: '10px' }}>{route.name}</div>
        <div style={{ marginTop: '10px' }}>Likes:{route.likes}</div>
        <IconButton>
          {like ? (
            <ThumbUpAltOutlinedIcon
              style={{ color: '#6d6dbd' }}
              onClick={() => setLike(false)}
            />
          ) : (
            <ThumbUpAltOutlinedIcon onClick={() => setLike(true)} />
          )}
        </IconButton>
      </Box>
    </div>
  );
};

export default RouteInfo;
