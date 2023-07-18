import React, { useEffect } from 'react'

import products from './dummy'

import img1 from './../../assets/images/newImg/products/bluePhone.png'

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

    <div className='hero-bg'>
<img src={img1} alt='' />
    </div>

    <div className='container'>
      <div className="row row-cols-2 row-cols-md-4 g-4 m-3">
      <div className='col'>

     
      <div className='card2 card h-100'>
      <img src="https://picsum.photos/350/300" class="card-img-top" alt="..."/>
      <div class="card-body">
        <div class="d-flex justify-content-between mb-2 fc">
        <i class="fa-solid fa-star" aria-hidden="true"></i>
        <i class="fa-solid fa-star" aria-hidden="true"></i>
        <i class="fa-solid fa-star" aria-hidden="true"></i>
        <i class="fa-solid fa-star-half-stroke"></i>
        <i class="far fa-star" aria-hidden="true"></i>
        {/* <i class="fa-solid fa-star-half"></i> */}
          <h5 class="card-title">T-shirt</h5>
          <h6 class="">₹350</h6>
          </div>
          <p class="card-text ">Pure cotton blue t-shirt for men</p>
          </div>

      </div>
      </div>
       </div>
    </div>


      <div className='container bg-light my-4'>

      

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