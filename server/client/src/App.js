import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { initializeApp } from 'firebase/app';

import './assets/css/App.css';
import './assets/css/v2.css'

import SignIn from './components/v2/SignIn'
import Admin from './components/v2/Admin';
import TheFront from './components/v2/TheFront';
import Toast from './components/v2/Toast';
import Loader from './components/v2/loaders/Loader';
import ScrollToTop from './ScrollToTop.js';//takes you to the top on page routing
import withSplashScreen from './withSplashScreen.js';
import { firebaseConfig } from './firebaseConfig.js';

function App() {

  //FIREBASE_________________________________
  const firebaseApp = initializeApp(firebaseConfig);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App">
        <SignIn />
        <Toast />

        <Routes>
          <Route path="/*" exact element={<TheFront />} />
          <Route path="/admin/*" exact element={<Admin firebaseApp={firebaseApp} />} />
        </Routes>

        <Loader />
      </div>
    </BrowserRouter>
  );
}

export default withSplashScreen(App);//withSplashScreen HOC