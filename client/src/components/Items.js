import React,{useState} from 'react'
//import {Toast,Row,Col,Button} from 'react-bootstrap'

import tshirt from './images/bluetshirt.jpg';
import watch from './images/watch.jpg'
import scarf from './images/scarf.jpg'
import backpack from './images/backpack.jpg';
import binoculars from './images/binoculars.jpg'
import blackSneakers from './images/blackSneakers.jpg'
import bracelet from './images/bracelet.jpg';
import camera from './images/camera.jpg'
import fitnesstracker from './images/fitnesstracker.jpg'
import headphones from './images/headphones.jpg';
import jeanjacket from './images/jeanjacket.jpg'
import perfume from './images/perfume.jpg'
import pinkpurse from './images/pinkpurse.jpg';
import yogamat from './images/yogamat.jpg'
import redshoes from './images/redshoes.jpg'


const products = [
  { id: 1, name: 'Blue T-shirt', src: tshirt, desc: "abcscvsgsgs" },
  { id: 2, name: 'Watch', src: watch, desc: "abcscvsgsgs" },
  { id: 3, name: 'Scarf', src: scarf, desc: "abcscvsgsgs" },
  { id: 4, name: 'Leather Backpack', src: backpack, desc: "abcscvsgsgs" },
  { id: 5, name: 'Perfume', src: perfume, desc: "abcscvsgsgs" },
  { id: 6, name: 'Denim Jacket', src: jeanjacket, desc: "abcscvsgsgs" },
  { id: 7, name: 'Fitness tracker', src: fitnesstracker, desc: "abcscvsgsgs" },
  { id: 8, name: 'Black Sneakers', src: blackSneakers, desc: "abcscvsgsgs" },
  { id: 9, name: 'Binoculars', src: binoculars, desc: "abcscvsgsgs" },
  { id: 10, name: 'Camera', src: camera, desc: "abcscvsgsgs" },
  { id: 11, name: 'Bracelet', src: bracelet, desc: "abcscvsgsgs" },
  { id: 12, name: 'Red shoes', src: redshoes, desc: "abcscvsgsgs" },
  { id: 13, name: 'Pink Purse', src: pinkpurse, desc: "abcscvsgsgs" },
  { id: 14, name: 'Headphones', src: headphones, desc: "abcscvsgsgs" },
  { id: 15, name: 'Yoga mat', src: yogamat, desc: "abcscvsgsgs" }
];

function abc(a){
  alert(`${a}, added to cart`);
}

const Item = ({ product }) => {

  return (
    <>
    <div className="card h-100">
      <img src={product.src} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.desc}</p>
      </div>
      <button onClick={()=>abc(product.name)} className="btn btn-outline-warning"  >
        <i className="fas fa-shopping-cart"></i>
      </button>
    </div>
    </>
  )
}

const Items = () => {


  return (
    <>
    <div className="row row-cols-2 row-cols-md-4 g-4 m-3">
      {products.map((product) => (
        <div className="col" key={product.id}>
          <Item product={product} />
        </div>
      ))}
    </div>
    </>
  )
}


export default Items