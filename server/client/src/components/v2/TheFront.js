import React from 'react'
import { Route, Routes } from "react-router-dom";

import Navbar from "./Navbar"
import Homepage from "./Homepage"
import Toast from './Toast';
import Footer from './Footer';

const TheFront = ({ dl }) => {
    return (
        <>
            <Navbar data={dl} />

            <div className='bag-container'>
                <div style={{position:"relative"}}>
<div className='bag'>
</div>
    <div className='handle'></div>
    </div>
            </div>

            <Routes>
                <Route path="/" exact element={<Homepage />} />
            
                {/* <Route path="/:id" exact element={<SingleBlog  />} /> */}
            </Routes>

            <Footer/>

        </>
    )
}

export default TheFront