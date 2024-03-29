/* eslint-disable array-callback-return */
/* eslint-disable no-eval */
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import BagLoader from './loaders/BagLoader';
import RelatedProducts from './RelatedProducts';
import SignInToContinue from './SignInToContinue';

import { invokeToast } from './redux/toastSlice';
import { formatInINR, inProgressLoader, formatInINRwoSign, apiCall } from './Utility';
import theBagLogo from "./../../assets/images/thebaglogo.png";
import emptyCartImg from "./../../assets/images/newImg/collections/add-to-cart-animate.svg"


const Cart = () => {

  const dispatch = useDispatch()
  const userDetail = useSelector(state => state.user.user)
  const userLoggedIn = useSelector(state => state.user.isUserLoggedIn)
  const wishlistItems = useSelector(state => state.user.user.wishlist)
  const cartItems = useSelector(state => state.user.user.cartProducts)
  const cart = useSelector(state => state.user.user.cart)

  const subtotal = React.useRef()
  const shippingCharge = React.useRef()
  const tax = React.useRef()
  const grandTotal = React.useRef()

  const lineRefs = React.useRef([]);
  const totalAmtRefs = React.useRef([]);
  lineRefs.current = cartItems?.map((_, i) => React.createRef()); //creating multiple ref for every product
  totalAmtRefs.current = cartItems?.map((_, i) => React.createRef()); //creating multiple ref for every product

  //getting the relevant quantity of items
  let tempObj = {};
  cart.map(x => {
    tempObj[x.productId] = x.quantity
  })

  let priceObj = {}
  priceObj.productTotal = {}//has id:price*quantity
  priceObj.productList = {}//has product details; id:{name,price,quantity}

  //to store total amount on initial load and later updated on every update
  let sub = 0;
  cartItems?.map(x => {
    priceObj.productTotal[x._id] = tempObj[x._id] * Math.floor(x.price - x.discount * x.price / 100)//product total
    sub += tempObj[x._id] * Math.floor(x.price - x.discount * x.price / 100)

    //product details
    priceObj.productList[x._id] = {}
    priceObj.productList[x._id].name = x.name
    priceObj.productList[x._id].image = x.image[0]
    priceObj.productList[x._id].price = x.price
    priceObj.productList[x._id].quantity = tempObj[x._id]
    priceObj.productList[x._id].discount = x.discount
  })

  // priceObj.shipping = (sub < 1999) ? 99 : 0; //shipping
  priceObj.shipping = 99;
  priceObj.tax = Math.round(sub * 0.1);//tax
  priceObj.grandTotal = sub + (sub < 1999 ? 99 : 0) + Math.round(sub * 0.1)//grandtotal


  function updateCartItemQuantities(cartItems) {
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

    //Creating a new array with unique cart items
    const flattenedUniqueCartItems = uniqueCartItems.flat();
    apiCall(dispatch, '/api/user/updatecart', flattenedUniqueCartItems)
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
  const debouncedBatchedUpdate = batch(debounce(updateCartItemQuantities, 100), 500);//wait period is reduced as the multiple click wont be an issue due to inProgressLoader

  function updateQuantity(productId, val, i, price, discount) {
    inProgressLoader(dispatch, true)

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
      // shippingCharge.current.innerText = total < 1999 ? formatInINRwoSign.format(99) : "-";
      // priceObj.shipping = (total < 1999) ? 99 : 0
      shippingCharge.current.innerText = formatInINRwoSign.format(99);
      priceObj.shipping = 99;

      //setting the TAX (10%) on the subtotal
      tax.current.innerText = formatInINRwoSign.format(Math.round(total * 0.1))
      priceObj.tax = Math.round(total * 0.1);

      //setting GRANDTOTAL (adding subtotal/shipping/tax)
      // grandTotal.current.innerText = formatInINRwoSign.format(total + (total < 1999 ? 99 : 0) + Math.round(total * 0.1))
      // priceObj.grandTotal = total + (total < 1999 ? 99 : 0) + Math.round(total * 0.1)
      grandTotal.current.innerText = formatInINRwoSign.format(total + 99 + Math.round(total * 0.1))
      priceObj.grandTotal = total + 99 + Math.round(total * 0.1)

      //uncomment this if you use form to create checkout session
      // document.querySelector('[name=priceObj]').value = JSON.stringify(priceObj)//update the input with priceobj

      // Triggers the batched update in the background
      debouncedBatchedUpdate({ productId, quantity: newQuantity, upOrDown: val })
    }
  }

  const removeFromCart = (productId) => {
    inProgressLoader(dispatch, true)
    apiCall(dispatch, '/api/user/removefromcart', { productId })
  }

  const movetowishlist = (productId) => {
    inProgressLoader(dispatch, true)
    apiCall(dispatch, '/api/user/movetowishlist', { productId })
  }

  function createCheckoutSession(priceObj) {
    let resp;
    inProgressLoader(dispatch, true)
    fetch(`api/user/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceObj
      }),
    })
      .then(response => {
        resp = response;
        return response.json()
      })
      .then(res => {
        inProgressLoader(dispatch, false)
        if (resp.status === 200) {
          window.location.href = res.url;
        } else {
          dispatch(invokeToast({ isSuccess: false, message: res.message }))
        }
      })
  }

  return (
    <>
      {userLoggedIn === null ?
        <BagLoader />
        :
        userDetail && userLoggedIn ?
          (cartItems ?
            (cartItems?.length > 0 ?
              <div className='container cart-page my-5'>
                <h6 className='text-center my-5 d-flex justify-content-center align-items-center'>My Cart
                  <img alt='shoppitt' className='ms-2' src={theBagLogo} width="20px" />
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
                          {cartItems?.map((x, i) => {
                            return (
                              <>
                                <div key={x._id} className='row  p-2 ci'>
                                  <div className="col-md-2 ci-img">
                                    <div className='d-flex justify-content-center'>
                                      <img src={x.image} alt='shoppitt' className='img-fluidt-minw-215' style={{ maxHeight: "100px" }} />
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
                            {formatInINR.format(sub)}
                          </span>
                        </div>

                        <div className='d-flex justify-content-between my-2'>
                          <span title={`${formatInINR.format(99)} Shipping & Handling charge is applied`}>Estimated Shipping & Handling <i className="fa fa-question-circle fa-sm" aria-hidden="true"></i>
                          </span>
                          {/* <span ref={shippingCharge}>{sub < 1999 ? formatInINR.format(99) : "-"}</span> */}
                          <span ref={shippingCharge}>{formatInINR.format(99)}</span>
                        </div>

                        <div className='d-flex justify-content-between my-2'>
                          <span title='levies 10% service tax' data-bs-toggle="tooltip" data-bs-placement="right"  >Estimated Tax <i className="fa fa-question-circle fa-sm" aria-hidden="true"></i></span>
                          <span ref={tax}>{formatInINR.format(Math.round(sub * 0.1))}</span>
                        </div>

                        <div className='d-flex justify-content-between py-2 my-4 text-dark' style={{ borderBottom: "1px solid #dee2e6", borderTop: "1px solid #dee2e6" }}>
                          <span><b>Total</b></span>
                          <span ref={grandTotal} className='fw-bolder'>{formatInINR.format(sub + 99 + Math.round(sub * 0.1))}</span>
                        </div>

                        {/* <form action="/create-checkout-session" method="POST"> */}
                        {/* <input type="hidden" name='priceObj' value={JSON.stringify(priceObj)} /> */}
                        <button id='checkoutBtn' className='btn w-100 my-2 shadow-sm' style={{ border: "1px solid rgb(0 0 0 / 16%)", background: "#ebebeb", borderTop: "0", borderBottom: "3px solid #c5c5c5" }}
                          //  type="submit"
                          onClick={() => createCheckoutSession(JSON.stringify(priceObj))}
                        >Checkout</button>
                        {/* </form> */}
                        {/* <button className='btn w-100 my-2' style={{ border: "1px solid rgb(0 0 0 / 16%)", background: "#ebebeb", borderTop: "0" }} onClick={()=>handleCheckout()}>Checkout</button> */}
                        <div class="toast bg-warning show mt-4 m-auto shadow-sm" >
                          <div class="toast-header">
                            <img src={theBagLogo} class="rounded me-2" width="20px" alt="" />
                            <strong class="me-auto">Shopp-itt</strong>
                          </div>
                          <div class="toast-body text-center text-dark">
                            Use card number <b>4242 4242 4242 4242</b> for a successful payment
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              :
              <div className='d-flex flex-column align-items-center no-item-block'>
                <div>
                  <img src={emptyCartImg} alt='shoppitt' className='no-item-img cart-img' />
                </div>
                <h5 className='text-dark'>Your cart is empty</h5>
                <span className='text-center'>
                  Looks like you have not added anything to your cart. Go ahead & explore top categories
                </span>
                <button className='btn my-4 btn-outline-warning'>Continue shopping</button>
              </div>
            )
            :
            <BagLoader />
          )
          :
          <SignInToContinue />
      }

      <RelatedProducts title="You may also like" />
    </>
  )
}

export default Cart