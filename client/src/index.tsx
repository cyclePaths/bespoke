import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
//element imports:
import App from './components/App';
import Navbar from './components/Navbar/Navbar';
import BulletinBoard from './components/BulletinBoard/BulletinBoard';
import Weather from './components/Weather/Weather';

const root: any = createRoot(document.getElementById('app'));
// export const UserContext = React.createContext();
//below here, the HTML should eventually be wrapped in <UserContextProvider> tags
//our individual components will be rendered w/ individual <Route> tags
root.render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<App/>}>
      <Route path='bulletinBoard' element={<BulletinBoard/>}/>
      <Route path='forecast' element={<Weather/>}/>



      </Route>
    </Routes>
  </HashRouter>
);
