import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'
import Navbar from './Navbar';
import { StopwatchTime } from '../Root';
// import Stopwatch from './Stopwatch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastBuffer } from '../StyledComp';

//We will eventually use Link to allow us to create clickable routing
const App = () => {
  let messageToSend = 'test message';

  const sendToast = (message: string) => {
    toast(message);
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <ToastBuffer>
        <button
          onClick={() => {
            sendToast(messageToSend);
          }}
        >
          Click For Toast
        </button>
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
        />
      </ToastBuffer>
      <div>
        {/* <Stopwatch stopwatchState={stopwatchState} setStopwatchState={setStopwatchState} /> */}
      </div>
    </div>
  );
};

export default App;
