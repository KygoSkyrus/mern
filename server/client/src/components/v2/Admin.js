import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate ,Navigate,Outlet} from 'react-router-dom'

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
    const [isAuthSuccess, setIsAuthSuccess] = useState(null)
    //ONLY let this function run if the user is admin
    useEffect(() => {
        fetch('/api/admin/authentication')
            .then(res => res.json())
            .then(res => {
                console.log('reee', res.isUserAuthenticated)
                setIsAuthSuccess(res.isUserAuthenticated)
               // if (!res.isUserAuthenticated) navigate('/admin/login')
            })
    }, [])


    return (
        <>
                <div className='adminView light'>

                    <Nav />

                    <div className='adminContainer'>

                        <Routes>                     
                            <Route path="/dashboard" exact element={<PrivateRoute isAuthSuccess={isAuthSuccess}><Dashboard/></PrivateRoute>} />
                            <Route path="/orders" exact element={<PrivateRoute><Orders/></PrivateRoute>} />
                            <Route path="/users" exact element={<PrivateRoute><Users/></PrivateRoute>} />                  
                            <Route path="/*" exact element={<PrivateRoute><Error/></PrivateRoute>} />
                            {/* <Route path="/:id" exact element={<SingleBlog />} /> */}                           
                        </Routes>
                    </div>
                </div>

            <Error />
        </>
    )
}

const PrivateRoute = ({element, isAuthSuccess}) => {
  console.log('isAuthSuccess',isAuthSuccess)

  if (isAuthSuccess === null) {
    // Still loading, show a loader or any loading indicator
    return <div>Loading...</div>;
  }
    return (
        <>
         {isAuthSuccess?
          element
         : 
          <Navigate to="/login" replace={true} />
        }
        </>
    );
  };

export default Admin