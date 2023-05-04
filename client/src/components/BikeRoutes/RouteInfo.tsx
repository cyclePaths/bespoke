import React, { useEffect, useState, useContext } from 'react';
import { RouteList } from '../../StyledComp';
import { IconButton, Box } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import axios from 'axios';
import { UserContext } from '../../Root';
import { Coordinates, RouteProps } from './RouteM';

const RouteInfo = ({
  route,
  index,
  handleRouteClick,
  setOpenSearch,
  fetchDirections,
  setRouteList,
  likeList,
  setMarkers,
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

  const handleRouteParsing = () => {
    const origin = JSON.parse(route.origin as string);
    const destination = JSON.parse(route.destination as string);
    let waypoints;

    if (route.waypoints !== null) {
      waypoints = route.waypoints.map((waypoint) => {
        const lat = waypoint.location.location.lat;
        const lng = waypoint.location.location.lng;
        return {
          lat: lat,
          lng: lng,
        };
      });

      handleRouteClick(origin, destination);
      setMarkers(waypoints);
      setOpenSearch(false);
      setRouteList([]);
    } else {
      handleRouteClick(origin, destination);
      setOpenSearch(false);
      setRouteList([]);
    }
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
    <div style={{ width: '130%' }}>
      <Box
        component='span'
        sx={{
          backgroundColor: '#e0e0e0',
          display: 'grid',
          width: '100%',
          boxShadow: '-2px 4px 4px rgba(0,0,0,0.2)',
          borderRadius: '3px',
          marginY: '5px',
          justifyContent: 'center',
          justifyItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ marginTop: '10px' }}>{date}:</div>
          <div className='route-name' onClick={() => handleRouteParsing()}>
            {route.name}
          </div>
        </div>
        <span
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <div style={{ marginTop: '4px' }}>Likes: {likeNumber}</div>
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
        </span>
      </Box>
    </div>
  );
};

export default RouteInfo;
