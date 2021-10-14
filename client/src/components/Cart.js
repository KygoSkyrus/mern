import React, { useEffect, useState } from "react";
import StripeCheckout from 'react-stripe-checkout'
import { Toast, ToastContainer } from 'react-bootstrap'
import mainlogo from './images/mainlogo.png'


const Example = (props) => {

  //console.log(props.showORnot);

  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);

  if (props.showORnot == false) {
    return (
      <>
        <ToastContainer className="p-3 tst" >
          <Toast bg="warning" show={showA} onClose={toggleShowA}>
            <Toast.Header>
              <img src='' className="rounded me-2" alt=""/>
              <strong className="me-auto">Shopp-itt</strong>
            </Toast.Header>
            <Toast.Body>You need to signin  to your account to checkout</Toast.Body>
          </Toast>
        </ToastContainer>
      </>
    );
  } else {
    return null
  }
}


const Cart = (props) => {

  const { data, onAdd, onRemove, clear } = props;
  const [jwtResponse, setjwtResponse] = useState();
  const [getemail, setgetemail] = useState();


  //pricing section
  const itemsPrice = data.reduce((a, c) => a + c.price * c.qty, 0);
  const taxPrice = itemsPrice * 0.16;
  const shippingPrice = itemsPrice > 500 ? 0 : 40;
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

;
//to get token
  useEffect(() => {
    const interval = setInterval(() => {
      var abc;
      fetch('/exist', {
        method: 'POST',
        body: abc
      }).then((response) => {
        //console.log(response);
        response.json().then((tkn) => setjwtResponse(tkn))
      }).catch((error) => console.log(error));
    }, 1000);
    return () => clearInterval(interval);
  });
  //console.log(jwtResponse);


  //getemail 
  if (jwtResponse == true) {
    fetch('/getemail', {
      method: 'POST',
      body: data
    }).then((response) => {
      //console.log(response);
      response.json().then((email) => setgetemail(email))
    }).catch((error) => console.log(error));
  }

  const Button = () => {
    if (jwtResponse == true) {
      return (
        <button className="btn btn-outline-dark w-100 mt-3" id="hide">Checkout Now</button>
      )
    } else {
      return null
    }
  }


  var width = window.innerWidth;//for trash-can icon


  if (data.length === 0) {
    return (
      <div className="container mt-5">
        <h4>Cart is empty</h4>
        <a href="/">Continue shopping</a>
      </div>)
  } else {
    return (
      <>
        <h2 className="mt-3 mb-4">Cart <i className="fas fa-shopping-cart"></i></h2>

        <div className="container d-flex mt-5 abc">

          <div className="def">
            {data.map((item) => (
              <div key={item.id} className="container cart-item mb-3 position-relative">
                <div className="pic-name">
                  <img src={item.src} className="" alt="..." />
                  <h5>{item.name}</h5>
                </div>

                <div className="price">{item.price} &#8377;</div>

                <div className="d-flex ">
                  <button onClick={() => onAdd(item)} className="plus-minus"><i className="fas fa-plus"></i></button>

                  <div className="p-2 qty">{item.qty}</div>

                  <button onClick={() => onRemove(item)} className="plus-minus"><i className="fas fa-minus "></i></button>
                </div>

                <div ><i className={(width <= 422) ? "fa fa-times-circle trash" : "fas fa-trash-can fa-lg trash"} onClick={() => clear(item)}></i></div>
              </div>
            ))}
          </div>


          <div className="container place-order d-flex flex-column justify-content-between p-3 mb-2">

            <div className="">
              <div className="d-flex justify-content-between">
                <section>Subtotal</section>
                <section>{itemsPrice} &#8377;</section>
              </div>
              <div className="d-flex justify-content-between">
                <section>Sales tax(16%)</section>
                <section>{taxPrice} &#8377;</section>
              </div>
              <div className="d-flex justify-content-between">
                <section>Shippinng charges</section>
                <section>{shippingPrice} &#8377;</section>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <section><b>Total</b></section>
                <section><b>{totalPrice} &#8377;</b></section>
              </div>
            </div>

            <div className="">
              <StripeCheckout
                name="Shopp-itt"
                image={mainlogo}
                amount={totalPrice * 100}
                currency="INR"
                stripeKey="pk_test_51JhvkpSJDEVNzqXlxWqQ8P6Oxf4njP4grJaOkjJt91UdUZM1FJeio3Bg0PaEAZ2yaRAWFNsbJTo0M5oObLs7pRET001SOpt6PJ"
                email={getemail}
                shippingAddress
                billingAddress={false}
                token={makepayment}
              >
                <Button />
              </StripeCheckout>
            </div>
          </div>

        </div><Example showORnot={jwtResponse} />
      </>
    )
  }
}

export default Cart;
