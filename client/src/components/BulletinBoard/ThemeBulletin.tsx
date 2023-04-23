import React from 'react';
import { createTheme } from '@mui/material'

const bulletinTheme = createTheme({
    palette: {
        primary: {
            main: '#87BBDC',
            dark: '#90C8EB',
        },
        secondary: {
            main: '#54BFA5',
            dark: '#4CA994'
        }
    }
});


export default bulletinTheme