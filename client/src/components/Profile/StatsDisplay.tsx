import * as React from 'react';
import axios from 'axios';
import { UserContext } from '../../Root';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef, GridPagination } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { duration } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Fab from '@mui/material/Fab';

const StatsDisplay = ({ stats, handleGridClose, handleClickOpen }) => {
  const handleBackClick = () => {
    handleGridClose();
  };

  // User Context //
  const { isDark } = React.useContext(UserContext);

  const statsWithIds = stats.reverse().map((row, index) => {
    const hours = Math.floor(row.duration / 60);
    const minutes = row.duration % 60;

    if (hours === 0) {
      row.duration = `${minutes}m`;
    } else if (minutes === 0) {
      row.duration = `${hours}h`;
    } else {
      row.duration = `${hours}h ${minutes}m`;
    }

    return {
      ...row,
      id: row.id,
      duration: row.duration,
    };
  });

  const [rows, setRows] = React.useState(statsWithIds);

  const columns: GridColDef[] = [
    {
      field: 'rideDate',
      headerName: 'Date',
      width: 110,
      valueFormatter: (params) => dayjs(params.value).format('MM/DD/YYYY'),
    },
    {
      field: 'duration',
      headerName: 'Duration',
      width: 70,
      editable: true,
    },
    {
      field: 'weight',
      headerName: 'Weight',
      width: 60,
      editable: true,
    },
    {
      field: 'calories',
      headerName: 'Calories',
      type: 'number',
      width: 65,
      editable: true,
    },
    {
      field: 'delete',
      headerName: 'Delete',
      renderCell: (params) => (
        <IconButton aria-label='delete'>
          <DeleteIcon
            sx={{ color: isDark ? '#eae9e9' : '#555555' }}
            onClick={() => {
              // Filter out the row with the clicked button's id and update state
              setRows(rows.filter((row) => row.id !== params.id));
              deleteStat(params.id);
            }}
          />
        </IconButton>
      ),
      width: 100,
    },
  ];

  const deleteStat = (id) => {
    axios
      .delete(`/profile/deleteStat/${id}`)
      .then(() => {
        console.log('successfully deleted');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CustomPagination = (props) => {
    const paginationColor = isDark ? 'white' : 'black';

    const theme = createTheme({
      components: {
        MuiPaginationItem: {
          styleOverrides: {
            root: {
              color: paginationColor,
              '&:hover': {
                backgroundColor: paginationColor,
                color: 'white',
              },
              '&.Mui-selected': {
                backgroundColor: paginationColor,
                color: 'white',
                '&:hover': {
                  backgroundColor: paginationColor,
                  color: 'white',
                },
              },
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              color: paginationColor,
            },
          },
        },
        MuiButtonBase: {
          styleOverrides: {
            root: {
              color: paginationColor,
            },
          },
        },
        MuiTablePagination: {
          styleOverrides: {
            toolbar: {
              '& p.MuiTablePagination-displayedRows': {
                color: isDark ? 'white' : 'black',
              },
            },
          },
        },
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <GridPagination {...props} />
      </ThemeProvider>
    );
  };

  return (
    <div
      className='stats-grid'
      style={{
        boxShadow: isDark
          ? '1.25em 1.25em 3.75em rgb(40, 43, 113), -0.625em -0.625em 1.3125em #282b71'
          : '0px 8px 6px rgba(0, 0, 0, 0.3), 0px -8px 6px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Box style={{ bottom: 0, width: '100%', overflow: 'hidden' }}>
        <div style={{ padding: '16px' }}>
          {/* <ReturnToDialogButton onClick={handleGridClose} /> */}
          <Fab
        sx={{ left: 0, marginBottom: '10px' , boxShadow: '6px 6px 6px rgba(0, 0, 0, 0.2)' }}
        color='secondary'
        size='small'
        aria-label='back'
            onClick={() => {
              handleBackClick();
              handleClickOpen();
            }}
          >
            {/* &lt; &lt; Back to Select */}
            <ArrowBackIosNewIcon fontSize='small' />
          </Fab>
          <DataGrid
            components={{
              Pagination: CustomPagination,
            }}
            // rows={statsWithIds}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            // checkboxSelection
            // disableRowSelectionOnClick
            style={{
              opacity: 1,
              color: isDark ? 'white' : 'black',
              background: isDark
                ? 'linear-gradient(145deg, #1e2062, #030312)'
                : 'linear-gradient(145deg, #3cc6f6, #d8f1ff)',
            }}
          />
        </div>
      </Box>
    </div>
  );
};

export default StatsDisplay;
