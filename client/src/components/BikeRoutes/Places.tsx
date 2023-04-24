import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import {
  InputLayout,
  DropdownLayout,
  RouteButtonContainer,
} from '../../StyledComp';
import Popup from './Popup';
import SaveForm from './SaveForm';

// Starting Props //
type PlaceProps = {
  setStartingPoint: (position: google.maps.LatLngLiteral) => void;
  saveRoute: () => void;
  fetchDirections: (position: google.maps.LatLngLiteral) => void;
  selected: google.maps.LatLngLiteral | undefined;
};

const Places = ({
  setStartingPoint,
  saveRoute,
  fetchDirections,
  selected,
}: PlaceProps) => {
  const [currAdd, setCurrAdd] = useState<string>('');
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  // Handle the input box //
  const handleChange = (value: string): void => {
    setCurrAdd(value);
  };

  const handleSelect = (value: string): void => {
    // setCurrAdd(value);
    geocodeByAddress(value).then((result: any): void => {
      setCurrAdd(result[0].formatted_address);
      getLatLng(result[0]).then((coordinates) => {
        setStartingPoint({
          lat: coordinates.lat,
          lng: coordinates.lng,
        });
      });
    });
  };
  // End of the input handlers //

  const handleSave = (): void => {
    saveRoute();
  };

  const handleRoute = (): void => {
    fetchDirections(selected!);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={currAdd}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <RouteButtonContainer>
              <button
                style={{ marginRight: '5px', marginLeft: '5px' }}
                onClick={handleRoute}
              >
                Track Route
              </button>
              <button onClick={handleSave}>Save Create Route</button>
            </RouteButtonContainer>

            <InputLayout
              id='address-input'
              {...getInputProps({
                placeholder: 'Set Staring Location ...',
                className: 'location-search-input',
              })}
            />

            <DropdownLayout>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                const key = suggestion.placeId;

                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    key={key}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </DropdownLayout>
          </div>
        )}
      </PlacesAutocomplete>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <SaveForm />
      </Popup>
    </div>
  );
};

export default Places;
