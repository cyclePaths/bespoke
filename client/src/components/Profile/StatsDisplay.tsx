import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { duration } from '@mui/material';


const StatsDisplay = ({ stats, handleGridClose, handleClickOpen }) => {
  const handleBackClick = () => {
    handleGridClose();
  };


const statsWithIds = stats.reverse().map((row, index) => {

  const hours = Math.floor(row.duration / 60);
  const minutes = row.duration % 60;

  if (hours === 0) {
    row.duration = `${minutes}m`
  } else if (minutes === 0) {
    row.duration =  `${hours}h`
  } else {
    row.duration = `${hours}h ${minutes}m`
  }

 return {
  ...row,
  id: row.id,
    duration: row.duration,
}

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
        <IconButton aria-label="delete">
           <DeleteIcon  onClick={() => {
            // Filter out the row with the clicked button's id and update state
            setRows(rows.filter((row) => row.id !== params.id));
            deleteStat(params.id);
          }}  />
        </IconButton>
      ),
      width: 100,
    },
  ];



  const deleteStat = (id) => {
    // stats.map((stat) => {
      // console.log('stat', stat)
      axios.delete(`/profile/deleteStat/${id}`)
        .then(() => {console.log('successfully deleted')})
        .catch((err) => {
          console.log(err);
        })
    // })


  }


  return (
    <div className='stats-grid'>
      <Box style={{ bottom: 0, width: '100%', overflow: 'hidden' }}>
        <div style={{ backgroundColor: 'rgb(51, 51, 51)', padding: '16px' }}>
          {/* <ReturnToDialogButton onClick={handleGridClose} /> */}
          <Button
            variant='outlined'
            color='primary'
            onClick={() => {
              handleBackClick();
              handleClickOpen();
            }}
          >
            &lt; &lt; Back to Select
          </Button>
          <DataGrid
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
              background:
                'linear-gradient(128deg, rgb(42, 164, 71) 0%, rgb(104, 194, 125) 100%) rgb(123, 231, 149)',
              color: '#1d1c1c',
            }}
          />
        </div>
      </Box>
    </div>
  );
};

export default StatsDisplay;
