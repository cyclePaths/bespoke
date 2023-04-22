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
} from '@react-google-maps/api';
import MAP_API_TOKEN from './Utils';
import Places from './Places';
import FetchedRoutes from './FetchedRoutes';
import axios from 'axios';
import { UserContext } from '../../Root';

// Sets the map to not be google styled //
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

interface Coordinates {
  lat: number;
  lng: number;
}

// Helpers in the component //
type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const geocoder = new google.maps.Geocoder();

const Map: React.FC = () => {
  // Create some state components to render the locations, routes, markers, and selected markers //
  const [startingPoint, setStartingPoint] = useState<LatLngLiteral>();
  const [markers, setMarkers] = useState<any[]>([]);
  const [selected, setSelected] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();
  const [address, setAddress] = useState<any>({});
  const [routeList, setRouteList] = useState<any>();
  const [reportsList, setReportsList] = useState<any>();

  // Pull context //
  const user = useContext(UserContext);

  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 29.946949, lng: -90.0843514 }),
    []
  );

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
          setDirections(result);
        }
      }
    );
  };
  // End of created routes //

  // Passed down to Places to save routes to the database //
  const saveRoute = (): void => {
    if (directions) {
      axios
        .post('/bikeRoutes/newRoute', { directions, user })
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
    setSelected({
      lat: event.latLng!.lat(),
      lng: event.latLng!.lng(),
    });
  }, []);
  // End of click event of the map //

  // Fetching maps and handling loading a route on the page //
  const fetchMaps = (user_id: number | undefined): void => {
    axios
      .get(`bikeRoutes/routes/${user_id}`)
      .then(({ data }) => {
        setRouteList(data);
      })
      .catch((err) => {
        console.error('Failed to GET:', err);
      });
  };

  const handleRoute = (): void => {
    // console.log(routeList[0].origin, routeList[0].destination);
    const originObj: Coordinates = {
      lat: parseFloat(routeList[0].origin[0]),
      lng: parseFloat(routeList[0].origin[1]),
    };
    const destObj: Coordinates = {
      lat: parseFloat(routeList[0].destination[0]),
      lng: parseFloat(routeList[0].destination[1]),
    };

    setStartingPoint(originObj);
    setMarkers((current) => [...current, destObj]);
  };
  // End of routes list //

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

  useEffect(() => {
    if (routeList) {
      handleRoute();
    }
  }, [routeList]);

  if (!isLoaded) return <div>Map is loading</div>;
  return (
    <div className='container'>
      {/* This is the address search bar */}
      <div>
        <Places
          setStartingPoint={(position) => {
            setStartingPoint(position);
            mapRef.current?.panTo(position);
          }}
          saveRoute={saveRoute}
          fetchDirections={fetchDirections}
          selected={selected}
        />
      </div>

      {/* This is the map rendering on screen */}
      <GoogleMap
        mapContainerStyle={{ height: '250px', width: '395px' }}
        options={options as google.maps.MapOptions}
        center={center}
        zoom={13}
        onLoad={onLoad}
        onClick={onMapClick}
      >
        {directions && <DirectionsRenderer directions={directions} />}

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
              // fetchDirections(selected!);
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
      </GoogleMap>
      <FetchedRoutes
        fetchMaps={fetchMaps}
        routeList={routeList}
        setRouteList={setRouteList}
        reportsList={reportsList}
        setReportsList={setReportsList}
      />
    </div>
  );
};

export default Map;
