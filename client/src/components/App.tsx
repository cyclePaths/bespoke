import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom'
import Navbar from './Navbar';
import { StopwatchTime, UserContext } from '../Root';
// import Stopwatch from './Stopwatch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastBuffer } from '../StyledComp';

//We will eventually use Link to allow us to create clickable routing
const App = () => {
  const { isDark } = useContext(UserContext);

  const theme = isDark ? 'dark' : 'light';

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <ToastBuffer>
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
          theme={theme}
        />
      </ToastBuffer>
      <div></div>
    </div>
  );
};

export default App;
