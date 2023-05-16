import React, { useEffect, useState, useContext, useCallback } from 'react';
import { RouteAlerts, RouteList } from '../../StyledComp';
import {
  IconButton,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { UserContext } from '../../Root';
import { RouteProps } from './RouteM';

const RouteInfo = ({
  route,
  index,
  handleRouteClick,
  setOpenSearch,
  routeList,
  setRouteList,
  likeList,
  setMarkers,
  deleteRoute,
}: RouteProps) => {
  const { user } = useContext(UserContext);
  const [date, setDate] = useState<string>(route.createdAt);
  const [like, setLike] = useState<boolean>(false);
  const [likeNumber, setLikeNumber] = useState<number>(route.likes);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [deleteMessage, setDeleteMessage] = useState<boolean>(false);

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

  const handleDeleteRoute = () => {
    deleteRoute(route.id, route.likes);
    setDeleteOpen(false);
    setDeleteMessage(true);

    // setTimeout(() => {
    //   setDeleteMessage(false);
    // }, 2400);
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
      {deleteMessage ? (
        <RouteAlerts id='Delete-Alert'>
          Route Deleted{' '}
          <img
            src='https://cdn.discordapp.com/attachments/187823430295355392/1103162661111336970/icons8-done.gif'
            className='checkmark'
          />
        </RouteAlerts>
      ) : (
        <></>
      )}
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
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ marginTop: '4px' }}>Likes: {likeNumber}</div>
          <span style={{ display: 'flex', flexDirection: 'row' }}>
            {route.userId === user.id ? (
              <IconButton disabled sx={{ marginRight: '10px' }}>
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
                sx={{ marginRight: '10px' }}
              >
                {like === true ? (
                  <ThumbUpAltOutlinedIcon style={{ color: '#6d6dbd' }} />
                ) : (
                  <ThumbUpAltOutlinedIcon />
                )}
              </IconButton>
            )}
            {route.userId === user.id ? (
              <IconButton
                sx={{ marginLeft: '10px' }}
                onClick={() => setDeleteOpen(true)}
              >
                <DeleteIcon />
              </IconButton>
            ) : (
              <IconButton disabled sx={{ marginLeft: '10px' }}>
                <DeleteIcon />
              </IconButton>
            )}
          </span>
        </span>
        <Dialog open={deleteOpen}>
          <DialogTitle>Delete this route?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this route (any likes by other
              users will be deleted as well)?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteRoute}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default RouteInfo;
