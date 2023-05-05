import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'
import Navbar from './Navbar';
import { StopwatchTime } from '../Root';
// import Stopwatch from './Stopwatch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//We will eventually use Link to allow us to create clickable routing
const App = () => {
  const achievementGet = () => {
    toast('You got an achievement!');
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <button onClick={achievementGet}>Click For Toast</button>
        <ToastContainer />
      </div>
      <div>
        {/* <Stopwatch stopwatchState={stopwatchState} setStopwatchState={setStopwatchState} /> */}
      </div>
    </div>
  );
};

export default App;
