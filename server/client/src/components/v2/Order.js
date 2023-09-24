import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Order = () => {

    const { orderId } = useParams()
    console.log("orderId",orderId)

    useEffect(() => {
        fetch(`/api/getorderbyid/?orderId=${orderId}`)
            .then(response => response.json())
            .then(res => {
                console.log('response', res)
                //setProduct(res.product[0])
            })
    }, [])


  return (
    <>
    <div>THE Order</div>
    </>
  )
}

export default Order