import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import products from './dummy'
import BannerSlider from './BannerSlider.jsx'

import CategoryStripSlider from './CategoryStripSlider'

import img1 from './../../assets/images/newImg/products/bluePhone.png'
import headphone1 from './../../assets/images/newImg/collections/headphone1.webp'

import controller from "./../../assets/images/newImg/collections/controller.png";

import cart3d from "./../../assets/images/newImg/collections/3dCart.png";
import storeDoor from "./../../assets/images/newImg/collections/storeDoor.png";

import wearables1 from "./../../assets/images/newImg/collections/wearables1.jpg";
import wearables2 from "./../../assets/images/newImg/collections/wearables2.jpg";
import xbox from "./../../assets/images/newImg/collections/xbox.png";


const ProductCardsCollection = () => {

  const [products, setProducts] = useState()
  const [trendingProducts, setTrendingProducts] = useState([])

  useEffect(() => {
    console.log('ue in hp')
    fetch('/api/getproducts', {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => {
        console.log('products', data)
        data?.map((x, i) => {
          if (i < 6) {
            setTrendingProducts(current => [...current, x])
          }
        })
        setProducts(data)//save this data in redux
      })
  }, [])
  console.log('rtt', trendingProducts)
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
      {/* <button className='button5' onClick={createRipple}>Ripple</button> */}
      {/* PRODUCT 5 */}




      {/* ipads,dslr,xbox,drones, */}


      {/* <!-- Product 1 --> */}
      <div className='container bx gapBtw'>
        <div className='row'>
          <div className='col-12'>
            <div className='row'>

              <div className='col-md-6 col-lg-4'>
                <section class="box bx1">
                  <div class="content">

                    <div class="left">
                      <div class="product_img pimg1"></div>
                      <div class="product_details">
                        <h4 class="title">Electronics</h4>
                        <p class="discription">Laptops, Tablets, VR headsets, Gaming consoles, Television, Computers, Camera etc</p>
                        {/* <p class="pricing">₹824 <span class="price_original">₹4000</span> <span class="offer"> 79% OFF</span></p>
              <p class="other">inclusive of all taxes</p> */}
                      </div>
                    </div>
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
                        <h4 class="title">Home Appliances</h4>
                        <p class="discription">Refrigerator, Microwave, Vaccum cleaner, Air conditioner, Washing machine etc</p>
                        {/* <p class="pricing"><span class="offer">UPTO 60% OFF</span></p>
              <p class="other">inclusive of all taxes</p> */}
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
                        <h4 class="title">Wearable Devices</h4>
                        <p class="discription">Smartwatches, Earbuds, Headphones etc</p>
                        {/* <p class="pricing">₹824 <span class="price_original">₹4000</span> <span class="offer"> 79% OFF</span></p>
              <p class="other">inclusive of all taxes</p> */}
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



      <nav class="menu position-relative gapBtw">
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


      <div className='storedoor mt-2'>
        <div className='text'>All-in-one store <br />for all of your Electronic needs</div>
        <div className='doorImg'></div>
      </div>

      {/* PRODUCT 7 */}
      <main class="main gapBtw">
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
                <span class="badge badge-darken">Controller</span>
                <h1 class="heading-sm font-bold text-dark">GoGear Pro Wireless Gamepad</h1>
                <p class="text-md font-regular text-wrap">
                  Equipped with 2.4GHz wireless technology and supports up to 10 metres range. Integrated with dual intensity motor which allows a realistic gaming experience
                </p>
              </div>
              <div class="wrapper-detail">
                <div class="price">
                  <span class="text-md font-semi text-dark">Price:</span>
                  <h3 class="text-xxl font-bold text-dark">&#8377;1999.00</h3>
                </div>
                <div class="sizes">
                  <span class="text-md font-semi text-dark">Color:</span>
                  <ul class="sizes-list p-0">
                    <li class="sizes-item is-select"><section></section></li>
                    <li class="sizes-item"><section></section></li>
                    <li class="sizes-item"><section></section></li>
                    <li class="sizes-item"><section></section></li>
                  </ul>
                </div>
                {/* <div class="sizes">
                  <span class="text-md font-semi text-dark">Sizes:</span>
                  <ul class="sizes-list p-0">
                    <li class="sizes-item is-select">37</li>
                    <li class="sizes-item">38</li>
                    <li class="sizes-item">39</li>
                    <li class="sizes-item">40</li>
                  </ul>
                </div> */}
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



      <div className='cartBanner mt-2'>
        <div className='text'>Shop on SHOPP ITT <br />with exclusive deals and offers</div>
        <div className='cartImg'></div>
      </div>


      {/* XBOX AD */}
      <div className='container gapBtw'>
        <section class="xbox">
          <div class="xbox-content xboxAd">
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




      {/* <spline-viewer class="spline-player"  loading-anim url="https://prod.spline.design/XGRNABqigI-vYLoP/scene.splinecode"></spline-viewer> */}




      {/* PRODUCT 4 */}
      <div className='container gapBtw blackCards'>
        <h1 style={{ color: "#151515", fontFamily: "monospace" }} className='gapBtw text-center'>Trending Gadgets</h1>
        <div className='row m0'>
          <div className='col-12'>
            <div className='row'>
              {trendingProducts?.map(x => {
                return (
                  <div className='col-md-6 col-lg-4'>
                    <div class="mini-card mdc-elevation--z4" >
                      <div class="media-image mdc-card__media mdc-card__media--square" style={{ backgroundImage: `url(${x.image[0]})` }}>
                        <div class="mdc-card__media-content">
                          <div class="card-info">
                            <h1>{x.name}</h1>
                            <Link to={`/product/${x._id}`}>Explore</Link>
                            <h3>{x.category}</h3>
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
        <section className='gapBtw theLine' style={{ width: "80%", height: "1px", background: "#d6d6d6", textAlign: "center" }}></section>
      </div>
      {/* PRODUCT 4 */}


      {/* filler images */}
      <div className='container bx category-page my-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='row'>
              <div className='col-md-6 col-lg-6'>
                <div className='card2 card h-100'>
                  <div style={{ background: "#fff", height: "100%", minHeight: "275px", objectFit: "cover", display: "grid", placeItems: "center" }}>
                    <img src={wearables1} className="card-img-top" style={{ height: "-webkit-fill-available" }} alt="..." />
                  </div>
                </div>
              </div>
              <div className='col-md-6 col-lg-6'>
                <div className='card2 card h-100'>
                  <div style={{ background: "#fff", height: "100%", minHeight: "275px", objectFit: "cover", display: "grid", placeItems: "center" }}>
                    <img src={wearables2} className="card-img-top" alt="..." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* filler images */}



      {/* PRODUCT 3 */}
      {/* <div class="container">

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

      </div> */}
      {/* PRODUCT 3 */}








      {/* PRODUCT 2 */}

      <div className='container gapBtw blackCards'>
        <h1 style={{ color: "#151515", fontFamily: "monospace" }} className='gapBtw text-center'>Curated just for YOU</h1>
        <div className='row m0'>
          <div className='col-12'>
            <div className='row'>
              {products?.map((x, i) => {
                let displayProd = ["iphone", "dslr", "xbox"]
                if (displayProd.includes((x.category).toLowerCase())) {
                  return (
                    <div className='col-md-6 col-lg-4'>
                      <div class='cardN' data-category={x.category}>
                        <img
                          // src='https://raw.githubusercontent.com/mohammadjarabah/codepen-assets/main/pens/mdwvNJP/images/shoes.png'
                          // src={headphone1}
                          src={controller}
                          class='card__img' alt='' />
                        <h2 class='card__title'>{x.name}</h2>
                        <div class='card__content'>
                          {/* <div class='card__sizeContainer'>
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
                        </div> */}
                          <div className='card__discount'>
                            <button className='btn btn-outline-warning text-light'>{x.discount}% discount</button>
                          </div>
                        </div>
                        <a href='/#' class='card__link'>Buy Now</a>
                      </div>
                    </div>
                  )
                }
              })}
            </div>
          </div>
        </div>
        <section className='gapBtw theLine' style={{ width: "80%", height: "1px", background: "#d6d6d6", textAlign: "center" }}></section>
      </div>



      {/* PRODUCT 2 */}












      {/* MACINTOX BANNER */}
      {/* <div class="container gapBtw">
        <div class="page">
          <div class="left">
            <h1>Get yourself a yoga Laptop</h1>
            <p className='page-text'>Lenovo's remarkable new personal computer</p>
            <button>See it in action</button>

          </div>
          <div class="right">
            <div class="img">
              <img alt='' src={products?.[4].image} />
              <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsebastien-compagne.fr%2Fwebsite%2Fzpg%2Farcheologeek%2F1990_-_apple_mac_classic_II.png&f=1&nofb=1" alt='..' />
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
      </div> */}
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


      {/* <div>
        Shop by category
      </div> */}

      {/* <SliderComponent/> */}


      {/* <CategoryStripSlider /> */}







      {/* try adding word flip things on all these letters from hyperplexed */}
      {/* <div className='textclip-container'>
        <div className='textClip'>jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd jdadjsdja njfdsj nklsdfkn adgsnlkald nkadfsf'lkd ndfasns/l asknsjd </div>
      </div> */}



      <div className='text-stroke-container d-none'>
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


    </>
  )
}

export default ProductCardsCollection