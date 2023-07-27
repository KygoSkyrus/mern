import React, { useEffect } from 'react'

import products from './dummy'

import img1 from './../../assets/images/newImg/products/bluePhone.png'

const Homepage = () => {


  useEffect(() => {
    console.log('ue in hp')
    fetch('/api/getproducts', {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => console.log('products', data))
  }, [])


  return (
    <>

      <div className='hero-bg'>
        <img src={img1} alt='' width={"30%"} />
      </div>



      {/* <!-- Product 1 --> */}
      <section class="box">
        <div class="content">

          <div class="left">
            <div class="product_img"></div>
            <div class="product_details">
              <h4 class="title">Woakers</h4>
              <p class="discription">Men's White Printed Sneakers</p>
              <p class="pricing">₹824 <span class="price_original">₹4000</span> <span class="offer"> 79% OFF</span></p>
              <p class="other">inclusive of all taxes</p>
            </div>
          </div>

          <div class="right">
            <div class="product_description">
              <h4>PRODUCT DESCRIPTION</h4>
              <p>Elevate your style with this classy pair of Casual Shoes from the house of Our brand. Featuring a contemporary refined design with exceptional comfort, this pair is perfect to give your quintessential dressing an upgrade.
              </p>
              <p><span class="highlight">Country of Origin -</span>
                India
              </p>
              <p><span class="highlight">Manufactured By -</span>
                S.K. INTERNATIONAL AJUDD PURAM BAGDA TAHSIL AGRA U.P. <span class="special">282001, 9759860599, sheela.woakers@gmail.com</span>
              </p>
              <p><span class="highlight">Packed By -</span>
                S.K. INTERNATIONAL AJUDD PURAM BAGDA TAHSIL AGRA U.P. <span class="special">282001, 9759860599, sheela.woakers@gmail.com</span>
              </p>
              <p><span class="highlight">Commodity -</span> Men's Casual Shoes
              </p>
              <p><span class="highlight">Sold By -</span> Next Tree Private Limited
              </p>
            </div>
          </div>

        </div>
      </section>
      {/* <!-- Product 1 --> */}




{/* PRODUCT 2 */}
      <div class="container">
  <div class="card dark">
    <img src="https://codingyaar.com/wp-content/uploads/chair-image.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <div class="text-section">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card's
          content.</p>
      </div>
      <div class="cta-section">
        <div>$129.00</div>
        <a href="#" class="btn btn-light">Buy Now</a>
      </div>
    </div>
  </div>
  <div class="card bg-light-subtle mt-4">
    <img src="https://codingyaar.com/wp-content/uploads/chair-image.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <div class="text-section">
        <h5 class="card-title fw-bold">Card title</h5>
        <p class="card-text">Some quick example text to build on the card's content.</p>
      </div>
      <div class="cta-section">
        <div>$129.00</div>
        <a href="#" class="btn btn-dark">Buy Now</a>
      </div>
    </div>
  </div>
  <div class="card bg-danger-subtle mt-4">
    <img src="https://codingyaar.com/wp-content/uploads/chair-image.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <div class="text-section">
        <h5 class="card-title fw-bold">Card title</h5>
        <p class="card-text">Some quick example text to build on the card's content.</p>
      </div>
      <div class="cta-section">
        <div>$129.00</div>
        <a href="#" class="btn btn-dark">Buy Now</a>
      </div>
    </div>
  </div>
  <div class="card bg-primary-subtle mt-4">
    <img src="https://codingyaar.com/wp-content/uploads/chair-image.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <div class="text-section">
        <h5 class="card-title fw-bold">Card title</h5>
        <p class="card-text">Some quick example text to build on the card's content.</p>
      </div>
      <div class="cta-section">
        <div>$129.00</div>
        <a href="#" class="btn btn-dark">Buy Now</a>
      </div>
    </div>
  </div>
  <div class="card bg-success-subtle mt-4">
    <img src="https://codingyaar.com/wp-content/uploads/chair-image.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <div class="text-section">
        <h5 class="card-title fw-bold">Card title</h5>
        <p class="card-text">Some quick example text to build on the card's content.</p>
      </div>
      <div class="cta-section">
        <div>$129.00</div>
        <a href="#" class="btn btn-dark">Buy Now</a>
      </div>
    </div>
  </div>
  <div class="card bg-warning-subtle mt-4">
    <img src="https://codingyaar.com/wp-content/uploads/chair-image.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <div class="text-section">
        <h5 class="card-title fw-bold">Card title</h5>
        <p class="card-text">Some quick example text to build on the card's content.</p>
      </div>
      <div class="cta-section">
        <div>$129.00</div>
        <a href="#" class="btn btn-dark">Buy Now</a>
      </div>
    </div>
  </div>
  <div class="card bg-info-subtle mt-4">
    <img src="https://codingyaar.com/wp-content/uploads/chair-image.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <div class="text-section">
        <h5 class="card-title fw-bold">Card title</h5>
        <p class="card-text">Some quick example text to build on the card's content.</p>
      </div>
      <div class="cta-section">
        <div>$129.00</div>
        <a href="#" class="btn btn-dark">Buy Now</a>
      </div>
    </div>
  </div>
  <div class="card bg-dark mt-4">
    <img src="https://codingyaar.com/wp-content/uploads/chair-image.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <div class="text-section">
        <h5 class="card-title fw-bold text-white">Card title</h5>
        <p class="card-text text-white">Some quick example text to build on the card's content.</p>
      </div>
      <div class="cta-section">
        <div class="text-white">$129.00</div>
        <a href="#" class="btn btn-light">Buy Now</a>
      </div>
    </div>
  </div>
  <div class="card bg-warning mt-4">
    <img src="https://codingyaar.com/wp-content/uploads/chair-image.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <div class="text-section">
        <h5 class="card-title fw-bold">Card title</h5>
        <p class="card-text">Some quick example text to build on the card's content.</p>
      </div>
      <div class="cta-section">
        <div>$129.00</div>
        <a href="#" class="btn btn-dark">Buy Now</a>
      </div>
    </div>
  </div>
  <div class="card bg-info mt-4">
    <img src="https://codingyaar.com/wp-content/uploads/chair-image.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <div class="text-section">
        <h5 class="card-title fw-bold text-white">Card title</h5>
        <p class="card-text text-white">Some quick example text to build on the card's content.</p>
      </div>
      <div class="cta-section">
        <div class="text-white">$129.00</div>
        <a href="#" class="btn btn-light">Buy Now</a>
      </div>
    </div>
  </div>
  <div class="card bg-dark-subtle mt-4">
    <img src="https://codingyaar.com/wp-content/uploads/chair-image.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <div class="text-section">
        <h5 class="card-title fw-bold">Card title</h5>
        <p class="card-text">Some quick example text to build on the card's content.</p>
      </div>
      <div class="cta-section">
        <div>$129.00</div>
        <a href="#" class="btn btn-dark">Buy Now</a>
      </div>
    </div>
  </div>
  <div class="card bg-success mt-4">
    <img src="https://codingyaar.com/wp-content/uploads/chair-image.jpg" class="card-img-top" alt="..."/>
    <div class="card-body">
      <div class="text-section">
        <h5 class="card-title fw-bold text-white">Card title</h5>
        <p class="card-text text-white">Some quick example text to build on the card's content.</p>
      </div>
      <div class="cta-section">
        <div class="text-white">$129.00</div>
        <a href="#" class="btn btn-light">Buy Now</a>
      </div>
    </div>
  </div>
</div>
{/* PRODUCT 2 */}






      {/* try adding word flip things on all these letters from hyperplexed */}
      <div className='textclip-container'>
        <div className='textClip'>jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd </div>
      </div>


      <div className='container'>
        <div className="row row-cols-2 row-cols-md-4 g-4 m-3">
          <div className='col'>


            <div className='card2 card'>
              <img src={img1} className="card-img-top" alt="..." />
              <div className="card-body border-none p-0">
                <div className='rating-stars'>
                  <i className="fa-solid fa-star" aria-hidden="true"></i>
                  <i className="fa-solid fa-star" aria-hidden="true"></i>
                  <i className="fa-solid fa-star" aria-hidden="true"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                  <i className="far fa-star" aria-hidden="true"></i>
                </div>
                <section className="card-title ">T-shirt</section>
                <p className="card-text ">Pure cotton blue t-shirt for men</p>
                <div className="d-flex justify-content-between mb-2 fc">
                  {/* <i className="fa-solid fa-star-half"></i> */}
                  <section className="">
                    <b>₹450</b><span className='text-danger me-1 fs-9' style={{ fontSize: "10px" }}><s>₹400</s></span>78% OFF
                  </section>
                </div>
              </div>

            </div>

            <div className='text-stroke-container'>
              <div className='scrollup'>
                {Array.from(Array(30).keys()).map(x => {
                  return (<h1 key={x} className='text-stroke-style'>KYGOSKYRUS</h1>)
                })}
              </div>

              {/* <h1 className='tex'>KYGOSKYRUS</h1> */}
              <div className='scrolldown'>
                {Array.from(Array(30).keys()).map(x => {
                  return (<h1 key={x} className='te'>KYGOSKYRUS</h1>)
                })}
              </div>

              <div className='scrolldown slow1'>
                {Array.from(Array(30).keys()).map(x => {
                  return (<h1 key={x} className='te'>KYGOSKYRUS</h1>)
                })}
              </div>

            </div>

            <div className='card2 card h-100'>
              <img src="https://picsum.photos/350/300" className="card-img-top" alt="..." />
              <div className="card-body border-none p-0">
                <div className="d-flex justify-content-between mb-2 fc">
                  <i className="fa-solid fa-star" aria-hidden="true"></i>
                  <i className="fa-solid fa-star" aria-hidden="true"></i>
                  <i className="fa-solid fa-star" aria-hidden="true"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                  <i className="far fa-star" aria-hidden="true"></i>
                  {/* <i className="fa-solid fa-star-half"></i> */}
                  <section className="card-title ">T-shirt</section>
                  <h6 className="">₹350</h6>
                </div>
                <p className="card-text ">Pure cotton blue t-shirt for men</p>
              </div>

            </div>


          </div>
        </div>
      </div>


      <div className='container bg-light my-4'>



        <div className="row row-cols-2 row-cols-md-4 g-4 m-3">
          {products.map(product => {
            return (
              <div className="col" key={product.id}>
                <div className="card h-100" >
                  <img src={product.src} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-2 fc">
                      <h5 className="card-title">{product.name}</h5>
                      <h6 className="">&#8377;{product.price}</h6>
                    </div>
                    <p className="card-text ">{product.description}</p>
                  </div>
                  <button className="btn btn-outline-warning"  >
                    <i className="fas fa-shopping-cart"></i>
                  </button>
                </div>
              </div>

            )
          })}

          {/* <Example product={product} show={show} setShow={setShow} onAdd={onAdd} /> */}
        </div>





      </div>
    </>
  )
}

export default Homepage