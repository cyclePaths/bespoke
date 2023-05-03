import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


const columns: GridColDef[] = [
  { field: 'date', headerName: 'Date', width: 90 },
  {
    field: 'duration',
    headerName: 'Duration',
    width: 90,
    editable: true,
  },
  {
    field: 'weight',
    headerName: 'Weight',
    width: 90,
    editable: true,
  },
  {
    field: 'calories',
    headerName: 'Calories',
    type: 'number',
    width: 90,
    editable: true,
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
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