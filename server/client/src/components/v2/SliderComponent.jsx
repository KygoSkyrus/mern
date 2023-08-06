import React from "react";

import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import banner1 from "./../../assets/images/newImg/collections/friday-sale.jpg";
import banner2 from "./../../assets/images/newImg/collections/electro-yellow.jpg";
import banner3 from "./../../assets/images/newImg/collections/electro-grey.jpg";
import banner4 from "./../../assets/images/newImg/collections/smartwatch.jpg";

import headphone1 from './../../assets/images/newImg/collections/headphone1.webp'
import headphone2 from './../../assets/images/newImg/collections/headphone2.webp'
import headphone3 from './../../assets/images/newImg/collections/headphone3.jpg'
// import iphone1 from './../../assets/images/newImg/collections/iphone1.png'
// import iphone2 from './../../assets/images/newImg/collections/iphone2.png'
// import iphone2 from './../../assets/images/newImg/collections/Myproject.png'


const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, //how many slides will be shown
    slidesToScroll: 1, //at onescroll how many slide will be slid
    initialSlide: 1, //tells from where to start
    fade: true, //slide fades on change
    //lazyLoad: true,
    // adaptiveHeight: true,//for unequal heights
    //autoplay: true,autoplaySpeed: 2000,cssEase: "linear",// to keep playing automatically
    //pauseOnHover: true//works with autoplay and stops on hover

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
          <div className="slide">
            <img src={headphone1} alt=""  width="100%" />
          </div>
          <div className="slide">
            <img src={headphone2} alt=""  width="100%" />
          </div>
          <div className="slide">
            <img src={headphone3} alt=""  width="100%" />
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

export default SliderComponent;
