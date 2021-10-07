import React from 'react'



const Cart = (props) => {

    const { data, onAdd, onRemove, clear} = props;

    //pricing section
    const itemsPrice = data.reduce((a, c) => a + c.price * c.qty, 0);
    const taxPrice = itemsPrice * 0.16;
    const shippingPrice = itemsPrice > 40 ? 0 : 5;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    if (data.length === 0) {
        return( 
        <div className="container mt-5">
            <h4>Cart is empty</h4>
            <a href="/">Continue shopping</a>
        </div>)
    } else {
        return (
            <>
                <h2 className="mt-3 mb-4">Cart <i className="fas fa-shopping-cart"></i></h2>


                <div className="container d-flex mt-5">

                    <div className="w-75">
                        {data.map((item) => (
                            <div key={item.id} className="container cart-item mb-3">
                                <div className="pic-name">
                                    <img src={item.src} className="" alt="..." />
                                    <h5>{item.name}</h5>
                                </div>
                                
                                <button onClick={() => onAdd(item)} >+</button>

                                <div>{item.qty} x ${item.price.toFixed(2)}</div>

                                <button onClick={() => onRemove(item)} >-</button>

                                <div><i className="fas fa-trash-can" onClick={() => clear(item)}></i></div>
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
                        <hr/>
                        <div className="d-flex justify-content-between">
                            <section><b>Subtotal</b></section>
                            <section><b>{totalPrice.toFixed(2)} $</b></section>
                        </div>
                        </div>


                        <div className="">
                            <button className="btn btn-outline-dark w-100 mt-3">Checkout Now</button>
                        </div>
                    </div>

                </div>
            </>
        )
    }

}

export default Cart
