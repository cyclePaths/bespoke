import React, { useEffect, useState, useContext } from 'react';
import { RouteList } from '../../StyledComp';
import { IconButton, Box } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import axios from 'axios';
import { UserContext } from '../../Root';
import { RouteProps } from './RouteM';

const RouteInfo = ({
  route,
  index,
  handleRouteClick,
  setOpenSearch,
  fetchDirections,
  setRouteList,
  likeList,
  setLikeList,
}: RouteProps) => {
  const { user } = useContext(UserContext);
  const [date, setDate] = useState<string>(route.createdAt);
  const [like, setLike] = useState<boolean>(false);
  const [likeNumber, setLikeNumber] = useState<number>(route.likes);

  const updateLikes = (isClicked: boolean) => {
    axios
      .put('/bikeRoutes/likes', {
        like: isClicked,
        routeId: route.id,
        userId: route.userId,
      })
      .then(({ data }) => {
        setLikeNumber(data.likes);
      })
      .catch((err) => {
        console.error('Failed to update User:', err);
      });
  };

  useEffect(() => {
    const date = new Date(route.createdAt);
    const readableDate = date.toLocaleDateString();
    setDate(readableDate);
  }, []);

  useEffect(() => {
    let result = false;
    likeList[index].forEach((likes) => {
      if (likes.userId === user.id) {
        result = true;
      }
    });
    setLike(result);
  }, []);

  return (
    <div style={{ width: '105%' }}>
      <Box
        component='span'
        sx={{
          display: 'flex',
          width: '100%',
          boxShadow: 2,
          borderRadius: '3px',
          marginY: '5px',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <div
            style={{ marginTop: '10px', marginRight: '5px', marginLeft: '5px' }}
          >
            {date}:
          </div>
          <div
            className='route-name'
            style={{
              marginTop: '10px',
              marginRight: '5px',
              marginLeft: '5px',
              fontWeight: 'bolder',
            }}
            onClick={() => {
              handleRouteClick(route.origin, route.destination);
              setOpenSearch(false);
              setRouteList([]);
            }}
          >
            {route.name}
          </div>
          <div style={{ marginTop: '10px', marginLeft: '5px' }}>
            Likes: {likeNumber}
          </div>
        </div>
        {route.userId === user.id ? (
          <IconButton disabled>
            <ThumbUpAltOutlinedIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              if (!like) {
                setLike(true);
                updateLikes(true);
              } else {
                setLike(false);
                updateLikes(false);
              }
            }}
          >
            {like === true ? (
              <ThumbUpAltOutlinedIcon style={{ color: '#6d6dbd' }} />
            ) : (
              <ThumbUpAltOutlinedIcon />
            )}
          </IconButton>
        )}
      </Box>
    </div>
  );
};

export default RouteInfo;
