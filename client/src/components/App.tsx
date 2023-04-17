import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Forecast from './Weather/Forecast';
import RouteM from './Routes/RouteM';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' Component={RouteM} />
      </Routes>
    </div>
  );
};

export default App;
