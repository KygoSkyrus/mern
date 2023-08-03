import React, { useEffect, useState } from 'react'
// import {util} from '@material/ripple/index';

import SliderComponent from './SliderComponent.jsx'
import ProductCardsCollection from './ProductCardsCollection.js'

const Homepage = () => {

  const [product, setProducts] = useState()

  useEffect(() => {
    console.log('ue in hp')
    fetch('/api/getproducts', {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => {
        console.log('products', data)
        setProducts(data)//save this data in redux
      })
  }, [])


  return (
    <>




       {/* <ProductCardsCollection/> */}
    </>
  )
}

export default Homepage