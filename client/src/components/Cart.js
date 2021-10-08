import React, { useState, useEffect } from "react";


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

/**/