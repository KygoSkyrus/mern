import React from 'react'
//import {Toast,Row,Col,Button} from 'react-bootstrap'

const Item = (props) => {
  const {product,onAdd}=props;
  return (
    <>
      <div className="card h-100">
        <img src={product.src} className="card-img-top" alt="..." />
        <div className="card-body">
          <div className="d-flex justify-content-between mb-2">
            <h5 className="card-title">{product.name}</h5>
            <h6 className="">{product.price}</h6>
          </div>
          <p className="card-text">{product.desc}</p>
        </div>
        <button onClick={() => onAdd(product)} className="btn btn-outline-warning"  >
          <i className="fas fa-shopping-cart"></i>
        </button>
      </div>
    </>
  )
}


const Items = (props) => {
  const {itemData ,onAdd}=props;
  return (
    <div className="row row-cols-2 row-cols-md-4 g-4 m-3">
    {itemData.items.map((product) => (
      <div className="col" key={product.id}>
        <Item product={product} key={product.id} onAdd={onAdd}/>
      </div>
    ))}
  </div>
  )
}

export default Items




