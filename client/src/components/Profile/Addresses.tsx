import React, { useState, useCallback, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../Root';
import styled from 'styled-components';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

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
  const [openAddress, setOpenAddress] = React.useState(false);
  const [alertTypeSuccess, setAlertTypeSuccess] = React.useState(false);
  const [alertTypeWarning, setAlertTypeWarning] = React.useState(true);
  const [alertTypeError, setAlertTypeError] = React.useState(false);
  const [hasHomeAddress, setHasHomeAddress] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userAddress, setUserAddress] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [selectedAddressPlaceholder, setSelectedAddressPlaceholder] =
    useState('');

  // User Context //
  const { isDark } = useContext(UserContext);

  // Define style for the autocomplete suggestion list
  const AutocompleteSuggestions = styled.div`
    color: ${isDark ? 'white' : 'black'};
  `;

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
          setHomeAddress(`Your home is ${home.slice(0, -5)}`);
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

      const input = document.getElementById('address-input');
      if (input instanceof HTMLInputElement) {
        input.value = '';
        input.blur();
      }

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
      .delete(`/profile/deleteAddress/${userId}`, {})
      .then(() => {
        setShowDelete(false);
        setHomeAddress('Save a home address to find a quick route home.');
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
                    style: { color: isDark ? '#ffffff' : '#000000' },
                  }}
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                  })}
                />

                <div className='autocomplete-dropdown-container'>
                  {loading && (
                    <div style={{ color: isDark ? '#ffffff' : '#000000' }}>
                      Loading...
                    </div>
                  )}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose

                    return (
                      <AutocompleteSuggestions
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          // style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </AutocompleteSuggestions>
                    );
                  })}
                  {/* <div>{selectedAddress}</div> */}
                  {selectedAddress && <div>{selectedAddress}</div>}

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
