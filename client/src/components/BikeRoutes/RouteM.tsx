import React, { useEffect, useRef, useState } from 'react';
import Map from './Map';
import { BandAid, RouteCreatorComponent } from '../../StyledComp';
// import PopupForm from './PopupForm';

const RouteM: React.FC = () => {
  const [buttonPopup, setButtonPopup] = useState<boolean>(false);
  const [routeName, setRouteName] = useState<string>('');
  const [selectedCat, setSelectedCat] = useState<string>('');

  return (
    <BandAid>
      <RouteCreatorComponent>
        <h1>Route Creator</h1>
        <Map />
      </RouteCreatorComponent>
    </BandAid>
  );
};

export default RouteM;
