import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import './App.css';

import SignIn from './components/SignIn';
import Cart from './components/Cart';
import Orders from './components/Orders';
import Items from './components/Items';
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <div className="App">
        <SignIn />

        <Navbar/>

        <Route exact path="/">
          <Items />
        </Route>
        <Route path="/cart" component={Cart}>
          <Cart />
        </Route>
        <Route path="/orders" component={Orders}>
          <Orders />
        </Route>


      </div>
    </Router>
  );
}

export default App;
