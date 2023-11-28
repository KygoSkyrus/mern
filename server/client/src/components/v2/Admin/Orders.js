import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
// import { setUserDetails } from './redux/userSlice';
// import { toastVisibility, setToastContent, setToastStatus } from './redux/todoSlice';

// import noOrder from "./../../assets/images/newImg/collections/noOrder.svg"
// import LoginImg from "./../../assets/images/newImg/collections/login.png"

import OrderDetails from './OrderDetails';

import { formatInINRwoSign } from './../Utility'
import { getDateStr } from './../Utility';
import Nav from './Nav';

const Orders = () => {

    const [orders, setOrders] = useState()
    const dispatch = useDispatch()
    const userDetail = useSelector(state => state.user.user)
    const userLoggedIn = useSelector(state => state.user.isUserLoggedIn)
    console.log('is loggedin', userLoggedIn, userDetail)

    //const detailsVisibility = useSelector(state => state.orderDetailsVisibility.visibility)// order details modal's visibility 

    const [detailsVisibility, setSDetailsVisibility] = useState(false)
    const [details, setDetails] = useState()

    useEffect(() => {
        let resp;
        fetch(`/api/admin/getorders`)
            .then(response => {
                resp = response
                return response.json()
            })
            .then(res => {
                if (resp.status === 200) {
                    console.log('2000')
                    console.log('order list reponse', res)
                    setOrders(res.data)
                    //dispatch(setUserDetails({ user: res.user }))
                } else {
                    console.log('not 2000')
                    //   dispatch(setToastStatus({ isSuccess: false }))
                    //   dispatch(toastVisibility({ toast: true }))
                    //   dispatch(setToastContent({ message: res.message }))
                }
            })
    }, [])


    const orderDetails = (x) => {
        setSDetailsVisibility(true)
        setDetails(x)
    }


    return (
        <>
        <Nav/>
            {/* THIS HEADER IS SAME FOR DASHBOARD AND this page except the filter,,,create a common header */}
            <div >
                {/* THE HEADER */}
                <div className=' dash-header'>
                    <div className="p-3 overflow-auto d-flex bg-white-custom border-bottom shadow-sm">

                        {/* <!-- Left Side--> */}
                        <div className="d-flex flex-grow-1 align-items-center">
                            <h6 className="align-self-center mb-0 me-3 fw-semibold text-nowrap">
                                Orders
                            </h6>
                            <i className="fa-solid fa-table"></i>
                        </div>

                        {/* <!-- Right Side--> */}
                        <div className="d-flex h-stack gap-1 position-relative">

                            {/* Dark Mode */}
                            <div className='btn'>
                                <input className="checkbox" type="checkbox" id="toggle" onChange={() => {
                                    document.querySelector('.adminView').classList.toggle('dark');
                                    document.querySelectorAll('.bg-white-custom').forEach(x => { x.classList.toggle('dark') })
                                }} />
                                <label className="toggle" htmlFor="toggle">
                                    <ion-icon className="icon icon--light" name="sunny-outline"></ion-icon>
                                    <ion-icon className="icon icon--dark" name="moon-outline"></ion-icon>
                                    <span className="ball"></span>
                                </label>
                            </div>
                            {/* <!-- List View --> */}
                            <a href="/projects-list.html" className="btn btn-link btn-sm rounded-circle text-secondary" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="List View">
                                <i className="fas fa-columns"></i>
                            </a>

                            {/* <!-- Grid View --> */}
                            <a href="/projects-grid.html" className="btn btn-link btn-sm rounded-circle text-secondary" aria-current="page" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="Grid View">
                                <i className="fas fa-th"></i>
                            </a>

                            {/* <!-- Table View --> */}
                            <a href="/" className="btn btn-link btn-sm rounded-circle me-3 text-secondary active" aria-current="page" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="Table View">
                                <i className="fas fa-bars"></i>
                            </a>


                            {/* <!-- Add Task/Project --> */}

                            <button className="btn btn-light btn-sm rounded-circle" data-bs-toggle="modal" data-bs-target="#modalCreateProject">
                                <i className="fas fa-plus" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="Add Project" aria-label="Add Project"></i>
                            </button>

                        </div>
                    </div>

                    <div className="px-3 py-2 hstack gap-1 overflow-auto bg-white-custom border-bottom shadow-sm">
                        <span className="badge rounded-pill py-2 pe-2 badge-add-filter" data-bs-toggle="modal" href="#modalStart" role="button">
                            Select Filter <i className="fa fa-plus ms-1"></i>
                        </span>

                        <span className="badge badge-light-light rounded-pill text-dark py-2 fw-normal">
                            <i className="fa fa-circle me-1 text-danger"></i>
                            <span className="text-body me-1">Tag</span>Usability <span className="text-body small ms-1">(12)</span>
                            <a href="/#" className="text-dark opacity-25 ms-1">
                                <i className="fa fa-times-circle"></i>
                            </a>
                        </span>

                        <a href="/#" className="badge badge-light-light text-dark rounded-pill py-2 text-decoration-none fw-normal">
                            <i className="fa fa-calendar me-1 text-muted ms-1"></i>
                            <span className="text-body me-1">Date</span>12 January 2019 <span className="text-body small ms-1">(12)</span>
                            <span className="text-dark opacity-25 ms-1">
                                <i className="fa fa-caret-down"></i>
                            </span>
                        </a>

                        <span className="badge badge-avatar badge-light-light rounded-pill text-dark py-1 d-inline-flex align-items-center fw-normal">
                            <div className="avatar-xs rounded-pill bg-dark opacity-25 small text-white d-flex align-items-center justify-content-center text-wrap small me-2">
                                <span style={{ fontSize: "10px" }}>JM</span>
                            </div>
                            <span className="text-body me-1">Person</span>Jane Marakesh <span className="text-body small ms-1">(12)</span>
                            <a href="/#" className="text-dark opacity-25 ms-2">
                                <i className="fa fa-times-circle"></i>
                            </a>
                        </span>

                        <span className="badge badge-avatar badge-light-light rounded-pill text-dark py-1 d-inline-flex align-items-center fw-normal">
                            <div className="avatar-xs rounded-pill bg-dark opacity-25 small text-white d-flex align-items-center justify-content-center text-wrap small me-2">
                                <i className="fa fa-user" style={{ fontSize: "10px" }}></i>
                            </div>
                            <span className="text-body me-1">Person</span>Maria Novakovic <span className="text-body small ms-1">(12)</span>
                            <a href="/#" className="text-dark opacity-25 ms-2">
                                <i className="fa fa-times-circle"></i>
                            </a>
                        </span>

                        <span className="badge badge-avatar badge-light-light rounded-pill text-dark py-1 d-inline-flex align-items-center fw-normal">
                            <img src="https://randomuser.me/api/portraits/women/65.jpg" className="rounded-pill me-2" alt="..." width="20" />
                            <span className="text-body me-1">Person</span>Kayla Moinse <span className="text-body small mx-1">(12)</span>
                            <a href="/#" className="text-dark opacity-25 ms-1">
                                <i className="fa fa-times-circle"></i>
                            </a>
                        </span>

                    </div>
                </div>

                {/* FILTER ROW */}


                <div className="container-fluid px-0 admin-table-grid">
                    <div className="table-responsive-md">
                        <table className="table table-hover mt-2">
                            <thead className="border-bottom">
                                <tr>
                                    <th scope="col" width="50"></th>
                                    {/* <th scope="col" width="30"></th> */}
                                    <th scope="col" className="small fw-normal text-center">Order ID</th>
                                    <th scope="col" className="small fw-normal text-center">Products</th>
                                    <th scope="col" className="small fw-normal text-center">Payment Method</th>
                                    <th scope="col" className="small fw-normal text-center">Status</th>
                                    <th scope="col" className="small fw-normal text-center">Total</th>
                                    <th scope="col" className="small fw-normal text-center">Payment Status</th>
                                    <th scope="col" className="small fw-normal text-center">Receipt</th>
                                    <th scope="col" className="small fw-normal text-center">User</th>
                                    <th scope="col" className="small fw-normal"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders ?
                                    orders.map(x => {
                                        return (
                                            <tr key={x._id}>
                                                <th scope="row" className="align-middle">
                                                    <div className='text-center'>
                                                        {/* <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /> */}
                                                        <i className="fa fa-expand small text-body pointer"
                                                            onClick={() => orderDetails(x)}
                                                        ></i>
                                                    </div>
                                                </th>

                                                <td className="align-middle">
                                                    <i className="fa fa-circle fa-fw me-2 text-indigo"></i>
                                                    <span className="text-dark pb-0">
                                                        {x.orderId}
                                                    </span>
                                                </td>
                                                <td className="align-middle ">
                                                    <div className="d-inline-flex">
                                                        <div className="avatars d-flex position-relative">

                                                            {x.products.map((y, i) => {
                                                                if (x.products.length > 4 && i === 3) {
                                                                    return (<div className="avatars__item pointer d-flex justify-content-center align-items-center bg-white text-secondary" >+{x.products.length - 3}</div>)
                                                                } else {
                                                                    if (i < 3)
                                                                        return (<div className={x.products.length === 1? "ifOne":""}>
                                                                            <div className="align-items-center avatars__item bg-white d-flex justify-content-center pointer text-secondary"
                                                                                // onMouseEnter={(e) => imagePreview(e)} onMouseLeave={(e) => hideImagePreview(e)} 
                                                                                style={{ background: `url(${y.image})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", }}></div>
                                                                        </div>)
                                                                }
                                                            })}
                                                            <section className='bg-img-preview'></section>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="ps-3 align-middle text-center">
                                                    {x.paymentMethod}
                                                </td>

                                                <td className="align-middle text-center">
                                                    {x.status}
                                                </td>

                                                <td className="align-middle text-center">
                                                    <span className="badge badge-light-light rounded-pill text-dark py-1 fw-normal  px-2">
                                                        {/* <i className="fa fa-money-bill me-1 text-warning"></i> */}
                                                        <i className="fa fa-rupee me-1 text-warning"></i>
                                                        {formatInINRwoSign.format(x.totalAmount)}
                                                    </span>
                                                </td>

                                                <td className="ps-3 align-middle text-center">
                                                    <button type="button" className=" btn btn-badge border-0 rounded-pill text-decoration-none p-0 align-self-center" style={{ height: "26px !important", width: "26px !important" }}>
                                                        {x.payment_status === "paid" ?
                                                            <span className='text-success small'>Paid</span>
                                                            : <span className='text-danger  small'>Failed</span>}
                                                    </button>
                                                </td>

                                                <td className="ps-3 align-middle text-center">
                                                    <Link to={`${x.receiptUrl}`}>Invoice</Link>
                                                </td>

                                                <td className="align-middle text-capitalize text-end">
                                                    <div className="btn-group">
                                                        <button type="button" className="me-3 btn btn-badge border-0 rounded-pill text-decoration-none p-0 d-flex align-items-center" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" style={{ height: "26px !important", width: "26px !important" }}>
                                                            <div className="avatars__item pointer me-0"
                                                                style={{ background: `url(${x.user.avtar})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", }}></div>&nbsp;
                                                            <span className='small'>{x.user?.firstname}</span>&nbsp;
                                                            <span className='small'>{x.user?.lastname}</span>
                                                        </button>
                                                    </div>
                                                </td>

                                                <td className="align-middle text-center">
                                                    <div className="btn-group ">
                                                        <button className="small" type="button" >
                                                            {getDateStr(x.createdAt)}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    : <tr className='d-flex justify-content-center align-items-center'><td><h1>...Loading</h1></td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {detailsVisibility &&
                <OrderDetails setSDetailsVisibility={setSDetailsVisibility} details={details} />}
        </>
    )
}

export default Orders