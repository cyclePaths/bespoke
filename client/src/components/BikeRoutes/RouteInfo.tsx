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

  return (
    <div style={{ width: '100%' }}>
      <Box
        component='span'
        sx={{
          display: 'flex',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#101010' : '#fff',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
        }}
      >
        <div style={{ paddingRight: '5px' }}>{date}:</div>
        <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
          {route.name}
        </div>
        <div style={{ paddingRight: '15px', textAlign: 'center' }}>
          Likes: {route.likes}
        </div>
        <IconButton>
          <ThumbUpAltOutlinedIcon />
        </IconButton>
      </Box>
    </div>
  );
};

export default RouteInfo;
