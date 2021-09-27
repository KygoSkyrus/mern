import React from 'react'

import tshirt from './images/blue-t-shirt.jpg';
import watch from './images/wood-leather-watches.jpg'

const Item = () => {
    return (
        <div class="row row-cols-2 row-cols-md-4 g-4 m-3">

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
            <img src={watch} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src={tshirt} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src={tshirt} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a short card.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src={watch} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src={tshirt} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src={tshirt} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a short card.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src={watch} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100">
            <img src={tshirt} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
        </div>

      </div>
    )
}

export default Item
