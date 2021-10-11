import React from "react";
import StripeCheckout from 'react-stripe-checkout'
import mainlogo from './images/mainlogo.png'

const Cart = (props) => {

  const { data, onAdd, onRemove, clear } = props;

  //pricing section
  const itemsPrice = data.reduce((a, c) => a + c.price * c.qty, 0);
  const taxPrice = itemsPrice * 0.16;
  const shippingPrice = itemsPrice > 40 ? 0 : 5;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;


  const makepayment = token => {
    fetch('/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token, totalPrice
      })
    }
    ).then(response => {
      console.log(response)
      const { status } = response;
      console.log(status)
    }).catch(error => console.log(error))
  }


  if (data.length === 0) {
    return (
      <div className="container mt-5">
        <h4>Cart is empty</h4>
        <a href="/">Continue shopping</a>
      </div>)
  } else {
    return (
      <>
        <StripeCheckout
          name="Shopp-itt"
          image={mainlogo}
          amount={totalPrice * 100}
          currency="inr"
          stripeKey="pk_test_51JhvkpSJDEVNzqXlxWqQ8P6Oxf4njP4grJaOkjJt91UdUZM1FJeio3Bg0PaEAZ2yaRAWFNsbJTo0M5oObLs7pRET001SOpt6PJ"
          email="customersemail@ggdd.com"
          shippingAddress
          billingAddress={false}
          token={makepayment}
        >
         <h2 className="mt-3 mb-4">Cart <i className="fas fa-shopping-cart"></i></h2>

        <div className="container d-flex mt-5 abc">

          <div className="def">
            {data.map((item) => (
              <div key={item.id} className="container cart-item mb-3">
                <div className="pic-name">
                  <img src={item.src} className="" alt="..." />
                  <h5>{item.name}</h5>
                </div>

                <div className="price">{item.price.toFixed(2)} $</div>

                <div className="d-flex ">
                  <button onClick={() => onAdd(item)} className="plus-minus"><i className="fas fa-plus"></i></button>

                  <div className="p-2 qty">{item.qty}</div>

                  <button onClick={() => onRemove(item)} className="plus-minus"><i className="fas fa-minus "></i></button>
                </div>

                <div><i className="fas fa-trash-can fa-lg trash" onClick={() => clear(item)}></i></div>
              </div>
            ))}
          </div>


          <div className="container place-order d-flex flex-column justify-content-between p-3 ">

            <div className="">
              <div className="d-flex justify-content-between">
                <section>Subtotal</section>
                <section>{itemsPrice.toFixed(2)} $</section>
              </div>
              <div className="d-flex justify-content-between">
                <section>Sales tax(16%)</section>
                <section>{taxPrice.toFixed(2)} $</section>
              </div>
              <div className="d-flex justify-content-between">
                <section>Shippinng charges</section>
                <section>{shippingPrice.toFixed(2)} $</section>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <section><b>Subtotal</b></section>
                <section><b>{totalPrice.toFixed(2)} $</b></section>
              </div>
            </div>

            <div className="">
                <button  className="btn btn-outline-dark w-100 mt-3" >Checkout Now</button>
            </div>
          </div>

        </div>
        </StripeCheckout>
      </>
    )
  }
}

export default Cart

