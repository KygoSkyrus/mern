import React from 'react'

const Orders = (props) => {

    const { data, totalprice } = props;
    console.log(data);

    return (
        <div>
            <h2 className="p-3">My orders</h2>
{data===null?  <p>no orders yet. <a href="/">Continue shopping</a></p>
: <div className="container d-flex justify-content-center align-items-center mt-5 mb-5 abc ">
                <div className="order-box ">

                    <div className="container cart-item mb-3 accordion-bodyposition-relative bg-dark text-light ">
                        <div className="pic-name d-flex mx-2">
                            Product
                        </div>
                        <div className="d-flex ">
                            <div className="p-2 ">Qty.</div>
                        </div>
                        <div className="price">Price </div>

                    </div>

                    <div className=" bg-warning p-3 rounded-2 border border-dark">
                        {data.map((item) => (
                            <div key={item.id} className="container cart-item mb-3 position-relative bg-dark text-light">
                                <div className="pic-name">
                                    <img src={item.src} className="" alt="..." />
                                    <h5 className="fs-5">{item.name}</h5>
                                </div>

                                <div className="d-flex ">
                                    <div className="p-2 ">{item.qty}</div>
                                </div>

                                <div className="price">&#8377; {item.qty * item.price} </div>
                            </div>
                        ))}

                        <div className="d-flex justify-content-between align-items-lg-center px-3 pt-3">
                            <p>Total</p>
                            <section className=""><b>&#8377; {totalprice}</b></section>
                        </div>

                        <div className="d-flex justify-content-between align-items-lg-center px-3">
                            <p>Payment status</p>
                            <section className="text-success"><b>PAID</b></section>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Orders