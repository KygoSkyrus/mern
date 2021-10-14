import React, { useState } from 'react'
import {Toast,Row,Col,Button,ToastContainer} from 'react-bootstrap'

//for ull view of item
const ShowFull = (props) => {
  const { product } = props;
  console.log('clicked');

  if (props.visibility === false) {
    return null
  } else {
    return (
      <>
        <div className="showfull  ">

          <div className="d-flex inner">

            <img src={product.src} className="card-img-top" alt="..." />

            <div className="d-flex flex-column texts">
              <h5 className="card-title">{product.name}</h5>
              <h6 className="">{product.price}</h6>
              <p className="card-text">{product.desc}</p>
            </div>
            
          </div>

        </div>
      </>
    )
  }
}

const Item = (props) => {

  const [yes, setyes] = useState(false);

  const { product, onAdd } = props;
  return (
    <>
      <div className="card h-100" >
        <img src={product.src} className="card-img-top" alt="..." onClick={() => setyes(true)}/>
        <div className="card-body" onClick={() => setyes(true)}>
          <div className="d-flex justify-content-between mb-2">
            <h5 className="card-title">{product.name}</h5>
            <h6 className="">{product.price}</h6>
          </div>
          <p className="card-text">{product.desc}</p>
        </div>
        <button onClick={() => 
          onAdd(product)} className="btn btn-outline-warning"  >
          <i className="fas fa-shopping-cart"></i>
        </button>
      </div>
      <ShowFull visibility={yes} product={product} />
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