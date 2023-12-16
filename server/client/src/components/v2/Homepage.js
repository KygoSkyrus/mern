/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import BannerSlider from './BannerSlider.jsx'

import headphone2 from "./../../assets/images/newImg/collections/headphone2.webp";
import iphone5 from "./../../assets/images/newImg/collections/iphone5.png";
import wearables1 from "./../../assets/images/newImg/collections/wearables1.jpg";
import wearables2 from "./../../assets/images/newImg/collections/wearables2.jpg";
//curated prodcuts image
import controller from "./../../assets/images/newImg/collections/controller.png";
import xbox from "./../../assets/images/newImg/collections/xbox.png";
import dslr from "./../../assets/images/newImg/collections/dslr.png";
// import img1 from './../../assets/images/newImg/products/bluePhone.png'
// import headphone1 from './../../assets/images/newImg/collections/headphone1.webp'
// import cart3d from "./../../assets/images/newImg/collections/3dCart.png";
// import storeDoor from "./../../assets/images/newImg/collections/storeDoor.png";
// import fridaySale from "./../../assets/images/newImg/collections/friday-sale.jpg";
// import superSale from "./../../assets/images/newImg/collections/super-sale.jpg";


const Homepage = () => {

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
      })
  }, [])

  //RIPPLE--------------
  // function createRipple(event) {
  //   //add position relative and overflow hidden on whichever element you want this effect and call this function on click
  //   const button = event.currentTarget;

  //   const circle = document.createElement("span");
  //   const diameter = Math.max(button.clientWidth, button.clientHeight);
  //   const radius = diameter / 2;

  //   circle.style.width = circle.style.height = `${diameter}px`;
  //   circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  //   circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  //   circle.classList.add("ripple");

  //   const ripple = button.getElementsByClassName("ripple")[0];

  //   if (ripple) {
  //     ripple.remove();
  //   }

  //   button.appendChild(circle);
  // }
  //RIPPLE--------------

  return (
    <>
      <div className='mb-5'>
        <BannerSlider />
      </div>


      {/* <!-- Product 1 --> */}
      <div className='container bx gapBtw' data-aos="fade-up"
        data-aos-duration="500">
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
                        <p className="pricing"><span className="offer">UPTO 40% OFF</span></p>
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
                        <p className="pricing"><span className="offer">UPTO 60% OFF</span></p>
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
                        <p className="pricing"><span className="offer">UPTO 50% OFF</span></p>
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


      <div className="menu position-relative gapBtw" data-aos="flip-up"
        data-aos-duration="500">
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
      </div>


      <div className='storedoor mt-2'>
        <div className='text'>All-in-one store <br />for all of your Electronic needs</div>
        <div className='doorImg'></div>
      </div>


      {/* PRODUCT 7 */}
      <main className="main gapBtw">
        {/* <!-- Wrapper Section --> */}
        <section className="section wrapper wrapper-section py-3">
          <div className="container wrapper-column">
            <div
              className="wrapper-figure"
              data-aos="fade-right"
              data-aos-duration="1000"
            // data-aos-offset="200"
            // data-aos-delay="50"
            // data-aos-easing="ease-in-out"
            // data-aos-mirror="true"
            // data-aos-once="false"
            // data-aos-anchor-placement="top-center"
            >
              <img
                src={controller}
                className="wrapper-image" loading="lazy" alt="Sneaker" />
            </div>
            <div className="wrapper-content" data-aos="fade-left"
              data-aos-duration="1000">
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
              </div>
              <div className="wrapper-action">
                <Link to="/category/controllers"><button className="shoppittBtn">Buy now</button></Link>
                <button className="shoppittBtnR">
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
            <a href="/category/xbox" className="xbox-btn hover-y">
              Explore Now <i className="fas fa-chevron-right"></i>
            </a>
          </div>
        </section>
      </div>
      {/* XBOX AD */}


      {/* <div style={{ background: "var(--red)" }}>
        <div className='headphone-filler container align-items-center d-flex justify-content-between gapBtw'>
          <div className="filler-content text-light">
            <section className='text-dark fw-400 fs-3'>New Arrival</section>
            <h2 className='fw-light' style={{ letterSpacing: "8px" }}><i className='fa fa-headphones-alt me-2'></i>PREMIUM SOUND</h2>

            <div style={{ background: 'linear-gradient(to top, #7c0b7c, #de41de)', paddingLeft: "4px" }}>
              <ul className='ps-3' style={{ background: "var(--red)" }}>
                <li>
                  Surround sound experience
                </li>
                <li>Noise reduction</li>
                <li>Noise isolation</li>
              </ul>
            </div>

            <span style={{ color: "var(--yellow)" }}>Like You, We Love Music </span>
            <span>
              And we believe a Headphone is more than just an instrument for sound. It’s the key to a mind-blowing moment of emotion, bringing you closer to your favourite artist, and yourself.
            </span>

            <div className='my-2'>
              <a href="/category/headphones" className="xbox-btn" style={{ border: "3px solid #000", background: "inherit" }} target="_blank">
                Explore more
                <i className="fas fa-chevron-right"></i>
              </a>
            </div>
          </div>
          <spline-viewer className="spline-player"  loading-anim url="https://prod.spline.design/XGRNABqigI-vYLoP/scene.splinecode"></spline-viewer>
        </div>
      </div> */}


      <div style={{ background: "#141414" }} >
        <div className='headphone-filler container align-items-center d-flex flex-row-reverse justify-content-between gapBtw'>
          <div className="filler-content text-light">
            <section className='text-dark fw-400 fs-3'>New Arrival</section>
            <h2 className='fw-light' style={{ letterSpacing: "8px" }}><i className='fa-brands fa-apple me-2'></i>INTRODUCING iPHONE</h2>

            <div style={{ background: 'linear-gradient(to top, #7c0b7c, #de41de)', paddingLeft: "4px" }} className='rounded'>
              <ul className='p-2 ps-3'>
                <li>
                  12MP 260p camera
                </li>
                <li>6GB RAM Apple A15 Bionic</li>
                <li>4373mAh Li-ion</li>
              </ul>
            </div>

            <span style={{ color: "var(--yellow)" }}>A magical way to interact with your iPhone. </span>
            <span>
              A vital safety feature designed to save lives. An innovative 12MP camera Main camera. And a display that's up to 2x brighter in the sun. All powered by the ultimate smartphone chip.
            </span>

            <div className='my-2'>
              <a href="/category/headphones" className="xbox-btn hover-y" style={{ border: "3px solid #fff", background: "inherit" }} target="_blank">
                Explore more
                <i className="fas fa-chevron-right"></i>
              </a>
            </div>
          </div>
          <img src={iphone5} alt="shoppitt" width="40%" data-aos="fade-up" data-aos-duration="1000" />
        </div>
      </div>


      {/* PRODUCT 4 */}
      <div className='container gapBtw blackCards'>
        <h1 style={{ color: "#151515", fontFamily: "monospace" }} className='gapBtw text-center'>Trending Gadgets</h1>
        <div className='row m0'>
          <div className='col-12'>
            <div className='row'>
              {trendingProducts?.map((x, i) => {
                return (
                  <div className='col-md-6 col-lg-4' key={i} data-aos="fade-up" data-aos-duration="1000">
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
              <div className='col-md-6 col-lg-6' data-aos="flip-up" data-aos-duration="2000" data-aos-delay="300">
                <div className='card2 filler-img card h-100'>
                  <div style={{ height: "100%", minHeight: "275px", objectFit: "cover", display: "grid", placeItems: "center" }}>
                    <img src={wearables1} className="card-img-top" style={{ height: "-webkit-fill-available" }} alt="..." />
                  </div>
                </div>
              </div>
              <div className='col-md-6 col-lg-6' data-aos="flip-down" data-aos-duration="2000" data-aos-delay="300">
                <div className='card2 filler-img card h-100'>
                  <div style={{ height: "100%", minHeight: "275px", objectFit: "cover", display: "grid", placeItems: "center" }}>
                    <img src={wearables2} className="card-img-top" alt="..." />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="gapBtw theLine" style={{ width: "80%", height: "1px", background: "#d6d6d6", textAlign: "center", marginRight: "auto", marginLeft: "auto" }}></section>
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


      <div style={{ background: "var(--red)" }}>
        <div className='headphone-filler container align-items-center d-flex justify-content-between gapBtw'>
          <div className="filler-content text-light" data-aos="fade-right"
            data-aos-duration="1000">
            <section className='text-dark fw-400 fs-3'>New Arrival</section>
            <h2 className='fw-light' style={{ letterSpacing: "8px" }}><i className='fa fa-headphones-alt me-2'></i>PREMIUM SOUND</h2>

            <div style={{ background: 'linear-gradient(to top, #7c0b7c, #de41de)', paddingLeft: "4px" }}>
              <ul className='ps-3' style={{ background: "var(--red)" }}>
                <li>
                  Surround sound experience
                </li>
                <li>Noise reduction</li>
                <li>Noise isolation</li>
              </ul>
            </div>

            <span style={{ color: "var(--yellow)" }}>Like You, We Love Music </span>
            <span>
              And we believe a Headphone is more than just an instrument for sound. It’s the key to a mind-blowing moment of emotion, bringing you closer to your favourite artist, and yourself.
            </span>

            <div className='my-2'>
              <a href="/category/headphones" className="xbox-btn" style={{ border: "3px solid #000", background: "inherit" }} target="_blank">
                Explore more
                <i className="fas fa-chevron-right"></i>
              </a>
            </div>
          </div>
          <img src={headphone2} alt="shoppitt" width="50%" data-aos="fade-left" data-aos-duration="1000" />
        </div>
      </div>


      {/* PRODUCT 2 */}
      <div className='container gapBtw blackCards'>
        <h1 style={{ color: "#151515", fontFamily: "monospace" }} className='gapBtw text-center'>Curated just for YOU</h1>
        <div className='row m0'>
          <div className='col-12'>
            <div className='row'>
              {
                Object.keys(curatedProducts).map((key, i) => {
                  return (
                    <div className='col-md-6 col-lg-4 d-flex justify-content-center my-3' key={i}>
                      <div className='cardN' data-category={key}>
                        <img
                          src={curatedProducts[key].displayImage || curatedProducts[key].image}
                          className='card__img' alt='shoppitt' />
                        <h2 className='card__title'>{curatedProducts[key].displayName}</h2>
                        <div className='card__content'>                     
                          <div className='card__discount'>
                            <button className='btn btn-outline-warning text-light'>{curatedProducts[key].discount}% discount</button>
                          </div>
                        </div>
                        <Link to={`/products/${curatedProducts[key]._id}`} className='card__link'>Buy Now</Link>
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


      {/* LAPTOP BANNER */}
      {/* <div className="container gapBtw">
        <div className="page">
          <div className="left">
            <h1>Get yourself a yoga Laptop</h1>
            <p className='page-text'>Lenovo's remarkable new personal computer</p>
            <button>See it in action</button>

          </div>
          <div className="right">
            <div className="img">
              <img alt='shoppitt' src={products?.[4].image} width="72%" />
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
      {/* LAPTOP BANNER */}
    </>
  )
}

export default Homepage