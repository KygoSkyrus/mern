import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import OrderDetails from './OrderDetails';
import Nav from './Nav';
import Header from './Header';
import BagLoader from '../BagLoader';

import { invokeToast } from '../redux/toastSlice';
import { findSubString, formatInINRwoSign, getDateStr } from './../Utility'

let allOrders;
const Orders = () => {

    const [orders, setOrders] = useState()
    const dispatch = useDispatch()
    const userDetail = useSelector(state => state.user.user)
    const userLoggedIn = useSelector(state => state.user.isUserLoggedIn)
    const [searchedQuery, setSearchedQuery] = useState()
    console.log('is loggedin', userLoggedIn, userDetail)


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
                    setOrders(res.data)
                    allOrders = res.data;
                } else {
                    dispatch(invokeToast({ isSuccess: false, message: res.message }))
                }
            })
    }, [])

    useEffect(() => {
        let searchedOrder = allOrders?.filter(x => {
            return (
                findSubString(x.user.firstname,searchedQuery) ||
                findSubString(x.user.lastname,searchedQuery) ||
                findSubString(x.user.email,searchedQuery) ||
                findSubString(x.orderId,searchedQuery) ||
                findSubString(x.payment_status,searchedQuery) ||
                findSubString(x.status,searchedQuery)
            )
        })
        setOrders(searchedOrder)
    }, [searchedQuery])




    const orderDetails = (x) => {
        setSDetailsVisibility(true)
        setDetails(x)
    }


    return (
        <>
            <Nav />
            {/* THIS HEADER IS SAME FOR DASHBOARD AND this page except the filter,,,create a common header */}
            <div >

                <Header heading="Orders" icon="fa-table" setSearchedQuery={setSearchedQuery} />

                {orders ?
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
                                    {orders?.map(x => {
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
                                                                        return (<div className={x.products.length === 1 ? "ifOne" : ""}>
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

                                                <td className="align-middle text-center small">
                                                    {getDateStr(x.createdAt)}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    :
                    <div style={{ height: "calc(100vh - 63px)" }}>
                        <BagLoader />
                    </div>
                }

            </div>

            {detailsVisibility &&
                <OrderDetails setSDetailsVisibility={setSDetailsVisibility} details={details} />}
        </>
    )
}

export default Orders