import React from 'react'

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


 const abc=[
     {id:1,name:'dog',desc:"abcscvsgsgs"},
   {id:2,name:'cat',desc:"4454444454"},
 ];
  


const Item =(src,name,desc)=>{
  return(
    <div class="col">
          <div class="card h-100">
            <img src={backpack} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{`${name}`}</h5>
              <p class="card-text">{desc}</p>
            </div>
          </div>
        </div>
  )
}


const Items = () => {



    return (
        <div class="row row-cols-2 row-cols-md-4 g-4 m-3">
<Item/>
        <div class="col">
          <div class="card h-100">
            <img src={watch} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Wrist watch</h5>
              <p class="card-text">Elegant leather wrist watche for men and women</p>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card h-100">
            <img src={tshirt} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Blue t-shirt</h5>
              <p class="card-text">lightweight cotton t-shirt</p>
            </div>
          </div>
        </div>





        <div class="col">
          <div class="card h-100">
            <img src={redshoes} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src={scarf} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src={headphones} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a short card.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src={pinkpurse} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src={binoculars} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src={fitnesstracker} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a short card.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src={yogamat} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src={jeanjacket} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src={camera} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src={perfume} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src={bracelet} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src={blackSneakers} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src={backpack} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
        </div>

      </div>
    )
}

export default Items
