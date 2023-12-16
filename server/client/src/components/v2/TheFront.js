/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux';

import Navbar from "./Navbar"
import Homepage from "./Homepage"
import Category from './Category';
import ProductPage from './ProductPage';
import User from './User';
import Cart from './Cart';
import Wishlist from './Wishlist';
import Order from './Order';
import OrderList from './OrderList';
import Footer from './Footer';
import Error from './Error';
import { getUser } from './Utility';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TheFront = ({ dl }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        getUser(dispatch)
    }, [])

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