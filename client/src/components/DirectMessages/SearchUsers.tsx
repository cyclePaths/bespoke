import React, { useEffect, useState, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
import InputBase from '@mui/material/InputBase';

import { useStyles } from './DMStyles';
import axios from 'axios';
import Typography from '@mui/material/Typography';

export interface Users {
  id: number;
  name: string;
}

const ItemTypes = {
  BUTTON: 'button',
};

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function SearchUsers({
  open,
  setOpen,
  options,
  setOptions,
  loading,
  receiver,
  setReceiver,
  loadMessages,
  handleSetReceiver,
  setIsReceiverSelected,
  setShowMessageContainer,
  setMessages,
  senderName,
  setShowTextField,
}) {

  const [showAutoComplete, setShowAutoComplete] = useState(true);
  // const [active, setActive] = useState(true);
  const [label, setLabel] = useState(senderName || 'Search Bikers');

  const classes = useStyles();


  useEffect(() => {
    let active = true;

    const getUsers = async () => {
      try {
        const response = await axios.get('/dms/findUsers');
        if (active) {
          setOptions([...response.data]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (!loading) {
      getUsers();
    }

    return () => {
      active = false;
    };
  }, [loading]);


  const resetLabel = () => {
    // setLabel('Search Bikers');
  };


  useEffect(() => {
    setLabel(senderName || 'Search Bikers');
  }, [senderName]);


  const CustomInput = styled(InputBase)(({ theme }) => ({
    color: 'rgb(191, 186, 186)',

    '& .MuiInputAdornment-root.MuiInputAdornment-positionEnd': {
      color: 'green', // Change this to the color you want for the dropdown icon
    },
  }));

  return (
    // <ThemeProvider theme={theme}>
    <div className={classes.search}>
        <Autocomplete
          sx={{
            background: 'linear-gradient(128deg, rgb(20, 22, 21) 0%, rgb(64, 65, 64) 100%) rgb(46, 48, 47)',
          }}
          id='asynchronous'
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option: Users, value) =>
            option.name === value.name
          }
          getOptionLabel={(option) => option.name}
          onChange={async (event, newValue) => {
            setIsReceiverSelected(true);
            setShowTextField(true);
            setReceiver('');
            setReceiver(newValue);
            handleSetReceiver(newValue);
            setShowAutoComplete(false);

            await new Promise((resolve) => setShowMessageContainer(false, resolve));
          }}
          options={options}
          loading={loading}
          renderInput={(params) => (

            <TextField
              {...params}
              label={label}
              InputLabelProps={{
                style: {
                  color: 'rgb(191, 186, 186)',
                },
              }}
              InputProps={{
                style: {
                  color: 'rgb(191, 186, 186)',
                },
                ...params.InputProps,
                onFocus: resetLabel,
                endAdornment: (
                  <React.Fragment>

                    {loading ? (
                      <CircularProgress color='inherit' size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
    </div>
    // </ThemeProvider>
  );
}

export default SearchUsers;