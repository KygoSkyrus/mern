import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from './redux/userSlice';
import { toastVisibility, setToastContent, setToastStatus } from './redux/todoSlice';
import emptyCartImg from "./../../assets/images/newImg/collections/emptycart.png"

const Cart = () => {

  const dispatch = useDispatch()
  // const [quantity,setQuantity]=useState();
  const cartItems = useSelector(state => state.user.user.cartProducts)
  const cart = useSelector(state => state.user.user.cart)
  console.log('cartItems', cartItems)
  console.log('cart', cart)

  let tempObj={};
  //getting the relevant quantity of items
  cart.map(x=>{
    tempObj[x.productId] = x.quantity
  })
  //debouce and debug
  
// Simulated API function to update cart item quantities
function updateCartItemQuantities(cartItems) {
  // Replace with actual API call using fetch
  console.log('ccc',cartItems)
  // let xx= cartItems.filter(x=>x.productId)
  // console.log('dd',xx)

  // return fetch('/api/updateCart', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(cartItems),
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log('Updating cart item quantities on the server:', data);
  //     return data;
  //   });
}

// Debounce function to delay API calls by a specified time
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// Batch function to batch API calls within a specified time
function batch(func, delay) {
  let timeout;
  let batchedArgs = [];
  return function (...args) {
    batchedArgs.push(args);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(batchedArgs);
      batchedArgs = [];
    }, delay);
  };
}

// Function to update cart item quantities on the server using debouncing and batching
const debouncedBatchedUpdate = batch(debounce(updateCartItemQuantities, 1000), 2000);

// Simulate user interactions
function updateQuantity(id,quantity) {
  console.log('up',id,quantity)
  debouncedBatchedUpdate({ productId: id, quantity });
}


  

  // useEffect(()=>{
  //   fetch('/api/getcartitems')
  //   .then(res=>res.json())
  //   .then(response=>{
  //     console.log('response',response)
  //   })

  // },[])
  // let tempObj;
  // cart.map(x=>{
  //   tempObj[x.productId] = x.quantity
  // })
  
 //have to update the wuantity in store
  
  // const updateQuantity =(id,val)=>{
  //   if(val==="inc"){
  //     setQuantity({...quantity,id : quantity.id+1})
  //   }
    
  // }
  

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
          console.log('updated user object',res.user)
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
                                <div class="col-md-3">
                                  <h6>
                                    Quantity
                                  </h6>
                        
                                </div>
                                <div class="col-md-2">
                                  <h6>
                                    Total
                                  </h6>
                                </div>
                              </div>                            
                            </div>
                          </div>

                        </div>
                    {cartItems.map(x => {
                      return (
                        <>
                        <div key={x._id} className='row  p-2 '>
                          <div class="col-md-2">
                            <div>
                              <img src={x.image} alt='' className='img-fluid w-100 t-minw-215' />
                            </div>
                          </div>

                          <div class="col-md-10">
                            <div className='d-flex flex-column justify-content-between h-100'>
                              <div className='row d-flex justify-content-between'>

                                <div class="col-md-4">
                                  <h6>
                                    {x.name}
                                    can show here other product details too like instock
                                  </h6>
                                </div>
                                <div class="col-md-2">
                                  <h6>{x.price}</h6>
                                </div>
                                <div class="col-md-3">
                                  <div>
                                  </div>
                                  <div className='border d-flex row' style={{ width: "fit-content" }}>
                                    <span className='py-1 col-4' onClick={()=>updateQuantity(x._id,'dec')}>-</span>
                                    <span className='py-1 col-4'>{tempObj[x._id]}</span>
                                    <span className='py-1 col-4' onClick={()=>updateQuantity(x._id,cart.length+1)}>+</span>
                                  </div>
                                </div>
                                <div class="col-md-2">
                                  <div>
                                    43834
                                  </div>
                                </div>
                              </div>
                              
                            </div>
                          </div>

                        </div>
                        <div className='d-flex justify-content-end mb-3 border-bottom pb-3'>
                        <u><span onClick={() => removeFromCart(x._id)} className='me-4'>Remove <i class="fa fa-trash fa-sm"></i></span></u>
                        <u><span className='me-4'>Move to wishlist <i class="fa fa-heart fa-sm"></i></span></u>
                      </div>
                      </>
                      )
                    })}
                    
                  </div>
                </div>
              </div>

            </div>
            <div className='col-lg-3 mb-3 p-img-sticky '>
              <div className='row'>
                <div>
                <h5>Summary</h5>

                <section>Do you have a Promo Code?</section>

                <div className='d-flex justify-content-between my-2'>
                  <span>Subtotal <i class="fa fa-question-circle fa-sm" aria-hidden="true"></i>
                  </span>
                  <span>463</span>
                </div>

                <div className='d-flex justify-content-between my-2'>
                  <span>Estimated Shipping & Handling <i class="fa fa-question-circle fa-sm" aria-hidden="true"></i></span>
                  <span>463</span>
                </div>

                <div className='d-flex justify-content-between my-2'>
                  <span>Estimated Tax <i class="fa fa-question-circle fa-sm" aria-hidden="true"></i></span>
                  <span>463</span>
                </div>

                <div className='d-flex justify-content-between py-2 my-4 text-dark' style={{borderBottom:"1px solid #dee2e6",borderTop:"1px solid #dee2e6"}}>
                  <span><b>Total</b></span>
                  <span><b>46653</b></span>
                </div>

                <form action="/create-checkout-session" method="POST">
                  <button className='btn btn-outline-warning w-100 my-2' type="submit">Checkout</button>
               </form>
</div>
              </div>
            </div>
          </div>
        </div>
      }
      <div>Recommended products</div>
    </>
  )
}

export default Cart