import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './components/App';
import Home from './components/Home';
import BulletinBoard from './components/BulletinBoard/BulletinBoard';
import Weather from './components/Weather/Weather';
import Profile from './components/Profile/Profile';
import CreateReport from './components/Reports/CreateReport';

const Root = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='/home' element={<Home />} />
            <Route path='bulletinBoard' element={<BulletinBoard />} />
            <Route path='weather' element={<Weather />} />

            <Route path='profile' element={<Profile />} />
            <Route path='createReport' element={<CreateReport />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Root;
