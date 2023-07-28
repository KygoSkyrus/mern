import React from 'react'
import { Link } from "react-router-dom";

const Navbar = (props) => {

  const Badge = () => {
    if (props.data > 0) {
      return (
        <span className="w3-badge w3-red w3-round">{props.data}</span>
      )
    } else {
      return null
    }
  }

  return (
    <>
     {/* <div className='header-top'>
          header top
        </div> */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm" >
        
        <div className="container-fluid px-4">
          <Link to="/" className="navbar-brand" >
            <div className="logo ">
            </div>
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
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end w-100 ">

              <li className="nav-item">
                <a className="nav-link " data-bs-toggle="modal" href="#exampleModalToggle" role="button">
                  SignIn
                </a>
              </li>

              <li className="nav-item position-relative">
                <Link to="/cart" className="nav-link">
                  <i className='fa fa-shopping-cart'></i>
                 <span>Cart</span>  
                  <Badge />
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/orders" className="nav-link">
                  Orders
                </Link>
              </li>
              <li className="nav-item ">
              <Link to="/admin/dashboard" className="nav-link">
                  Admin
                </Link>
                </li>
                <li className="nav-item position-relative">
              <Link to="/admin/dashboard" className="nav-link">
                  <span>Profile</span>
                  <i className='fa fa-user'></i>
                </Link>
                </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar