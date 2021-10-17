import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

//for full view of item
const Example = (props) => {
  const { product, show, setShow, onAdd } = props;
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} centered fullscreen="xxl-down">
        <Modal.Header closeButton>
          <Modal.Title>
            <a href="/">
              <div className="logo"></div>
            </a>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div className="container showfull ">

            <div className="d-flex inner">

              <img src={product.src} className="card-img-top" alt="..." />

              <div className=" texts ">
                <h4 className="card-title"><b>{product.name}</b></h4>
                <p className="card-text">{product.desc}</p>
                <h6 className=""><b>&#8377; {product.price}</b></h6>

                <div className="mt-4 lh-1">
                  <h5 className="grey mb-3"><u>Available offers</u></h5>
                  <p>
                    <i className="fa fa-tag text-success"></i> &nbsp;
                    <b>Special Price</b> Get extra 16% of(price inclusive of discount) <b className="text-primary">T&amp;C</b></p>
                  <p>
                    <i className="fa fa-tag text-success"></i> &nbsp;
                    <b>Bank Offer</b> 10% off on XYZ Bank Debit Cards, up to ₹1250. On orders of ₹5000 and above <b className="text-primary">T&amp;C</b></p>
                  <p><i className="fa fa-tag text-success"></i> &nbsp;<b>Bank Offer</b> 15% Instant discount on first Pay Later order of ₹500 and above <b className="text-primary">T&amp;C</b></p>
                </div>

                <div className="mt-4 lh-1">
                  <h6 className="grey mb-3"><u>Services</u></h6>
                  <p><i className="fa fa-sync text-primary"></i>&nbsp; 14 Days Return Policy</p>
                  <p><i className="fas fa-money-bill text-success"></i>&nbsp; Cash on Delivery available</p>
                </div>

                <button onClick={() =>
                  onAdd(product)} className="btn btn-outline-warning w-50"  >
                  <i className="fas fa-shopping-cart"></i>
                </button>

              </div>

            </div>

          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}


const Item = (props) => {

  const { product, onAdd } = props;

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="card h-100" >
        <img src={product.src} className="card-img-top" alt="..." onClick={handleShow} />
        <div className="card-body" onClick={handleShow}>
          <div className="d-flex justify-content-between mb-2">
            <h5 className="card-title">{product.name}</h5>
            <h6 className="">&#8377;{product.price}</h6>
          </div>
          <p className="card-text">{product.desc}</p>
        </div>
        <button onClick={() =>
          onAdd(product)} className="btn btn-outline-warning"  >
          <i className="fas fa-shopping-cart"></i>
        </button>
      </div> <Example product={product} show={show} setShow={setShow} onAdd={onAdd} />
    </>
  )
}


const Items = (props) => {
  const { itemData, onAdd } = props;
  return (
    <div className="row row-cols-2 row-cols-md-4 g-4 m-3">
      {itemData.items.map((product) => (
        <div className="col" key={product.id}>
          <Item product={product} key={product.id} onAdd={onAdd} />
        </div>
      ))}
    </div>

  )
}

export default Items