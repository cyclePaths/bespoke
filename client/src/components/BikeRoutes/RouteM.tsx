import React, { useEffect, useRef, useState } from 'react';
import Map from './Map';
import { BandAid, RouteCreatorComponent } from '../../StyledComp';
import {
  darkModeOptions,
  defaultOptions,
  defaultMapContainerStyle,
} from './Utils';
import { BikeRoutes } from '@prisma/client';

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

export interface RouteInfo {
  distance: string;
  duration: string;
  centerLat: number;
  centerLng: number;
  warnings: string[];
}

export interface MapOptionsProp {
  homeCoordinates: LatLngLiteral;
  setHomeCoordinates: React.Dispatch<
    React.SetStateAction<google.maps.LatLngLiteral | undefined>
  >;
}

////////////////////////////////////////////////// ->

// FOR MAPINPUTANDBUTTONS.TSX //
export type PlaceProps = {
  setStartingPoint: (position: google.maps.LatLngLiteral) => void;
  setDestination: React.Dispatch<
    React.SetStateAction<google.maps.LatLngLiteral | null>
  >;
  saveMessage: boolean;
  fetchDirections: () => null | undefined;
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
  routeList: BikeRoutes[];
  setRouteList: React.Dispatch<React.SetStateAction<any[]>>;
  likeList: any[];
  setMarkers: React.Dispatch<React.SetStateAction<LatLngLiteral[]>>;
  deleteRoute: (routeNum: number, likeCount: number) => void;
}
//////////////////////////////////////////////// ->

// FOR SAVEFORM.TSX //
export interface SavePopoutProps {
  openPopup: boolean;
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
          homeCoordinates={homeCoordinates}
          setHomeCoordinates={setHomeCoordinates}
        />
      </RouteCreatorComponent>
    </BandAid>
  );
};

export default RouteM;
