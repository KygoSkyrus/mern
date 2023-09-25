import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'

const Order = () => {

  const { orderId } = useParams()
  const [order, setOrder] = useState()
    console.log("orderId",orderId)


  useEffect(() => {
    fetch(`/api/getorders`)
      .then(response => response.json())
      .then(res => {
        console.log('orders', res.user.orders)
        console.log('the order', res.user.orders.find(x=>x.orderId===orderId))
        setOrder(res.user.orders.find(x=>x.orderId===orderId))
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