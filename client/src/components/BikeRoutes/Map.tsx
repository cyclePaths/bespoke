import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useContext,
} from 'react';
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  InfoWindow,
  useJsApiLoader,
  InfoBox,
} from '@react-google-maps/api';
import { StartRouteContainer } from '../../StyledComp';
import { MAP_API_TOKEN, defaultMapContainerStyle } from './Utils';
import Places from './Places';
import FetchedRoutes from './FetchedRoutes';
import PopupForm from './Popup';
import axios from 'axios';
import { UserContext } from '../../Root';
import Popup from './Popup';
import SaveForm from './SaveForm';
import RoutesListPopup from './RoutesListPopup';
import { Button } from '@mui/material';
import { ThemeContext } from '@emotion/react';

// Sets the map to not be google styled //
const options = {
  disableDefaultUI: true,
  zoomControl: false,
};

interface Coordinates {
  lat: number;
  lng: number;
}

interface centerObj {
  lat: string;
  lng: string;
}

// Helpers in the component //
type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const geocoder = new google.maps.Geocoder();

const Map: React.FC = () => {
  // Pull context //
  const { user, geoLocation } = useContext(UserContext);

  // Create some state components to render the locations, routes, markers, and selected markers //
  const [startingPoint, setStartingPoint] = useState<LatLngLiteral>();
  const [markers, setMarkers] = useState<any[]>([]);
  const [selected, setSelected] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();
  const [address, setAddress] = useState<any>({});
  const [routeList, setRouteList] = useState<any[]>([]);
  const [reportsList, setReportsList] = useState<any[]>([]);
  const [userCenter, setUserCenter] = useState<any>({
    lat: 29.9511,
    lng: -90.0715,
  });
  const [routeInfo, setRouteInfo] = useState<any>();

  // For Popup Route Save Action //
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [routeName, setRouteName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  // This is for creating routes //
  const fetchDirections = (position: LatLngLiteral) => {
    if (!startingPoint) {
      return;
    }

    /// Functionality building for multi-waypoint routes ///

    const stops = markers.slice(1);
    const end = stops.pop();

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: startingPoint,
        destination: end!,
        travelMode: google.maps.TravelMode.BICYCLING,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          const { distance, duration } = result.routes[0].legs[0];
          setDirections(result);
          setMarkers([]);
        }
      }
    );
  };
  // End of created routes //

  // Passed down to Places to save routes to the database //
  const saveRoute = (
    name: string,
    category: string,
    privacy: boolean
  ): void => {
    if (directions) {
      axios
        .post('/bikeRoutes/newRoute', {
          directions,
          user,
          name,
          category,
          privacy,
        })
        .then(() => {
          console.log('Route saved to db');
        })
        .catch((err) => {
          console.error('Failed request:', err);
        });
    }
  };

  // Rendering for the map //
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: MAP_API_TOKEN!,
  });

  const mapRef = useRef<GoogleMap>();

  const onLoad = useCallback((map): void => (mapRef.current = map), []);

  // End of Map Rendering //

  // The click event for the map //
  const onMapClick = useCallback((event) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng!.lat(),
        lng: event.latLng!.lng(),
      },
    ]);
  }, []);
  // End of click event of the map //

  // Fetching maps and handling loading a route on the page //
  const fetchRoutes = (privacy: boolean, type: string): void => {
    axios
      .get(`bikeRoutes/routes`, {
        params: { privacy: privacy, category: type },
      })
      .then(({ data }) => {
        setRouteList(data);
      })
      .catch((err) => {
        console.error('Failed to GET:', err);
      });
  };

  // For displaying a saved route //
  // const handleRouteClick = (): void => {
  //   // console.log(routeList[0].origin, routeList[0].destination);
  //   const originObj: Coordinates = {
  //     lat: parseFloat(routeList[0].origin[0]),
  //     lng: parseFloat(routeList[0].origin[1]),
  //   };
  //   const destObj: Coordinates = {
  //     lat: parseFloat(routeList[0].destination[0]),
  //     lng: parseFloat(routeList[0].destination[1]),
  //   };

  //   setStartingPoint(originObj);
  //   setMarkers((current) => [...current, destObj]);
  // };
  // End of routes list //

  // Render Distance and Duration //
  const renderRouteInfo = () => {
    if (!directions) return null;
    return (
      <InfoWindow
        position={
          {
            lat: routeInfo.centerLat,
            lng: routeInfo.centerLng,
          } as google.maps.LatLng
        }
      >
        <div>
          <p>Duration: {routeInfo.duration}</p>
          <p>Distance: {routeInfo.distance}</p>
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

  // Set the starting point on the map //
  useEffect(() => {
    if (startingPoint) {
      setMarkers((current) => [
        {
          lat: startingPoint!.lat,
          lng: startingPoint!.lng,
        },
        ...current,
      ]);
    } else {
      return;
    }
  }, [startingPoint]);

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
      const centeredLat = directions.routes[0].bounds.getCenter().lat();
      const centeredLng = directions.routes[0].bounds.getCenter().lng();
      const { distance, duration } = directions.routes[0].legs[0];

      setRouteInfo({
        distance: distance!.text,
        duration: duration!.text,
        centerLat: centeredLat,
        centerLng: centeredLng,
      });
    }
  }, [directions]);

  // Sets the center of the map upon page loading //
  useEffect(() => {
    if (geoLocation) {
      setUserCenter({ lat: geoLocation.lat, lng: geoLocation.lng });
    }
  }, [geoLocation]);

  useEffect(() => {
    fetchReports();
  }, [userCenter]);

  // Conditional to load something else if the map is not ready to load //
  if (!isLoaded) return <div>Map is loading</div>;
  return (
    <div className='container'>
      {/* This is the address search bar */}
      <StartRouteContainer>
        <Places
          setStartingPoint={(position) => {
            setStartingPoint(position);
            mapRef.current?.panTo(position);
          }}
          fetchDirections={fetchDirections}
          selected={selected}
          setOpenPopup={setOpenPopup}
        />
      </StartRouteContainer>

      {/* This is the map rendering on screen */}
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        options={options as google.maps.MapOptions}
        center={userCenter}
        zoom={13}
        onLoad={onLoad}
        onClick={onMapClick}
      >
        {/* This renders the directions on screen */}
        {directions && <DirectionsRenderer directions={directions} />}

        {/* {reportsList.map((report) => {
          <Marker
            key={report.id}
            position={{
              lat: parseFloat(report.lat),
              lng: parseFloat(report.lng),
            }}
          />;
        })} */}

        {/* This is the markers that will be placed on the screen on render */}
        {markers.map((marker) => (
          <Marker
            key={marker.lat}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={(event) => {
              setSelected({
                lat: event.latLng!.lat(),
                lng: event.latLng!.lng(),
              });
            }}
          />
        ))}

        {/* This is the info window of a marker on the screen */}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(undefined);
            }}
          >
            <div>
              <p>{address.formatted_address}</p>
            </div>
          </InfoWindow>
        ) : null}
        {routeInfo ? renderRouteInfo() : <div></div>}
      </GoogleMap>

      <Button
        variant='contained'
        sx={{ marginTop: 2 }}
        onClick={() => setOpenSearch(true)}
      >
        Search Routes
      </Button>
      {/* These are popup windows that will display when the Save Created Route button is click or the Find Route Button is clicked */}
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <SaveForm
          routeName={routeName}
          setRouteName={setRouteName}
          category={category}
          setCategory={setCategory}
          isPrivate={isPrivate}
          setIsPrivate={setIsPrivate}
          setOpenPopup={setOpenPopup}
          directions={directions}
          saveRoute={saveRoute}
        />
      </Popup>
      <RoutesListPopup openSearch={openSearch} setOpenSearch={setOpenSearch}>
        <FetchedRoutes
          fetchRoutes={fetchRoutes}
          routeList={routeList}
          setIsPrivate={setIsPrivate}
          isPrivate={isPrivate}
          setOpenSearch={setOpenSearch}
          category={category}
          setCategory={setCategory}
          setRouteList={setRouteList}
        />
      </RoutesListPopup>
      {/* The end of those Popups */}
    </div>
  );
};

export default Map;
