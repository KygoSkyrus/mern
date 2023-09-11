/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const Category = () => {
    const { categoryId } = useParams()
    const [products, setProducts] = useState()
    const [randomNum, setRandomNum] = useState()

    console.log('in cat', categoryId)
    useEffect(() => {
        fetch(`/api/getprodbycategory/?category=${categoryId}`)
            .then(response => response.json())
            .then(res => {
                console.log('response', res.products)
                setProducts(res.products)
                setRandomNum(Math.floor(Math.random() * (res.products?.length - 1 + 1)) + 1)
                console.log('ran',Math.floor(Math.random() * (res.products?.length - 1 + 1)) + 1)
            })

    }, [])


    return (
        <>
            <div>Category</div>

            <div className='container bx'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='row'>
                            {products?.map((x, i) => {
                                return (
                                    <div className='col-md-6 col-lg-4'>
                                        <div className='card2 card'>
                                            {i + 1 === randomNum && <div class="card-tag">New Product</div>}
                                            <div style={{ background: "#fff" }}>
                                                <img src={x.image} className="card-img-top" alt="..." />
                                            </div>
                                            <div className="card-body border-none p-0">
                                                {/* this is not needed the caegory,,instead at the top show the whole heirarchy */}
                                                <section className='product-catagory'>{x.category}</section>
                                                <h4 className='title' title={x.name}><a href={`/product/${x._id}`}>{x.name}</a></h4>
                                                <div class="product-bottom-details">
                                                    <div class="product-price">
                                                    {x.discount!==0 &&
                                                    <>
                                                        <span className='extra-small' style={{ color: "#ec3b3b" }}>&#8377;</span>
                                                        <small>
                                                            {x.price}
                                                        </small>
                                                        </>
                                                    }
                                                        <span>
                                                            <span style={{ fontSize: "12px" }}>&#8377;</span>
                                                            {Math.floor(x.price - x.discount * x.price / 100)}
                                                        </span>
                                                        {x.discount!==0 &&
                                                        <span className='discount-percent mx-2'>
                                                            {x.discount}% off
                                                        </span>
                                                        }
                                                    </div>
                                                    <div class="product-links">
                                                        <a href="/#"><i class="fa fa-heart"></i></a>
                                                        <a href="/#"><i class="fa fa-shopping-cart"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div>Explore more</div>

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