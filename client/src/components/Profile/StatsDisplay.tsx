import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';

// dayjs.extend(localizedFormat);
// dayjs.extend(utc);

const columns: GridColDef[] = [
  { field: 'rideDate',
  headerName: 'Date',
  width: 120,
  valueFormatter: (params) => dayjs(params.value).format('MM/DD/YYYY'),
},
  {
    field: 'duration',
    headerName: 'Duration',
    width: 90,
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
    width: 90,
    editable: true,
  },
];


const StatsDisplay = ({ stats, handleGridClose, handleClickOpen }) => {


  const handleBackClick = () => {
    handleGridClose();
  };

  const statsWithIds = stats.map((row, index) => ({ ...row, id: row.rideDate + '_' + index }));

  return (
    <div className='stats-grid' >

    <Box style={{ bottom: 0, width: '100%', overflow: 'hidden' }}>
<div style={{  backgroundColor: 'rgb(51, 51, 51)', padding: '16px' }}>
{/* <ReturnToDialogButton onClick={handleGridClose} /> */}
<Button variant="outlined" color="primary" onClick={() => {handleBackClick(); handleClickOpen()}}>
      &lt; &lt;  Back to Select
    </Button>
      <DataGrid
        rows={statsWithIds}
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
        disableRowSelectionOnClick
        style={{
          opacity: 1,
          background: 'linear-gradient(128deg, rgb(42, 164, 71) 0%, rgb(104, 194, 125) 100%) rgb(123, 231, 149)',
          color: '#1d1c1c',
        }}
      />
      </div>
    </Box>
    </div>
  );
}

export default StatsDisplay;