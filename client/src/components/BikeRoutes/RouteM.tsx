import React, { useEffect, useRef, useState } from 'react';
import Map from './Map';
import { RouteCreatorComponent } from '../../StyledComp';

const RouteM: React.FC = () => {
  return (
    <RouteCreatorComponent>
      <h1>Route Creator</h1>
      <Map />
    </RouteCreatorComponent>
  );
};

export default RouteM;
