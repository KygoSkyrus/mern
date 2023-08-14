import React from 'react'
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

const TheFront = ({ dl }) => {


    


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

                {/* <Route path="/:id" exact element={<SingleBlog  />} /> */}
            </Routes>

            <Footer />

        </>
    )
}

export default TheFront