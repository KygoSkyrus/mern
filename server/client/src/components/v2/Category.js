/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { setUserDetails } from './redux/userSlice';
import { toastVisibility, setToastContent, setToastStatus } from './redux/todoSlice';

const Category = () => {
    const { categoryId } = useParams()
    const [products, setProducts] = useState()
    const [randomNum, setRandomNum] = useState()

    const dispatch = useDispatch()
    const wishlistItems = useSelector(state => state.user.user.wishlist)

    console.log('in cat', categoryId)
    useEffect(() => {
        fetch(`/api/getprodbycategory/?category=${categoryId}`)
            .then(response => response.json())
            .then(res => {
                console.log('response', res.products)
                setProducts(res.products)
                setRandomNum(Math.floor(Math.random() * (res.products?.length - 1 + 1)) + 1)
                console.log('ran', Math.floor(Math.random() * (res.products?.length - 1 + 1)) + 1)
            })

    }, [])


    //some apis are common and are being called from difeerent conponents..these can be moved to utility as a function
    const updatewishlist = (productId) => {
        let resp;
        fetch(`/api/updatewishlist`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId
            }),
        })
            .then(response => {
                resp = response
                return response.json()
            })
            .then(res => {
                console.log('res add to wishlist', res)
                if (resp.status === 200) {
                    dispatch(setToastStatus({ isSuccess: true }))
                    dispatch(setUserDetails({ user: res.user }))
                } else {
                    dispatch(setToastStatus({ isSuccess: false }))
                }
                dispatch(toastVisibility({ toast: true }))
                dispatch(setToastContent({ message: res.message }))
                console.log('response add wishlist', res)
            })
    }

    const addToCart = (productId) => {
        let resp;
        fetch(`/api/addtocart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId
            }),
        })
            .then(response => {
                resp = response
                return response.json()
            })
            .then(res => {
                console.log('res add to cart',res)
                if (resp.status === 200) {
                    dispatch(setToastStatus({ isSuccess: true }))
                    dispatch(setUserDetails({ user: res.user }))
                } else {
                    dispatch(setToastStatus({ isSuccess: false }))
                }
                dispatch(toastVisibility({ toast: true }))
                dispatch(setToastContent({ message: res.message }))
                console.log('response add tocart', res)
            })
    }


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
                                            <div style={{ background: "#fff",height: "100%",minHeight: "275px",objectFit: "cover",display:"grid",placeItems: "center" }}>
                                                <img src={x.image} className="card-img-top" alt="..." />
                                            </div>
                                            <div className="card-body border-none p-0">
                                                {/* this is not needed the caegory,,instead at the top show the whole heirarchy */}
                                                <section className='product-catagory'>{x.category}</section>
                                                <h4 className='title' title={x.name}><a href={`/product/${x._id}`}>{x.name}</a></h4>
                                                <div class="product-bottom-details">
                                                    <div class="product-price">
                                                        {x.discount !== 0 &&
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
                                                        {x.discount !== 0 &&
                                                            <span className='discount-percent mx-2'>
                                                                {x.discount}% off
                                                            </span>
                                                        }
                                                    </div>
                                                    <div class="product-links">
                                                        <span onClick={() => updatewishlist(x._id)} title={wishlistItems?.includes(x._id)? "Remove from wishlist":"Add to wishlist"}><i class={`fa fa-heart ${wishlistItems?.includes(x._id) && "text-danger"}`}></i></span>
                                                        <span onClick={()=>addToCart(x._id)}><i class="fa fa-shopping-cart"></i></span>
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