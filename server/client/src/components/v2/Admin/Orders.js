import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
// import { setUserDetails } from './redux/userSlice';
// import { toastVisibility, setToastContent, setToastStatus } from './redux/todoSlice';

// import noOrder from "./../../assets/images/newImg/collections/noOrder.svg"
// import LoginImg from "./../../assets/images/newImg/collections/login.png"

import {formatInINRwoSign} from './../Utility'

const Orders = () => {

    const [orders, setOrders] = useState()
    const dispatch = useDispatch()
    const userDetail = useSelector(state => state.user.user)
    const userLoggedIn = useSelector(state => state.user.isUserLoggedIn)
    console.log('is loggedin', userLoggedIn, userDetail)

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

    function getDateStr(date) {
        let d = new Date(date)
        return d.getDate() + "-" + (d.getMonth() + 1) + "-" + (d.getFullYear())
    }

    return (
        <>

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


                <div className=" container-fluid px-0 ">
                    <div className="table-responsive-md">
                        <table className="table table-hover mt-2">
                            <thead className="border-bottom">
                                <tr>
                                    <th scope="col" width="50"></th>
                                    {/* <th scope="col" width="30"></th> */}
                                    <th scope="col" className="small fw-normal">Order ID</th>
                                    <th scope="col" className="small fw-normal">User</th>
                                    <th scope="col" className="small fw-normal">Total</th>
                                    <th scope="col" className="small fw-normal">Products</th>
                                    <th scope="col" className="small fw-normal">Payment Method</th>
                                    <th scope="col" className="small fw-normal">Receipt</th>
                                    <th scope="col" className="small fw-normal text-end">Status</th>
                                    <th scope="col" className="small fw-normal text-center">Payment Status</th>
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
                                                        <i class="fa fa-edit font-weight-100 pointer" 
                                                        // onClick={() => handlEditProduct(x)}
                                                        ></i>
                                                    </div>
                                                </th>


                                                <td className="align-middle">
                                                    <i className="fa fa-circle fa-fw me-2 text-indigo"></i>
                                                    <span className="text-dark pb-0">
                                                        {x.orderId}
                                                    </span>
                                                </td>

                                                <td className="align-middle text-capitalize">
                                                    {x.category}
                                                    {/* get user name from the records */}
                                                </td>

                                                <td className="align-middle">
                                                    <span className="badge badge-light-light rounded-pill text-dark py-1 fw-normal pe-3 ps-1">
                                                        {/* <i className="fa fa-money-bill me-1 text-warning"></i> */}
                                                        <i className="fa fa-rupee me-1 text-warning"></i>
                                                        {formatInINRwoSign.format(x.totalAmount)}
                                                    </span>
                                                </td>

                                                <td className="align-middle">
                                                    <div className="d-inline-flex">
                                                        <div className="avatars d-flex position-relative">
                                                            {/* {x.image.map(x => {
                                                                return (<>
                                                                    <div className="avatars__item pointer" 
                                                                    // onMouseEnter={(e) => imagePreview(e)} onMouseLeave={(e) => hideImagePreview(e)} 
                                                                    style={{ background: `url(${x})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", }}></div>
                                                                    <div className='image-preview'></div>
                                                                </>
                                                                )
                                                            })} */}
                                                            <section className='bg-img-preview'></section>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="ps-3 align-middle">
                                                    {x.paymentMethod}
                                                </td>

                                                <td className="ps-3 align-middle">
                                                    <Link to={`${x.receiptUrl}`}>Invoice</Link>
                                                </td>

                                                <td className="align-middle text-end">
                                                    <div className="btn-group">
                                                        <button type="button" className="me-3 btn btn-badge border-0 rounded-pill text-decoration-none p-0 align-self-center" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" style={{ height: "26px !important", width: "26px !important" }}>
                                                            <i className="fa fa-expand small text-body"></i>
                                                        </button>

                                                        <div className="dropdown-menu shadow pt-0 rounded-3 pb-0">
                                                            {/* <!-- Right Close Button --> */}
                                                            <span className="position-absolute top-0 start-100 translate-middle" style={{ zIndex: "999" }}>
                                                                <span className="fa-stack" style={{ fontSize: " 0.7em" }}>
                                                                    <i className="fa fa-circle fa-stack-2x text-dark"></i>
                                                                    <i className="fa fa-times fa-stack-1x text-white"></i>
                                                                </span>
                                                            </span>

                                                            <div className="px-3 py-2 d-flex align-items-center bg-light small border-top">
                                                                <small> Apply people for this task</small>
                                                            </div>

                                                            <ul className="overflow-auto list-unstyled mb-0 vstack" style={{ height: "200px", gap: "1px" }}>
                                                                <li>
                                                                    <a className="dropdown-item d-flex py-2" href="/#" data-bs-toggle="button">
                                                                        <img className="avatar-sm rounded-pill me-3" src="https://randomuser.me/api/portraits/women/65.jpg" alt="" />
                                                                        <span className="flex-grow-1 align-self-center me-5">Rakesh Maraiop</span>
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a className="dropdown-item d-flex py-2" href="/#" data-bs-toggle="button">
                                                                        <div className="avatar-sm rounded-pill bg-secondary small text-white d-flex align-items-center justify-content-center text-wrap small me-3">
                                                                            <small>
                                                                                <i className="fa fa-user"></i>
                                                                            </small>
                                                                        </div>
                                                                        <span className="flex-grow-1 align-self-center me-5">Adam Sandler</span>
                                                                    </a>
                                                                </li>

                                                            </ul>

                                                            <div className="hstack p-0 d-flex align-items-center bg-light small text-muted border-top rounded-bottom">
                                                                <button type="button" className="btn btn-sm small py-2 flex-fill rounded-0 btn-link text-dark text-decoration-none m-0">
                                                                    Edit Users
                                                                </button>

                                                                <div className="vr m-0 bg-gray-600"></div>

                                                                <button type="button" className="btn btn-sm small py-2 flex-fill rounded-0 btn-link text-dark text-decoration-none m-0">
                                                                    Add Users
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    {x.rating}
                                                </td>

                                                <td className="ps-3 align-middle text-center">
                                                    <button type="button" className=" btn btn-badge border-0 rounded-pill text-decoration-none p-0 align-self-center" style={{ height: "26px !important", width: "26px !important" }}>
                                                        <i
                                                            // onClick={(e) =>setProductVisibility(e, x)} 
                                                            className={`fa fa-eye small text-body ${!x.visibility && "clr-red"}`}></i>
                                                    </button>
                                                </td>

                                                <td className="align-middle text-end">
                                                    {/* <!-- START Dropdown: Options --> */}
                                                    <div className="btn-group  dropdown ">
                                                        <button className="btn btn-link text-decoration-none btn-sm text-secondary rounded-3" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i className="fa fa-ellipsis-h fa-fw"></i>
                                                        </button>

                                                        <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="dropdownMenuButton1">
                                                            <li><h6 className="dropdown-header fw-normal">Options</h6></li>
                                                            <li>
                                                                <a className="dropdown-item gap-2 d-flex" href="/#">
                                                                    <i className="fa fa-pen fa-fw me-2 opacity-50 align-self-center"></i> Edit this Task
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a className="dropdown-item gap-2 d-flex" href="/#">
                                                                    <i className="fa fa-calendar fa-fw me-2 opacity-50 align-self-center"></i> Due Date
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a className="dropdown-item gap-2 d-flex" href="/#">
                                                                    <i className="fa fa-list fa-fw me-2 opacity-50 align-self-center"></i> Add Subtask
                                                                </a>
                                                            </li>
                                                            <li><hr className="dropdown-divider" /></li>
                                                            <li>

                                                                <button type="button" className="dropdown-item gap-2 d-flex" data-bs-toggle="modal" data-bs-target="#modalDanger" >
                                                                    <i className="fa fa-trash fa-fw me-2 opacity-50 align-self-center"></i> Delete
                                                                </button>

                                                            </li>
                                                        </ul>
                                                    </div>
                                                    {/* <!-- END Dropdown: Options --> */}
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


        </>
    )
}

export default Orders