import React, { useState, useContext, useRef, useEffect } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import {
  InputLayout,
  AutoCompleteDropdownLayout,
  LoadingDiv,
} from '../../StyledComp';
import { Button, IconButton } from '@mui/material';
import { PlaceProps } from './RouteM';
import { UserContext } from '../../Root';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';

const MapInputandButtons = ({
  setStartingPoint,
  saveMessage,
  setDestination,
  fetchDirections,
}: PlaceProps) => {
  const [currAdd, setCurrAdd] = useState<string>('');
  const { isDark, user, geoLocation } = useContext(UserContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [homeSet, setHomeSet] = useState<boolean>(false);

  // Handle the input box //
  const handleChange = (value: string): void => {
    setCurrAdd(value);
  };

  // Once enter is pressed, it gets the address then converts the address to a lat and lng //
  // Once Lat and Lng are gotten, it sets the startingPoint to be what was put in //
  const handleSelect = (value: string): void => {
    geocodeByAddress(value).then((result: any): void => {
      setCurrAdd(result[0].formatted_address);
      getLatLng(result[0]).then((coordinates) => {
        setStartingPoint({
          lat: coordinates.lat,
          lng: coordinates.lng,
        });
      });
      // Finally the input is unfocused and then clear //
      inputRef.current?.blur();
      setCurrAdd('');
    });
  };
  // End of the input handlers //

  const handleChartHome = () => {
    axios
      .get(`/bikeRoutes/${user.id}`)
      .then(({ data }) => {
        if (data.id) {
          geocodeByAddress(user.homeAddress).then((result) => {
            getLatLng(result[0]).then((coordinates) => {
              console.log(coordinates);
              setStartingPoint(geoLocation);
              setDestination({
                lat: coordinates.lat,
                lng: coordinates.lng,
              });
              setHomeSet(true);
            });
          });
        } else {
          return;
        }
      })
      .catch((err) => {
        console.error('Failed to fetch: ', err);
      });
  };

  useEffect(() => {
    if (homeSet) {
      fetchDirections();
      setHomeSet(false);
    } else {
      return;
    }
  }, [homeSet]);

  return (
    <div>
      <PlacesAutocomplete
        value={currAdd}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <form
              style={{
                backgroundColor: isDark ? '#707070' : '#ececec',
                boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.2)',
                borderRadius: '4px',
                width: '85%',
                margin: '5px',
              }}
            >
              <InputLayout
                id='address-input'
                ref={(ref) => {
                  inputRef.current = ref;
                }}
                {...getInputProps({
                  placeholder: 'Set Starting Location ...',
                  className: 'location-search-input',
                })}
                isDark={isDark}
              />

              <IconButton onClick={handleChartHome}>
                <HomeIcon sx={{ color: isDark ? '#ececec' : '#0000008a' }} />
              </IconButton>
            </form>
            {suggestions.length > 0 && (
              <AutoCompleteDropdownLayout>
                {loading && <LoadingDiv isDark={isDark}>Loading...</LoadingDiv>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? {
                        backgroundColor: isDark ? '#707070' : '#fafafa',
                        cursor: 'pointer',
                      }
                    : {
                        backgroundColor: isDark ? '#707070' : '#fafafa',
                        cursor: 'pointer',
                      };
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
