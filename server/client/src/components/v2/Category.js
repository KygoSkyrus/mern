import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import dummyImg from "./../../assets/images/newImg/products/goldPhone_4d019155-e7a9-4072-8d7a-df659785f41705c1.png"

const Category = () => {
    const { categoryId } = useParams()

    console.log('in cat', categoryId)

    useEffect(()=>{
        fetch(`/api/getprodbycategory/?category=${categoryId}`)
        .then(response => response.json())
        .then(res => res.json())
        .then(response=>{
            console.log('response',response.products)
        })
          
  
    },[])


    return (
        <>
            <div>Category</div>

            <div className='container bx'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='row'>

                            <div className='col-md-6 col-lg-4'>
                                <div className='card2 card'>
                                    <div class="card-tag">New Product</div>
                                    <div style={{background:"whitesmoke"}}>
                                      <img src={dummyImg} className="card-img-top" alt="..." />
                                    </div>
                                    <div className="card-body border-none p-0">                                  
                                        <section className='product-catagory'>category</section>
                                        <h4><a href="/#">New T-Shirt For Man</a></h4>
                                        <div class="product-bottom-details">
                                            <div class="product-price">
                                                <small>$15.10</small>$7.99
                                                </div>
                                            <div class="product-links">
                                                <a href="/#"><i class="fa fa-heart"></i></a>
                                                <a href="/#"><i class="fa fa-shopping-cart"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

//   <div className='rating-stars'>
//                                             <i className="fa-solid fa-star" aria-hidden="true"></i>
//                                             <i className="fa-solid fa-star" aria-hidden="true"></i>
//                                             <i className="fa-solid fa-star" aria-hidden="true"></i>
//                                             <i className="fa-solid fa-star-half-stroke"></i>
//                                             <i className="far fa-star" aria-hidden="true"></i>
//                                         </div> 


export default Category