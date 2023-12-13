import React from 'react'
import { Link } from 'react-router-dom'

import { getFullDateStr, formatInINR } from '../Utility'

const OrderDetails = (props) => {

  const order = props.details
  const closeProductContainer = (e, triggerClose) => {
    if (triggerClose) {
      props.setSDetailsVisibility(false)
      return
    }
    if (e.target !== document.querySelector('.orderDetails')) {
      props.setSDetailsVisibility(false)
    }
  }
  console.log('orderrr', order)


  return (
    <div className='activeProductContainer admin_orderDetail' style={{ placeItems: "center" }} onClick={e => closeProductContainer(e)}>
      <div className='bg-white h-100 rounded-1 orderDetails p-3'>

        <div className="text-end closeBtn d-none">
          <span
            onClick={(e) => closeProductContainer(e, true)}
            className="btn btn-light cursor-pointer" >
            <i
              className="fas fa-times">
            </i>
          </span>
        </div>

        <div className='container mt-3 mb-5'>
          <div className='d-flex justify-content-between p-2 px-3 mb-4 border-bottom rounded-1 orderHead'>
            <div className='d-flex align-items-center'>
              <h6 className='d-inline text-black mb-0'>Order #{order.orderId}</h6>
              <section className="bg-body border p-1 px-3 rounded ms-3">
                {order.status}
              </section></div>
            <span className='align-self-center'>
              <i className='fa fa-calendar fa-regular'></i>&nbsp;&nbsp;{getFullDateStr(order.createdAt)}
            </span>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-9 t-mb-30 mb-lg-0 theSection "  >
              <div className="row ">
                <div className="col-12">
                  <div className="row ms-0 border border-1  rounded-1">
                    <div className='row mb-3 mx-0 p-2 pb-0 border-bottom bg-body'>
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
                                      <img src={x.image} alt='shoppitt' className='img-fluidt-minw-215' />
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

            <div className="col-lg-3 t-mb-30 mb-lg-0">
              <div className='row'>
                <div className="col-lg-12 mb-3">
                  <div className='border border-1  rounded-1'>

                    <h6 className='p-2 text-end bg-body border-bottom'>Customer</h6>

                    <div className='my-2 px-3 '>
                      <section className='d-flex justify-content-between border-bottom align-items-center pb-2'>
                        <div className="align-items-center avatars__item bg-white d-flex justify-content-center pointer text-secondary"
                          style={{ background: `url(${order?.user.avtar})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", borderColor: "#fff" }}></div>
                        <span className='text-capitalize'>{order?.user.firstname} {order?.user.lastname}</span>
                      </section>
                    </div>

                    <div className='my-2 px-3'>
                      <section className='text-end'><b>Contact Info</b></section>
                      <section className='d-flex justify-content-between border-bottom pb-2'>
                        <span style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }} title={order?.user.email}>
                          <i className='fa-regular fa-envelope me-2'></i>
                          {order?.user.email}
                        </span>
                        <span >{order?.user.phone}</span>
                      </section>
                    </div>
                    <div className='my-2 px-3'>
                      <section className='text-end'><b>Address</b></section>
                      <section className='text-end d-grid pb-1'>
                        <span style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }} className=" align-items-center d-flex justify-content-between" title={order?.user.line1}>
                          <i className='fa fa-location-pin me-2'></i>
                          {order?.user?.address?.house}
                        </span>
                        <span style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }} title={order?.user.line1}>{order?.user?.address?.street}</span>
                        <span>{order?.user?.address?.city}, {order?.user?.address?.pincode}</span>
                        <span>{order?.user?.address?.state},</span>
                        <span>India</span>
                      </section>
                    </div>

                  </div>
                </div>
                <div className="col-lg-12">
                  <div className='border border-1  rounded-1'>

                    <h6 className='p-2 text-end bg-body border-bottom'>Order summary</h6>

                    <div className='d-flex justify-content-between my-2 px-3'>
                      <span>Subtotal</span>
                      <span >{formatInINR.format(order.totalAmount - (order.shipping + order.tax))} </span>
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
                      <span >{formatInINR.format(order.totalAmount)} </span>
                    </div>

                  </div>
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

      </div>
    </div>
  )
}

export default OrderDetails