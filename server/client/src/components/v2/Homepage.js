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


      {/* {product ?
        product.map(x => {
          return (
            <div className="container">
              <div className="card-3">
                <img src={x.image} className="card-img-top" alt="..." />
                <div className="card3-body">
                  <div className="text-section">
                    <h5 className="card-title">{x.name}</h5>
                  
                  </div>
                  <div className="cta-section">
                    <div>{x.price}</div>
                    <a href="/#" className="btn btn-light">Buy Now</a>
                  </div>
                </div>
              </div>

            </div>
          )
        })
        : <section className='d-flex justify-content-center align-items-center'><h1>...Loading</h1></section>
      } */}


      <ProductCardsCollection/>
    </>
  )
}

export default Homepage