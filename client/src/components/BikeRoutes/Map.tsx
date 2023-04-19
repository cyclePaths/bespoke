import React, { useCallback, useRef, useState } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'react-places-autocomplete';
import MAP_API_TOKEN from './Utils';
// import Search from './Search';

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

const Map: React.FC = () => {
  // Create some state components to render the locations, routes, markers, and selected markers //
  const [location, setLocation] = useState();
  const [routes, setRoutes] = useState();
  const [markers, setMarkers] = useState<any[]>([]);
  const [selected, setSelected] = useState<Coodinates | null>(null);

  // Rendering for the map //
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: MAP_API_TOKEN!,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map): void => {
    mapRef.current = map;
  };

  const onUnMount = (): void => {
    mapRef.current = null;
  };
  // End of Map Rendering //

  // The click event for the map //
  const onMapClick = useCallback(
    (event) =>
      setMarkers((current) => [
        ...current,
        {
          lat: event.latLng!.lat(),
          lng: event.latLng!.lng(),
          time: new Date(),
        },
      ]),
    []
  );
  // End of click event of the map //

  if (!isLoaded) return <div>Map is loading</div>;
  return (
    <div>
      {/* <Search /> */}

      {/* This is the map rendering on screen */}
      <GoogleMap
        mapContainerStyle={{ height: '250px', width: '395px' }}
        options={options as google.maps.MapOptions}
        center={{ lat: 29.946949, lng: -90.0843514 }}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnMount}
        onClick={onMapClick}
      >
        {/* This is the markers that will be placed on the screen on render */}
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

        {/* This is the info window of a marker on the screen */}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>Route on Map</h2>
              <p>Here We Are</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default Map;
