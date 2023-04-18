import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Address } from './Profile';
import { SelectedAddress } from './Profile';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';




interface AddressesProps {
  address: Address;
  setAddress: React.Dispatch<React.SetStateAction<Address>>;
}
interface AddressesProps {
  selectedAddress: SelectedAddress;
  setSelectedAddress: React.Dispatch<React.SetStateAction<SelectedAddress>>;
}

function Addresses(props: AddressesProps) {
  const { address, setAddress, selectedAddress, setSelectedAddress } = props;
  console.log(address)

  // const clearFields = () => {
  //   const input = document.getElementById('address-input');
  //   if (input instanceof HTMLInputElement) {
  //     input.value = placeholder;
  //   }

  // };

  const handleChange = useCallback(address => {
    setAddress(address);

  }, []);

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



  // const saveAddress = () => {

    // address.name = '';
    // address.streetNumber = 0;
    // address.streetName = '';
    // address.city = '';
    // address.zipCode = 0;

  // }

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

  // return(
  //   <div>
  //     <div>Hello from Addresses</div>

      {/* <div>
        <form>
          <label>Location Nickname</label><br></br>
          <input></input><br></br>
          <label>Street Number</label><br></br>
          <input></input><br></br>
          <label>Street Name</label><br></br>
          <input></input><br></br>
          <label>City</label><br></br>
          <input></input><br></br>
          <label>Zip</label><br></br>
          <input></input><br></br>
          <button type='submit'>Save Address</button>
        </form>
      </div> */}

    // </div>

  // )
}


export default Addresses;
