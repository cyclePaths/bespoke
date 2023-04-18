import React, { useRef } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from '@react-google-maps/api';
import MAP_API_TOKEN from './Utils';

// Sets the map to not be google styled //
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Map: React.FC = () => {
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

  if (!isLoaded) return <div>Map is loading</div>;
  return (
    <div>
      <GoogleMap
        mapContainerStyle={{ height: '250px', width: '395px' }}
        options={options as google.maps.MapOptions}
        center={{ lat: 29.946949, lng: -90.0843514 }}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnMount}
      />
    </div>
  );
};

export default Map;
