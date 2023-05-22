import React from 'react';
import ReactDOM from 'react-dom';


import store from './components/v2/redux/store';
import { Provider } from 'react-redux'

import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

import AppLoaded from './AppLoaded.js';
import AppRoot from './AppRoot.js';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>

    {/* <AppRoot>
      <AppLoaded/>
    </AppRoot> */}
    <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
