import React, { useState, useCallback } from 'react';
// import PlacesAutocomplete from 'react-places-autocomplete';
import styled from 'styled-components';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// Define styles for the autocomplete input box and suggestion list
const AutocompleteWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const AutocompleteInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;

const AutocompleteSuggestions = styled.div`
  position: absolute;
  width: 100%;
  z-index: 100;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
`;

export type Address = string;
export type SelectedAddress = string;
export type HomeAddress = string;

interface Props {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  selectedAddress: string;
  setSelectedAddress: React.Dispatch<React.SetStateAction<string>>;
  homeAddress: string;
  setHomeAddress: React.Dispatch<React.SetStateAction<string>>;
  saveHome: () => void;
}

const Addresses = ({
  address,
  setAddress,
  selectedAddress,
  setSelectedAddress,
  homeAddress,
  setHomeAddress,
  saveHome,
}: Props) => {
  const [place, setPlace] = useState('');

  const handlePlaceSelect = (selectedPlace: string) => {
    setPlace(selectedPlace);
    setAddress(selectedPlace);
  };

  const handleHomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHomeAddress(event.target.value);
  };

  // setting state on change
  const handleChange = useCallback((address) => {
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
  return (
    <div className='setAddress'>
      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <div className='displayedAddress'>{homeAddress}</div>
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div id='address' className='address'>
              <TextField
                id='address-input'
                type='search'
                variant='standard'
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />

              {/* <input id='address-input'
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input',
            })}
          /> */}
              <div className='autocomplete-dropdown-container'>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#b01e1e', cursor: 'pointer' }
                    : { backgroundColor: '#21a136', cursor: 'pointer' };
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
                <div>{selectedAddress}</div>

                <Stack direction='row' spacing={5}>
                  <Button
                    className='saveHome'
                    variant='contained'
                    color='success'
                    onClick={() => saveHome()}
                  >
                    Set Home
                  </Button>
                </Stack>
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </Box>
    </div>
  );
};

export default Addresses;
