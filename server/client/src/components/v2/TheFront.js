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

import { setUserDetails, isUserLoggedIn } from './redux/userSlice';
import { useDispatch } from 'react-redux';


const TheFront = ({ dl }) => {

    const disptach = useDispatch()


    useEffect(() => {
        getUser()
    }, [])

    ///inside this set the user state,,and this state will be put in store and from navbar and wherre ever user loggedin isneeded than get that user
    const getUser = () => {

        fetch('/api/getUserInfo',)
            .then(response => response.json())
            .then(res => {
                console.log('userindo', res)
                disptach(isUserLoggedIn({ value: true }))
                disptach(setUserDetails({ user: res.user }))
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