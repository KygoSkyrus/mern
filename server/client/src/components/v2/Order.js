import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from './redux/userSlice';
import { toastVisibility, setToastContent, setToastStatus } from './redux/todoSlice';

const Order = () => {

  const { orderId } = useParams()
  const dispatch = useDispatch()
  const [order, setOrder] = useState()
    console.log("orderId",orderId)


  useEffect(() => {
    let resp;
    fetch(`/api/getorders`)
    .then(response => {
      resp = response
      return response.json()
    })
      .then(res => {
        if (resp.status === 200) {
          console.log('orders', res.user.orders)
        console.log('the order', res.user.orders.find(x=>x.orderId===orderId))
        setOrder(res.user.orders.find(x=>x.orderId===orderId))
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
    <div>THE Order</div>
    {
    <div>
      <section>{order?.createdAt}</section>
      <section>tax-{order?.tax}</section>
      <section>shipping-{order?.shipping}</section>
      <section>total-{order?.total}</section>
      <section>orderid-{order?.orderId}</section>
    </div>
    }
    </>
  )
}

export default Order