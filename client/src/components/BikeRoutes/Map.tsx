import React, { useRef, useState } from 'react';
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
  //Create some state components to render the locations and the routes list
  const [location, setLocation] = useState();
  const [routes, setRoutes] = useState();
  const [markers, setMarkers] = useState<any[]>([]);

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
        onClick={(event) =>
          setMarkers((current) => [
            ...current,
            {
              lat: event.latLng!.lat(),
              lng: event.latLng!.lng(),
              time: new Date(),
            },
          ])
        }
      >
        {/* {markers.map((marker) => (
          <Marker key={marker.time.toISOString} />
        ))} */}
      </GoogleMap>
    </div>
  );
};

export default Map;
