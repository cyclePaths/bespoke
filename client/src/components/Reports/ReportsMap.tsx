import React, { useEffect, useState, useContext, createContext } from 'react';
import UpdatedReportsContext from './UpdatedReportsContext';
import axios from 'axios';
import { Report } from '@prisma/client';
import { GoogleMap } from '@react-google-maps/api';
import { UserContext } from '../../Root';
import { User } from '@prisma/client';
import { defaultMapContainerStyle } from '../BikeRoutes/Utils';
import {
  Box,
  Drawer,
  Fab,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { BandAid } from '../../StyledComp';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import { Icon, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArchiveIcon from '@mui/icons-material/Archive';
import { LatLngLiteral } from '../BikeRoutes/RouteM';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Card, CardContent } from '@mui/material';
import CreateReport from './CreateReport';

dayjs.extend(utc);

interface ReportsMapProps {
  updatedReports: Report[];
}
// type CreateReportProps = {
//   fetchReports: () => Promise<void>;
// };

const ReportsMap = ({monthReports, fetchThisMonthReports}) => {
  // console.log("ReportsMap", props);

  const updatedReports = useContext(UpdatedReportsContext);

  const [map, setMap] = useState<google.maps.Map>();
  const [center, setCenter] = useState<google.maps.LatLng>();
  const [reports, setReports] = useState<Report[]>(monthReports); // Assign monthReports to reports state
  const [buttonClicked, setButtonClicked] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [locationError, setLocationError] = useState(false);
  const [userCenter, setUserCenter] = useState<LatLngLiteral>({
    lat: 29.9511,
    lng: -90.0715,
  });
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

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
    setSelectedReport(null);
    setButtonClicked(true);
    try {
      await axios.patch(`/reports/${id}`, { published: false });
      console.log(id);
      fetchThisMonthReports();

      // setMarkers(prevMarkers => prevMarkers.filter(marker => marker.get("reportId") !== id));
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
  const addNewReport = (newReport: Report) => {
    setReports((prevReports) => [...prevReports, newReport]);
  };
  // ****Commented out to move fetching to parent component ****
  // useEffect(() => {
  // const fetchThisMonthReports = async () => {
  //   try {
  //     const response = await axios.get('/reports/thisMonth');
  //     const filteredReports = response.data;
  //     // console.log("reports:", response.data);
  //     setReports(filteredReports);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  // useEffect(() => {
  //       fetchReports();

  // }, [])

  useEffect(() => {
    setReports(monthReports);
  }, [monthReports]);

  useEffect(() => {

    if (map && reports) {
      console.log("setting Markers: ", reports);
      const newMarkers = reports.map((report) => {
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

        const latLng = { lat: report.location_lat!, lng: report.location_lng! };
        const marker = new google.maps.Marker({
          position: latLng,
          map,
          icon: getMarkerIconUrl(report.type),
        });

        marker.set("reportId", report.id); // Store the reportId using the set method



        const isoDate = report.createdAt;
        const formattedDate = dayjs.utc(isoDate).format('DD/MM/YYYY');
        const infoWindow = new google.maps.InfoWindow();
        const contentDiv = document.createElement('div');
        const imageUrl: string | null = report.imgUrl;
        const imageElement = document.createElement('img');
        if (imageUrl !== null) {
          imageElement.src = imageUrl;
          imageElement.loading = "lazy";
        }


        contentDiv.appendChild(imageElement);
        const dateParagraph = document.createElement('p');
        dateParagraph.textContent = formattedDate;
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
        contentDiv.appendChild(dateParagraph);
        contentDiv.appendChild(typeParagraph);
        contentDiv.appendChild(authorParagraph);
        contentDiv.appendChild(titleParagraph);
        contentDiv.appendChild(bodyParagraph);
        contentDiv.appendChild(button);
        contentDiv.appendChild(buttonClickedParagraph);
        infoWindow.setContent(contentDiv);


        marker.addListener('click', () => {
          setSelectedReport(report);
        });

        return marker;
      });

      // const filteredMarkers = newMarkers.filter((marker) => {
      //   const reportId = marker.get("reportId");
      //   return updatedReports.find((report) => report.id === reportId)?.published;
      // });

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

          // Set the new markers on the map
    newMarkers.forEach((marker) => {
      marker.setMap(map);
    });

      setMarkers(newMarkers);

      const bounds = circle.getBounds();
      if (bounds !== null) {
        map.fitBounds(bounds);
      }
    }
  }, [map, selectedType, buttonClicked, reports]);




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
            left: 2,
            zIndex: 1,
          }}
        >
          <ToggleButtonGroup
            value={selectedType}
            onChange={handleTypeChange}
            aria-label='Report Type'
            sx={{ backgroundColor: 'white' }}
          >
            <ToggleButton
              value='All'
              sx={{
                flexGrow: 1,
                color: selectedType === 'All' ? 'white' : 'grey',
                backgroundColor: selectedType === 'All' ? 'white' : 'lightgrey',
              }}
            >
              All
            </ToggleButton>
            <ToggleButton
              value='Road Hazard'
              sx={{
                flexGrow: 1,
                color: selectedType === 'Road Hazard' ? 'white' : 'grey',
                backgroundColor:
                  selectedType === 'Road Hazard' ? 'white' : 'lightgrey',
              }}
            >
              Road
            </ToggleButton>
            <ToggleButton
              value='Theft Alert'
              sx={{
                flexGrow: 1,
                color: selectedType === 'Theft Alert' ? 'white' : 'grey',
                backgroundColor:
                  selectedType === 'Theft Alert' ? 'white' : 'lightgrey',
              }}
            >
              Theft
            </ToggleButton>
            <ToggleButton
              value='Collision'
              sx={{
                flexGrow: 1,
                color: selectedType === 'Collision' ? 'white' : 'grey',
                backgroundColor:
                  selectedType === 'Collision' ? 'white' : 'lightgrey',
              }}
            >
              Collision
            </ToggleButton>
            <ToggleButton
              value='Point of Interest'
              sx={{
                flexGrow: 1,
                color: selectedType === 'Point of Interest' ? 'white' : 'grey',
                backgroundColor:
                  selectedType === 'Point of Interest' ? 'white' : 'lightgrey',
              }}
            >
              POI
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box height='87vh;'>
          <Box
            sx={{
              height: '87vh',
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: 'grey',
            }}
          >
            <Drawer
              anchor='bottom'
              open={selectedReport !== null}
              onClose={() => setSelectedReport(null)}
              sx={{ maxHeight: '80vh' }}
            >
              <Box sx={{ padding: 2, backgroundColor: 'lightgrey'}}>
                <IconButton
                  onClick={() => setSelectedReport(null)}
                  sx={{ position: 'absolute', bottom: 8, right: 8 }}
                >
                  <CloseIcon />
                </IconButton>
                {selectedReport && (
                  <>
                    {selectedReport.imgUrl && (
                      <img src={selectedReport.imgUrl} alt='Report image' />
                    )}
                    <p>
                      {dayjs(selectedReport.createdAt).format('DD/MM/YYYY')}
                    </p>
                    <p>{selectedReport.type}</p>
                    <p>{selectedReport.title}</p>
                    <p>{selectedReport.userId}</p>
                    <p>{selectedReport.body}</p>
                    <ArchiveIcon
                      onClick={() => handleButtonClick(selectedReport.id)}
                    >
                      Archive Report
                    </ArchiveIcon>
                  </>
                )}
              </Box>
            </Drawer>

            <Box sx={{ flexGrow: 1 }}>
              <GoogleMap
                mapContainerStyle={{ height: '100%', width: '100%' }}
                center={userCenter}
                zoom={15}
                onLoad={onLoad}
                options={options as google.maps.MapOptions}
              />
            </Box>
          </Box>
        </Box>
      </div>
      <CreateReport fetchThisMonthReports={fetchThisMonthReports}/>
    </BandAid>
  );
};

export default ReportsMap;
