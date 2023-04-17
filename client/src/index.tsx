import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from './components/App';
import { createRoot } from 'react-dom/client';

const root: any = createRoot(document.getElementById('app'));
// export const UserContext = React.createContext();
//below here, the HTML should eventually be wrapped in <UserContextProvider> tags
//our individual components will be rendered w/ individual <Route> tags
root.render(
  <Router>
    <App />
  </Router>
);
