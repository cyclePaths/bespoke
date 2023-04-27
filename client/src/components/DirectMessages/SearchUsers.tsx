import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useStyles } from './DMStyles';

export interface Users {
  id: number;
  name: string;
}

// export interface SearchUsersProps {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   options: readonly Users[];
//   setOptions: (options: readonly Users[]) => void;
//   loading: boolean;
// }

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

  function SearchUsers({open, setOpen, options, setOptions, loading}) {
    const classes = useStyles();


  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...dbUsers]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <div className={classes.search}>
    <Autocomplete

      id="asynchronous"
      // sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option: Users, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Bikers"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
    </div>
  );
}

const dbUsers = [
  { id: 1, name: 'Jordan Mann' },
  { id: 2, name: 'Andrew Vasquez' },
  { id: 3, name: 'Ernest Quiambao' },
  { id: 4, name: 'Marcus Ager' },
  { id: 5, name: 'Brendan Carmichael' },

];

export default SearchUsers;