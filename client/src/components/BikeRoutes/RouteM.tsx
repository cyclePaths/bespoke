import React, { useEffect, useRef, useState } from 'react';
import Map from './Map';
import { RouteCreatorComponent } from '../../StyledComp';
// import PopupForm from './PopupForm';

const RouteM: React.FC = () => {
  const [buttonPopup, setButtonPopup] = useState<boolean>(false);
  const [routeName, setRouteName] = useState<string>('');
  const [selectedCat, setSelectedCat] = useState<string>('');

  return (
    <RouteCreatorComponent>
      <h1>Route Creator</h1>
      <Map />
    </RouteCreatorComponent>
  );
};

export default RouteM;
