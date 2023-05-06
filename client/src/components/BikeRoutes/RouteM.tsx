import React, { useEffect, useRef, useState } from 'react';
import Map from './Map';
import { BandAid, RouteCreatorComponent } from '../../StyledComp';

// Exports to be used throughout the Bike Route Component //

// FOR MAP.TSX //
export interface Coordinates {
  lat: number;
  lng: number;
}

export type LatLngLiteral = google.maps.LatLngLiteral;
export type DirectionsResult = google.maps.DirectionsResult;
export type MapOptions = google.maps.MapOptions;

export const geocoder = new google.maps.Geocoder();

export interface MapOptionsProp {
  options: {
    disableDefaultUI: boolean;
    zoomControl: boolean;
  };
  homeCoordinates: LatLngLiteral;
  setHomeCoordinates: React.Dispatch<
    React.SetStateAction<google.maps.LatLngLiteral | undefined>
  >;
}

const options = {
  disableDefaultUI: true,
  zoomControl: false,
};
////////////////////////////////////////////////// ->

// FOR MAPINPUTANDBUTTONS.TSX //
export type PlaceProps = {
  setStartingPoint: (position: google.maps.LatLngLiteral) => void;
  saveMessage: boolean;
};
///////////////////////////////////////////////// ->

// FOR FETCHEDROUTES.TSX //
export interface FetchedRoutesProps {
  fetchRoutes: (privacy: boolean, category: string) => void;
  routeList: any[];
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
  isPrivate: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setRouteList: React.Dispatch<React.SetStateAction<any[]>>;
  handleRouteClick: (origin, destination) => void;
  fetchDirections: () => void;
  likeList: any[];
  setLikeList: React.Dispatch<React.SetStateAction<any[]>>;
  setMarkers: React.Dispatch<React.SetStateAction<LatLngLiteral[]>>;
}
///////////////////////////////////////////////// ->

// FOR ROUTEINFO.TSX //
export interface RouteProps {
  route: any;
  index: number;
  handleRouteClick: (origin, destination) => void;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  fetchDirections: () => void;
  setRouteList: React.Dispatch<React.SetStateAction<any[]>>;
  likeList: any[];
  setMarkers: React.Dispatch<React.SetStateAction<LatLngLiteral[]>>;
}
//////////////////////////////////////////////// ->

// FOR SAVEFORM.TSX //
export interface SaveProps {
  routeName: string;
  setRouteName: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  isPrivate: boolean;
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
  directions: google.maps.DirectionsResult | null;
  saveRoute: (name: string, category: string, privacy: boolean) => void;
  setSaveMessage: React.Dispatch<React.SetStateAction<boolean>>;
}
/////////////////////////////////////////////// ->

// FOR THE POPOUT.TSX files //
export interface RoutesPopoutProps {
  children;
  openSearch: boolean;
  setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
  exitListForm: () => void;
}

export interface SavePopoutProps {
  children;
  openPopup: boolean;
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

interface RouteMProps {
  homeCoordinates: LatLngLiteral;
  setHomeCoordinates: React.Dispatch<
    React.SetStateAction<google.maps.LatLngLiteral | undefined>
  >;
}
///////////////////////////////////////////// ->

const RouteM = ({ homeCoordinates, setHomeCoordinates }: RouteMProps) => {
  return (
    <BandAid>
      <RouteCreatorComponent>
        <Map
          options={options}
          homeCoordinates={homeCoordinates}
          setHomeCoordinates={setHomeCoordinates}
        />
      </RouteCreatorComponent>
    </BandAid>
  );
};

export default RouteM;
