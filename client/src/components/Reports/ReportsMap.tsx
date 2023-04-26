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
  const [selectedType, setSelectedType] = useState('');
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);


  const onLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const user = useContext(UserContext);
  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  // const archiveReport = (id: string) => {
  //   console.log("attempting to update");
  //   axios
  //     .put(`/reports/${id}`, { published: false })
  //     .then((result) => {
  //       // If the update was successful, you can fetch the updated reports again to re-render the map with the updated data.
  //       // fetchReports();
  //       setButtonClicked(false);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };


  const handleButtonClick = async (id: string) => {
    console.log(id);
    setButtonClicked(true);
    try {
      await axios.patch(`/reports/${id}`, { published: false});
      // If the update was successful, you can fetch the updated reports again to re-render the map with the updated data.
      // fetchReports();
    } catch (error) {
      console.error(error);
    } finally {
      setButtonClicked(false);
    }
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  // const fetchReports = async () => {
  //   try {
  //     const response = await axios.get('/reports');
  //     const filteredReports = response.data.filter((report) => {
  //       const reportCreatedAt = new Date(report.createdAt);
  //       const currentDate = new Date();
  //       const monthAgo = new Date(
  //         currentDate.getFullYear(),
  //         currentDate.getMonth() - 1,
  //         currentDate.getDate()
  //       );
  //       return reportCreatedAt >= monthAgo;
  //     });
  //     setReports(filteredReports);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchReports();
  // }, [])

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('/reports');
        const filteredReports = response.data.filter((report) => {
          const reportCreatedAt = new Date(report.createdAt);
          const currentDate = new Date();
          const monthAgo = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            currentDate.getDate()
          );
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
      const filteredReports = selectedType
        ? reports.filter((report) => report.type === selectedType)
        : reports;

      const newMarkers = filteredReports.map((report) => {
        const latLng = { lat: report.location_lat!, lng: report.location_lng! };
        const marker = new google.maps.Marker({
          position: latLng,
          map,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<div>
          <p>${report.id}</p>

            <p>${report.type}</p>
            <p>${report.title}</p>
            <p>${report.body}</p>
            <p>Reported: ${report.createdAt}</p>
            <button onClick=${handleButtonClick(report.id)}>Archive Report</button>
      ${buttonClicked ? '<p>Button clicked</p>' : ''}
          </div>`,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        return marker;
      });

      markers.forEach((marker) => {
        marker.setMap(null);
      });

      setMarkers(newMarkers);

      const bounds = new google.maps.LatLngBounds();
      newMarkers.forEach((marker) => {
        const position = marker.getPosition();
        if (position) {
          bounds.extend(position);
        }
      });
      map.fitBounds(bounds);
    }
  }, [map, reports, selectedType]);

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
      <select value={selectedType} onChange={handleTypeChange}>
        <option value=''>All Reports</option>
        <option value='Road Hazard'>Road Hazard</option>
        <option value='Theft Alert'>Theft Alert</option>
        <option value='Collision'>Collision</option>
        <option value='Point of Interest'>Point of Interest</option>
      </select>
      {selectedType && <p>Selected type: {selectedType}</p>}
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
