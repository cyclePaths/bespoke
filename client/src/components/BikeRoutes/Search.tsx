import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'react-places-autocomplete';

const Search = () => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOption: {
      location: { lat: () => 29.946949, lng: () => -90.0843514 },
      radius: 200 * 1000,
    },
  });
  return (
    <div
      onSelect={(address) => {
        console.log(address);
      }}
    ></div>
  );
};

export default Search;
