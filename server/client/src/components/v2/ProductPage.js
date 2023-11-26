import React, { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { debouncedApi } from './Utility';
import { updatewishlist } from './Utility';

import RelatedProducts from './RealtedProducts'
import BagLoader from './BagLoader';

const ProductPage = () => {

    const { productId } = useParams()
    const prodImage = useRef()
    const dispatch = useDispatch()
    const [product, setProduct] = useState()

    const wishlistItems = useSelector(state => state.user.user.wishlist)
    const catSubcatRelation = useSelector(state => state.product.catSubcatRelation)
    console.log('catSubcatRelation', catSubcatRelation)

    useEffect(() => {
        console.log('product id', productId)
        fetch(`/api/getprodbyid/?prodId=${productId}`)
            .then(response => response.json())
            .then(res => {
                console.log('response', res.product[0])
                setProduct(res.product[0])
            })
    }, [])

    const setImage = (e) => {
        console.log('setimga', e.target.src)
        e.target.classList.add('selected-border')
        prodImage.current.src = e.target.src

        let optionalImg = document.querySelectorAll('.optional-img')
        optionalImg.forEach(x => {
            if (x !== e.target) {
                x.classList.remove("selected-border")
            }
        })
    }



    return (
        <>
            {product ?
                <div className='container my-5'>
                    <div className="row t-mb-30">
                        <div className="col-md-6 p-img-sticky" >
                            <div className="product--left-img t-flex-100 t-mb-30 mb-md-0">
                                <div className='row '>
                                    <div className='additional-images row col-md-2'>
                                        {product.image.map((x, i) => {
                                            return (
                                                <img src={x} alt="" class={`optional-img img-fluid w-100 t-minw-215 pointer  ${i === 0 && "selected-border"}`} onClick={e => setImage(e)} />
                                            )
                                        })}
                                    </div>
                                    <div className='col-md-9'>
                                        <img src={product.image[0]} ref={prodImage} alt="" className="img-fluid w-100 t-minw-215" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="product--right-content t-flex-100">
                                <h6 className='navigation-q text-capitalize'><Link to='/' >Home</Link> {catSubcatRelation[product.category] && (<><span></span> {catSubcatRelation[product.category]}</>)} <span></span> {product.category}</h6>
                                <h4 className="post__title t-mt-10 t-md-34-lg-1875">
                                    <a className="t-link t-link--secondary" href="/">{product.name}</a>
                                </h4>
                                <div className='rating-stars text-warning'>
                                    <i className="fa-solid fa-star" aria-hidden="true"></i>
                                    <i className="fa-solid fa-star" aria-hidden="true"></i>
                                    <i className="fa-solid fa-star" aria-hidden="true"></i>
                                    <i className="fa-solid fa-star-half-stroke"></i>
                                    <i className="far fa-star" aria-hidden="true"></i>
                                </div>

                                <div className='price'>
                                    <section className='d-flex align-items-center'>
                                        <span className='fs-4' style={{ fontWeight: "600" }}>
                                            <span style={{ fontSize: "12px" }}>&#8377;</span>
                                            {product.price}
                                        </span>
                                        <span className='discount-percent mx-2'>
                                            25% off
                                        </span>
                                    </section>
                                    <section className='extra-small'>
                                        M.R.P. <span style={{ color: "#ec3b3b" }} >&#8377;{product.price}</span>
                                    </section>
                                </div>

                                <div className='d-flex gap-2 mt-3'>
                                    <button className='btn buy-btn'>Buy Now</button>
                                    <button className='btn cart-btn' onClick={()=>debouncedApi(productId,dispatch)}>Add to cart</button>
                                    <button className='btn wishlist-btn' onClick={()=>updatewishlist(productId,dispatch)} title={wishlistItems?.includes(product._id) ? "Remove from wishlist" : "Add to wishlist"}>
                                        <i class={`fa fa-heart ${wishlistItems?.includes(product._id) && "text-danger"}`}></i>
                                    </button>
                                </div>

                                <div className="mt-4 offers">
                                    <h5 className="grey mb-3"><u>Available offers</u></h5>
                                    <p><i className="fa fa-tag text-success"></i> &nbsp;<b>Special Price</b> Get extra 16% off (price inclusive of discount) <b className="text-primary">T&amp;C</b></p>
                                    <p><i className="fa fa-tag text-success"></i> &nbsp;<b>Bank Offer</b> 10% off on XYZ Bank Debit Cards, up to ₹1250. On orders of ₹5000 and above <b className="text-primary">T&amp;C</b></p>
                                    <p><i className="fa fa-tag text-success"></i> &nbsp;<b>Bank Offer</b> 15% Instant discount on first Pay Later order of ₹500 and above <b className="text-primary">T&amp;C</b></p>
                                </div>

                                <div className="mt-4 services">
                                    <h6 className="grey mb-3">
                                        <u>Services</u>
                                    </h6>
                                    <p><i className="fa fa-sync text-primary"></i>&nbsp; 14 Days Return Policy</p>
                                    <p><i className="fas fa-money-bill text-success"></i>&nbsp; Cash on Delivery available</p>
                                </div>

                                <div className='description'>
                                    <h5 className="grey mb-3">Description</h5>
                                    <p className="mb-0">
                                        <ul>
                                            {product.description.split("--").map(x => {
                                                return (
                                                    <li>
                                                        <section className='disc'>&#8226;</section>

                                                        {x.trim()}
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <BagLoader />
            }
            <RelatedProducts />
        </>
    )
}

export default ProductPage