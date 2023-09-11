/* eslint-disable no-eval */
import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from './redux/userSlice';
import { toastVisibility, setToastContent, setToastStatus } from './redux/todoSlice';
import emptyCartImg from "./../../assets/images/newImg/collections/emptycart.png"

const Cart = () => {

  const dispatch = useDispatch()
  //const [quantity,setQuantity]=useState();
  const cartItems = useSelector(state => state.user.user.cartProducts)
  const cart = useSelector(state => state.user.user.cart)
  console.log('cart', cart)

  const subtotal = React.useRef()
  const shippingCharge = React.useRef()
  const tax = React.useRef()
  const lineRefs = React.useRef([]);
  const totalAmtRefs = React.useRef([]);
  lineRefs.current = cartItems?.map((_, i) => React.createRef()); //creating multiple ref for every product
  totalAmtRefs.current = cartItems?.map((_, i) => React.createRef()); //creating multiple ref for every product

  let tempObj = {};
  //getting the relevant quantity of items
  cart.map(x => {
    tempObj[x.productId] = x.quantity
  })

  let priceObj = {}
  priceObj.productTotal = {}
  //to store total amount on inital load and later updated on every update
  let sub = 0;
  cartItems?.map(x => {
    priceObj.productTotal[x._id] = tempObj[x._id] * Math.floor(x.price - x.discount * x.price / 100)
    console.log('there', priceObj)
    sub += tempObj[x._id] * Math.floor(x.price - x.discount * x.price / 100)
    console.log('nan', sub)
  })

  priceObj.shipping = (sub < 1999) ? 99 : 0


  //debouce and debug--------------------------------------------
  // Simulated API function to update cart item quantities
  function updateCartItemQuantities(cartItems) {
    // console.log('ccc', cartItems)
    const uniqueCartItems = [];
    const seenProductIds = new Set();

    cartItems.forEach((items) => {
      const productId = items[0].productId;

      items[0].quantity = eval(`${tempObj[productId]} ${items[0].upOrDown} ${1}`)
      tempObj[productId] = eval(`${tempObj[productId]} ${items[0].upOrDown} ${1}`)
      //other way of doing the above code
      // if(items[0].upOrDown==="incre"){
      //   items[0].quantity=tempObj[productId]+1
      //   tempObj[productId]=tempObj[productId]+1
      // }else{
      //   items[0].quantity=tempObj.quantity-1
      //   tempObj[productId]=tempObj[productId]-1
      // }

      if (!seenProductIds.has(productId)) {
        uniqueCartItems.push(items);
        seenProductIds.add(productId);
      } else {
        uniqueCartItems.map(x => {
          if (x[0].productId === productId) {
            x[0].quantity = tempObj[x[0].productId];
          }
        })
      }
    });

    // Step 2: Create a new array with unique cart items
    const flattenedUniqueCartItems = uniqueCartItems.flat();
    console.log('flattened', flattenedUniqueCartItems)
    // return fetch('/api/updateCart', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(flattenedUniqueCartItems),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Updating cart item quantities on the server:', data);
    //     return data;
    //   })
    //   .catch(error => {
    //     console.error('Failed to update cart item quantities:', error);
    //     throw error; // Rethrow the error for error handling in the calling code
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



  function updateQuantity(productId, val, i, price, discount) {
    const newQuantity = eval(`${parseInt(lineRefs.current[i].current.dataset.quantity)} ${val} ${1}`);

    if (!newQuantity <= 0) {
      //updating quantity
      lineRefs.current[i].current.innerText = newQuantity;//for showing in ui
      lineRefs.current[i].current.dataset.quantity = newQuantity;//for keeping record for further updates

      //updating total price in checkout
      priceObj.productTotal[productId] = newQuantity * Math.floor(price - discount * price / 100)

      //updating subtotal
      let total = Object.keys(priceObj.productTotal).reduce((x, a) => {
        return priceObj.productTotal[x] + priceObj.productTotal[a]
      })
      subtotal.current.innerText = total;

      //setting shipping if subtotal is less than 1999
      shippingCharge.current.innerText = total < 1999 ? 99 : "-";
      priceObj.shipping = (total < 1999) ? 99 : 0


      //for showing total amount calculated based on quantity 
      totalAmtRefs.current[i].current.innerText = newQuantity * Math.floor(price - discount * price / 100)

      // Trigger the batched update in the background
      debouncedBatchedUpdate({ productId, quantity: newQuantity, upOrDown: val })
    }
  }

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
          console.log('updated user object', res.user)
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
                    {cartItems.map((x, i) => {
                      return (
                        <>
                          <div key={x._id} className='row  p-2 '>
                            <div class="col-md-2">
                              <div className='d-flex justify-content-center'>
                                <img src={x.image} alt='' className='img-fluidt-minw-215' style={{ maxHeight: "100px" }} />
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
                                  <div class="col-md-3">
                                    <div>
                                    </div>
                                    <div className='border d-flex row' style={{ width: "fit-content" }}>
                                      <span className='py-1 col-4 pointer' onClick={() => updateQuantity(x._id, "-", i, x.price, x.discount)} >-</span>
                                      <span className='py-1 col-4' ref={lineRefs.current[i]} data-quantity={tempObj[x._id]} >{tempObj[x._id]}</span>
                                      <span className='py-1 col-4 pointer' onClick={() => updateQuantity(x._id, "+", i, x.price, x.discount)}>+</span>
                                    </div>
                                  </div>
                                  <div class="col-md-2">
                                    <div>
                                      <span style={{ fontSize: "12px" }}>&#8377;</span>
                                      <span className='fs-5' ref={totalAmtRefs.current[i]}>{Math.floor(x.price - x.discount * x.price / 100) * tempObj[x._id]}</span>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>

                          </div>
                          <div className='d-flex justify-content-end mb-3 border-bottom pb-3'>
                            <u><span onClick={() => removeFromCart(x._id)} className='me-4 pointer'>Remove <i class="fa fa-trash fa-sm"></i></span></u>
                            <u><span className='me-4 pointer'>Move to wishlist <i class="fa fa-heart fa-sm"></i></span></u>
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
                    <span ref={subtotal}>
                      {/* {Object.keys(priceObj).reduce((x,a)=>{
                      return priceObj[x]+priceObj[a]
                    })} */}
                      {sub}
                    </span>
                  </div>

                  <div className='d-flex justify-content-between my-2'>
                    <span title='99 shipping & handling charge is applied under subtotal 1999'>Estimated Shipping & Handling <i class="fa fa-question-circle fa-sm" aria-hidden="true"></i>
                    </span>
                    <span ref={shippingCharge}>{sub > 1999 ? 99 : "-"}</span>
                  </div>

                  <div className='d-flex justify-content-between my-2'>
                    <span title='levies 10% service tax'>Estimated Tax <i class="fa fa-question-circle fa-sm" aria-hidden="true"></i></span>
                    <span ref={tax}>{Math.round(sub * 0.1)}</span>
                  </div>

                  <div className='d-flex justify-content-between py-2 my-4 text-dark' style={{ borderBottom: "1px solid #dee2e6", borderTop: "1px solid #dee2e6" }}>
                    <span><b>Total</b></span>
                    <span><b>{sub + (sub > 1999 ? 99 : 0) + Math.round(sub * 0.1) }</b></span>
                  </div>

                  <form action="/create-checkout-session" method="POST">
                    <button className='btn w-100 my-2' style={{ border: "1px solid rgb(0 0 0 / 16%)", background: "#ebebeb", borderTop: "0" }} type="submit">Checkout</button>
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