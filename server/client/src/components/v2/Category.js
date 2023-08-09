import React from 'react'
import { useParams } from 'react-router-dom'

import dummyImg from "./../../assets/images/newImg/products/goldPhone_4d019155-e7a9-4072-8d7a-df659785f41705c1.png"

const Category = () => {
    const { categoryId } = useParams()

    console.log('in cat', categoryId)

    return (
        <>
            <div>Category</div>

            <div className='container bx'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='row'>

                            <div className='col-md-6 col-lg-4'>

                                <div className='card2 card'>
                                    <img src={dummyImg} className="card-img-top" alt="..." />
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

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Category