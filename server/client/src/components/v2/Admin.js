import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import './../../assets/css/admin.css'
import Nav from './Admin/Nav';
import Toast from './Toast';
import Dashboard from './Admin/Dashboard';
import Loader from './Loader.jsx';
import Orders from './Admin/Orders';

const Admin = () => {
    
    //ONLY let this function run if the user is admin

    return (
        <>
            <div className='adminView light'>

                <Nav />

                <div className='adminContainer'>

                    <Routes>
                        <Route path="/dashboard" exact element={<Dashboard />} />
                        <Route path="/orders" exact element={<Orders />} />
                        {/* <Route path="/:id" exact element={<SingleBlog  />} /> */}
                    </Routes>
                </div>
            </div>

      
            <Loader/>

        </>
    )
}

export default Admin