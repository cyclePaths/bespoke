import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
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
import axios from 'axios';

// Sets the map to not be google styled //
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

interface Coodinates {
  lat: number;
  lng: number;
  time: Date;
}

// Helpers in the component //
type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const Map: React.FC = () => {
  // Create some state components to render the locations, routes, markers, and selected markers //
  const [startingPoint, setStartingPoint] = useState<LatLngLiteral>();
  const [markers, setMarkers] = useState<any[]>([]);
  const [selected, setSelected] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();

  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 29.946949, lng: -90.0843514 }),
    []
  );

  // This is for creating routes //
  const fetchDirections = (position: LatLngLiteral) => {
    if (!startingPoint) {
      return;
    }
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: startingPoint,
        destination: selected!,
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

  // Passed down to places to save routes to the database //
  const saveRoute = (): void => {
    if (directions) {
      axios
        .post('/bikeRoutes/newRoute', directions)
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
        time: new Date(),
      },
    ]);
    setSelected({
      lat: event.latLng!.lat(),
      lng: event.latLng!.lng(),
    });
  }, []);
  // End of click event of the map //

  // Set the starting point on the map //
  useEffect(() => {
    if (startingPoint) {
      setMarkers((current) => [
        ...current,
        {
          lat: startingPoint!.lat,
          lng: startingPoint!.lng,
          time: new Date(),
        },
      ]);
    } else {
      return;
    }
  }, [startingPoint]);

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
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              fetchDirections(selected!);
            }}
          />
        ))}

        {/* This is the info window of a marker on the screen */}

        {/* {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(undefined);
            }}
          >
            <div>
              <h2>Route on Map</h2>
              <p>Here We Are</p>
            </div>
          </InfoWindow>
        ) : null} */}
      </GoogleMap>
    </div>
  );
};

export default Map;
