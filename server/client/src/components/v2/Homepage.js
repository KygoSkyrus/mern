import React, { useEffect, useState } from 'react'
// import {util} from '@material/ripple/index';

import ProductCardsCollection from './ProductCardsCollection.js'
import BannerSlider from './BannerSlider.jsx'

const Homepage = () => {


  return (
    <>
      <div className='mb-5'>
        <BannerSlider />
      </div>

      <ProductCardsCollection/>
    </>
  )
}

export default Homepage