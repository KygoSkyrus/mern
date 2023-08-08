import React from 'react'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CategoryStripSlider = () => {
 
      const settings = {
        dots: true,
        arrows:true,
        infinite: true,
        speed: 9000,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,autoplaySpeed: 1000,cssEase: "linear",
      };
  return (
    <div className='category-strip'>
        <Slider {...settings}>
          <div className='category-pebble'>
            <h3>1</h3>
          </div>
          <div className='category-pebble'>
            <h3>1j</h3>
          </div>

          <div className='category-pebble'>
            <h3>19</h3>
          </div>
          <div className='category-pebble'>
            <h3>81</h3>
          </div>
          <div className='category-pebble'>
            <h3>71</h3>
          </div>
          <div className='category-pebble'>
            <h3>21</h3>
          </div>
          <div className='category-pebble'>
            <h3>31</h3>
          </div>
          <div className='category-pebble'>
            <h3>4</h3>
          </div>

        </Slider>
      </div>
  )
}

export default CategoryStripSlider