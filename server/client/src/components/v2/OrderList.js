import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from './redux/userSlice';
import { toastVisibility, setToastContent, setToastStatus } from './redux/todoSlice';

import noOrder from "./../../assets/images/newImg/collections/noOrder.svg"


const OrderList = () => {

  const [orders, setOrders] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    let resp;
    fetch(`/api/getorders`)
    .then(response => {
      resp = response
      return response.json()
    })
      .then(res => {
        if (resp.status === 200) {
          console.log('2000')
             console.log('order list reponse', res)
             setOrders(res.user.orders)
             //dispatch(setUserDetails({ user: res.user }))
        } else {
          console.log('not 2000')
          dispatch(setToastStatus({ isSuccess: false }))
          dispatch(toastVisibility({ toast: true }))
          dispatch(setToastContent({ message: res.message }))
        }
      })
  }, [])

  return (
    <>
      <div>Your Orders</div>

      {orders?.length < 0 ?
        <div className='d-flex flex-column align-items-center'>

          <div>
            <img src={noOrder} alt='' />
          </div>
          <h5 className='text-dark'>Ooops!!! No order found</h5>
          <span className='text-center w-25'>
            Looks like you have not ordered anything. Go ahead & explore our products
          </span>
          <button className='btn my-4 btn-outline-warning'>Continue shopping</button>

        </div> :


        (orders ? <div className='container my-5'>
          <div class="row justify-content-center">
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
                                Items
                              </h6>
                            </div>
                            <div class="col-md-2">
                              <h6>
                                Total
                              </h6>
                            </div>
                            <div class="col-md-2">
                              <h6>
                                Payment status
                              </h6>

                            </div>
                            <div class="col-md-2">
                              <h6>Ordered at</h6>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    {orders?.map((x, i) => {
                      return (
                        <>
                          <div key={x._id} className='row  p-2 '>
                            <div class="col-md-2">
                              <div className='d-flex flex-wrap order-lis-imgs'>
                                {x.products.map((y,i)=>{
                                  if(x.products.length>4 && i===3 ){
                                    return( <span className=''>+{x.products.length-3}</span> )
                                  }else{
                                    if(i<3 )
                                    return (<div className={x.products.length===1 && `ifOne`}>                       
                                      <img src={y.image} alt='' className='img-fluidt-minw-215' />
                                    </div>)
                                  }
                                })}
                                {/* <img src={x.products[0]?.image} alt='' className='img-fluidt-minw-215' style={{ maxHeight: "40px" }} />
                                <img src={x.products[0]?.image} alt='' className='img-fluidt-minw-215' style={{ maxHeight: "40px" }} />
                                <img src={x.products[0]?.image} alt='' className='img-fluidt-minw-215' style={{ maxHeight: "40px" }} /> */}
                              </div>
                            </div>

                            <div class="col-md-10">
                              <div className='d-flex flex-column justify-content-between h-100'>
                                <div className='row d-flex justify-content-between'>

                                  <div class="col-md-4">
                                    <Link to={`/product/${x._id}`} style={{ color: "inherit" }}>
                                      <h6>
                                        {x.name}
                                        {/* {x.rating} */}
                                      </h6>
                                    </Link>
                                  </div>
                                  <div class="col-md-2">
                                    <div className='d-flex align-items-end flex-column' style={{ width: "fit-content" }}>
                                      <section>
                                        <span style={{ fontSize: "12px" }}>&#8377;</span>
                                        <span className='fs-6'>{x.total}</span>
                                      </section>
                                    </div>
                                  </div>
                                  <div class="col-md-2">
                                    {x.stock > 0 ? <span className='text-success'>In stock</span>
                                      : <span className='text-danger'>Out of stock</span>}
                                  </div>

                                  <div class="col-md-2 ">
                                    <span>{
                                      //cal a funcrion from here wihich returns this string
                                       new Date(x.createdAt).getDate() + "-" + (new Date(x.createdAt).getMonth()+1) + "-" + (new Date(x.createdAt).getFullYear())
                                      
                                      }</span>

                                    {/* <div className='d-flex justify-content-end mt-2 ' style={{ marginRight: "-41px" }}>
                                      <u><span
                                        className='me-4 pointer'>Remove <i class="fa fa-trash fa-sm "></i></span></u>
                                    </div> */}
                                  </div>

                                </div>

                              </div>
                            </div>

                          </div>
                          <div className='d-flex justify-content-end mb-3 border-bottom pb-3'>
                            {/* <u><span
                              // onClick={() => removeFromCart(x._id)} 
                              className='me-4 pointer'>Remove <i class="fa fa-trash fa-sm"></i></span></u> */}
                          </div>
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
          <div className='d-flex justify-content-center align-items-center' style={{ height: "70vh" }}>
            <div class="custom-loader"></div>
          </div>)
      }
    </>
  )
}

export default OrderList