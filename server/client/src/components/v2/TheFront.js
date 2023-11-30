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
import { toastVisibility, setToastContent, setToastStatus } from './redux/todoSlice';


import getUser from './Utility';
import Wishlist from './Wishlist';
import OrderList from './OrderList';
import Error from './Error';
import Order from './Order';

const TheFront = ({ dl }) => {

    const dispatch = useDispatch()


    useEffect(() => {
        getUser(dispatch)
    }, [])

    ///inside this set the user state,,and this state will be put in store and from navbar and wherre ever user loggedin isneeded than get that user
    



    return (
        <>
            <Navbar />

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
                <Route path="/wishlist" exact element={<Wishlist />} />
                <Route path="/user" exact element={<User />} />
                <Route path="/orders" exact element={<OrderList />} />
                <Route path="/orders/:orderId" exact element={<Order />} />
                <Route path="*" exact element={<Error />} />
            </Routes>

            <Footer />

        </>
    )
}

export default TheFront