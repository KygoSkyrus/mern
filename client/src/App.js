import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Cart from './components/Cart';
import Orders from './components/Orders';
import Items from './components/Items';



function App() {
  return (
    <Router>
      <div className="App">
        <SignIn/>

        {/*************navbar *************/}
        
          <nav className="navbar navbar-expand-lg navbar-light bg-light" >
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                Shopp-itt
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                  <li className="nav-item">
                    <a className="nav-link active" data-bs-toggle="modal" href="#exampleModalToggle" role="button">
                      SignIn
                    </a>
                  </li>

                  <li className="nav-item">
                    <Link to="/cart" className="nav-link">
                      Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/orders" className="nav-link">
                      Orders
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
    
    
        {/*****************items ******************/}

        <Items/>

       


        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/orders">
          <Orders />
        </Route>
      </div>

    </Router>
  );
}

export default App;
