import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { setAdminAuthStatus } from './redux/userSlice.js';

import './../../assets/css/admin.css'
import PrivateRoute from './Admin/PrivateRoute.js';
import AdminLogin from './Admin/AdminLogin.js';
import Error from './Error.js';
import { useDispatch, useSelector } from 'react-redux';

const Admin = () => {

    const dispatch = useDispatch();
    // const [isAuthSuccess, setIsAuthSuccess] = useState(null)//can chnage it with the reduct state 
    const isAuthSuccess = useSelector(state => state.user.isAdminAuthSuccess)//using this may break stuff, 
    console.log('isAuthSuccess--4-4-4-', isAuthSuccess)
    //ONLY let this function run if the user is admin
    useEffect(() => {
        fetch('/api/admin/authentication')
            .then(res => res.json())
            .then(res => {
                console.log('reee', res.isUserAuthenticated)
                // setIsAuthSuccess(res.isUserAuthenticated)
                dispatch(setAdminAuthStatus({ value: res.isUserAuthenticated }))
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

                        <Route exact path='/login/:route' element={<AdminLogin />} />
                        <Route path="/*" exact element={<Error />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}



export default Admin