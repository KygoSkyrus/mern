import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import './../../assets/css/admin.css'
import PrivateRoute from './Admin/PrivateRoute.js';
import AdminLogin from './Admin/AdminLogin.js';
import Error from './Error.js';

const Admin = () => {

    const [isAuthSuccess, setIsAuthSuccess] = useState(null)
    //ONLY let this function run if the user is admin
    useEffect(() => {
        fetch('/api/admin/authentication')
            .then(res => res.json())
            .then(res => {
                console.log('reee', res.isUserAuthenticated)
                setIsAuthSuccess(res.isUserAuthenticated)
            })
    }, [])


    return (
        <>
            <div className='adminView light'>
                <div className='adminContainer'>
                    <Routes>
                        <Route path="/dashboard" exact element={<PrivateRoute isAuthSuccess={isAuthSuccess} route='dashboard' />} />
                        <Route path="/orders" exact element={<PrivateRoute isAuthSuccess={isAuthSuccess} route='orders' />} />
                        <Route path="/users" exact element={<PrivateRoute isAuthSuccess={isAuthSuccess} route='users' />} />
                        
                        <Route exact path='/login' element={<AdminLogin />} />
                        <Route path="/*" exact element={<Error />} />
                        {/* <Route path="/:id" exact element={<SingleBlog />} /> */}
                    </Routes>
                </div>
            </div>
        </>
    )
}



export default Admin