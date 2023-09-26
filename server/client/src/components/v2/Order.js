import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'


import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from './redux/userSlice';
import { toastVisibility, setToastContent, setToastStatus } from './redux/todoSlice';

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
    fetch(`/api/getorders`)
      .then(response => {
        resp = response
        return response.json()
      })
      .then(res => {
        setShowLoader(false)
        if (resp.status === 200) {
          console.log('orders', res.user.orders)
          console.log('the order', res.user.orders.find(x => x.orderId === orderId))
          setOrder(res.user.orders.find(x => x.orderId === orderId))
          //dispatch(setUserDetails({ user: res.user }))
        } else {
          setOrder(undefined)
          // setShowLoader(false)
          console.log('not 2000')
          dispatch(setToastStatus({ isSuccess: false }))
          dispatch(toastVisibility({ toast: true }))
          dispatch(setToastContent({ message: res.message }))
        }

      })
  }, [])


  function getDateStr(date) {
    let d = new Date(date)
    return d.getDate() + "-" + (d.getMonth() + 1) + "-" + (d.getFullYear())
  }

  return (
    <>


      {userDetail && userLoggedIn ?

        (showLoader ?
          <div className='d-flex justify-content-center align-items-center' style={{ height: "70vh" }}>
            <div class="custom-loader"></div>
          </div> :


          (order ?
            <div className='container my-5'>
              <div>Your Orders</div>
              <div class="row justify-content-center">
                <div class="col-lg-9 t-mb-30 mb-lg-0 theSection" >
                  <div class="row ">
                    <div class="col-12">
                      <div class="row ">
                        <div className='row mb-3 p-2 pb-0 border-bottom'>
                          <div class="col-md-4">
                            <div className='row justify-content-center'>
                              <div className='col-md-4 text-center'>
                                <h6>
                                  Items
                                </h6>
                              </div>
                              <div className='col-md-4 '></div>
                            </div>
                          </div>
                          <div class="col-md-8">
                            <div className='d-flex flex-column justify-content-between h-100'>
                              <div className='row d-flex justify-content-between'>
                                <div class="col-md-2 text-center">
                                  <h6>
                                    Total
                                  </h6>
                                </div>
                                <div class="col-md-2 text-center">
                                  <h6>
                                    Payment status
                                  </h6>
                                </div>
                                <div class="col-md-2 text-center">
                                  <h6>
                                    Receipt
                                  </h6>
                                </div>
                                <div class="col-md-2">
                                  <h6 className='text-end'>Ordered at</h6>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                        {/* {order?.map((x, i) => {
                        return (
                          <>
                            <div key={x._id} className='row p-2 align-items-center' >
                              <div class="col-md-4">
                                <div className='row justify-content-center'>
                                  <div className='col-md-4 '>
                                    <Link className='d-flex flex-wrap order-lis-imgs' to={`/orders/${x.orderId}`}>
                                      {x.products.map((y, i) => {
                                        if (x.products.length > 4 && i === 3) {
                                          return (<span className=''>+{x.products.length - 3}</span>)
                                        } else {
                                          if (i < 3)
                                            return (<div className={x.products.length === 1 && `ifOne`}>
                                              <img src={y.image} alt='' className='img-fluidt-minw-215' />
                                            </div>)
                                        }
                                      })}
                                    </Link>
                                  </div>
                                  <Link class="col-md-4" to={`/orders/${x.orderId}`}></Link>
                                </div>
                              </div>

                              <div class="col-md-8">
                                <div className='d-flex flex-column justify-content-between h-100'>
                                  <div className='row d-flex justify-content-between'>
                                    <div class="col-md-2">
                                      <Link className='d-flex align-items-end flex-column'  to={`/orders/${x.orderId}`} style={{ width: "fit-content", margin: "auto" }}>
                                        <section>
                                          <span style={{ fontSize: "12px" }}>&#8377;</span>
                                          <span className='fs-6'>{x.total}</span>
                                        </section>
                                      </Link>
                                    </div>
                                    <div class="col-md-2 text-center">
                                      {x.payment_status === "paid" ? <span className='text-success'>Paid</span>
                                        : <span className='text-danger'>Failed</span>}
                                    </div>

                                    <div class="col-md-2 text-center">
                                      {x?.hasOwnProperty('receiptUrl') ? <a href={x?.receiptUrl} >View</a> : "-"}
                                    </div>

                                    <div class="col-md-2 ">
                                      <section className='text-end'>{getDateStr(x.createdAt)}</section>
                                    </div>

                                  </div>

                                </div>
                              </div>

                            </div>
                            <div className='d-flex justify-content-end mb-3 border-bottom pb-3'>
                            </div>
                          </>
                        )
                      })} */}

                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
            : <div className='d-flex flex-column align-items-center'>

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