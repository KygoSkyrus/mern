import React, { useEffect, useState } from 'react'
// import {util} from '@material/ripple/index';

import ProductCardsCollection from './ProductCardsCollection.js'
import BannerSlider from './BannerSlider.jsx'

const Homepage = () => {

  const [product, setProducts] = useState()

  // useEffect(() => {
  //   console.log('ue in hp')
  //   fetch('/api/getproducts', {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log('products', data)
  //       setProducts(data)//save this data in redux
  //     })
  // }, [])


  return (
    <>

      <div className='mb-5'>
        <BannerSlider />
      </div>


      {product ?
        product.map(x => {
          return (
            <div class="container">
              <div class="card-3">
                <img src={x.image} class="card-img-top" alt="..." />
                <div class="card3-body">
                  <div class="text-section">
                    <h5 class="card-title">{x.name}</h5>
                    {/* <p class="card-text">Some quick example text to build on the card's
                                                  content.</p> */}
                  </div>
                  <div class="cta-section">
                    <div>{x.price}</div>
                    <a href="/#" class="btn btn-light">Buy Now</a>
                  </div>
                </div>
              </div>

            </div>
          )
        })
        : <section className='d-flex justify-content-center align-items-center'><h1>...Loading</h1></section>
      }


      <ProductCardsCollection/>
    </>
  )
}

export default Homepage