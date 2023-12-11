import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import BagLoader from './loaders/BagLoader';
import SignInToContinue from './SignInToContinue';

import { invokeToast } from './redux/toastSlice';
import { debouncedApi, inProgressLoader, updatewishlist } from './Utility';
import wishlistImg from "./../../assets/images/newImg/collections/wishlistImg.gif"
import RelatedProducts from './RelatedProducts';

const Wishlist = () => {

  const dispatch = useDispatch()
  const wishlistItems = useSelector(state => state.user.user.wishlist)
  const userDetail = useSelector(state => state.user.user)
  const userLoggedIn = useSelector(state => state.user.isUserLoggedIn)
  const [products, setProducts] = useState()

  useEffect(() => {
    console.log(wishlistItems, userLoggedIn)
    let resp;
    if (wishlistItems.length > 0) {
      console.log('333')
      fetch('/api/user/getwishlistitems', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ids: wishlistItems
        }),
      })
        .then(response => {
          resp = response;
          return response.json()
        })
        .then(res => {
          if (resp.status === 200) {
            setProducts(res.items)
          } else {
            // invokeToast(dispatch,false,res.message)
            dispatch(invokeToast({ isSuccess: false, message: res.message }))
          }
        })
    }

  }, [wishlistItems])


  const addToCart = (productId) => {
    inProgressLoader(dispatch, true)
    debouncedApi(productId, dispatch)
  }

  return (
    <>
      {userLoggedIn === null ?
        <BagLoader />
        :
        userDetail && userLoggedIn ?
          (wishlistItems?.length > 0 ?
            (products ?
              <div className='container wi-page  my-5'>
                <h6 className='text-center my-5 d-flex justify-content-center align-items-center'>My Wishlist&nbsp;
                  <i className='fa fa-heart text-danger'></i>
                </h6>
                <div className="row justify-content-center">
                  <div className="col-lg-9 t-mb-30 mb-lg-0 theSection" >
                    <div className="row ">
                      <div className="col-12">
                        <div className="row wi-holder">
                          <div className='row mb-3 p-2 pb-0 border-bottom wList-heading'>
                            <div className="col-md-2"></div>
                            <div className="col-md-10">
                              <div className='d-flex flex-column justify-content-between h-100'>
                                <div className='row d-flex justify-content-between'>
                                  <div className="col-md-4">
                                    <h6>
                                      Item
                                    </h6>
                                  </div>
                                  <div className="col-md-2">
                                    <h6>
                                      Price
                                    </h6>
                                  </div>
                                  <div className="col-md-2">
                                    <h6>
                                      Availability
                                    </h6>

                                  </div>
                                  <div className="col-md-2">
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                          {products?.map((x, i) => {
                            return (
                              <>
                                <div key={x._id} className='row  p-2 wi'>
                                  <div className="col-md-2 wi-img">
                                    <div className='d-flex justify-content-center'>
                                      <img src={x.image} alt='' className={`img-fluidt-minw-215 ${x.stock === 0 ? 'grayscale' : ''}`} style={{ maxHeight: "80px" }} />
                                    </div>
                                  </div>

                                  <div className="col-md-10 wi-detail">
                                    <div className='d-flex flex-column justify-content-between h-100'>
                                      <div className='row d-flex justify-content-between'>

                                        <div className="col-md-4 wi-name">
                                          <Link to={`/product/${x._id}`} style={{ color: "inherit" }}>
                                            <h6>
                                              {x.name}
                                              {/* {x.rating} */}
                                            </h6>
                                          </Link>
                                        </div>
                                        <div className="col-md-2 wi-price">
                                          <div className='d-flex align-items-end flex-column' style={{ width: "fit-content" }}>
                                            <section>
                                              <span style={{ fontSize: "12px" }}>&#8377;</span>
                                              <span className='fs-6'>{Math.floor(x.price - x.discount * x.price / 100)}</span>
                                            </section>
                                            {x.discount !== 0 &&
                                              <section style={{ fontWeight: "400", color: "#ff4460", lineHeight: "2px" }}>
                                                <span style={{ fontSize: "10px" }}>&#8377;</span>
                                                <span className='fs-7 extra-small' style={{ textDecoration: "line-through" }}>{x.price}</span>
                                              </section>
                                            }

                                          </div>
                                        </div>
                                        <div className="col-md-2 wi-stock">
                                          {x.stock > 0 ? <span className='text-success'>In stock</span>
                                            : <span className='text-danger'>Out of stock</span>}
                                        </div>

                                        <div className="col-md-2 wi-remove">
                                          <button className={`btn btn-warning px-4 rounded-pill text-light ${x.stock === 0 ? 'notAllowed' : ''}`} onClick={() => addToCart(x._id)} disabled={x.stock === 0 ? true : false}>Add to cart</button>

                                          <div className='d-flex justify-content-end mt-2 ' style={{ marginRight: "-41px" }}>
                                            <u><span
                                              onClick={() => updatewishlist(x._id, dispatch)}
                                              className='me-4 pointer'>Remove <i className="fa fa-trash fa-sm "></i></span></u>
                                          </div>
                                          {/* <button className="btn btn-danger ms-2 rounded-pill text-light"><i className="fa fa-trash fa-sm"></i></button> */}
                                        </div>

                                      </div>

                                    </div>
                                  </div>

                                </div>
                                <div className='d-flex justify-content-end mb-3 border-bottom pb-3 wi-divider'></div>
                              </>
                            )
                          })}

                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              :
              <BagLoader />
            )
            :
            <div className='d-flex flex-column align-items-center no-item-block'>
              <div className='d-flex justify-content-center align-items-center'>
                <img src={wishlistImg} className='no-data-img' alt='' />
              </div>
              <h5 className='text-dark mt-2'>Your wishlist is empty</h5>
              <span className='text-center'>
                Looks like you have not added anything to your wishlist. Go ahead & explore top categories
              </span>
              <button className='btn my-4 btn-outline-warning'>Continue shopping</button>
            </div>
          )
          :
          <SignInToContinue />
      }

      <RelatedProducts title="You may also like" />

    </>
  )
}

export default Wishlist