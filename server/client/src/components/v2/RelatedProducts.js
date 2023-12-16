import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

const RealtedProducts = ({ title }) => {

  const [products, setProductList] = useState()

  useEffect(() => {
    fetch('/api/getproducts?limit=30', {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => {
        setProductList(data)
      })
  }, [])

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 8000,//in ms
    slidesToShow: 6,
    slidesToScroll: 4,
    autoplay: true, autoplaySpeed: 4000, cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };
  return (
    <div className='container bx relatedProducts' style={{ paddingBottom: "80px", marginTop: "80px" }}>
      <h4 style={{}}>{title}</h4>
      <div className='row'>
        <div className='col-12'>
          <div className='row'>
            <Slider {...settings}>
              {products?.map(x => {
                return (
                  <div className='col-md-6 col-lg-4'>
                    <div className='card2 card m-2 p-3 withborder'>
                      {/* {i + 1 === randomNum && <div className="card-tag">New Product</div>} */}
                      <div style={{ background: "#fff", height: "100%", minHeight: "200px", objectFit: "cover", display: "grid", placeItems: "center" }} className='rounded'>
                        <img src={x.image} className="card-img-top img-fluid" alt="..." />
                      </div>
                      <div className="card-body border-none p-0">
                        <section className='product-catagory'>{x.category}</section>
                        <h5 className='title' title={x.name}><a href={`/product/${x._id}`}>{x.name}</a></h5>
                        <div className="product-bottom-details">
                          <div className="product-price">
                            {x.discount !== 0 &&
                              <>
                                <span className='extra-small' style={{ color: "#ec3b3b" }}>&#8377;</span>
                                <small>
                                  {x.price}
                                </small>
                              </>
                            }
                            <span>
                              <span style={{ fontSize: "12px" }}>&#8377;</span>
                              {Math.floor(x.price - x.discount * x.price / 100)}
                            </span>
                            {x.discount !== 0 &&
                              <span className='discount-percent mx-2'>
                                {x.discount}% off
                              </span>
                            }
                          </div>
                          <div className="product-links">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RealtedProducts