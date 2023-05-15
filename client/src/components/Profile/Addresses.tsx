import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

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
  const [openAddress, setOpenAddress] = React.useState(false);
  const [saveAddressAlert, setSaveAddressAlert] = React.useState(false);
  const [alertTypeAddress, setAlertTypeAddress] = useState<
    'success' | 'warning' | null
  >(null);
  const [alertTypeSuccess, setAlertTypeSuccess] = React.useState(false);
  const [alertTypeWarning, setAlertTypeWarning] = React.useState(true);
  const [alertTypeError, setAlertTypeError] = React.useState(false);
  const [hasHomeAddress, setHasHomeAddress] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userAddress, setUserAddress] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [selectedAddressPlaceholder, setSelectedAddressPlaceholder] = useState('');
  // const [showHomeAddressWarning, setShowHomeAddressWarning] = useState(true);

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
      setSelectedAddressPlaceholder('');

      // setAlertType('success');
      // handleAlertClick();
      const input = document.getElementById('address-input');
      if (input instanceof HTMLInputElement) {
        input.blur();
      }
    } catch (err) {
      console.log('Error', err);
    }
  }, []);

  useEffect(() => {
    axios
      .get('/profile/address')
      .then(({ data }) => {
        if (data.homeAddress === null || data.homeAddress === '') {
          setHomeAddress('Save a home address to find a quick route home.');
          setHasHomeAddress(false);
          setAlertTypeWarning(true);
          setTimeout(() => {
            setAlertTypeWarning(false);
          }, 6000);
        } else {
          const home = data.homeAddress;
          setShowDelete(true);
          setAlertTypeWarning(false);
          setHomeAddress(`Your home is ${home}`);
          setHasHomeAddress(true);
        }
      })
      .catch((err) => console.log(err));
  }, [homeAddress, setAlertTypeWarning]);

  const handleSetHomeClick = () => {
    if (selectedAddress === '') {
      setAlertTypeError(true);
      setTimeout(() => {
        setAlertTypeError(false);
      }, 6000);
      setTimeout(() => {
        setHomeAddress('');
      }, 2000);
    } else {
      saveHome();
      setAddress('');
      setSelectedAddressPlaceholder('');
      setShowDelete(true);
      setAlertTypeSuccess(true);
      setTimeout(() => {
        setAlertTypeSuccess(false);
      }, 6000);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAddress(false);
  };

  useEffect(() => {
    axios
      .get('/profile/user')
      .then(({ data }) => {
        console.log('my id', data.id);
        setUserId(data.id);
        setUserAddress(data.address);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteAddress = () => {
    axios
      .delete(`/profile/deleteAddress/${userId}`, {
      })
      .then(() => {
        setShowDelete(false);
        setHomeAddress('Save a home address to find a quick route home.');
        console.log('successful delete');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
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
          <div className='displayedAddress'>
            {homeAddress}
            {showDelete && (
              <div className='delete-address'>
              <Button
                size='small'
                variant='outlined'
                color='error'
                sx={{ marginTop: '15px' }}
                onClick={deleteAddress}
              >
                DELETE
              </Button>
              </div>
            )}
          </div>
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
                  className='search-places'
                  type='search'
                  variant='standard'
                  inputProps={{
                    style: { color: '#ffffff' },
                  }}
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                  })}
                />
                <div className='autocomplete-dropdown-container'>
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    // const style = suggestion.active
                    //   ? { backgroundColor: '#b01e1e', cursor: 'pointer' }
                    //   : { backgroundColor: '#21a136', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          // style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                  {/* <div>{selectedAddress}</div> */}
                  {selectedAddress && (
                  <div>{selectedAddress}</div>
                )}

                {!selectedAddress && (
                  <div className='placeholder' style={{ opacity: 0 }}>
                    Placeholder Text
                  </div>
                )}

                </div>


                <Stack direction='row' spacing={5}>
                    <Button
                      className='saveHome'
                      variant='contained'
                      color='success'
                      style={{
                        backgroundColor: 'green',
                        color: 'white',
                        boxShadow: '-8px 2px 6px rgba(0, 0, 0, 0.3) !important',
                      }}
                      onClick={() => {
                        handleSetHomeClick();
                      }}
                    >
                      Set Home
                    </Button>
                  </Stack>


              </div>
            )}
          </PlacesAutocomplete>



          {/* <Stack direction='row' spacing={5}>
                    <Button
                      className='saveHome'
                      variant='contained'
                      color='success'
                      style={{
                        backgroundColor: 'green',
                        color: 'white',
                        boxShadow: '-8px 2px 6px rgba(0, 0, 0, 0.3) !important',
                      }}
                      onClick={() => {
                        handleSetHomeClick();
                      }}
                    >
                      Set Home
                    </Button>
                  </Stack> */}

        </Box>
      </div>

      <>
        <div className='custom-snackbar-addresses'>
          {alertTypeSuccess && (
            <Stack className='address-alerts'>
              <Alert
                onClose={() => setAlertTypeSuccess(false)}
                severity='success'
              >
                Home address successfully updated!
              </Alert>
            </Stack>
          )}
          {alertTypeWarning && (
            <Stack className='address-alerts'>
              <Alert
                onClose={() => setAlertTypeWarning(false)}
                severity='warning'
              >
                Set an address so you can find your way home, wherever you are!
              </Alert>
            </Stack>
          )}

          {alertTypeError && (
            <Stack className='address-alerts'>
              <Alert onClose={() => setAlertTypeError(false)} severity='error'>
                <strong>Must enter location to save home address.</strong>
              </Alert>
            </Stack>
          )}
        </div>
      </>
    </>
  );
};

export default Addresses;
