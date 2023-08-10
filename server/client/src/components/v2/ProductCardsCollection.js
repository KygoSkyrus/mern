import React from 'react'

import products from './dummy'
import BannerSlider from './BannerSlider.jsx'

import CategoryStripSlider from './CategoryStripSlider'

import img1 from './../../assets/images/newImg/products/bluePhone.png'
import headphone1 from './../../assets/images/newImg/collections/headphone1.webp'

import controller from "./../../assets/images/newImg/collections/controller.png";

const ProductCardsCollection = () => {

    

  //RIPPLE--------------
  function createRipple(event) {
    //add position relative and overflow hidden on whichever element you want this effect
    const button = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }
  //RIPPLE--------------


  return (
    <>
    
     {/* PRODUCT 5 */}
     <button className='button5' onClick={createRipple}>Ripple</button>
      {/* PRODUCT 5 */}




    


      {/* <!-- Product 1 --> */}
      <div className='container bx'>
        <div className='row'>
          <div className='col-12'>
            <div className='row'>

            <div className='col-md-6 col-lg-4'>
      <section class="box bx1">
        <div class="content">

          <div class="left">
            <div class="product_img pimg1"></div>
            <div class="product_details">
              <h4 class="title">Woakers</h4>
              <p class="discription">Men's White Printed Sneakers</p>
              <p class="pricing">₹824 <span class="price_original">₹4000</span> <span class="offer"> 79% OFF</span></p>
              <p class="other">inclusive of all taxes</p>
            </div>
          </div>
{/* 
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
          </div> */}

        </div>
      </section>
      </div>


      <div className='col-md-6 col-lg-4'>
      <section class="box bx2">
        <div class="content">
          <div class="left">
            <div className='p1-bg'>
            <div class="product_img pimg2"></div></div>
            <div class="product_details">
              <h4 class="title">Woakers</h4>
              <p class="discription">Men's White Printed Sneakers</p>
              <p class="pricing">₹824 <span class="price_original">₹4000</span> <span class="offer"> 79% OFF</span></p>
              <p class="other">inclusive of all taxes</p>
            </div>
          </div>
          </div>
          </section>
          </div>

          <div className='col-md-6 col-lg-4'>
      <section class="box bx3">
        <div class="content">
          <div class="left">
            <div class="product_img pimg3"></div>
            <div class="product_details">
              <h4 class="title">Woakers</h4>
              <p class="discription">Men's White Printed Sneakers</p>
              <p class="pricing">₹824 <span class="price_original">₹4000</span> <span class="offer"> 79% OFF</span></p>
              <p class="other">inclusive of all taxes</p>
            </div>
          </div>
          </div>
          </section>
          </div>

      </div>
      </div>
      </div>
      </div>
      {/* <!-- Product 1 --> */}



      <nav class="menu position-relative">
  <div class="menu__item">
    <div class="marquee">
      <div class="marquee__inner">
        <span>Shopp-itt</span>
        <span>Shopp-itt</span>
        <span>Shopp-itt</span>
        <span>Shopp-itt</span>
      </div>
    </div>
  </div>
</nav>

something wide must go here


 {/* PRODUCT 7 */}
 <main class="main">
        {/* <!-- Wrapper Section --> */}
        <section class="section wrapper wrapper-section py-3">
          <div class="container wrapper-column">
            <div class="wrapper-figure">
              <img 
              src={controller}
              // src="https://i.ibb.co/3msVHYZ/sneaker-image.png"
               class="wrapper-image" loading="lazy" alt="Sneaker" />
            </div>
            <div class="wrapper-content">
              <div class="wrapper-inform">
                <span class="badge badge-darken">Man's Shoes</span>
                <h1 class="heading-sm font-bold text-dark">Nike Air Motion Max</h1>
                <p class="text-md font-regular">
                  The combine of breathable mesh without seams for a traditional and
                  modern style to add the perfect amount of flash to make you shine.
                </p>
              </div>
              <div class="wrapper-detail">
                <div class="price">
                  <span class="text-md font-semi text-dark">Price:</span>
                  <h3 class="text-xxl font-bold text-dark">$99.00</h3>
                </div>
                <div class="sizes">
                  <span class="text-md font-semi text-dark">Sizes:</span>
                  <ul class="sizes-list p-0">
                    <li class="sizes-item is-select">37</li>
                    <li class="sizes-item">38</li>
                    <li class="sizes-item">39</li>
                    <li class="sizes-item">40</li>
                  </ul>
                </div>
              </div>
              <div class="wrapper-action">
                <button class="btn btn-darken">Add to Bag</button>
                <button class="btn btn-neutral">
                  <i class="fa fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* PRODUCT 7 */}


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
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <div className='row'>
              {Array.from(Array(6).keys()).map(x => {
                return (
                  <div className='col-md-6 col-lg-4'>
                    <div class="mini-card mdc-elevation--z4" >
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
                )
              })}
            </div>
          </div>
        </div>
      </div>
      {/* PRODUCT 4 */}





      {/* PRODUCT 6 */}
      <div class="bottom-card">
        <div class="first-half">
          <div class="media-image top-card">
          </div>
        </div>
        <div class="last-half">
          <div class="card-info">
            <h2 className='pname' >iPhone 11 Pro Max</h2>
            <h4>$1,499.00</h4>
            <h6>United States, 16 hours ago</h6>
          </div>
        </div>
      </div>
      {/* PRODUCT 6 */}




           {/* PRODUCT 2 */}
           <div class='cardN'>
        <img 
        // src='https://raw.githubusercontent.com/mohammadjarabah/codepen-assets/main/pens/mdwvNJP/images/shoes.png'
        src={headphone1}
         class='card__img' alt='' />
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



<div className='cgh' >
<div className='holder-cgh'>
  <section>Laptops</section>
  <div className='circle-cgh'></div>
</div>
<div className='holder-cgh'>
  <section>Tablets</section>
  <div className='circle-cgh'></div>
</div>
<div className='holder-cgh'>
  <section>Smartwatches</section>
  <div className='circle-cgh'></div>
</div>
<div className='holder-cgh'>
  <section>Camera</section>
  <div className='circle-cgh'></div>
</div>
<div className='holder-cgh'>
  <section>Desktop</section>
  <div className='circle-cgh'></div>
</div>
<div className='holder-cgh'>
  <section>Gaming Consoles</section>
  <div className='circle-cgh'></div>
</div>
<div className='holder-cgh'>
  <section>Accessories</section>
  <div className='circle-cgh'></div>
</div>
</div>





      {/* XBOX AD */}
      <div className='container'>
        <section class="xbox">
          <div class="xbox-content">
            <h2>Xbox Game Pass Ultimate</h2>
            <p>Xbox Game Pass Ultimate Xbox Live Gold and over 100 high-quality
              console and PC games. Play together with friends and discover your
              next favorite game.</p>
            <a href="/#" class="xbox-btn">
              Join Now <i class="fas fa-chevron-right"></i>
            </a>
          </div>
        </section>
      </div>
      {/* XBOX AD */}


      {/* MACINTOX BANNER */}
      <div class="container">
        <div class="page">
          <div class="left">
            <h1>Take home a Macintosh.</h1>
            <p className='page-text'>Apple's remarkable new personal computer</p>
            <button>See it in action</button>

          </div>
          <div class="right">
            <div class="img"><img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsebastien-compagne.fr%2Fwebsite%2Fzpg%2Farcheologeek%2F1990_-_apple_mac_classic_II.png&f=1&nofb=1" alt='..' />
            </div>
            <ul>
              <li>Instagram</li>
              <li>-</li>
              <li>Facebook</li>
              <li>-</li>
              <li>Twitter</li>
            </ul>
          </div>
        </div>
      </div>
      {/* MACINTOX BANNER */}


{/* PRODUCT 9 */}
{/* <div class="product-card">
        <div class="badge-pc">New Product</div>
        <div class="product-tumb">
            <img src="https://cdn-icons-png.flaticon.com/512/2806/2806251.png" alt=''/>
        </div>
        <div class="product-details">
            <span class="product-catagory">T-Shirt</span>
            <h4><a href="/#">New T-Shirt For Man</a></h4>
            <p>New Import T-Shirt For Man Very Rare Collection, If You Want Order Right Now</p>
            <div class="product-bottom-details">
                <div class="product-price"><small>$15.10</small>$7.99</div>
                <div class="product-links">
                    <a href="/#"><i class="fa fa-heart"></i></a>
                    <a href="/#"><i class="fa fa-shopping-cart"></i></a>
                </div>
            </div>
        </div>
    </div> */}
   {/* PRODUCT 9 */}


<div></div>

<div>
  Shop by category
</div>

{/* <SliderComponent/> */}


<CategoryStripSlider/>







      {/* try adding word flip things on all these letters from hyperplexed */}
      {/* <div className='textclip-container'>
        <div className='textClip'>jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd </div>
      </div> */}



      <div className='text-stroke-container'>
        <div className='scrolldown slow1'>
          {Array.from(Array(30).keys()).map(x => {
            return (<h1 key={x} className='text-stroke-style'>KYGOSKYRUS</h1>)
          })}
        </div>

        <div className='scrolldown slow3'>
          {Array.from(Array(30).keys()).map(x => {
            return (<h1 key={x} className='te'>KYGOSKYRUS</h1>)
          })}
        </div>

        <div className='scrolldown slow2'>
          {Array.from(Array(30).keys()).map(x => {
            return (<h1 key={x} className='te'>KYGOSKYRUS</h1>)
          })}
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

export default ProductCardsCollection