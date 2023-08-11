import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProductPage = () => {

    const { productId } = useParams()
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

    return (
        <>

            <div class="row t-mb-30">
                <div class="col-md-4">
                    <div class="post--right-img t-flex-100 t-mb-30 mb-md-0">
                        <a href="/things-you-should-keep-in-mind-after-post-pandemic">
                            <img src={product?.image[0]} alt="" class="img-fluid w-100 t-minw-215" /></a>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="post--right-content t-flex-100">
                        <ul class="list d-flex align-items-center">
                            <li class="t-mr-16">
                                <a class="t-link t-link--light tag tag--skew tag-epsilon text-uppercase" href="/category/lifestyle">
                                    <span class="tag__skew-reverse">lifestyle</span>
                                </a>
                            </li>
                            <li class="t-mr-16">
                                <span class="t-link t-link--secondary ex-sm-text text-capitalize">
                                    <span class="las la-clock sm-text"></span>10 min read
                                </span>
                            </li>
                            <li>
                                <span class="t-link t-link--secondary ex-sm-text text-capitalize">
                                    <span class="las la-calendar-alt ex-sm-text"></span>22/4/2023</span>
                            </li>
                        </ul>
                        <h4 class="post__title t-mt-10 t-md-34-lg-1875">
                            <a class="t-link t-link--secondary" href="/things-you-should-keep-in-mind-after-post-pandemic">Things you should keep in mind after post pandemic.</a>
                        </h4>
                        <p class="mb-0 d-none d-lg-block">Precautions after COVID-19</p>
                    </div>
                </div>
            </div>

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