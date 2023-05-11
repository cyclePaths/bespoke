import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Fab from '@mui/material/Fab';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useStyles } from './DMStyles';
import axios from 'axios';

export interface Users {
  id: number;
  name: string;
}

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
}) {
  const [findUser, setFindUser] = useState('');
  const [showAutoComplete, setShowAutoComplete] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    let active = true;
    setShowAutoComplete(true);

    const getUsers = async () => {
      try {
        const response = await axios.get('/dms/findUsers');
        console.log('RESPONSO', response);
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


  return (
    <div className={classes.search}>
      {showAutoComplete ? (
        // {/* {showAutoComplete && ( */}
        <Autocomplete
          sx={{
            background: 'linear-gradient(128deg, rgb(42, 164, 71) 0%, rgb(104, 194, 125) 100%) rgb(123, 231, 149)',
            borderRadius: '5px',
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
          onChange={(event, newValue) => {
            setReceiver(newValue);
            handleSetReceiver(newValue);
            setShowAutoComplete(false);
          }}
          options={options}
          loading={loading}
          renderInput={(params) => (
            <TextField
              sx={{ borderRadius: '25px' }}
              {...params}
              label='Search Bikers'
              InputProps={{
                ...params.InputProps,
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
      )
      : (
        <Fab color="secondary" size='small' aria-label="back"
        onClick={() => {
          setShowAutoComplete(true);
          setIsReceiverSelected(false)
          }}>
        {/* <IconButton onClick={() => setShowAutoComplete(true)}> */}
          <ArrowBackIosNewIcon fontSize='small'/>
        {/* </IconButton> */}
        </Fab>
      )
      }
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
