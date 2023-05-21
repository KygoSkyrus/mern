import React, { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import './../../assets/css/admin.css'
import Nav from './Admin/Nav';
import Toast from './Toast';
import AddProduct from './Admin/AddProduct';
import Dashboard from './Admin/Dashboard';

const Admin = () => {



    return (
        <>
            <div className='adminView'>

                <Nav />

                <div className='adminContainer'>

                    <Routes>
                        <Route path="/dashboard" exact element={<Dashboard />} />
                        {/* <Route path="/addproduct" exact element={<AddProduct />} /> */}
                        {/* <Route path="/:id" exact element={<SingleBlog  />} /> */}
                    </Routes>
                </div>
            </div>
            <Toast />

        </>
    )
}

export default Admin