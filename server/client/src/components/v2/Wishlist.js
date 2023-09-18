import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch,useSelector } from 'react-redux';
import { setUserDetails } from './redux/userSlice';
import { toastVisibility, setToastContent, setToastStatus } from './redux/todoSlice';

import wishlistImg from "./../../assets/images/newImg/collections/wishlistImg.gif"

const Wishlist = () => {

  const dispatch = useDispatch()
  const wishlistItems = useSelector(state => state.user.user.wishlist)
  const [products, setProducts] = useState()

  useEffect(() => {
    console.log(wishlistItems)
    let resp;
    if (wishlistItems.length > 0) {
      console.log('333')
      fetch(`/api/getwishlistitems`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ids: wishlistItems
        }),
      })
        .then(response => {
          resp = response;
          return response.json()
        })
        .then(res => {
          if (resp.status === 200) {
            //set products in a state
            setProducts(res.items)
          } else {
            //set toast that not logged in or prodcts not found
            //dispatch(setToastStatus({ isSuccess: false }))
            // dispatch(toastVisibility({ toast: true }))
            // dispatch(setToastContent({ message: res.message }))
          }
          console.log('wishlist items res', res)
        })
    }

  }, [wishlistItems])

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
            console.log('res add to wishlist',res)
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

  return (
    <>
      {wishlistItems?.length < 0 ?
        <div className='d-flex flex-column align-items-center'>

          <div><img src={wishlistImg} alt='' />
          </div>
          <h5 className='text-dark'>Your wishlist is empty</h5>
          <span className='text-center w-25'>
            Looks like you have not added anything to your wishlist. Go ahead & explore top categories
          </span>
          <button className='btn my-4 btn-outline-warning'>Continue shopping</button>

        </div> :


        (products ? <div className='container my-5'>
          <div class="row justify-content-center">
            <div class="col-lg-9 t-mb-30 mb-lg-0 theSection" >
              <div class="row ">
                <div class="col-12">
                  <div class="row ">
                    <div className='row mb-3 p-2 pb-0 border-bottom'>
                      <div class="col-md-2"></div>
                      <div class="col-md-10">
                        <div className='d-flex flex-column justify-content-between h-100'>
                          <div className='row d-flex justify-content-between'>
                            <div class="col-md-4">
                              <h6>
                                Item
                              </h6>
                            </div>
                            <div class="col-md-2">
                              <h6>
                                Price
                              </h6>
                            </div>
                            <div class="col-md-2">
                              <h6>
                                Availability
                              </h6>

                            </div>
                            <div class="col-md-2">
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    {products?.map((x, i) => {
                      return (
                        <>
                          <div key={x._id} className='row  p-2 '>
                            <div class="col-md-2">
                              <div className='d-flex justify-content-center'>
                                <img src={x.image} alt='' className='img-fluidt-minw-215' style={{ maxHeight: "80px" }} />
                              </div>
                            </div>

                            <div class="col-md-10">
                              <div className='d-flex flex-column justify-content-between h-100'>
                                <div className='row d-flex justify-content-between'>

                                  <div class="col-md-4">
                                    <Link to={`/product/${x._id}`} style={{ color: "inherit" }}>
                                      <h6>
                                        {x.name}
                                        {/* {x.rating} */}
                                      </h6>
                                    </Link>
                                  </div>
                                  <div class="col-md-2">
                                    <div className='d-flex align-items-end flex-column' style={{ width: "fit-content" }}>
                                      <section>
                                        <span style={{ fontSize: "12px" }}>&#8377;</span>
                                        <span className='fs-6'>{Math.floor(x.price - x.discount * x.price / 100)}</span>
                                      </section>
                                      {x.discount !== 0 &&
                                        <section style={{ fontWeight: "400", color: "#ff4460", lineHeight: "2px" }}>
                                          <span style={{ fontSize: "10px" }}>&#8377;</span>
                                          <span className='fs-7 extra-small' style={{ textDecoration: "line-through" }}>{x.price}</span>
                                        </section>
                                      }

                                    </div>
                                  </div>
                                  <div class="col-md-2">
                                    {x.stock > 0 ? <span className='text-success'>In stock</span>
                                      : <span className='text-danger'>Out of stock</span>}
                                  </div>

                                  <div class="col-md-2 ">
                                    <button className="btn btn-warning px-4 rounded-pill text-light" onClick={() => addToCart(x._id)}>Add to cart</button>

                                    <div className='d-flex justify-content-end mt-2 ' style={{ marginRight: "-41px" }}>
                                      <u><span
                                         onClick={() => updatewishlist(x._id)} 
                                        className='me-4 pointer'>Remove <i class="fa fa-trash fa-sm "></i></span></u>
                                    </div>
                                    {/* <button className="btn btn-danger ms-2 rounded-pill text-light"><i class="fa fa-trash fa-sm"></i></button> */}
                                  </div>

                                </div>

                              </div>
                            </div>

                          </div>
                          <div className='d-flex justify-content-end mb-3 border-bottom pb-3'>
                            {/* <u><span
                              // onClick={() => removeFromCart(x._id)} 
                              className='me-4 pointer'>Remove <i class="fa fa-trash fa-sm"></i></span></u> */}
                          </div>
                        </>
                      )
                    })}

                  </div>
                </div>
              </div>

            </div>
            {/* <div className='col-lg-3 mb-3 p-img-sticky '>
              <div className='row'>
                <div>
                  <h5>Summary</h5>

                  <section>Do you have a Promo Code?</section>

                  <div className='d-flex justify-content-between my-2'>
                    <span>Subtotal <i class="fa fa-question-circle fa-sm" aria-hidden="true"></i>
                    </span>
                    <span ref={subtotal}>
                      {sub}
                    </span>
                  </div>

                  <div className='d-flex justify-content-between my-2'>
                    <span title='99 shipping & handling charge is applied under subtotal 1999'>Estimated Shipping & Handling <i class="fa fa-question-circle fa-sm" aria-hidden="true"></i>
                    </span>
                    <span ref={shippingCharge}>{sub < 1999 ? 99 : "-"}</span>
                  </div>

                  <div className='d-flex justify-content-between my-2'>
                    <span title='levies 10% service tax'>Estimated Tax <i class="fa fa-question-circle fa-sm" aria-hidden="true"></i></span>
                    <span ref={tax}>{Math.round(sub * 0.1)}</span>
                  </div>

                  <div className='d-flex justify-content-between py-2 my-4 text-dark' style={{ borderBottom: "1px solid #dee2e6", borderTop: "1px solid #dee2e6" }}>
                    <span><b>Total</b></span>
                    <span ref={grandTotal} className='fw-bolder'>{sub + (sub < 1999 ? 99 : 0) + Math.round(sub * 0.1)}</span>
                  </div>

                  <form action="/create-checkout-session" method="POST">
                    <input type="hidden" name='priceObj' value={JSON.stringify(priceObj)} />
                    <button className='btn w-100 my-2' style={{ border: "1px solid rgb(0 0 0 / 16%)", background: "#ebebeb", borderTop: "0" }} type="submit">Checkout</button>
                  </form>
                  
                </div>
              </div>
            </div> */}
          </div>
        </div>
          :
          <div className='d-flex justify-content-center align-items-center' style={{ height: "70vh" }}>
            <div class="custom-loader"></div>
          </div>)
      }
      <div>Recommended products</div>
    </>
  )
}

export default Wishlist