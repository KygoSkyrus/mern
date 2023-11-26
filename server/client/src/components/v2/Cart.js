/* eslint-disable array-callback-return */
/* eslint-disable no-eval */
import React from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from './redux/userSlice';
import { toastVisibility, setToastContent, setToastStatus } from './redux/todoSlice';

import RealtedProducts from './RealtedProducts';
import { formatInINR } from './Utility';
import { formatInINRwoSign } from './Utility';
import emptyCartImg from "./../../assets/images/newImg/collections/emptycart.png"
import LoginImg from "./../../assets/images/newImg/collections/login.png"
import theBagLogo from "./../../assets/images/thebaglogo.png";


const Cart = () => {

  const dispatch = useDispatch()
  const userDetail = useSelector(state => state.user.user)
  const userLoggedIn = useSelector(state => state.user.isUserLoggedIn)
  const wishlistItems = useSelector(state => state.user.user.wishlist)
  const cartItems = useSelector(state => state.user.user.cartProducts)
  const cart = useSelector(state => state.user.user.cart)
  console.log('cart', cart)

  const subtotal = React.useRef()
  const shippingCharge = React.useRef()
  const tax = React.useRef()
  const grandTotal = React.useRef()

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
  priceObj.productTotal = {}//has id:price*quantity
  priceObj.productList = {}//has product details; id:{name,price,quantity}
  //to store total amount on inital load and later updated on every update
  let sub = 0;
  cartItems?.map(x => {
    priceObj.productTotal[x._id] = tempObj[x._id] * Math.floor(x.price - x.discount * x.price / 100)//product total
    sub += tempObj[x._id] * Math.floor(x.price - x.discount * x.price / 100)
    //console.log('nan', sub)

    //product details
    priceObj.productList[x._id] = {}
    priceObj.productList[x._id].name = x.name
    priceObj.productList[x._id].image = x.image[0]
    priceObj.productList[x._id].price = x.price
    priceObj.productList[x._id].quantity = tempObj[x._id]
    priceObj.productList[x._id].discount = x.discount
  })

  priceObj.shipping = (sub < 1999) ? 99 : 0; //shipping
  priceObj.tax = Math.round(sub * 0.1);//tax
  priceObj.grandTotal = sub + (sub < 1999 ? 99 : 0) + Math.round(sub * 0.1)//grandtotal
  console.log('priceObj', priceObj)

  // const dataField=useRef();
  // if(dataField.current) dataField.current.value=priceObj


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
    return fetch('/api/updateCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(flattenedUniqueCartItems),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Updating cart item quantities on the server:', data);
        //show acknolegment andtoast here 
        return data;
      })
      .catch(error => {
        console.error('Failed to update cart item quantities:', error);
        throw error; // Rethrow the error for error handling in the calling code
      });
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

  //NOTE:::: have to take care of object when item is removed from cart or moved to wishlist
  //NOTE:::: currently the real price is being sent to checkmout page and not the discounted one(fox this)

  function updateQuantity(productId, val, i, price, discount) {
    const newQuantity = eval(`${parseInt(lineRefs.current[i].current.dataset.quantity)} ${val} ${1}`);

    if (!newQuantity <= 0) {
      //updating quantity
      lineRefs.current[i].current.innerText = formatInINRwoSign.format(newQuantity);//for showing in ui
      lineRefs.current[i].current.dataset.quantity = newQuantity;//for keeping record for further updates
      priceObj.productList[productId].quantity = newQuantity//updating quantiy in product details


      //updating total price of product in priceobj and ui (price*quantity)
      priceObj.productTotal[productId] = newQuantity * Math.floor(price - discount * price / 100)
      totalAmtRefs.current[i].current.innerText = formatInINRwoSign.format(newQuantity * Math.floor(price - discount * price / 100))

      let total = 0;
      Object.keys(priceObj.productTotal).forEach(x => {
        total += parseInt(priceObj.productTotal[x])
      })
      subtotal.current.innerText = formatInINRwoSign.format(total);

      //setting SHIPPING if subtotal is less than 1999
      shippingCharge.current.innerText = total < 1999 ? formatInINRwoSign.format(99) : "-";
      priceObj.shipping = (total < 1999) ? 99 : 0

      //setting the TAX (10%) on the subtotal
      tax.current.innerText = formatInINRwoSign.format(Math.round(total * 0.1))
      priceObj.tax = Math.round(total * 0.1);

      //setting GRANDTOTAL (adding subtotal/shipping/tax)
      grandTotal.current.innerText = formatInINRwoSign.format(total + (total < 1999 ? 99 : 0) + Math.round(total * 0.1))
      priceObj.grandTotal = total + (total < 1999 ? 99 : 0) + Math.round(total * 0.1)

      document.querySelector('[name=priceObj]').value = JSON.stringify(priceObj)//update the inout with priceobj

      console.log('priceObj in up', priceObj)
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
        resp = response;
        return response.json()
      })
      .then(res => {
        console.log('resp', resp)
        if (resp.status === 200) {
          console.log('2000')
          console.log('updated user object', res.user)
          dispatch(setToastStatus({ isSuccess: true }))
          dispatch(setUserDetails({ user: res.user }))
        } else {
          console.log('not 2000')
          dispatch(setToastStatus({ isSuccess: false }))
        }
        dispatch(toastVisibility({ toast: true }))
        dispatch(setToastContent({ message: res.message }))
        console.log('remove from cart response', res)
        //also update the user from here too or elese the result wont be seen immediately
      })
  }

  const movetowishlist = (productId) => {
    let resp;
    fetch(`/api/movetowishlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId
      }),
    })
      .then(response => {
        resp = response;
        return response.json()
      })
      .then(res => {
        console.log('resp', resp)
        if (resp.status === 200) {
          console.log('200')
          dispatch(setToastStatus({ isSuccess: true }))
          dispatch(setUserDetails({ user: res.user }))
        } else {
          console.log('not 200')
          dispatch(setToastStatus({ isSuccess: false }))
        }
        dispatch(toastVisibility({ toast: true }))
        dispatch(setToastContent({ message: res.message }))
        console.log('movetowishlist response', res)
        //also update the user from here too or elese the result wont be seen immediately
      })
  }



  return (
    <>
      {userDetail && userLoggedIn ?
        (!cartItems?.length > 0 ?
          <div className='d-flex flex-column align-items-center'>

            <div><img src={emptyCartImg} alt='' />
            </div>
            <h5 className='text-dark'>Your cart is empty</h5>
            <span className='text-center w-25'>
              Looks like you have not added anything to your cart. Go ahead & explore top categories
            </span>
            <button className='btn my-4 btn-outline-warning'>Continue shopping</button>

          </div> :

          <div className='container cart-page my-5'>
            <h6 className='text-center my-5 d-flex justify-content-center align-items-center'>My Cart
              <img alt='' className='ms-2' src={theBagLogo} width="20px" />
            </h6>
            <div className="row ">
              <div className="col-lg-9 t-mb-30 mb-lg-0 theSection" >
                <div className="row ">
                  <div className="col-12">
                    <div className="row ci-holder">
                      <div className='row mb-3 p-2 pb-0 border-bottom cart-heading'>
                        <div className="col-md-2"></div>
                        <div className="col-md-10">
                          <div className='d-flex flex-column justify-content-between h-100'>
                            <div className='row d-flex justify-content-between'>
                              <div className="col-md-4">
                                <h6>
                                  Item
                                </h6>
                              </div>
                              <div className="col-md-2">
                                <h6>
                                  Price
                                </h6>
                              </div>
                              <div className="col-md-3">
                                <h6>
                                  Quantity
                                </h6>

                              </div>
                              <div className="col-md-2">
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
                            <div key={x._id} className='row  p-2 ci'>
                              <div className="col-md-2 ci-img">
                                <div className='d-flex justify-content-center'>
                                  <img src={x.image} alt='' className='img-fluidt-minw-215' style={{ maxHeight: "100px" }} />
                                </div>
                              </div>

                              <div className="col-md-10 ci-detail">
                                <div className='d-flex flex-column justify-content-between h-100'>
                                  <div className='row d-flex justify-content-between'>

                                    <div className="col-md-4 ci-name">
                                      <Link to={`/product/${x._id}`} style={{ color: "inherit" }}>
                                        <h6>
                                          {x.name}
                                        </h6>
                                        {x.stock > 0 ?
                                          <span className='text-success'>In stock</span>
                                          : <span className='text-danger'>Out of stock</span>}
                                      </Link>
                                    </div>
                                    <div className="col-md-2 ci-price">
                                      <div className='d-flex align-items-end flex-column' style={{ width: "fit-content" }}>
                                        <section>
                                          <span style={{ fontSize: "12px" }}>&#8377;</span>
                                          <span className='fs-6'>{formatInINRwoSign.format(Math.floor(x.price - x.discount * x.price / 100))}</span>
                                        </section>
                                        {x.discount !== 0 &&
                                          <section style={{ fontWeight: "400", color: "#ff4460", lineHeight: "2px" }}>
                                            <span style={{ fontSize: "10px" }}>&#8377;</span>
                                            <span className='fs-7 extra-small' style={{ textDecoration: "line-through" }}>{x.price}</span>
                                          </section>
                                        }

                                      </div>
                                    </div>
                                    <div className="col-md-3 ci-quantity">

                                      <div className='border d-flex row rounded-pill' style={{ width: "fit-content" }}>
                                        <span className='py-1 col-4 pointer' onClick={() => updateQuantity(x._id, "-", i, x.price, x.discount)} >-</span>
                                        <span className='py-1 col-4' ref={lineRefs.current[i]} data-quantity={tempObj[x._id]} >{tempObj[x._id]}</span>
                                        <span className='py-1 col-4 pointer' onClick={() => updateQuantity(x._id, "+", i, x.price, x.discount)}>+</span>
                                      </div>
                                    </div>
                                    <div className="col-md-2 ci-total">
                                      <div>
                                        <span style={{ fontSize: "12px" }}>&#8377;</span>
                                        <span className='fs-6' ref={totalAmtRefs.current[i]}>{formatInINRwoSign.format(Math.floor(x.price - x.discount * x.price / 100) * tempObj[x._id])}</span>
                                      </div>
                                    </div>
                                  </div>

                                </div>
                              </div>

                              <div className='d-flex justify-content-end mb-3 border-bottom pb-3 ci-remove'>
                                <u><span onClick={() => removeFromCart(x._id)} className='me-4 pointer'>Remove <i className="fa fa-trash fa-sm"></i></span></u>
                                {!wishlistItems?.includes(x._id) && <u><span className='me-4 pointer' onClick={() => movetowishlist(x._id)}>Move to wishlist <i className="fa fa-heart fa-sm"></i></span></u>}
                              </div>
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
                      <span>Subtotal <i className="fa fa-question-circle fa-sm" aria-hidden="true"></i>
                      </span>
                      <span ref={subtotal}>
                        {/* {Object.keys(priceObj).reduce((x,a)=>{
                      return priceObj[x]+priceObj[a]
                    })} */}
                        {formatInINR.format(sub)}
                      </span>
                    </div>

                    <div className='d-flex justify-content-between my-2'>
                      <span title='99 shipping & handling charge is applied under subtotal 1999'>Estimated Shipping & Handling <i className="fa fa-question-circle fa-sm" aria-hidden="true"></i>
                      </span>
                      <span ref={shippingCharge}>{sub < 1999 ? formatInINR.format(99) : "-"}</span>
                    </div>

                    <div className='d-flex justify-content-between my-2'>
                      <span title='levies 10% service tax' data-bs-toggle="tooltip" data-bs-placement="right"  >Estimated Tax <i className="fa fa-question-circle fa-sm" aria-hidden="true"></i></span>
                      <span ref={tax}>{formatInINR.format(Math.round(sub * 0.1))}</span>
                    </div>

                    <div className='d-flex justify-content-between py-2 my-4 text-dark' style={{ borderBottom: "1px solid #dee2e6", borderTop: "1px solid #dee2e6" }}>
                      <span><b>Total</b></span>
                      <span ref={grandTotal} className='fw-bolder'>{formatInINR.format(sub + (sub < 1999 ? 99 : 0) + Math.round(sub * 0.1))}</span>
                    </div>

                    <form action="/create-checkout-session" method="POST">
                      <input type="hidden" name='priceObj' value={JSON.stringify(priceObj)} />
                      <button className='btn w-100 my-2' style={{ border: "1px solid rgb(0 0 0 / 16%)", background: "#ebebeb", borderTop: "0" }} type="submit">Checkout</button>
                    </form>
                    {/* <button className='btn w-100 my-2' style={{ border: "1px solid rgb(0 0 0 / 16%)", background: "#ebebeb", borderTop: "0" }} onClick={()=>handleCheckout()}>Checkout</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        : <div className='container my-5'>
          <div className='d-flex flex-column align-items-center m-auto' style={{ width: "fit-content" }}>

            <div><img src={LoginImg} alt='' />
            </div>
            <h5 className='text-dark'>You are not logged in</h5>
            <span className='text-center'>
              Sign in to your account to continue
            </span>
            <button className='btn my-4 btn-outline-warning w-100' data-bs-toggle="modal" href="#exampleModalToggle">Sign in</button>

          </div>
        </div>

      }

      <RealtedProducts />

    </>
  )
}

export default Cart