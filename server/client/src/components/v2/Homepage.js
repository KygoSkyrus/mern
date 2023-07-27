import React, { useEffect } from 'react'
// import {util} from '@material/ripple/index';

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



  //PRODUCT 4

  const selector = ".mdc-button, .mdc-icon-button, .mdc-card__primary-action";
  // const ripples = [].map.call(document.querySelectorAll(selector), function(el) {
  //   return new MDCFoo(el);
  // });
 
  useEffect(()=>{
    const mdcCard=document.querySelector('.mdc-card')
    mdcCard.classList.add("animation-reveal");
    mdcCard.style.opacity=0
    // $(".mdc-card").addClass("animation-reveal");
    // $(".mdc-card").css("opacity", "0");
    setTimeout(() => {
      mdcCard.classList.remove("animation-reveal");
      mdcCard.style.opacity=1
      // $(".mdc-card").removeClass("animation-reveal");
      // $(".mdc-card").css("opacity", "1");
    }, 1000);
  },[])

  //PRODUCT 4


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
      <div class='cardN'>
        <img src='https://raw.githubusercontent.com/mohammadjarabah/codepen-assets/main/pens/mdwvNJP/images/shoes.png' class='card__img' alt='' />
        <h2 class='card__title'>Nike Shoes</h2>
        <div class='card__content'>
          <div class='card__sizeContainer'>
            <p class='card__sizeTitle'>Size:</p>
            <span class='card__sizeNumber'>7</span>
            <span class='card__sizeNumber'>8</span>
            <span class='card__sizeNumber'>9</span>
            <span class='card__sizeNumber'>10</span>
          </div>
          <div class='card__colorContainer'>
            <p class='card__colorTitle'>Color:</p>
            <span class='card__colorCircle' style={{ backgroundColor: '#9bdc28' }}></span>
            <span class='card__colorCircle' style={{ backgroundColor: '#03a9f4' }}></span>
            <span class='card__colorCircle' style={{ backgroundColor: '#e91e63' }}></span>
          </div>
        </div>
        <a href='/#' class='card__link'>Buy Now</a>
      </div>
      {/* PRODUCT 2 */}





      {/* PRODUCT 3 */}
      <div class="container">
        <div class="card-3">
          <img src={img1} class="card-img-top" alt="..." />
          <div class="card3-body">
            <div class="text-section">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">Some quick example text to build on the card's
                content.</p>
            </div>
            <div class="cta-section">
              <div>$129.00</div>
              <a href="/#" class="btn btn-light">Buy Now</a>
            </div>
          </div>
        </div>

      </div>
      {/* PRODUCT 3 */}





      {/* PRODUCT 4 */}
      <div class="mdc-card mini-card mdc-elevation--z4">
        <div class="mdc-card__primary-action">
          <div class="media-image mdc-card__media mdc-card__media--square">
            <div class="mdc-card__media-content">
              <div class="card-info">
                <h1>The new headphones</h1>
                <h2>Explore</h2>
                <h3>HEADPHONES</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* PRODUCT 4 */}





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