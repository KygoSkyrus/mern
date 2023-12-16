/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import './../../assets/css/admin.css'
import PrivateRoute from './Admin/PrivateRoute.js';
import AdminLogin from './Admin/AdminLogin.js';
import Modal from './Admin/Modal.js';
import Error from './Error.js';

import { setAdminAuthStatus } from './redux/userSlice.js';

const Admin = () => {

    const dispatch = useDispatch();
    const isAuthSuccess = useSelector(state => state.user.isAdminAuthSuccess)
    const productFormVisibility = useSelector(state => state.productForm.visibility)// modal's visibility 

    useEffect(() => {
        fetch('/api/admin/authentication')
            .then(res => res.json())
            .then(res => {
                dispatch(setAdminAuthStatus({ value: res.is_user_logged_in }))
            })
    }, [isAuthSuccess])

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
            {productFormVisibility && <Modal />}
        </>
    )
}



export default Admin