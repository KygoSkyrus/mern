/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import SignInToContinue from './SignInToContinue';
import BagLoader from './loaders/BagLoader';

import noOrder from "./../../assets/images/newImg/collections/noOrder.svg"
import { getDateStr } from './Utility';
import { formatInINRwoSign } from './Utility';
import { invokeToast } from './redux/toastSlice';

const OrderList = () => {

  const dispatch = useDispatch()
  const [orders, setOrders] = useState()
  const userDetail = useSelector(state => state.user.user)
  const userLoggedIn = useSelector(state => state.user.isUserLoggedIn)
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    let resp;
    fetch('/api/user/getorders')
      .then(response => {
        resp = response
        return response.json()
      })
      .then(res => {
        setShowLoader(false)
        if (resp.status === 200) {
          setOrders(res.user.orders)
        } else {
          dispatch(invokeToast({ isSuccess: false, message: res.message }))
        }
      })
  }, [])

  return (
    <>
      {userLoggedIn === null ?
        <BagLoader />
        :
        userDetail && userLoggedIn ?
          (
            showLoader ?
              <BagLoader />
              :
              (orders?.length > 0 ?
                <div className='container orderList-page my-5'>
                  <h6 className='text-center my-5 d-flex justify-content-center align-items-center'>My Orders&nbsp;
                    <i className='fa fa-box-open text-warning mt-1'></i>
                  </h6>
                  <div className="row justify-content-center">
                    <div className="col-lg-9 t-mb-30 mb-lg-0 theSection" >
                      <div className="row ">
                        <div className="col-12">
                          <div className="row ol-holder">
                            <div className='row mb-3 p-2 pb-0 border-bottom oli-heading'>
                              <div className="col-md-4">
                                <div className='row justify-content-center'>
                                  <div className='col-md-4 text-center'>
                                    <h6>
                                      Items
                                    </h6>
                                  </div>
                                  <div className='col-md-4 '></div>
                                </div>
                              </div>
                              <div className="col-md-8">
                                <div className='d-flex flex-column justify-content-between h-100'>
                                  <div className='row d-flex justify-content-between'>
                                    <div className="col-md-2 text-center">
                                      <h6>
                                        Total
                                      </h6>
                                    </div>
                                    <div className="col-md-2 text-center">
                                      <h6>
                                        Payment status
                                      </h6>
                                    </div>
                                    <div className="col-md-2 text-center">
                                      <h6>
                                        Receipt
                                      </h6>
                                    </div>
                                    <div className="col-md-2">
                                      <h6 className='text-end'>Ordered at</h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {orders?.map((x, i) => {
                              return (
                                <>
                                  <div key={x._id} className='row p-2 align-items-center oli' >
                                    <div className="col-md-4 oli-images">
                                      <div className='row justify-content-center'>
                                        <div className='col-md-4 '>
                                          <Link className='d-flex flex-wrap order-lis-imgs' to={`/orders/${x.orderId}`}>
                                            {x.products.map((y, i) => {
                                              if (x.products.length > 4 && i === 3) {
                                                return (<span className=''>+{x.products.length - 3}</span>)
                                              } else {
                                                if (i < 3)
                                                  return (
                                                    <div className={x.products.length === 1 && `ifOne`}>
                                                      <img src={y.image} alt='shoppitt' className='img-fluidt-minw-215' />
                                                    </div>
                                                  )
                                              }
                                            })}
                                          </Link>
                                        </div>
                                        <Link className="col-md-4" to={`/orders/${x.orderId}`}></Link>
                                      </div>
                                    </div>

                                    <div className="col-md-8 oli-details-container">
                                      <div className='d-flex flex-column justify-content-between h-100'>
                                        <div className='row d-flex justify-content-between oli-details'>
                                          
                                          <div className="col-md-2">
                                            <Link className='d-flex align-items-end flex-column' to={`/orders/${x.orderId}`} style={{ width: "fit-content", margin: "auto" }}>
                                              <section>
                                                <span style={{ fontSize: "12px" }}>&#8377;</span>
                                                <span className='fs-6 oli-price' >{formatInINRwoSign.format(x.total)}</span>
                                              </section>
                                            </Link>
                                          </div>

                                          <div className="col-md-2 text-center">
                                            {x.payment_status === "paid" ? <span className='text-success'>Paid</span>
                                              : <span className='text-danger'>Failed</span>}
                                          </div>

                                          <div className="col-md-2 text-center">
                                            {x?.hasOwnProperty('receiptUrl') ? <a href={x?.receiptUrl} >View</a> : "-"}
                                          </div>

                                          <div className="col-md-2 ">
                                            <section className='text-end'>{getDateStr(x.createdAt)}</section>
                                          </div>

                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='d-flex justify-content-end mb-3 border-bottom pb-3 oli-divider'></div>
                                </>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div className='d-flex flex-column align-items-center justify-content-center no-item-block'>
                  <div>
                    <img src={noOrder} alt='shoppitt' width={'100%'} className='no-item-img' />
                  </div>
                  <h5 className='text-dark'>Ooops!!! No order found</h5>
                  <span className='text-center'>
                    Looks like you have not ordered anything. Go ahead & explore our products
                  </span>
                  <button className='btn my-4 btn-outline-warning'>Continue shopping</button>
                </div>
              )
          )
          :
          <SignInToContinue />
      }
    </>
  )
}

export default OrderList