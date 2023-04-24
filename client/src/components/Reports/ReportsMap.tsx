import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Report } from '@prisma/client';
import { GoogleMap } from '@react-google-maps/api';
import { UserContext } from '../../Root';
import { User } from '@prisma/client';

const ReportsMap: React.FC = () => {
  const [map, setMap] = useState<google.maps.Map>();
  const [center, setCenter] = useState<google.maps.LatLng>();
  const [reports, setReports] = useState<Report[]>([]);
  const [buttonClicked, setButtonClicked] = useState(false);



  const onLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const user = useContext(UserContext);
  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };
  // const archiveReport = () => {
  //   console.log("attempting to update");
  //   const { id } = user;
  //   const updatedData = {
  //     archived: true
  //   };
  //   axios
  //     .put(`/home/user/${id}`, updatedData)
  //     .then((result) => {
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  const handleButtonClick = () => {
    setButtonClicked(true);
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('/reports');
        const filteredReports = response.data.filter((report) => {
          const reportCreatedAt = new Date(report.createdAt);
          const currentDate = new Date();
          const monthAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
          return reportCreatedAt >= monthAgo;
        });
        setReports(filteredReports);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReports();
  }, []);

  useEffect(() => {
    if (map && reports) {
      const markers = reports.map((report) => {
        const latLng = { lat: report.location_lat!, lng: report.location_lng! };
        const marker = new google.maps.Marker({
          position: latLng,
          map,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<div>
            <p>${report.type}</p>
            <p>${report.title}</p>
            <p>${report.body}</p>
            <p>Reported: ${report.createdAt}</p>
            <button onClick=${handleButtonClick}>Archive Report</button>
      ${buttonClicked ? '<p>Button clicked</p>' : ''}
          </div>`,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        return marker;
      });

      const bounds = new google.maps.LatLngBounds();
      markers.forEach((marker) => {
        const position = marker.getPosition();
        if (position) {
          bounds.extend(position);
        }
      });
      map.fitBounds(bounds);
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
        console.error("Error: Your browser doesn't support geolocation.");
      }
    }
  }, [map]);

  return (
    <div>
      <GoogleMap
        mapContainerStyle={{ height: '250px', width: '395px' }}
        center={center}
        zoom={15}
        onLoad={onLoad}
        options={options as google.maps.MapOptions}

      />
    </div>
  );
};

export default ReportsMap;
