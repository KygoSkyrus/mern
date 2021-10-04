import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" >
            Shopp-itt
          </Link>
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
    
    )
}

export default Navbar
