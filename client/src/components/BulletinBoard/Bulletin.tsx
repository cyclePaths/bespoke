import React from 'react';
//import { createTheme, ThemeProvider } from '@mui/material'

//Mess around with theme later
// const bulletinTheme = createTheme({
//   palette: {
//     primary: {
//       main: '#40063b',
//     },
//   },
// });



const Bulletin = (props) => (
    <div className='bulletin'>
      <h1 className='bulletinTopic'>{props.bulletinData.bulletinTopic}</h1>
      <h2 className='bulletinPoster'>{props.bulletinData.bulletinCreator}</h2>
      <h3 className='bulletinText'>{props.bulletinData.bulletinText}</h3>
    </div>
);

export default Bulletin;
