import React, { useEffect, useState, useContext, createContext } from 'react';
import UpdatedReportsContext from './UpdatedReportsContext';
import axios from 'axios';
// import { Report } from '@prisma/client';
import { GoogleMap } from '@react-google-maps/api';
import { UserContext } from '../../Root';
import { User } from '@prisma/client';
import {
  defaultMapContainerStyle,
  darkModeOptions,
  defaultOptions,
} from '../BikeRoutes/Utils';
import {
  Theme,
  Tooltip,
  Box,
  Drawer,
  Fab,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { BandAid } from '../../StyledComp';

import { Icon, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArchiveIcon from '@mui/icons-material/Archive';
import { LatLngLiteral } from '../BikeRoutes/RouteM';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Card, CardContent } from '@mui/material';
import CreateReport from './CreateReport';
import Typography from '@mui/material/Typography';
import 'dayjs/locale/en'; // Import the locale you want to use for month names
import 'dayjs/plugin/customParseFormat'; // Import the plugin for custom format parsing
import 'dayjs/plugin/localizedFormat'; // Import the plugin for localized format

dayjs.extend(require('dayjs/plugin/customParseFormat')); // Extend dayjs with the customParseFormat plugin
dayjs.extend(require('dayjs/plugin/localizedFormat')); // Extend dayjs with the localizedFormat plugin

dayjs.extend(utc);

interface ReportsMapProps {
  updatedReports: Report[];
}
// type CreateReportProps = {
//   fetchReports: () => Promise<void>;
// };
interface Report {
  id: string;
  title: string | null;
  body: string | null;
  type: string | null;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  location_lat?: number;
  location_lng?: number;
  userId: number;
  author: User; // Add the 'author' property
  imgUrl: string | null;
  comments: Comment[];
}

const ReportsMap = ({ monthReports, fetchThisMonthReports }) => {
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

  const { user, geoLocation, isDark, joinDate } = useContext(UserContext);
  // console.log(joinDate);
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
      // console.log(id);
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

  useEffect(() => {
    setReports(monthReports);
  }, [monthReports]);

  useEffect(() => {
    if (map && reports) {
      // console.log('setting Markers: ', reports);

      // Filter the reports based on the selectedType
      const filteredReports = reports.filter((report: Report) => {
        if (selectedType === '') {
          // If selectedType is empty, include all reports
          return true;
        } else {
          // Include reports with matching type
          return report.type === selectedType;
        }
      });

      const newMarkers = filteredReports.map((report: Report) => {
        // Assuming you have fetched the report data and stored it in the `report` variable
        const author: User = report.author;
        // console.log('Author: ', author.name); // Output the author information
        const getMarkerIconUrl = (reportType) => {
          const markerSize = new google.maps.Size(35, 35);
          switch (reportType) {
            case 'Road Hazard':
              return {
                url: 'https://res.cloudinary.com/dcecaxmxv/image/upload/v1685130782/owbm7dh1aqkzgz8fpkay.png',
                scaledSize: markerSize,
              };
            case 'Theft Alert':
              return {
                url: isDark
                  ? 'https://res.cloudinary.com/dcecaxmxv/image/upload/v1685132831/ums6svk2hlgqpiuq2ehc.png'
                  : 'https://res.cloudinary.com/dcecaxmxv/image/upload/v1685126963/odr2o07adcq5yagvuus2.png',
                scaledSize: markerSize,
              };
            case 'Collision':
              return {
                url: 'https://res.cloudinary.com/dcecaxmxv/image/upload/v1685126153/mbgbyds2wb6sdy8srfrv.png',
                scaledSize: markerSize,
              };
            case 'Point of Interest':
              return {
                url: 'https://res.cloudinary.com/dcecaxmxv/image/upload/v1685130912/vzeaonc0wqjars5lrils.png',
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

        marker.set('reportId', report.id); // Store the reportId using the set method

        const isoDate = report.createdAt;
        const formattedDate = dayjs.utc(isoDate).format('DD/MM/YYYY');
        const infoWindow = new google.maps.InfoWindow();
        const contentDiv = document.createElement('div');
        const imageUrl = report.imgUrl;
        const imageElement = document.createElement('img');
        if (imageUrl) {
          imageElement.src = imageUrl;
          imageElement.loading = 'lazy';
        }

        contentDiv.appendChild(imageElement);
        const dateParagraph = document.createElement('p');
        dateParagraph.textContent = formattedDate;
        const typeParagraph = document.createElement('p');
        typeParagraph.textContent = report.type;
        const titleParagraph = document.createElement('p');
        titleParagraph.textContent = report.title;
        const authorParagraph = document.createElement('p');
        authorParagraph.textContent = author.name;
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
        contentDiv.appendChild(dateParagraph);
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
            sx={{
              display: 'flex',
              flexWrap: 'nowrap',
              justifyContent: 'center',
              width: 'auto',
              marginBottom: '1rem',
              boxShadow: '-4px 3px 5px #00000033',
              '& .MuiToggleButton-root': {
                color: isDark ? '#7dc5e3 !important' : '#2e5b70 !important',
                backgroundColor: isDark ? '#757575 !important' : '#ececec !important',
              },
              '& .MuiToggleButton-root.Mui-selected': {
                color: isDark ? '#7dc5e3 !important' : '#7dc5e3 !important',
                backgroundColor: isDark ? '#121212 !important' : '#757575 !important',
              },
            }}
          >
            <ToggleButton
              value='All'
              sx={{
                flexGrow: 1,
              }}
            >
              All
            </ToggleButton>
            <ToggleButton
              value='Road Hazard'
              sx={{
                flexGrow: 1,
              }}
            >
              Road
            </ToggleButton>
            <ToggleButton
              value='Theft Alert'
              sx={{
                flexGrow: 1,
              }}
            >
              Theft
            </ToggleButton>
            <ToggleButton
              value='Collision'
              sx={{
                flexGrow: 1,
              }}
            >
              Collision
            </ToggleButton>
            <ToggleButton
              value='Point of Interest'
              sx={{
                flexGrow: 1,
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
              sx={{ maxHeight: '80vh', borderRadius: '10px' }}
            >
              <Box
                sx={{
                  padding: 2,
                  backgroundColor: 'lightgrey',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative', // Add this line
                }}
              >
                {selectedReport && (
                  <>
                    <p
                      className='report-type'
                      style={{
                        marginTop: '1rem',
                        textAlign: 'center',
                        fontSize: '1.5rem',
                      }}
                    >
                      {selectedReport.type}: {selectedReport.title}
                    </p>

                    {selectedReport.imgUrl && (
                      <img
                        className='report-image'
                        src={selectedReport.imgUrl}
                        alt='Report image'
                        style={{
                          maxHeight: '100%',
                          maxWidth: '100%',
                          margin: '1rem',
                          display: 'block',
                        }}
                      />
                    )}

                    <Card sx={{ minWidth: 275, marginTop: '0.5rem' }}>
                      <CardContent>
                        <Typography
                          sx={{
                            fontSize: 14,
                            textAlign: 'left',
                            // marginTop: '0px',
                            margin: '0px',
                          }} // Reduce margin-top
                          color='text.secondary'
                        >
                          <p className='report-date'>
                            Reported on:{' '}
                            {dayjs(selectedReport.createdAt).format(
                              'MMMM D, YYYY'
                            )}
                          </p>
                        </Typography>
                        <Typography variant='body2'>
                          <p className='report-body'>{selectedReport.body}</p>
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 14,
                            textAlign: 'right',
                            marginBottom: '0.5rem',
                          }}
                          color='text.secondary'
                          gutterBottom
                        >
                          <p className='report-author'>
                            -{selectedReport.author.name}
                          </p>
                        </Typography>
                      </CardContent>
                    </Card>

                    <div style={{ marginTop: '1rem' }}>
                      <Tooltip title='Archive Report'>
                        <ArchiveIcon
                          onClick={() => handleButtonClick(selectedReport.id)}
                        />
                      </Tooltip>
                    </div>
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
                options={
                  isDark
                    ? (darkModeOptions as google.maps.MapOptions)
                    : (defaultOptions as google.maps.MapOptions)
                }
              />
            </Box>
          </Box>
        </Box>
      </div>
      <CreateReport fetchThisMonthReports={fetchThisMonthReports} />
    </BandAid>
  );
};

export default ReportsMap;
