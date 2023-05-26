import { DarkModeHelperProps } from 'client/src/StyledComp';
import { DirectionsResult, LatLngLiteral } from './RouteM';

const defaultMapContainerStyle = {
  height: '90vh',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
};

const defaultOptions = {
  disableDefaultUI: true,
  zoomControl: false,
};

const darkModeOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  styles: [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#263c3f' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6b9a76' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f3d19c' }],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }],
    },
  ],
};

const markerSize = new google.maps.Size(35, 35);

const Theft = {
  url: 'https://res.cloudinary.com/dcecaxmxv/image/upload/v1685126963/odr2o07adcq5yagvuus2.png',
  scaledSize: markerSize,
};

const TheftDark = {
  url: 'https://res.cloudinary.com/dcecaxmxv/image/upload/v1685132831/ums6svk2hlgqpiuq2ehc.png',
  scaledSize: markerSize,
};

const Collision = {
  url: 'https://res.cloudinary.com/dcecaxmxv/image/upload/v1685126153/mbgbyds2wb6sdy8srfrv.png',
  scaledSize: markerSize,
};

const POI = {
  url: 'https://res.cloudinary.com/dcecaxmxv/image/upload/v1685130912/vzeaonc0wqjars5lrils.png',
  scaledSize: markerSize,
};

const RoadHazard = {
  url: 'https://res.cloudinary.com/dcecaxmxv/image/upload/v1685130782/owbm7dh1aqkzgz8fpkay.png',
  scaledSize: markerSize,
};

const Default = {
  url: 'https://cdn.discordapp.com/attachments/187823430295355392/1103470216136106014/icons8-high-priority-48.png',
  scaledSize: markerSize,
};

export {
  defaultMapContainerStyle,
  darkModeOptions,
  defaultOptions,
  Theft,
  TheftDark,
  Collision,
  POI,
  RoadHazard,
  Default,
};
