import React, { useRef, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Address, SelectedAddress, HomeAddress } from './Profile';
// import { SelectedAddress } from './Profile';
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
  selectedAddress: SelectedAddress;
  setSelectedAddress: React.Dispatch<React.SetStateAction<SelectedAddress>>;
  homeAddress: HomeAddress;
  setHomeAddress: React.Dispatch<React.SetStateAction<HomeAddress>>;
}
//bringing over props from Profile.tsx
// interface AddressesProps {
//   selectedAddress: SelectedAddress;
//   setSelectedAddress: React.Dispatch<React.SetStateAction<SelectedAddress>>;
// }

function Addresses(props: AddressesProps) {
  const { address, setAddress, selectedAddress, setSelectedAddress, homeAddress, setHomeAddress } = props;

  //setting state on change
  const handleChange = useCallback(address => {
    setAddress(address);

  }, []);

    //setting state on select of address. This also clears the input box and removes focus
    const handleSelect = useCallback(async (address) => {
      try {
        const results = await geocodeByAddress(address);
        const latLng = await getLatLng(results[0]);
        setSelectedAddress(address);
     setAddress('');
        const input = document.getElementById('address-input');
        if (input instanceof HTMLInputElement) {
          input.blur();
        }
      } catch (err) {
        console.log('Error', err);
      }
    }, []);


    const saveHome = () => {
      axios.post('/profile/address', {
        address: selectedAddress
      })

        .then(() => {
          // if (selectedAddress !== null) {
            console.log(selectedAddress, 'ADDRESS')
            setHomeAddress(`My home is ${selectedAddress}`);
            setSelectedAddress('');
          // }

        })
        .catch((err) => {
          console.log('Failed to post address', err);
        })
    }

    useEffect(() => {
      axios.get('/profile/address')
        .then(({ data }) => {
          if (data.homeAddress === null) {
            setHomeAddress('');
          } else {
            setHomeAddress(`My home is ${data.homeAddress}`);
          }

console.log(data, 'Please')

        })
    }, [homeAddress])



  return (
<div>
  <div>{homeAddress}</div>
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

    <div>
      <button type='button' style={{marginTop: '10px'}} onClick={() => saveHome()}>Set Home</button>
    </div>

    </div>
  );
}


export default Addresses;
