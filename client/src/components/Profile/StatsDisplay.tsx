import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';

// dayjs.extend(localizedFormat);
// dayjs.extend(utc);

const columns: GridColDef[] = [
  { field: 'rideDate',
  headerName: 'Date',
  width: 120,
  valueFormatter: (params) => dayjs(params.value).format('MM/DD/YYYY'), // Update the format as needed

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

//

const StatsDisplay = ({ stats }) => {
  return (
    // <Box sx={{ height: 400, width: '100%' }}>
    <Box style={{ width: '100%', overflow: 'hidden' }}>

      <DataGrid
        rows={stats}
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
      />
    </Box>
  );
}

export default StatsDisplay;