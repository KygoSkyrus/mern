import React from "react";

import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import banner1 from "./../../assets/images/newImg/collections/friday-sale.jpg";
// import banner2 from "./../../assets/images/newImg/collections/electro-yellow.jpg";
// import banner3 from "./../../assets/images/newImg/collections/electro-grey.jpg";
// import banner4 from "./../../assets/images/newImg/collections/smartwatch.jpg";

//ALL PNG IMAGES
import headphone1 from "./../../assets/images/newImg/collections/headphone1.webp";
import headphone2 from "./../../assets/images/newImg/collections/headphone2.webp";

import iphone3 from "./../../assets/images/newImg/collections/iphone3.png";
import iphone4 from "./../../assets/images/newImg/collections/iphone4.png";
import iphone5 from "./../../assets/images/newImg/collections/iphone5.png";
import controller from "./../../assets/images/newImg/collections/controller.png";
import laptop1 from "./../../assets/images/newImg/collections/laptop1.png";
import xbox from "./../../assets/images/newImg/collections/xbox.png";

const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, //how many slides will be shown
    slidesToScroll: 1, //at onescroll how many slide will be slid
    fade: true, //slide fades on change
    autoplay: true,autoplaySpeed: 4000,cssEase: "linear",// to keep playing automatically
    // initialSlide: 1, //tells from where to start
    //lazyLoad: true,
    // adaptiveHeight: true,//for unequal heights
    //pauseOnHover: true//works with autoplay and stops on hover

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="main-banner">
        <Slider {...settings}>
          <div className="slide slide1">
            <div className="xbox-content text-light">
              <h2>Start Your Audiophile Journey Here</h2>
              <p>
              <span>Like You, We Love Music</span> And we believe a Headphone is more than just an instrument for sound. It’s the key to a mind-blowing moment of emotion, bringing you closer to your favourite artist, and yourself.
              </p>
              <a href="/#" className="xbox-btn">
                Join Now
                <i className="fas fa-chevron-right"></i>
              </a>
            </div>
            <img src={headphone1} alt="" width="100%" />
          </div>
          <div className="slide slide2">
            <div className="xbox-content text-light">
              <h2>Meet a whole new class of laptops</h2>
              <p>
              Serious capability in our most portable pro laptop. 
              <br/>
              Impressively big. Impossibly thin.
              </p>
              <a href="/#" className="xbox-btn">
                Join Now
                <i className="fas fa-chevron-right"></i>
              </a>
            </div>
            <img src={laptop1} alt="" width="100%" />
          </div>
          <div className="slide slide3">
            <div className="xbox-content text-light">
              <h2>Xbox Game Pass Ultimate</h2>
              <p>
                Xbox Game Pass Ultimate Xbox Live Gold and over 100 high-quality
                console and PC games. Play together with friends and discover
                your next favorite game.
              </p>
              <a href="/#" className="xbox-btn">
                Join Now
                <i className="fas fa-chevron-right"></i>
              </a>
            </div>
            <img src={xbox} alt="" width="100%" />
          </div>

          {/* <div>
            <div className="slide slide1"></div>
          </div>
          <div>
            <div className="slide slide2"></div>
          </div>
          <div>
            <div className="slide slide3"></div>
          </div>
          <div>
            <div className="slide slide4"></div>
          </div> */}
        </Slider>
      </div>
    </>
  );
};

export default BannerSlider;
