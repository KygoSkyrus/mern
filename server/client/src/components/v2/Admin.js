import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import './../../assets/css/admin.css'
import Nav from './Admin/Nav';
import Dashboard from './Admin/Dashboard';
import Loader from './Loader.jsx';
import Orders from './Admin/Orders';
import Users from './Admin/Users';
import BagLoader from './BagLoader.jsx';
import Error from './Error.js';
import AdminLogin from './Admin/AdminLogin.js';

const Admin = () => {

    let navigate = useNavigate();
    const [isAuthSuccess, setIsAuthSuccess] = useState(false)
    //ONLY let this function run if the user is admin
    useEffect(() => {
        fetch('/api/admin/authentication')
            .then(res => res.json())
            .then(res => {
                console.log('reee', res.isUserAuthenticated)
                setIsAuthSuccess(res.isUserAuthenticated)
                if (!res.isUserAuthenticated) navigate('/admin/login')
            })
    }, [])


    return (
        <>
            {/* <Routes>
                <Route path="/login" exact element={<AdminLogin />} />
            </Routes> */}

            {/* {isAuthSuccess ? */}
                <div className='adminView light'>

                    <Nav />

                    <div className='adminContainer'>

                        <Routes>
                            <Route path="/login" exact element={<AdminLogin />} />
                            
                            <Route path="/dashboard" exact element={<Dashboard />} />
                            <Route path="/orders" exact element={<Orders />} />
                            <Route path="/users" exact element={<Users />} />
                            {/* <Route path="/:id" exact element={<SingleBlog  />} /> */}
                            <Route path="*" element={<Error />} />
                        </Routes>
                    </div>
                </div>

            {/* //     : <BagLoader />
            // } */}

            <Loader />
        </>
    )
}

export default Admin