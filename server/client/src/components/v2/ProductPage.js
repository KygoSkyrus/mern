import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setUserDetails } from './redux/userSlice';
import { toastVisibility, setToastContent, setToastStatus } from './redux/todoSlice';
const ProductPage = () => {

    const { productId } = useParams()
    const prodImage = useRef()
    const dispatch = useDispatch()
    const [product, setProduct] = useState()

    console.log('product id', productId)
    useEffect(() => {
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

    const addToCart = () => {
        let resp;
        fetch(`/api/addtocart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId
            }),
        })
            .then(response => {
                resp = response
                return response.json()
            })
            .then(res => {
                console.log('res add to cart',res)
                if (resp.status === 200) {
                    dispatch(setToastStatus({ isSuccess: true }))
                    dispatch(setUserDetails({ user: res.user }))
                } else {
                    dispatch(setToastStatus({ isSuccess: false }))
                }
                dispatch(toastVisibility({ toast: true }))
                dispatch(setToastContent({ message: res.message }))
                console.log('response add tocart', res)
            })
    }

    return (
        <>
            {product ?
                <div className='container my-5'>
                    <div class="row t-mb-30">
                        <div class="col-md-6 p-img-sticky" >
                            <div class="product--left-img t-flex-100 t-mb-30 mb-md-0">
                                <div className='row'>
                                    <div className='additional-images row col-md-2'>
                                        {product.image.map((x, i) => {
                                            return (
                                                <img src={x} alt="" class={`optional-img img-fluid w-100 t-minw-215 pointer  ${i === 0 && "selected-border"}`} onClick={e => setImage(e)} />
                                            )
                                        })}
                                    </div>
                                    <div className='col-md-9'>
                                        <img src={product.image[0]} ref={prodImage} alt="" class="img-fluid w-100 t-minw-215" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="product--right-content t-flex-100">
                                <ul class="list d-flex align-items-center ps-0">
                                    <li class="t-mr-16">
                                        <a class="t-link t-link--light tag tag--skew tag-epsilon text-uppercase" href="/category/lifestyle">
                                            <span class="tag__skew-reverse">{product.category}</span>
                                        </a>
                                    </li>
                                    <li class="t-mr-16">
                                        <span class="t-link t-link--secondary ex-sm-text text-capitalize">
                                            <span class="las la-clock sm-text"></span>10 min read
                                        </span>
                                    </li>

                                </ul>
                                <h4 class="post__title t-mt-10 t-md-34-lg-1875">
                                    <a class="t-link t-link--secondary" href="/">{product.name}</a>
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
                                    <button className='btn cart-btn' onClick={addToCart}>Add to cart</button>
                                    <button className='btn wishlist-btn'><i class="fa fa-heart"></i></button>
                                </div>

                                <div class="mt-4 offers">
                                    <h5 class="grey mb-3"><u>Available offers</u></h5>
                                    <p><i class="fa fa-tag text-success"></i> &nbsp;<b>Special Price</b> Get extra 16% off (price inclusive of discount) <b class="text-primary">T&amp;C</b></p>
                                    <p><i class="fa fa-tag text-success"></i> &nbsp;<b>Bank Offer</b> 10% off on XYZ Bank Debit Cards, up to ₹1250. On orders of ₹5000 and above <b class="text-primary">T&amp;C</b></p>
                                    <p><i class="fa fa-tag text-success"></i> &nbsp;<b>Bank Offer</b> 15% Instant discount on first Pay Later order of ₹500 and above <b class="text-primary">T&amp;C</b></p>
                                </div>

                                <div class="mt-4 services">
                                    <h6 class="grey mb-3">
                                        <u>Services</u>
                                    </h6>
                                    <p><i class="fa fa-sync text-primary"></i>&nbsp; 14 Days Return Policy</p>
                                    <p><i class="fas fa-money-bill text-success"></i>&nbsp; Cash on Delivery available</p>
                                </div>

                                <div className='description'>
                                    <h5 class="grey mb-3">Description</h5>
                                    <p class="mb-0 d-none d-lg-block ">
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
                <div>...Loading your product</div>}
            {/* <div className='container bx'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='row'>
                            <div className='col-md-6 col-lg-6'>
                                <div className='prod-left'>
                                    <img src={product?.image[0]} alt=''/>

                                </div>
                            </div>
                            <div className='col-md-6 col-lg-6'>
                                <div className='prod-right'>
                                    <h1>{product?.name}</h1>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default ProductPage