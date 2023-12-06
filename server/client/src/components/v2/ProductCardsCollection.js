import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import img1 from './../../assets/images/newImg/products/bluePhone.png'
import headphone1 from './../../assets/images/newImg/collections/headphone1.webp'
import headphone2 from "./../../assets/images/newImg/collections/headphone2.webp";
import iphone3 from "./../../assets/images/newImg/collections/iphone3.png";
// import iphone5 from "./../../assets/images/newImg/collections/iphone5.png";


import cart3d from "./../../assets/images/newImg/collections/3dCart.png";
import storeDoor from "./../../assets/images/newImg/collections/storeDoor.png";

import wearables1 from "./../../assets/images/newImg/collections/wearables1.jpg";
import wearables2 from "./../../assets/images/newImg/collections/wearables2.jpg";

//curated prodcuts image
import controller from "./../../assets/images/newImg/collections/controller.png";
import xbox from "./../../assets/images/newImg/collections/xbox.png";
import dslr from "./../../assets/images/newImg/collections/dslr.png";


const ProductCardsCollection = () => {

  const [products, setProducts] = useState()
  const [trendingProducts, setTrendingProducts] = useState([])
  const [curatedProducts, setCuratedProducts] = useState({})

  const trendingProdObj = {
    'xbox': {
      displayName: "Xbox One",
      displayImage: xbox
    },
    'iphone': {
      displayName: "Apple iPhone 13",
      displayImage: null
    },
    'DSLR': {
      displayName: "Digit GoCam 35",
      displayImage: dslr
    }
  }

  useEffect(() => {
    fetch('/api/getproducts', {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => {
        console.log('products', data)
        let prodArr = []
        data?.map((item, i) => {
          if (i < 6) prodArr.push(item);
          Object.keys(trendingProdObj).forEach(x => {
            if (item.name.toLowerCase().includes(x) || item.category === x && !curatedProducts.hasOwnProperty(x)) {
              item.displayName = trendingProdObj[x].displayName
              item.displayImage = trendingProdObj[x].displayImage
              setCuratedProducts(current => ({ ...current, [x]: item }))
              return
            }
          })
        })
        setTrendingProducts(prodArr)
        setProducts(data)//save this data in redux
      })
  }, [])

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
                <section className="box bx1">
                  <div className="content">

                    <div className="left">
                      <div className="product_img pimg1"></div>
                      <div className="product_details">
                        <h4 className="title">Electronics</h4>
                        <p className="discription">Laptops, Tablets, VR headsets, Gaming consoles, Television, Computers, Camera etc</p>
                        {/* <p className="pricing">₹824 <span className="price_original">₹4000</span> <span className="offer"> 79% OFF</span></p>
              <p className="other">inclusive of all taxes</p> */}
                      </div>
                    </div>
                  </div>
                </section>
              </div>


              <div className='col-md-6 col-lg-4'>
                <section className="box bx2">
                  <div className="content">
                    <div className="left">
                      <div className='p1-bg'>
                        <div className="product_img pimg2"></div></div>
                      <div className="product_details">
                        <h4 className="title">Home Appliances</h4>
                        <p className="discription">Refrigerator, Microwave, Vaccum cleaner, Air conditioner, Washing machine etc</p>
                        {/* <p className="pricing"><span className="offer">UPTO 60% OFF</span></p>
              <p className="other">inclusive of all taxes</p> */}
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className='col-md-6 col-lg-4'>
                <section className="box bx3">
                  <div className="content">
                    <div className="left">
                      <div className="product_img pimg3"></div>
                      <div className="product_details">
                        <h4 className="title">Wearable Devices</h4>
                        <p className="discription">Smartwatches, Earbuds, Headphones etc</p>
                        {/* <p className="pricing">₹824 <span className="price_original">₹4000</span> <span className="offer"> 79% OFF</span></p>
              <p className="other">inclusive of all taxes</p> */}
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



      <nav className="menu position-relative gapBtw">
        <div className="menu__item">
          <div className="marquee">
            <div className="marquee__inner">
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
      <main className="main gapBtw">
        {/* <!-- Wrapper Section --> */}
        <section className="section wrapper wrapper-section py-3">
          <div className="container wrapper-column">
            <div className="wrapper-figure">
              <img
                src={controller}
                // src="https://i.ibb.co/3msVHYZ/sneaker-image.png"
                className="wrapper-image" loading="lazy" alt="Sneaker" />
            </div>
            <div className="wrapper-content">
              <div className="wrapper-inform">
                <span className="badge badge-darken">Controller</span>
                <h1 className="heading-sm font-bold text-dark">GoGear Pro Wireless Gamepad</h1>
                <p className="text-md font-regular text-wrap">
                  Equipped with 2.4GHz wireless technology and supports up to 10 metres range. Integrated with dual intensity motor which allows a realistic gaming experience
                </p>
              </div>
              <div className="wrapper-detail">
                <div className="price">
                  <span className="text-md font-semi text-dark">Price:</span>
                  <h3 className="text-xxl font-bold text-dark">&#8377;1999.00</h3>
                </div>
                <div className="sizes">
                  <span className="text-md font-semi text-dark">Color:</span>
                  <ul className="sizes-list p-0">
                    <li className="sizes-item is-select"><section></section></li>
                    <li className="sizes-item"><section></section></li>
                    <li className="sizes-item"><section></section></li>
                    <li className="sizes-item"><section></section></li>
                  </ul>
                </div>
                {/* <div className="sizes">
                  <span className="text-md font-semi text-dark">Sizes:</span>
                  <ul className="sizes-list p-0">
                    <li className="sizes-item is-select">37</li>
                    <li className="sizes-item">38</li>
                    <li className="sizes-item">39</li>
                    <li className="sizes-item">40</li>
                  </ul>
                </div> */}
              </div>
              <div className="wrapper-action">
                <Link to="/category/controllers"><button className="btn btn-darken">Buy now</button></Link>
                <button className="btn btn-neutral">
                  <i className="fa fa-heart"></i>
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
        <section className="xbox">
          <div className="xbox-content xboxAd">
            <h2>Xbox Game Pass Ultimate</h2>
            <p>Xbox Game Pass Ultimate Xbox Live Gold and over 100 high-quality
              console and PC games. Play together with friends and discover your
              next favorite game.</p>
            <a href="/#" className="xbox-btn">
              Join Now <i className="fas fa-chevron-right"></i>
            </a>
          </div>
        </section>
      </div>
      {/* XBOX AD */}




      {/* <spline-viewer className="spline-player"  loading-anim url="https://prod.spline.design/XGRNABqigI-vYLoP/scene.splinecode"></spline-viewer> */}




      {/* PRODUCT 4 */}
      <div className='container gapBtw blackCards'>
        <h1 style={{ color: "#151515", fontFamily: "monospace" }} className='gapBtw text-center'>Trending Gadgets</h1>
        <div className='row m0'>
          <div className='col-12'>
            <div className='row'>
              {trendingProducts?.map(x => {
                return (
                  <div className='col-md-6 col-lg-4'>
                    <div className="mini-card mdc-elevation--z4" >
                      <div className="media-image mdc-card__media mdc-card__media--square" style={{ backgroundImage: `url(${x.image[0]})` }}>
                        <div className="mdc-card__media-content">
                          <div className="card-info">
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
        <section class="gapBtw theLine" style={{ width: "80%", height: "1px", background: "#d6d6d6", textAlign: "center",marginRight: "auto",marginLeft:"auto" }}></section>
      </div>
      {/* filler images */}



      {/* PRODUCT 3 */}
      {/* <div className="container">

        <div className="card-3">
          <img src={img1} className="card-img-top" alt="..." />
          <div className="card3-body">
            <div className="text-section">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card's
                content.</p>
            </div>
            <div className="cta-section">
              <div>$129.00</div>
              <a href="/#" className="btn btn-light">Buy Now</a>
            </div>
          </div>
        </div>

      </div> */}
      {/* PRODUCT 3 */}




      <div class="bg-danger ">
        <div className='headphone-filler container align-items-center d-flex justify-content-between gapBtw'>
            <div className="filler-content text-light">
              <section className='text-dark fw-400 fs-3'>New Arrival</section>
              <h2 className='fw-light' style={{letterSpacing:"8px"}}><i className='fa fa-headphones-alt me-2'></i>PREMIUM SOUND</h2>

           <div style={{ background: 'linear-gradient(to top, #7c0b7c, #de41de)', paddingLeft: "4px"}}>
            <ul className='bg-danger ps-3'>
              <li>
                Surround sound experience
              </li>
              <li>Noise reduction</li>
              <li>Noise isolation</li>
            </ul>
            </div>   

              <span style={{color: "var(--yellow)"}}>Like You, We Love Music </span> 
              <span>
                And we believe a Headphone is more than just an instrument for sound. It’s the key to a mind-blowing moment of emotion, bringing you closer to your favourite artist, and yourself.
              </span> 
            
            <div className='my-2'>
              <a href="/#" className="xbox-btn" target="blank">
                Explore more
                <i className="fas fa-chevron-right"></i>
              </a>
            </div>
            </div>
            <img src={headphone2} alt="" width="50%" />
          </div> 
          </div>




      {/* PRODUCT 2 */}

      <div className='container gapBtw blackCards'>
        <h1 style={{ color: "#151515", fontFamily: "monospace" }} className='gapBtw text-center'>Curated just for YOU</h1>
        <div className='row m0'>
          <div className='col-12'>
            <div className='row'>
              {
                Object.keys(curatedProducts).map(key => {
                  return (
                    <div className='col-md-6 col-lg-4'>
                      <div class='cardN' data-category={key}>
                        <img
                          src={curatedProducts[key].displayImage || curatedProducts[key].image}
                          class='card__img' alt='' />
                        <h2 class='card__title'>{curatedProducts[key].displayName}</h2>
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
                            <button className='btn btn-outline-warning text-light'>{curatedProducts[key].discount}% discount</button>
                          </div>
                        </div>
                        <Link to={`/products/${curatedProducts[key]._id}`} class='card__link'>Buy Now</Link>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <section className='gapBtw theLine' style={{ width: "80%", height: "1px", background: "#d6d6d6", textAlign: "center" }}></section>
      </div>



      {/* PRODUCT 2 */}







      {/* MACINTOX BANNER */}
      {/* <div className="container gapBtw">
        <div className="page">
          <div className="left">
            <h1>Get yourself a yoga Laptop</h1>
            <p className='page-text'>Lenovo's remarkable new personal computer</p>
            <button>See it in action</button>

          </div>
          <div className="right">
            <div className="img">
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
      {/* <div className="product-card">
        <div className="badge-pc">New Product</div>
        <div className="product-tumb">
            <img src="https://cdn-icons-png.flaticon.com/512/2806/2806251.png" alt=''/>
        </div>
        <div className="product-details">
            <span className="product-catagory">T-Shirt</span>
            <h4><a href="/#">New T-Shirt For Man</a></h4>
            <p>New Import T-Shirt For Man Very Rare Collection, If You Want Order Right Now</p>
            <div className="product-bottom-details">
                <div className="product-price"><small>$15.10</small>$7.99</div>
                <div className="product-links">
                    <a href="/#"><i className="fa fa-heart"></i></a>
                    <a href="/#"><i className="fa fa-shopping-cart"></i></a>
                </div>
            </div>
        </div>
    </div> */}
      {/* PRODUCT 9 */}


      {/* <div>
        Shop by category
      </div> */}

      {/* <SliderComponent/> */}









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