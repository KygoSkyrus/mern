import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

/*
function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({items: [{ id: "xl-tshirt" ,price:43434}]})
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
     
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again.
      </p>
    </form>
  );
}



export default function Cart() {
   
const promise = loadStripe("pk_test_51JhvkpSJDEVNzqXlxWqQ8P6Oxf4njP4grJaOkjJt91UdUZM1FJeio3Bg0PaEAZ2yaRAWFNsbJTo0M5oObLs7pRET001SOpt6PJ"); 
  

  return (
    <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
  );
}
*/

const Cart = (props) => {

    const { data, onAdd, onRemove, clear } = props;

    //pricing section
    const itemsPrice = data.reduce((a, c) => a + c.price * c.qty, 0);
    const taxPrice = itemsPrice * 0.16;
    const shippingPrice = itemsPrice > 40 ? 0 : 5;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;



    const [message, setMessage] = useState("");

    const Message = ({ message }) => (
        <section>
            <h1 className="p5 mt-5">{message}</h1>
        </section>
    );

    
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);


    if (data.length === 0) {
        return (
            <div className="container mt-5">
                <h4>Cart is empty</h4>
                <a href="/">Continue shopping</a>
            </div>)
    } else {
        return (
            message ? (
                <Message message={message} />
            ) : (
                <>
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
                                <form action="/create-checkout-session" method="POST">
                                    <button type="submit" className="btn btn-outline-dark w-100 mt-3">Checkout Now</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </>
            )
        )
    }
}

export default Cart

