import React from 'react'
import { Link } from 'react-router-dom'
import { categoryArray, topPicksArray, socialArray } from './Utility'

import footerLogoBag from './../../assets/images/footerLogoBag.png'
import footerLogoText from './../../assets/images/footerLogoText.png'

const Footer = () => {

	return (
		<>
			<footer className="t-bg-secondary footer">
				<div className="container">
					<div className="footer-top t-pt-40 t-pb-40 ">
						<div className="row align-items-center justify-content-center justify-content-md-between">
							<div className="col-md-6 t-mb-30 mb-md-0 px-3">
								<div className="brand mx-auto mr-md-auto ml-md-0">
									<Link to="" className="t-link">
										<img src={footerLogoBag} alt='shoppitt' width="35px" height="48px" />
										<img src={footerLogoText} alt='shoppitt' width="128px" style={{ filter: "invert(1)", height: "48px" }} />
										{/* <section className="logo"></section> */}
										{/* <h6>SHOPP-ITT</h6> */}
									</Link>
								</div>
							</div>
							<div className="col-md-6 text-center">
								<div className="d-flex align-items-center justify-content-center justify-content-md-end">
									<div className="t-text-primary t-mr-16 t-h1">
										<i className="las la-headset"></i>
									</div>
									<div className="">
										<div className="text-capitalize text-light ex-sm-text">
											24/7 help center
										</div>
										<h5 className="t-mt-10 mb-0 t-blue">+12-2345678966</h5>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="footer-mid t-pt-40 t-pb-40">
						<div className="row">
							<div className="col-md-4 col-lg-2 t-mb-30 mb-lg-0">
								<h5 className="t-blue mt-0 text-capitalize">quick links</h5>
								<ul className="list">
									<li className="t-mb-10">
										<Link to="/" className="t-link text-capitalize t-link--light sm-text">
											home
										</Link>
									</li>
									<li className="t-mb-10">
										<Link to="/user" className="t-link text-capitalize t-link--light sm-text">
											profile
										</Link>
									</li>
									<li className="t-mb-10">
										<Link to="/cart" className="t-link text-capitalize t-link--light sm-text">
											cart
										</Link>
									</li>
									<li className="t-mb-10">
										<Link to="/wishlist" className="t-link text-capitalize t-link--light sm-text">
											wishlist
										</Link>
									</li>
									<li className="t-mb-10">
										<Link to="/orders" className="t-link text-capitalize t-link--light sm-text">
											orders
										</Link>
									</li>
								</ul>
							</div>
							<div className="col-md-4 col-lg-2 t-mb-30 mb-lg-0">
								<h5 className="t-blue mt-0 text-capitalize">categories</h5>
								<ul className="list">
									{categoryArray?.map((x, i) => {
										return (
											<li className="t-mb-10" key={i}>
												<Link to="" className="t-link text-capitalize t-link--light sm-text">
													{x}
												</Link>
											</li>
										)
									})}
								</ul>
							</div>
							<div className="col-md-4 col-lg-2 t-mb-30 mb-lg-0">
								<h5 className="t-blue mt-0 text-capitalize">top picks</h5>
								<ul className="list" id="footerCat">
									{topPicksArray.map((x, i) => {
										return (
											<li className="t-mb-10" key={i} >
												<Link to={`/category/${x}`} className="t-link text-capitalize t-link--light sm-text" target='_blank'>
													{x}
												</Link>
											</li>
										)
									})}
								</ul>
							</div>
							<div className="col-md-6 col-lg-3 t-mb-30 mb-lg-0">
								<h5 className="t-blue mt-0 text-capitalize">get in touch</h5>
								<p className="text-light sm-text">
									76 Street, New York NY-10001, United States of America
								</p>
								<p className="text-light sm-text">+12-2345687966</p>
								<p className="text-light sm-text mb-0">info@example.com</p>
							</div>
							<div className="col-md-6 col-lg-3 t-mb-30 mb-lg-0">
								<h5 className="t-blue mt-0 text-capitalize">follow us</h5>
								<ul className="list d-flex follow mt-3">
									{socialArray.map((x, i) => {
										return (
											<li key={i}>
												<Link to="" className="t-follow-link">
													<span className="social-counter__icon social-counter__icon--be t-mr-8">
														<span className="social-counter__icon-is">
															<i className={`fa-brands ${x}`}></i>
														</span>
													</span>
												</Link>
											</li>
										)
									})}
								</ul>
							</div>
						</div>
					</div>
					<div className="footer-bottom t-pb-40 t-pt-40">
						<div className="row">
							<div className="col-12 text-center">
								<p className="mb-0 t-blue sm-text">
									<i className="fa-sharp fa-regular fa-copyright"></i> 2023, Shopp-itt. Designed by
									<span className="t-link t-link--primary text-light" style={{ whiteSpace: "nowrap" }}>&nbsp;DHEERAJ GUPTA&nbsp;</span>
									. All Rights Reserved.
								</p>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	)
}

export default Footer