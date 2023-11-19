import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'


import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from './redux/userSlice';
import { toastVisibility, setToastContent, setToastStatus } from './redux/todoSlice';

import { formatInINR, getFullDateStr } from './Utility';
import LoginImg from "./../../assets/images/newImg/collections/login.png"
import noOrder from "./../../assets/images/newImg/collections/noOrder.svg"



const Order = () => {

  const { orderId } = useParams()
  const dispatch = useDispatch()
  const userDetail = useSelector(state => state.user.user)
  const userLoggedIn = useSelector(state => state.user.isUserLoggedIn)
  const [order, setOrder] = useState()
  const [showLoader, setShowLoader] = useState(true)
  console.log("orderId", orderId)


  useEffect(() => {
    let resp;
    fetch(`/api/getorders?orderId=${orderId}`)
      .then(response => {
        resp = response
        return response.json()
      })
      .then(res => {
        setShowLoader(false)
        if (resp.status === 200) {
          console.log('the order', res.order)
          if (res.order) {
            setOrder(res.order)
          } else {
            let status;
            //this api looks for checkoutsession and save the order is not saved in db and returns the order
            fetch(`/api/getcheckoutsession?orderId=${orderId}`)
              .then(response => {
                status = response.status
                return response.json()
              })
              .then(res => {
                if (status === 200) {
                  console.log('checkout sessio', res)
                  setOrder(res.order)
                } else {
                  dispatch(setToastStatus({ isSuccess: false }))
                  dispatch(toastVisibility({ toast: true }))
                  dispatch(setToastContent({ message: res.message }))
                }
              })

          }
          //dispatch(setUserDetails({ user: res.user }))
        } else {
          setOrder(undefined)
          // setShowLoader(false)
          console.log('not 2000')
          //create an utility function whcih will updated these three state abd pass theese values (this is repeated on almost every api)
          dispatch(setToastStatus({ isSuccess: false }))
          dispatch(toastVisibility({ toast: true }))
          dispatch(setToastContent({ message: res.message }))
        }

      })
  }, [])




  return (
    <>
      {userDetail && userLoggedIn ?

        (showLoader ?
          <div className='d-flex justify-content-center align-items-center' style={{ height: "70vh" }}>
            <div className="custom-loader"></div>
          </div> :

          (order ?
            <div className='container order-page my-5'>
              <div className='d-flex justify-content-between p-2 px-3 mb-4 text-bg-warning rounded-1 oi-heading'>
                <h6 className='d-inline text-black mb-0'>Order #{order.orderId}</h6>
                <span>
                  <i className='fa fa-calendar fa-regular'></i>&nbsp;&nbsp;{getFullDateStr(order.createdAt)}
                </span>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-9 t-mb-30 mb-lg-0 theSection " >
                  <div className="row ">
                    <div className="col-12">
                      <div className="row ms-0 border border-1  rounded-1">
                        <div className='row mb-3 mx-0 p-2 pb-0 border-bottom' style={{ background: "#ebebeb" }}>
                          <div className="col-md-6">
                            <div className='row justify-content-center'>
                              <div className='col-md-2 '></div>
                              <div className='col-md-8 text-center'>
                                <h6>
                                  Items
                                </h6>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 oi-other-heading">
                            <div className='row d-flex justify-content-between'>
                              <div className="col-md-2 ">
                                <h6>
                                  Price
                                </h6>
                              </div>
                              <div className="col-md-2 text-center">
                                <h6>
                                  Quantity
                                </h6>
                              </div>
                              <div className="col-md-2 ">
                                <h6>
                                  Total
                                </h6>
                              </div>
                            </div>
                          </div>

                        </div>
                        {order?.products?.map((x, i) => {
                          return (
                            <>
                              <div key={x._id} className='row  align-items-center oi' >
                                <div className="col-md-6">
                                  <div className='row justify-content-center align-items-center oi-top'>
                                    <div className='col-md-2 oi-img'>
                                      <Link className='d-flex flex-wrap order-lis-imgs' to={`/product/${x.productId}`}>
                                        <div >
                                          <img src={x.image} alt='' className='img-fluidt-minw-215' />
                                        </div>
                                      </Link>
                                    </div>
                                    <Link className="col-md-6 oi-name" to={`/product/${x.productId}`} >
                                      {x.name}
                                    </Link>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className='d-flex flex-column justify-content-between h-100'>
                                    <div className='row d-flex justify-content-between oi-details'>
                                      <div className="col-md-2">
                                        <div className='d-flex align-items-end flex-column' style={{ width: "fit-content", margin: "auto" }}>
                                          <span className=''>{formatInINR.format(x.price)}</span>
                                        </div>
                                      </div>
                                      <div className="col-md-2 text-center">
                                        <span className=''>{x.quantity}</span>
                                      </div>

                                      <div className="col-md-2 text-center oi-total">
                                        <div className='d-flex align-items-end flex-column' style={{ width: "fit-content", margin: "auto" }}>
                                          <span className=''>{formatInINR.format((x.quantity * Math.floor(x.price - x.discount * x.price / 100)))}</span>
                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                </div>

                              </div>
                              <div className='d-flex justify-content-end mb-3 border-bottom pb-3'>
                              </div>
                            </>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 t-mb-30 mb-lg-0 p-img-sticky">
                  <div className='border border-1  rounded-1'>

                    <h6 className='p-2 text-end' style={{ background: "rgb(235, 235, 235)" }}>Order summary</h6>

                    <div className='d-flex justify-content-between my-2 px-3'>
                      <span>Subtotal</span>
                      <span >{formatInINR.format(order.total - (order.shipping + order.tax))} </span>
                    </div>
                    <div className='d-flex justify-content-between my-2 px-3'>
                      <span>Tax</span>
                      <span >{formatInINR.format(order.tax)} </span>
                    </div>
                    <div className='my-2 px-3'>
                      <section className='d-flex justify-content-between border-bottom'>
                        <span>Shipping</span>
                        <span >{formatInINR.format(order.shipping)} </span></section>
                    </div>
                    <div className='d-flex justify-content-between my-2 px-3'>
                      <span>Total</span>
                      <span >{formatInINR.format(order.total)} </span>
                    </div>

                  </div>
                  <div className='d-flex justify-content-between my-2 px-3'>
                    <span>Payment status</span>
                    {order.payment_status === "paid" ?
                      <span className='text-success'><b>Paid</b></span>
                      : <span className='text-danger'><b>Failed</b></span>}
                  </div>
                  <div className='d-flex justify-content-end my-2 px-3'>
                    <Link to={`${order.receiptUrl}`} className='text-decoration-underline'>View Receipt</Link>
                  </div>
                </div>
              </div>
            </div>
            :
            <div className='d-flex flex-column align-items-center'>
              <div>
                <img src={noOrder} alt='' />
              </div>
              <h5 className='text-dark'>Ooops!!! Incorrect Order ID</h5>
              <span className='text-center w-25'>
                Order doesn't exist. Please check Order ID and try again.
              </span>
              <button className='btn my-4 btn-outline-warning'><Link to='/orders'>Go back to Orders</Link></button>
            </div>
          )
        )
        :
        <div className='container my-5'>
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

    </>
  )
}

export default Order