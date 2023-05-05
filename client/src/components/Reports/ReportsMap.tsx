import React, { useEffect, useState, useContext, createContext} from 'react';
import axios from 'axios';
import { Report } from '@prisma/client';
import { GoogleMap } from '@react-google-maps/api';
import { UserContext } from '../../Root';
import { User } from '@prisma/client';
import { defaultMapContainerStyle } from '../BikeRoutes/Utils';
import { Box, Fab, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { BandAid } from '../../StyledComp';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import Icon from '@mui/material/Icon';
import { LatLngLiteral } from '../BikeRoutes/RouteM';



//  webpack url-loader
// import roadHazardIcon from './images/hazard.png';
// import theftAlertIcon from './icons/theft.png';
// import collisionIcon from './images/collision.png';
// import pointOfInterestIcon from './images/poi.png';

const ReportsMap: React.FC = () => {
  const [map, setMap] = useState<google.maps.Map>();
  const [center, setCenter] = useState<google.maps.LatLng>();
  const [reports, setReports] = useState<Report[]>([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [locationError, setLocationError] = useState(false);
  const [userCenter, setUserCenter] = useState<LatLngLiteral>({
    lat: 29.9511,
    lng: -90.0715,
  });
  const onLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const { user, geoLocation } = useContext(UserContext);
  const options = {
    disableDefaultUI: true,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'transit',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'water',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'landscape',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
    ],
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
    const value = event.target.value;
    setSelectedType(value === 'All' ? '' : value);
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
        const getMarkerIconUrl = (reportType) => {
          const markerSize = new google.maps.Size(35, 35);
          switch (reportType) {
            case 'Road Hazard':
              return {
                url: 'https://cdn2.iconfinder.com/data/icons/vehicle-18/100/transport-09-512.png',
                scaledSize: markerSize,
              };
            case 'Theft Alert':
              return {
                url: 'https://user-images.githubusercontent.com/25103430/71287503-897b8080-2336-11ea-8b31-848bfab5176e.png',
                scaledSize: markerSize,
              };
            case 'Collision':
              return {
                url: 'https://icons.iconarchive.com/icons/fa-team/fontawesome/48/FontAwesome-Car-Burst-icon.png',
                scaledSize: markerSize,
              };
            case 'Point of Interest':
              return {
                url: 'https://cdn.pixabay.com/photo/2013/04/01/21/30/point-of-interest-99163_960_720.png',
                scaledSize: markerSize,
              };
            default:
              return {
                url: './thefticon.png',
                scaledSize: markerSize,
              };
          }
        };

        //   return {
        //     url: roadHazardIcon,
        //     scaledSize: markerSize,
        //   };
        // case 'Theft Alert':
        //   return {
        //     url: theftAlertIcon,
        //     scaledSize: markerSize,
        //   };
        // case 'Collision':
        //   return {
        //     url: collisionIcon,
        //     scaledSize: markerSize,
        //   };
        // case 'Point of Interest':
        //   return {
        //     url: pointOfInterestIcon,
        //     scaledSize: markerSize,
        //   };
        // default:
        //   return {
        //     url: roadHazardIcon,
        //     scaledSize: markerSize,
        //   };

        const latLng = { lat: report.location_lat!, lng: report.location_lng! };
        const marker = new google.maps.Marker({
          position: latLng,
          map,
          icon: getMarkerIconUrl(report.type),
        });

        const infoWindow = new google.maps.InfoWindow();
        const contentDiv = document.createElement('div');
        const imageUrl: string | null = report.imgUrl;
        const imageElement = document.createElement('img');
        if (imageUrl !== null) {
          imageElement.src = imageUrl; // imageUrl is now inferred as string
        }
        contentDiv.appendChild(imageElement);
        const typeParagraph = document.createElement('p');
        typeParagraph.textContent = report.type;
        const titleParagraph = document.createElement('p');
        titleParagraph.textContent = report.title;
        const authorParagraph = document.createElement('p');
        authorParagraph.textContent = report.userId.toString();
        const bodyParagraph = document.createElement('p');
        bodyParagraph.textContent = report.body;
        // const createdAtParagraph = document.createElement('p');
        // createdAtParagraph.textContent = `Reported: ${report.createdAt}`;
        const button = document.createElement('button');
        button.textContent = 'Archive Report';
        button.onclick = () => handleButtonClick(report.id);
        const buttonClickedParagraph = document.createElement('p');
        if (buttonClicked) {
          buttonClickedParagraph.textContent = 'Button clicked';
        }
        contentDiv.appendChild(typeParagraph);
        contentDiv.appendChild(titleParagraph);
        contentDiv.appendChild(bodyParagraph);
        contentDiv.appendChild(button);
        contentDiv.appendChild(buttonClickedParagraph);
        infoWindow.setContent(contentDiv);

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        return marker;
      });

      const centerLatLng = center;
      const circle = new google.maps.Circle({
        center: centerLatLng!,
        radius: 804.5, // 1/5 mile in meters
        map,
        strokeColor: '#0000FF',
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillColor: '#0000FF',
        fillOpacity: 0.2,
      });

      markers.forEach((marker) => {
        marker.setMap(null);
      });

      setMarkers(newMarkers);

      const bounds = circle.getBounds();
      if (bounds !== null) {
        map.fitBounds(bounds);
      }
    }
  }, [map, reports, selectedType, buttonClicked]);

  // useEffect(() => {
  //   if (map) {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           const pos = new google.maps.LatLng(
  //             position.coords.latitude,
  //             position.coords.longitude
  //           );
  //           setCenter(pos);
  //         },
  //         () => {
  //           setLocationError(true);
  //         }
  //       );
  //     } else {
  //       setLocationError(true);
  //     }
  //   }
  // }, center? [map, selectedType] : [map]);

  // Sets the center of the map upon page loading //
  useEffect(() => {
    if (geoLocation) {
      setUserCenter({ lat: geoLocation.lat, lng: geoLocation.lng });
    }
  }, [geoLocation]);

  return (
    <BandAid>
      <div>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'absolute',
            top: 80,
            right: 2,
            zIndex: 1,
          }}
        >
          <Box sx={{ marginRight: 0 }}>
          </Box>
          <Box>
            <ToggleButtonGroup
              value={selectedType}
              onChange={handleTypeChange}
              aria-label='Report Type'
            >
              <ToggleButton value='All'>All</ToggleButton>
              <ToggleButton value='Road Hazard'>Road Hazard</ToggleButton>
              <ToggleButton value='Theft Alert'>Theft Alert</ToggleButton>
              <ToggleButton value='Collision'>Collision</ToggleButton>
              <ToggleButton value='Point of Interest'>
                Point of Interest
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        <Box height='87vh;'>
          <GoogleMap
            mapContainerStyle={{ height: '100%', width: '100%' }}
            center={userCenter}
            zoom={15}
            onLoad={onLoad}
            options={options as google.maps.MapOptions}
          />
        </Box>
      </div>
    </BandAid>
  );
};

export default ReportsMap;

