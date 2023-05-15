import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  useContext,
} from 'react';
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  InfoWindow,
} from '@react-google-maps/api';
import {
  RouteButtonContainer,
  RouteAlerts,
  StartRouteContainer,
} from '../../StyledComp';
import {
  defaultMapContainerStyle, darkModeOptions, defaultOptions, Theft, Collision, POI, RoadHazard, Default
} from './Utils';
import MapInputandButton from './MapInputandButtons';
import FetchedRoutes from './FetchedRoutes';
import axios from 'axios';
import { UserContext } from '../../Root';
import SavePopout from './SavePopout';
import SaveForm from './SaveForm';
import RoutesListPopup from './RoutesListPopup';
import { Button } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SearchIcon from '@mui/icons-material/Search';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import {
  LatLngLiteral,
  DirectionsResult,
  geocoder,
  MapOptionsProp,
  RouteInfo
} from './RouteM';
import { BikeRoutes, Report } from '@prisma/client';
import { report } from 'process';

// Sets the map to not be google styled //

const Map = ({
  homeCoordinates,
  setHomeCoordinates,
}: MapOptionsProp) => {
  /////////////// CONTEXT AND STATE //////////////////
  // Pull user and geoLocation from context //
  const { user, geoLocation, isDark } = useContext(UserContext);
  // Import the start icon //
  const startIcon = {
    url: 'https://cdn.discordapp.com/attachments/187823430295355392/1103112961192636587/green_flag.png',
    scaledSize: new window.google.maps.Size(50, 50),
    anchor: new window.google.maps.Point(25, 50),
  };
  const stopIcon = {
    url: 'https://cdn.discordapp.com/attachments/187823430295355392/1103154326354022411/icons8-map-pin-48.png',
    scaledSize: new window.google.maps.Size(50, 50),
    anchor: new window.google.maps.Point(25, 50),
  };
  const endIcon = {
    url: 'https://cdn.discordapp.com/attachments/187823430295355392/1103124459323408404/418-4187541_transparent-finish-flag-png-red-flag-png-icon.png',
    scaledSize: new window.google.maps.Size(50, 50),
    anchor: new window.google.maps.Point(25, 50),
  };

  // Create some state components to render the locations, routes, markers, and selected markers //
  const [startingPoint, setStartingPoint] = useState<LatLngLiteral | null>(
    null
  );
  const [markers, setMarkers] = useState<LatLngLiteral[]>([]);
  const [destination, setDestination] = useState<LatLngLiteral | null>(null);
  const [selected, setSelected] = useState<LatLngLiteral | null>(null);
  const [directions, setDirections] = useState<DirectionsResult | undefined>(undefined);
  const [address, setAddress] = useState<any>({});
  const [routeList, setRouteList] = useState<BikeRoutes[]>([]);
  const [reportsList, setReportsList] = useState<Report[]>([]);
  const [userCenter, setUserCenter] = useState<LatLngLiteral>({
    lat: 29.9511,
    lng: -90.0715,
  });
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [routeClicked, setRouteClicked] = useState<boolean>(false);

  // For Popup Route Save Action and Selector Action //
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [routeName, setRouteName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [likeList, setLikeList] = useState<any[]>([]);
  const [saveMessage, setSaveMessage] = useState<boolean>(false);
  ////////////////////////////////////////////////////

  /////////// MAP RENDERING AND ROUTING //////////////

  // This function is for fetching a direction from point A to B. Refactor for past B //
  const fetchDirections = () => {
    if (!startingPoint || !destination) {
      return null;
    }
    // Refactored to do more than point A and B //
    if (markers.length > 0) {
      const waypoints = markers.map((marker) => ({
        location: marker,
        stopover: true,
      }));

      const service = new google.maps.DirectionsService();
      service.route(
        {
          origin: startingPoint,
          destination: destination,
          waypoints: waypoints,
          travelMode: google.maps.TravelMode.BICYCLING,
        },
        (result, status) => {
          if (status === 'OK' && result) {
            setDirections(result);
            renderRouteInfo();
          }
        }
      );
    } else {
      const service = new google.maps.DirectionsService();
      service.route(
        {
          origin: startingPoint,
          destination: destination,
          travelMode: google.maps.TravelMode.BICYCLING,
        },
        (result, status) => {
          if (status === 'OK' && result) {
            setDirections(result);
            renderRouteInfo();
          }
        }
      );
    }
  };
  // End of created routes //

  // Passed down to MapInputsandButtons to save routes to the database //
  const saveRoute = (
    name: string,
    category: string,
    privacy: boolean
  ): void => {
    if (directions) {
      axios
        .post('/bikeRoutes/newRoute', {
          directions,
          name,
          category,
          privacy,
          userId: user.id,
        })
        .then(() => {
          setSaveMessage(true);
          setTimeout(() => {
            setSaveMessage(false);
          }, 2400);
        })
        .catch((err) => {
          console.error('Failed request:', err);
        });
    }
  };

  const mapRef = useRef<GoogleMap>();

  const onLoad = useCallback((map): void => (mapRef.current = map), []);

  // End of Map Rendering //

  // When the map is click, it sets the origin if not set by input, or destination and adds it to the current click to the markers array //
  const onMapClick = useCallback(
    (event) => {
      if (startingPoint === null) {
        setStartingPoint({
          lat: event.latLng!.lat(),
          lng: event.latLng!.lng(),
        });
        setUserCenter({lat: event.latLng!.lat(), lng: event.latLng!.lng()});
      } else {
        if (destination === null) {
          setDestination({
            lat: event.latLng!.lat(),
            lng: event.latLng!.lng(),
          });
        } else {
          setMarkers((current) => [...current, destination]);
          setDestination({
            lat: event.latLng!.lat(),
            lng: event.latLng!.lng(),
          });
        }
      }
    },
    [startingPoint, destination, setDestination, setMarkers]
  );
  // End of click event of the map //

  // Fetching maps and handling loading a route on the page //
  const fetchRoutes = (privacy: boolean, type: string): void => {
    axios
      .get(`bikeRoutes/routes`, {
        params: { privacy: privacy, category: type },
      })
      .then(({ data }) => {
        setRouteList(data[0]);
        setLikeList(data[1]);
      })
      .catch((err) => {
        console.error('Failed to GET:', err);
      });
  };

  // For displaying a saved route //
  const handleRouteClick = (origin, destination): void => {
    setStartingPoint(origin);
    setDestination(destination);
    setRouteClicked(true);
  };
  // End of routes list //

  const handleClearMap = (): void => {
    setStartingPoint(null);
    setMarkers([]);
    setDestination(null);
    setDirections(undefined);
    setRouteInfo(null);
  }

  // Render Distance and Duration //
  const renderRouteInfo = () => {
    if (!directions || routeInfo === null) return null;
    return (
      <InfoWindow
        position={
          {
            lat: routeInfo.centerLat,
            lng: routeInfo.centerLng,
          }
        }
        onCloseClick={() => setRouteInfo(null)}
      >
        <div style={{color: 'black'}}>
          <p>Duration: {routeInfo.duration}</p>
          <p>Distance: {routeInfo.distance}</p>
          <p>
            Reports in Area:{' '}
            {reportsList.length > 0
              ? reportsList.map((report) =>
                  report.location_lat! >= routeInfo.centerLat - 0.007 &&
                  report.location_lat! <= routeInfo.centerLat + 0.007
                    ? report.type + ', '
                    : ''
                )
              : 'None'}
          </p>
          <p>Google Warning: {routeInfo.warnings[0]}</p>
        </div>
      </InfoWindow>
    );
  };

  const fetchReports = () => {
    if (geoLocation) {
      const { lat, lng } = geoLocation;
      axios
        .get('bikeRoutes/reports/', { params: { lat, lng } })
        .then(({ data }) => {
          setReportsList(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // Grab the address of the selected coordinates //
  useEffect(() => {
    if (selected) {
      geocoder.geocode({ location: selected }).then((response) => {
        setAddress(response.results[0]);
      });
    }
  }, [selected]);

  // Renders the directions and info window for the user's route when directions is populated //
  useEffect(() => {
    if (directions) {
      let routeTotalDistance = 0;
      let routeTotalDuration = 0;
      directions.routes[0].legs.forEach((route) => {
        routeTotalDistance += route.distance!.value;
        routeTotalDuration += route.duration!.value;
      });
      const centeredLat = directions.routes[0].bounds.getCenter().lat();
      const centeredLng = directions.routes[0].bounds.getCenter().lng();
      setRouteInfo({
        distance: `${(routeTotalDistance * 0.000621371).toFixed(1)} miles`,
        duration: `${Math.ceil(routeTotalDuration / 60)} mins`,
        centerLat: centeredLat,
        centerLng: centeredLng,
        warnings: directions.routes[0].warnings,
      });
    }
  }, [directions]);

  const exitListForm = () => {
    const searchBar = document.getElementById('route-searcher');
    const findHeader = document.getElementById('list');
    const resultHeader = document.getElementById('results');
    const emptyResult = document.getElementById('no-list');

    setOpenSearch(false);
    setCategory('');
    setIsPrivate(false);

    findHeader!.style.display = 'none';
    searchBar!.style.display = 'none';
    resultHeader!.style.display = '';
    emptyResult!.style.display = 'none';
    setRouteList([]);
  };

  // Sets the center of the map upon page loading //
  useEffect(() => {
    if (geoLocation) {
      setUserCenter({ lat: geoLocation.lat, lng: geoLocation.lng });
    }

    return () => {
      console.log('unmounted');
    }
  }, [geoLocation]);

  useEffect(() => {
    fetchReports();
  }, [userCenter]);

  useEffect(() => {
    if (startingPoint && destination && markers.length > 0 && routeClicked) {
      // fetchDirections();
    } else if (
      startingPoint &&
      destination &&
      markers.length === 0 &&
      routeClicked
    ) {
      fetchDirections();
    }
    setRouteClicked(false);

    return () => {
      console.log('unmounted');
    }
  }, [startingPoint, destination, markers, routeClicked]);

  useEffect(() => {
    renderRouteInfo();
  }, [routeInfo]);

  useEffect(() => {
    if (homeCoordinates) {
      setStartingPoint(geoLocation);
      setDestination(homeCoordinates);
      setHomeCoordinates(undefined);
    }
  }, []);

  useEffect(() => {
    if (homeCoordinates === undefined) {
      setTimeout(() => {
        // fetchDirections();
      }, 1000);
    }
  }, [homeCoordinates]);

  return (
    <div className='container'>
      {saveMessage ? (
        <RouteAlerts id='saveMessage' isDark={isDark}>
          Route Saved{' '}
          <img
            src='https://cdn.discordapp.com/attachments/187823430295355392/1107720593916317738/output-onlinegiftools.gif'
            className='checkmark'
          />
        </RouteAlerts>
      ) : (
        <></>
      )}
      {/* This is the address search bar */}
      <StartRouteContainer>
        <MapInputandButton
          setStartingPoint={(position) => {
            setStartingPoint(position);
            mapRef.current?.panTo(position);
          }}
          saveMessage={saveMessage}
        />
      </StartRouteContainer>

      {/* This is the map rendering on screen */}
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        options={isDark ? darkModeOptions as google.maps.MapOptions : defaultOptions as google.maps.MapOptions}
        center={userCenter}
        zoom={14}
        onLoad={onLoad}
        onClick={onMapClick}
      >
        {/* This renders the directions set in state */}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true,
            }}
          />
        )}

        {/* These are reports from the database that will appear on render of the screen. They are only in a certain distance from user */}
        {reportsList.map((report, i) => {
          switch (report.type) {
            case 'Collision':
              return (
                <Marker
                  key={i}
                  position={{
                    lat: report.location_lat!,
                    lng: report.location_lng!,
                  }}
                  onClick={(event) => {
                    setSelected({
                      lat: event.latLng!.lat(),
                      lng: event.latLng!.lng(),
                    });
                  }}
                  icon={Collision}
                />
              );
            case 'Theft Alert':
              return (
                <Marker
                  key={i}
                  position={{
                    lat: report.location_lat!,
                    lng: report.location_lng!,
                  }}
                  onClick={(event) => {
                    setSelected({
                      lat: event.latLng!.lat(),
                      lng: event.latLng!.lng(),
                    });
                  }}
                  icon={Theft}
                />
              );
            case 'Point of Interest':
              return (
                <Marker
                  key={i}
                  position={{
                    lat: report.location_lat!,
                    lng: report.location_lng!,
                  }}
                  onClick={(event) => {
                    setSelected({
                      lat: event.latLng!.lat(),
                      lng: event.latLng!.lng(),
                    });
                  }}
                  icon={POI}
                />
              );
            case 'Road Hazard':
              return (
                <Marker
                  key={i}
                  position={{
                    lat: report.location_lat!,
                    lng: report.location_lng!,
                  }}
                  onClick={(event) => {
                    setSelected({
                      lat: event.latLng!.lat(),
                      lng: event.latLng!.lng(),
                    });
                  }}
                  icon={RoadHazard}
                />
              );
            default:
              return (
                <Marker
                  key={i}
                  position={{
                    lat: report.location_lat!,
                    lng: report.location_lng!,
                  }}
                  onClick={(event) => {
                    setSelected({
                      lat: event.latLng!.lat(),
                      lng: event.latLng!.lng(),
                    });
                  }}
                  icon={Default}
                />
              );
          }
        })}

        {/*  */}
        {startingPoint ? (
          <Marker
            position={startingPoint!}
            onClick={(event) => {
              setSelected({
                lat: event.latLng!.lat(),
                lng: event.latLng!.lng(),
              });
            }}
            icon={startIcon}
          />
        ) : (
          <></>
        )}

        {/* These are the markers that will show up on the screen when clicking */}
        {markers.map((marker, i) => (
          <Marker
            key={i}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={(event) => {
              setSelected({
                lat: event.latLng!.lat(),
                lng: event.latLng!.lng(),
              });
            }}
            icon={stopIcon}
          />
        ))}

        {/* This renders the final stop to the route */}
        {destination ? (
          <Marker
            position={destination!}
            onClick={(event) => {
              setSelected({
                lat: event.latLng!.lat(),
                lng: event.latLng!.lng(),
              });
            }}
            icon={endIcon}
          />
        ) : (
          <></>
        )}

        {/* This is the info window of a marker on the screen, refactor to have reports display other things */}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div style={{color: 'black'}}>
              <p>{address.formatted_address}</p>
            </div>
          </InfoWindow>
        ) : null}
        {routeInfo ? renderRouteInfo() : <div></div>}
      </GoogleMap>

      {/* These are the buttons that are for tracking a route, saving a route, and searching for a route */}
      <RouteButtonContainer>
        <Button
          variant='contained'
          sx={{
            margin: '4px',
            backgroundColor: isDark ? '#707070' : '#ececec',
            '&:hover': {
              backgroundColor: isDark ? '#707070' : '#ececec',
            },
            '&:active': {
              backgroundColor: isDark ? '#707070' : '#ececec',
            },
          }}
          onClick={fetchDirections}
        >
          <NavigationIcon sx={{ color: isDark ? '#35af3b' : '#29922f' }} />
        </Button>
        <Button
          variant='contained'
          sx={{
            margin: '4px',
            backgroundColor: isDark ? '#707070' : '#ececec',
            '&:hover': {
              backgroundColor: isDark ? '#707070' : '#ececec',
            },
            '&:active': {
              backgroundColor: isDark ? '#707070' : '#ececec',
            },
          }}
          onClick={() => {
            if (directions) {
              setOpenPopup(true);
            }
          }}
        >
          <SaveAltIcon sx={{ color: isDark ? '#4c9fc5' : '#2e5b70' }} />
        </Button>
        <Button
          variant='contained'
          sx={{
            margin: '4px',
            backgroundColor: isDark ? '#707070' : '#ececec',
            '&:hover': {
              backgroundColor: isDark ? '#707070' : '#ececec',
            },
            '&:active': {
              backgroundColor: isDark ? '#707070' : '#ececec',
            },
          }}
          onClick={() => setOpenSearch(true)}
        >
          <SearchIcon sx={{ color: isDark ? '#ececec' : '#000000' }} />
        </Button>
        <Button
          variant='contained'
          sx={{
            margin: '4px',
            backgroundColor: isDark ? '#707070' : '#ececec',
            '&:hover': {
              backgroundColor: isDark ? '#707070' : '#ececec',
            },
            '&:active': {
              backgroundColor: isDark ? '#707070' : '#ececec',
            },
          }}
          onClick={handleClearMap}
        >
          <ClearAllIcon sx={{ color: isDark ? '#e74141' : '#bd0000' }} />
        </Button>
      </RouteButtonContainer>

      {/* These are popup windows that will display when the Save Created Route button is click or the Find Route Button is clicked */}
      <SavePopout openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <SaveForm
          routeName={routeName}
          setRouteName={setRouteName}
          category={category}
          setCategory={setCategory}
          isPrivate={isPrivate}
          setIsPrivate={setIsPrivate}
          setOpenPopup={setOpenPopup}
          directions={directions!}
          saveRoute={saveRoute}
          setSaveMessage={setSaveMessage}
        />
      </SavePopout>

      {/* This is the popout for searching for a route in the database */}
      <RoutesListPopup
        openSearch={openSearch}
        setOpenSearch={setOpenSearch}
        exitListForm={exitListForm}
      >
        <FetchedRoutes
          fetchRoutes={fetchRoutes}
          routeList={routeList}
          setIsPrivate={setIsPrivate}
          isPrivate={isPrivate}
          setOpenSearch={setOpenSearch}
          category={category}
          setCategory={setCategory}
          setRouteList={setRouteList}
          handleRouteClick={handleRouteClick}
          fetchDirections={fetchDirections}
          likeList={likeList}
          setLikeList={setLikeList}
          setMarkers={setMarkers}
        />
      </RoutesListPopup>
      {/* The end of those Popups */}
    </div>
  );
};

export default Map;
