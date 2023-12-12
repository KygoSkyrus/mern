import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import './index.css';
import store from './components/v2/redux/store';
import App from './App';
import AppLoaded from './AppLoaded.js';
import AppRoot from './AppRoot.js';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>

      {/* <AppRoot>
      <AppLoaded/>
    </AppRoot> */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
