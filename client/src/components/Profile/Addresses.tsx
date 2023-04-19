import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Address } from './Profile';
import { SelectedAddress } from './Profile';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

/*
Instructions for react places autocomplete came from https://www.npmjs.com/package/react-places-autocomplete. I've refactored the code example from class component to hooks, and split between Profile.tsx and Addresses.tsx
*/

//bringing over props from Profile.tsx
interface AddressesProps {
  address: Address;
  setAddress: React.Dispatch<React.SetStateAction<Address>>;
}
//bringing over props from Profile.tsx
interface AddressesProps {
  selectedAddress: SelectedAddress;
  setSelectedAddress: React.Dispatch<React.SetStateAction<SelectedAddress>>;
}

function Addresses(props: AddressesProps) {
  const { address, setAddress, selectedAddress, setSelectedAddress } = props;

  //setting state on change
  const handleChange = useCallback(address => {
    setAddress(address);

  }, []);

    //setting state on select of address. This also clears the input box and removes focus
  const handleSelect = useCallback(address => {
    geocodeByAddress(address)
      .then((results) => {getLatLng(results[0])})
      .then((latLng) => {
        setSelectedAddress(address);
        setAddress('');
        const input = document.getElementById('address-input');
      if (input instanceof HTMLInputElement) {
        input.blur();
      }
      })
      .catch((err) => (console.log('Error', err)));
  }, []);


  return (
<div>
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input id='address-input'
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
    <div>{selectedAddress}</div>
    </div>
  );
}


export default Addresses;