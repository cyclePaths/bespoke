import { DarkModeHelperProps } from 'client/src/StyledComp';

const defaultMapContainerStyle = {
  height: '90vh',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
};

const markerSize = new google.maps.Size(35, 35);

const Theft = {
  url: 'https://user-images.githubusercontent.com/25103430/71287503-897b8080-2336-11ea-8b31-848bfab5176e.png',
  scaledSize: markerSize,
};

const Collision = {
  url: 'https://icons.iconarchive.com/icons/fa-team/fontawesome/48/FontAwesome-Car-Burst-icon.png',
  scaledSize: markerSize,
};

const POI = {
  url: 'https://cdn.pixabay.com/photo/2013/04/01/21/30/point-of-interest-99163_960_720.png',
  scaledSize: markerSize,
};

const RoadHazard = {
  url: 'https://cdn2.iconfinder.com/data/icons/vehicle-18/100/transport-09-512.png',
  scaledSize: markerSize,
};

const Default = {
  url: 'https://cdn.discordapp.com/attachments/187823430295355392/1103470216136106014/icons8-high-priority-48.png',
  scaledSize: markerSize,
};

export { defaultMapContainerStyle, Theft, Collision, POI, RoadHazard, Default };
