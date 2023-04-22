import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Report } from '@prisma/client';
import { GoogleMap } from '@react-google-maps/api';

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [map, setMap] = useState<google.maps.Map>();

  const onLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('/reports');
        setReports(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReports();
  }, []);

  useEffect(() => {
    if (map && reports) {
      const markers = reports.map((report) => {
        const marker = new google.maps.Marker({
          position: { lat: report.location_lat, lng: report.location_lng },
          map,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<div>
            <p>Type: ${report.type}</p>
            <p>Title: ${report.title}</p>
            <p>Body: ${report.body}</p>
          </div>`
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        return marker;
      });
    }
  }, [map, reports]);

  useEffect(() => {
    if (map) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            map.setCenter(pos);
          },
          () => {
            console.error('Error: The Geolocation service failed.');
          }
        );
      } else {
        console.error('Error: Your browser doesn\'t support geolocation.');
      }
    }
  }, [map]);

  return (
    <div>
      <GoogleMap
        mapContainerStyle={{ height: '250px', width: '395px' }}
        zoom={10}
        onLoad={onLoad}
      />

      <h2>Reports:</h2>
      {reports.map((report) => (
        <div key={report.id}>
          <p>Type: {report.type}</p>
          <p>Title: {report.title}</p>
          <p>Body: {report.body}</p>

          <p>
            Location: {report.location_lat}, {report.location_lng}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Reports;
