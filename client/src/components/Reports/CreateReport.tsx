import React, { useEffect, useContext, createContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../Root';

// define report object
interface Report {
  id: number;
  title?: string;
  body?: string;
  type?: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  location_lat?: number;
  location_lng?: number;
}


const CreateReport = () => {
  // reports must be array of Report objects
  const [reports, setReports] = useState<Report[]>([]);
  const [body, setBody] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  const user = useContext(UserContext);


  const handleTypeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
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
      formData.append('latitude', currentLocation.lat.toString());
      formData.append('longitude', currentLocation.lng.toString());
      if (image) {
        formData.append('image', image);
      }
      const reportData: Report = {
        body,
        type,
        location_lat: currentLocation!.lat,
        location_lng: currentLocation!.lng,
        createdAt: new Date(),
        updatedAt: new Date(),
        published: false,
        id: reports.length + 1
      };
      const response = await axios.post('/reports', reportData);
      setReports([...reports, response.data]);
      setBody('');
      setType('');
      setImage(null);
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

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <input
            id='report-type-input'
            type='text'
            placeholder='Report Type'
            onChange={handleTypeText}
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
