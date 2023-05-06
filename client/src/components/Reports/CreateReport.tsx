import React, { useEffect, useContext, createContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../Root';
import { useNavigate } from 'react-router-dom';
import ReportsMap from './ReportsMap';
import { Report } from '@prisma/client';
import {
  Input,
  IconButton,
  InputLabel,
  InputAdornment,
  TextField,
  Grid,
  Button,
  Dialog,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { AttachFile, PhotoCamera } from '@mui/icons-material';
import { LatLngLiteral } from '../BikeRoutes/RouteM';

const CreateReport: React.FC = () => {
  // const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [body, setBody] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>();
  const [center, setCenter] = useState<google.maps.LatLng>();
  const [userCenter, setUserCenter] = useState<LatLngLiteral>({
    lat: 29.9511,
    lng: -90.0715,
  });
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(true);
  const handleClose = () => {
    setOpen(false);
  };

  const { user, geoLocation } = useContext(UserContext);

  const handleTypeText = (
    event: React.MouseEvent<HTMLElement>,
    value: string | null
  ) => {
    if (value) {
      setType(value);
    }
  };

  const handleTitleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleBodyText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.files?.[0] || null);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (currentLocation) {
      try {
        // console.log(user);
        const { email, id } = user;

        const formData = new FormData();
        formData.append('userId', id);
        formData.append('userEmail', email);
        formData.append('body', body);
        formData.append('type', type);
        formData.append('title', title);
        formData.append('latitude', currentLocation!.lat.toString());
        formData.append('longitude', currentLocation!.lng.toString());
        if (image) {
          formData.append('file', image);
        }
        // console.log(formData);
        const response = await axios.post<Report>('/reports', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setReports([...reports, response.data]);
        setBody('');
        setType('');
        setImage(null);
        setOpen(false);
      } catch (error: any) {
        console.error(error.message);
        setError(error.message);
      }
      console.log(formData);
      const response = await axios.post<Report>('/reports', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (type === 'Point of Interest') {
        // let currentTierPOI = 0;
        // for (let i = 0; i < user.userBadges.length; i++) {
        //   if (user.userBadges[i].name === 'Tour Guide') {
        //     currentTierPOI = user.userBadges[i].tier;
        //     break;
        //   }
        // }
        // if (currentTierPOI !== 0) {
        //   user.updateAchievements('Tour Guide', currentTierPOI, 1);
        // } else {
        //   user.updateAchievements('Tour Guide', 1, 1);
        // }
        user.addBadge('Tour Guide', 1);
      } else {
        // let currentTierHazard = 0;
        // for (let i = 0; i < user.userBadges.length; i++) {
        //   if (user.userBadges[i].name === 'Safety Sentinel') {
        //     currentTierHazard = user.userBadges[i].tier;
        //     break;
        //   }
        //   if (currentTierHazard !== 0) {
        //     user.updateAchievements('Safety Sentinel', currentTierHazard, 1);
        //   } else {
        //     user.updateAchievements('Safety Sentinel', 1, 1);
        //   }
        // }
        user.addBadge('Safety Sentinel', 1);
      }
      setReports([...reports, response.data]);
      setBody('');
      setType('');
      setImage(null);
      setOpen(false);
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
    }
  };
  useEffect(() => {
    if (geoLocation) {
      setCurrentLocation({ lat: geoLocation.lat, lng: geoLocation.lng });
    }
  }, [geoLocation]);

  // useEffect(() => {
  //   if (geoLocation) {
  //     setCurrentLocation({ lat: geoLocation.lat, lng: geoLocation.lng });
  //   }
  // }, currentLocation? [] : [geoLocation]);

  //interval used to have its type set to: NodeJS.Timeout | null
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        setError(error.message);
      }
    );
  }, []);

  return (
    <div>
      <ReportsMap />
      <Dialog open={open} onClose={handleClose}>
        <div id='make-report-container'>
          <form onSubmit={handleSubmit}>
            {/* <Grid container direction='column' spacing={2} sx={{ justifyContent: 'space-evenly' }}> */}
            {/* <Grid item> */}
            <ToggleButtonGroup
              value={type}
              onChange={handleTypeText}
              aria-label='Report Type'
              exclusive
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <ToggleButton value='Road Hazard' sx={{ width: '30%' }}>
                Hazard
              </ToggleButton>
              <ToggleButton value='Theft Alert' sx={{ width: '20%' }}>
                Theft
              </ToggleButton>
              <ToggleButton value='Collision' sx={{ width: '30%' }}>
                Collision
              </ToggleButton>
              <ToggleButton value='Point of Interest'>P.O.I</ToggleButton>
            </ToggleButtonGroup>
            {/* </Grid> */}
            {/* <Grid item> */}
            <TextField
              id='report-title-input'
              label='Report Title'
              variant='outlined'
              sx={{ width: '100%' }} // set the width to 100%
              onChange={handleTitleText}
            />
            {/* </Grid> */}
            {/* <Grid item> */}
            <TextField
              id='report-body-input'
              label='Comments'
              variant='outlined'
              multiline
              rows={4}
              sx={{ width: '100%' }} // set the width to 100%
              onChange={handleBodyText}
            />
            {/* </Grid> */}
            {/* </Grid> */}

            <IconButton
              color='primary'
              aria-label='upload picture'
              component='label'
            >
              <input
                hidden
                accept='image/*'
                type='file'
                name='file'
                onChange={handleImage}
              />
              <PhotoCamera />
            </IconButton>
            <input type='submit' value='submit' />
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default CreateReport;
