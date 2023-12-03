import React from 'react'
import BannerSlider from './BannerSlider.jsx'
import ProductCardsCollection from './ProductCardsCollection.js'

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