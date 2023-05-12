import React, { useEffect } from 'react'

import products from './dummy'

const Homepage = () => {


  useEffect(()=>{
    console.log('ue in hp')
        fetch('/api/getproducts',{
          method:"GET",
          headers: { "Content-Type": "application/json" },        
        })
        .then(res=>res.json())
        .then(data=>console.log('products',data))
  },[])
 

  return (
    <>
      <div className='container bg-light my-4'>

        <section>Sort by</section>
        <p>Price</p>

        <div className="row row-cols-2 row-cols-md-4 g-4 m-3">
          {products.map(product => {
            return (
              <div className="col" key={product.id}>
                <div className="card h-100" >
                  <img src={product.src} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-2 fc">
                      <h5 className="card-title">{product.name}</h5>
                      <h6 className="">&#8377;{product.price}</h6>
                    </div>
                    <p className="card-text ">{product.description}</p>
                  </div>
                  <button className="btn btn-outline-warning"  >
                    <i className="fas fa-shopping-cart"></i>
                  </button>
                </div>
              </div>

            )
          })}

          {/* <Example product={product} show={show} setShow={setShow} onAdd={onAdd} /> */}
        </div>
      </div>
    </>
  )
}

export default Homepage