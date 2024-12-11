// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { DataProvider } from './Components/DataProvider/DataProvider';
// import {initialState,reducer} from './Utility/reducer'


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <DataProvider reducer={reducer} initialState={initialState}>
//       <App />
//     </DataProvider>
    
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DataProvider } from './Components/DataProvider/DataProvider';
import { initialState, reducer } from './Utility/reducer';
//import { BrowserRouter } from 'react-router-dom'; // Only one Router at the top level

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      <DataProvider reducer={reducer} initialState={initialState}>
        <App />
      </DataProvider>
 
  </React.StrictMode>
);


