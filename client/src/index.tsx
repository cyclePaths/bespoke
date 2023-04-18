import React, { useState, useContext, useEffect } from 'react';
import ReactDom from 'react-dom';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
//element imports:
import App from './components/App';
import Home from './components/Home';
import BulletinBoard from './components/BulletinBoard/BulletinBoard';
import Weather from './components/Weather/Weather';
import Profile from './components/Profile/Profile';
import CreateReport from './components/Reports/CreateReport';
import Stopwatch from './components/Stopwatch';

const root: any = createRoot(document.getElementById('app'));
// export const UserContext = React.createContext();
//below here, the HTML should eventually be wrapped in <UserContextProvider> tags
//our individual components will be rendered w/ individual <Route> tags
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}>
      <Route path='/home' element={<Home/>} />
      <Route path='bulletinBoard' element={<BulletinBoard/>}/>
      <Route path='forecast' element={<Weather/>}/>
      <Route path='profile' element={<Profile/>} />
      <Route path='createReport' element={<CreateReport/>} />
      <Route path='stopwatch' element={<Stopwatch/>} />

    </Route>
    </Routes>
  </BrowserRouter>
);
