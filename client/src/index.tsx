import React, { useState, useContext, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
//element imports:
import Root from './Root';



const root: any = createRoot(document.getElementById('app'));
// export const UserContext = React.createContext();
//below here, the HTML should eventually be wrapped in <UserContextProvider> tags
//our individual components will be rendered w/ individual <Route> tags
root.render(<Root />);


