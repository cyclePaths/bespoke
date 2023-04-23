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
  InfoBoxF,
  useJsApiLoader,
  InfoBox,
} from '@react-google-maps/api';
import { StartRouteContainer } from '../../StyledComp';
import { MAP_API_TOKEN, defaultMapContainerStyle } from './Utils';
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
  const user = useContext(UserContext);

  // Create some state components to render the locations, routes, markers, and selected markers //
  const [startingPoint, setStartingPoint] = useState<LatLngLiteral>();
  const [markers, setMarkers] = useState<any[]>([]);
  const [selected, setSelected] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();
  const [address, setAddress] = useState<any>({});
  const [routeList, setRouteList] = useState<any>();
  const [reportsList, setReportsList] = useState<any>();
  const [userCenter, setUserCenter] = useState<any>({
    lat: 29.9511,
    lng: -90.0715,
  });
  const [routeInfo, setRouteInfo] = useState<any>();

  let center;

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
    // setSelected({
    //   lat: event.latLng!.lat(),
    //   lng: event.latLng!.lng(),
    // });
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

  // For displaying a saved route //
  const handleRouteClick = (): void => {
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

  // Render Distance and Duration //
  const renderRouteInfo = () => {
    if (!directions) return null;
    return (
      <InfoBox
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
      </InfoBox>
    );
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

  /// WORKING ON FINDING PERSON'S COORDINATES ON RENDER ///
  // useEffect(() => {
  //   axios
  //     .get('bikeRoutes/center')
  //     .then(({ data }) => {
  //       const centerObj = {
  //         lat: parseFloat(data.location_lat),
  //         lng: parseFloat(data.location_lng),
  //       };
  //       setUserCenter(centerObj);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

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

  center = useMemo<LatLngLiteral>(() => userCenter, [userCenter]);

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
          saveRoute={saveRoute}
          fetchDirections={fetchDirections}
          selected={selected}
        />
      </StartRouteContainer>

      {/* This is the map rendering on screen */}
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        options={options as google.maps.MapOptions}
        center={center}
        zoom={14}
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
        {routeInfo ? renderRouteInfo() : <div></div>}
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
