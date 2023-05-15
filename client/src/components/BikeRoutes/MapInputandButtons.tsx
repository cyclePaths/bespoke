import React, { useState, useContext } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import {
  InputLayout,
  AutoCompleteDropdownLayout,
  RouteButtonContainer,
} from '../../StyledComp';
import { Button } from '@mui/material';
import { PlaceProps } from './RouteM';
import { UserContext } from '../../Root';

const MapInputandButtons = ({ setStartingPoint, saveMessage }: PlaceProps) => {
  const [currAdd, setCurrAdd] = useState<string>('');

  const {isDark} = useContext(UserContext);

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

  return (
    <div>
      <PlacesAutocomplete
        value={currAdd}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <InputLayout
              id='address-input'
              {...getInputProps({
                placeholder: 'Set Starting Location ...',
                className: 'location-search-input',
              })}
              isDark={isDark}
            />

            {suggestions.length > 0 && (
              <AutoCompleteDropdownLayout>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: isDark ? '#707070' : '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: isDark ? '#707070' : '#fafafa', cursor: 'pointer' };
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
              </AutoCompleteDropdownLayout>
            )}
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default MapInputandButtons;
