import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Report } from '@prisma/client';
import { GoogleMap } from '@react-google-maps/api';
import { UserContext } from '../../Root';
import { User } from '@prisma/client';
import { defaultMapContainerStyle } from '../BikeRoutes/Utils';
import ReportsList from './ReportsList';

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

  const handleButtonClick = async (id: string) => {
    console.log(id);
    setButtonClicked(true);
    try {
      await axios.patch(`/reports/${id}`, { published: false });
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
        ? reports.filter(
            (report) =>
              report.type === selectedType && report.published === true
          )
        : reports.filter((report) => report.published === true);

      const newMarkers = filteredReports.map((report) => {
        const latLng = { lat: report.location_lat!, lng: report.location_lng! };
        const marker = new google.maps.Marker({
          position: latLng,
          map,
        });

        const infoWindow = new google.maps.InfoWindow();
        const contentDiv = document.createElement('div');
        const imageUrl: string | null = report.imgUrl;
        const imageElement = document.createElement('img');
        if (imageUrl !== null) {
          imageElement.src = imageUrl; // imageUrl is now inferred as string
        }        
        contentDiv.appendChild(imageElement);
        const idParagraph = document.createElement('p');
        idParagraph.textContent = report.id;
        const typeParagraph = document.createElement('p');
        typeParagraph.textContent = report.type;
        const titleParagraph = document.createElement('p');
        titleParagraph.textContent = report.title;
        const bodyParagraph = document.createElement('p');
        bodyParagraph.textContent = report.body;
        const createdAtParagraph = document.createElement('p');
        createdAtParagraph.textContent = `Reported: ${report.createdAt}`;
        const button = document.createElement('button');
        button.textContent = 'Archive Report';
        button.onclick = () => handleButtonClick(report.id);
        const buttonClickedParagraph = document.createElement('p');
        if (buttonClicked) {
          buttonClickedParagraph.textContent = 'Button clicked';
        }
        contentDiv.appendChild(idParagraph);
        contentDiv.appendChild(typeParagraph);
        contentDiv.appendChild(titleParagraph);
        contentDiv.appendChild(bodyParagraph);
        contentDiv.appendChild(createdAtParagraph);
        contentDiv.appendChild(button);
        contentDiv.appendChild(buttonClickedParagraph);
        infoWindow.setContent(contentDiv);

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
  }, [map, reports, selectedType, buttonClicked]);

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
      <ReportsList reports={reports} />

      <select value={selectedType} onChange={handleTypeChange}>
        <option value=''>All Reports</option>
        <option value='Road Hazard'>Road Hazard</option>
        <option value='Theft Alert'>Theft Alert</option>
        <option value='Collision'>Collision</option>
        <option value='Point of Interest'>Point of Interest</option>
      </select>
      {selectedType && <p>Selected type: {selectedType}</p>}
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        options={options as google.maps.MapOptions}
      />
    </div>
  );
};

export default ReportsMap;
