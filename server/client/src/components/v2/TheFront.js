import React, { useEffect } from 'react'
import { Route, Routes } from "react-router-dom";

import Navbar from "./Navbar"
import Homepage from "./Homepage"
import Toast from './Toast';
import Footer from './Footer';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Category from './Category';
import ProductPage from './ProductPage';
import Cart from './Cart';
import User from './User';

import { useDispatch } from 'react-redux';
import { setUserDetails, isUserLoggedIn } from './redux/userSlice';
import { toastVisibility,setToastContent } from './redux/todoSlice';


const TheFront = ({ dl }) => {

    const dispatch = useDispatch()


    useEffect(() => {
        getUser()
    }, [])

    ///inside this set the user state,,and this state will be put in store and from navbar and wherre ever user loggedin isneeded than get that user
    const getUser = () => {
        let resp;

        fetch('/api/getUserInfo',)
            .then(response => {
                resp=response
               return response.json()})
            .then(res => {
                console.log('userindo', res,resp.status)

                //dont show the text when user is logged in ,,the permission granted one
                //user add the background to toast to     background: #d7d2d27a; with radius 4p
                dispatch(toastVisibility({ toast: true }))
                dispatch(setToastContent({ message: res.message }))
                if(res.is_user_logged_in){
                    //check response message here...dont sent true is session has expired
                    dispatch(isUserLoggedIn({ value: true }))
                    dispatch(setUserDetails({ user: res.user }))
                }
            })
    }



    return (
        <>
            <Navbar data={dl} />

            {/* <div className='bag-container'>
                <div style={{ position: "relative" }}>
                    <div className='bag'>
                    </div>
                    <div className='handle'></div>
                </div>
                <div className='glass'></div>
            </div> */}

            <Routes>
                <Route path="/" exact element={<Homepage />} />
                <Route path="/category/:categoryId" exact element={<Category />} />
                <Route path="/product/:productId" exact element={<ProductPage />} />
                <Route path="/cart" exact element={<Cart />} />
                <Route path="/user" exact element={<User />} />

                {/* <Route path="/:id" exact element={<SingleBlog  />} /> */}
            </Routes>

            <Footer />

        </>
    )
}

export default TheFront