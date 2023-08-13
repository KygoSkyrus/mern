import React, { useState, useEffect } from 'react'

import emptyCartImg from "./../../assets/images/newImg/collections/emptycart.png"

const Cart = () => {

  const [products, setProducts] = useState()

  useEffect(() => {
    fetch(`/api/getcartitems`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: "dummy@email.com"//find a feasbale key to identyify user
      }),
    })
      .then(response => response.json())
      .then(res => {
        console.log('response', res.items)
        setProducts(res.ietms)
      })

  }, [])

  return (
    <>
      <div className='d-flex flex-column align-items-center'>

        <div><img src={emptyCartImg} alt='' />
        </div>
        <h5 className='text-dark'>Your cart is empty</h5>
        <span className='text-center w-25'>
          Looks like you have not added anything to your cart. Go ahead & explore top categories
        </span>
        <button className='btn my-4 btn-outline-warning'>Continue shopping</button>

      </div>
    </>
  )
}

export default Cart