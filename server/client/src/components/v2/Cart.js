import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from './redux/userSlice';
import { toastVisibility, setToastContent, setToastStatus } from './redux/todoSlice';
import emptyCartImg from "./../../assets/images/newImg/collections/emptycart.png"

const Cart = () => {

  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.user.user.cartProducts)
  console.log('ffkhf', cartItems)

  // useEffect(()=>{
  //   fetch('/api/getcartitems')
  //   .then(res=>res.json())
  //   .then(response=>{
  //     console.log('response',response)
  //   })

  // },[])

  const removeFromCart = (productId) => {
    let resp;
    fetch(`/api/removefromcart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId
      }),
    })
      .then(response => {
        resp = response.status;
        return response.json()
      })
      .then(res => {
        if (resp.status === 200) {
          dispatch(setToastStatus({ isSuccess: true }))
          dispatch(setUserDetails({ user: res.user }))
        } else {
          dispatch(setToastStatus({ isSuccess: false }))
        }
        dispatch(toastVisibility({ toast: true }))
        dispatch(setToastContent({ message: res.message }))
        console.log('remove from cart response', res)
        //also update the user from here too or elese the result wont be seen immediately
      })
  }

  return (
    <>
      {!cartItems?.length > 0 ?
        <div className='d-flex flex-column align-items-center'>

          <div><img src={emptyCartImg} alt='' />
          </div>
          <h5 className='text-dark'>Your cart is empty</h5>
          <span className='text-center w-25'>
            Looks like you have not added anything to your cart. Go ahead & explore top categories
          </span>
          <button className='btn my-4 btn-outline-warning'>Continue shopping</button>

        </div> :

        <div className='container my-5'>
          <div class="row ">
            <div class="col-lg-8 t-mb-30 mb-lg-0 theSection" >
              <div class="row ">
                <div class="col-12">
                  <div class="row ">
                    {cartItems.map(x => {
                      return (
                        <div key={x._id} className='row mb-3 p-2 bg-white '>
                          <div class="col-md-2">
                            <div>
                              <img src={x.image} alt='' className='img-fluid w-100 t-minw-215' />
                            </div>
                          </div>
                          <div class="col-md-10">
                            <h5>
                              {x.name}
                            </h5>
                            <h5>{x.price}</h5>
                            <span onClick={() => removeFromCart(x._id)} className=''>Remove from cart</span>
                            <span>Add to wishlist</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

            </div>
            <div className='col-lg-4 mb-3  bg-white'>
              <div className='row'>
                CHECKOUT
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Cart