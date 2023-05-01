import React, { useEffect, useContext, createContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../Root';
import { useNavigate } from 'react-router-dom';
import ReportsMap from './ReportsMap';
import { Report } from '@prisma/client';
import ReportsList from './ReportsList';
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
import { BandAid } from '../../StyledComp';

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
  } | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(true);
  const handleClose = () => {
    setOpen(false);
  };

  const user = useContext(UserContext);

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
    try {
      if (!currentLocation) {
        throw new Error('Current location not available');
      }
      const { email, id } = user;
      const formData = new FormData();
      formData.append('userId', id);
      formData.append('userEmail', email);
      formData.append('body', body);
      formData.append('type', type);
      formData.append('title', title);
      formData.append('latitude', currentLocation.lat.toString());
      formData.append('longitude', currentLocation.lng.toString());
      image && formData.append('file', image);

      console.log(formData);
      const response = await axios.post<Report>('/reports', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setReports([...reports, response.data]);
      setBody('');
      setType('');
      setImage(null);
      setOpen(false); // Close the dialog after the report is submitted
  } catch (error: any) {
    console.error(error.message);
    setError(error.message);
  }
};

  //interval used to have its type set to: NodeJS.Timeout | null
  useEffect(() => {
    let interval: any | undefined;
    if (navigator.geolocation) {
      interval = setInterval(() => {
        if (!navigator.geolocation) {
          setError('Geolocation is not supported by this browser.');
          clearInterval(interval!);
          return;
        }
        var geoOps = {
          enableHighAccuracy: false,
          timeout: 10000,
        };
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ lat: latitude, lng: longitude });
            clearInterval(interval!);
            interval = null;
          },
          (error) => {
            setError(error.message);
          },
          geoOps
        );
      }, 1000);
    } else {
      setError('Geolocation is not supported by this browser.');
    }
    return () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };
  }, []);

  return (
    <div>
     <ReportsMap />
    <Dialog open={open} onClose={handleClose}>
      <div id='make-report-container'>
        <form onSubmit={handleSubmit}>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <ToggleButtonGroup
                value={type}
                onChange={handleTypeText}
                aria-label='Report Type'
              >
                <ToggleButton value='Road Hazard'>Road Hazard</ToggleButton>
                <ToggleButton value='Theft Alert'>Theft Alert</ToggleButton>
                <ToggleButton value='Collision'>Collision</ToggleButton>
                <ToggleButton value='Point of Interest'>
                  Point of Interest
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item>
              <TextField
                id='report-title-input'
                label='Report Title'
                variant='outlined'
                sx={{ width: '100%' }} // set the width to 100%
                onChange={handleTitleText}
              />
            </Grid>
            <Grid item>
              <TextField
                id='report-body-input'
                label='Comments'
                variant='outlined'
                multiline
                rows={4}
                sx={{ width: '100%' }} // set the width to 100%
                onChange={handleBodyText}
              />
            </Grid>
          </Grid>
          <IconButton
            color='primary'
            aria-label='upload picture'
            component='label'
          >
            <input hidden accept='image/*' type='file' />
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
