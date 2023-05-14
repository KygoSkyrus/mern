import React from 'react'
import { Route, Routes } from "react-router-dom";

import Navbar from "./Navbar"
import Homepage from "./Homepage"
import Toast from './Toast';

const TheFront = ({ dl }) => {
    return (
        <>
            <Navbar data={dl} />

            <Routes>
                <Route path="/" exact element={<Homepage />} />
            
                {/* <Route path="/:id" exact element={<SingleBlog  />} /> */}
            </Routes>

        </>
    )
}

export default TheFront