import React, { useEffect, useContext, createContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../Root';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, Marker } from '@react-google-maps/api';
import ReportsMap from './ReportsMap';
import Reports from './Reports';

// define report object
interface Report {
  body?: string;
  type?: string;
  title?: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  location_lat?: number;
  location_lng?: number;
  userId: number;
}

const CreateReport = () => {
  const navigate = useNavigate();

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

  const user = useContext(UserContext);

  const handleTypeText = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!currentLocation) {
        throw new Error('Current location not available');
      }
      const formData = new FormData();
      formData.append('body', body);
      formData.append('type', type);
      formData.append('title', title);
      formData.append('latitude', currentLocation.lat.toString());
      formData.append('longitude', currentLocation.lng.toString());
      if (image) {
        formData.append('image', image);
      }
      const reportData: Omit<Report, 'id'> = {
        body,
        type,
        title,
        location_lat: currentLocation!.lat,
        location_lng: currentLocation!.lng,
        createdAt: new Date(),
        updatedAt: new Date(),
        published: false,
        userId: user.id!,
      };
      const response = await axios.post('/reports', reportData);
      setReports([...reports, response.data]);
      setBody('');
      setType('');
      setImage(null);
      navigate('/reports');
    } catch (error: any) {
      console.error(error);
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
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ lat: latitude, lng: longitude });
            clearInterval(interval!);
            interval = null;
          },
          (error) => setError(error.message)
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

  // useEffect(() => {

  //     console.log("User", user);

  // }, [])

  return (
    <div>
      <h1>Reports</h1>
      <div style={{ height: '400px', width: '100%' }}>
        <ReportsMap />
      </div>
      <h2>Make a Report</h2>
      <form onSubmit={handleSubmit}>
        <select id='report-type-input' onChange={handleTypeText}>
          <option value=''>Select a Report Type</option>
          <option value='Road Hazard'>Road Hazard</option>
          <option value='Theft Alert'>Theft Alert</option>
          <option value='Collision'>Collision</option>
          <option value='Point of Interest'>Point of Interest</option>
        </select>
        <input
          id='report-title-input'
          type='text'
          placeholder='Report Title'
          onChange={handleTitleText}
        />
        <input
          id='report-body-input'
          type='text'
          placeholder='Comments'
          onChange={handleBodyText}
        />
        <input type='file' accept='image/*' onChange={handleImage} />
        <input type='submit' value='submit' />
      </form>
    </div>
  );
};

export default CreateReport;
