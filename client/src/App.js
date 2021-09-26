import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Cart from './components/Cart';
import Orders from './components/Orders';

import tshirt from './components/images/blue-t-shirt.jpg';
import watch from './components/images/wood-leather-watches.jpg'


function App() {
  return (
    <Router>
      <div className="App">

        {/*************navbar *************/}

        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between d-flex" >
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
                  <Link to="/signup" className="nav-link active">
                    SignUp
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signin" className="nav-link">
                    SignIn
                  </Link>
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

        {/*items */}
        <div class="row row-cols-2 row-cols-md-4 g-4 m-3">

          <div class="col">
            <div class="card h-100">
              <img src={watch} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Wrist watch</h5>
                <p class="card-text">Elegant leather wrist watche for men and women</p>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card h-100">
              <img src={tshirt} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Blue t-shirt</h5>
                <p class="card-text">lightweight cotton t-shirt</p>
              </div>
            </div>
          </div>




          
          <div class="col">
            <div class="card h-100">
              <img src={watch} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100">
              <img src={tshirt} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100">
              <img src={tshirt} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a short card.</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100">
              <img src={watch} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100">
              <img src={tshirt} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100">
              <img src={tshirt} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a short card.</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100">
              <img src={watch} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100">
              <img src={tshirt} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              </div>
            </div>
          </div>


        </div>


        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
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
