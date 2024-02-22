/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import Nav from './Nav';
import Header from './Header';
import OrderDetails from './OrderDetails';
import BagLoader from '../loaders/BagLoader'

import { invokeToast } from '../redux/toastSlice';
import { findSubString, formatInINRwoSign, getDateStr, getTotalDocNum, inProgressLoader } from './../Utility'
import Pagination from './Pagination';

let allOrders;
const Orders = () => {

    const dispatch = useDispatch()
    const [orders, setOrders] = useState()
    const [searchedQuery, setSearchedQuery] = useState()
    const [details, setDetails] = useState()
    const [detailsVisibility, setSDetailsVisibility] = useState(false)
    const [pageNumber, setPageNumber] = useState(1); // pagination
    const [totalDocsCount, setTotalDocsCount] = useState(null); // pagination

    useEffect(() => {
        fetchOrders();
    }, [])

    useEffect(() => {
        getTotalDocNum('gettotalorderscount', setTotalDocsCount); // for pagination
        let searchedOrder = allOrders?.filter(x => {
            return (
                findSubString(x.user.firstname, searchedQuery) ||
                findSubString(x.user.lastname, searchedQuery) ||
                findSubString(x.user.email, searchedQuery) ||
                findSubString(x.orderId, searchedQuery) ||
                findSubString(x.payment_status, searchedQuery) ||
                findSubString(x.status, searchedQuery)
            )
        })
        setOrders(searchedOrder)
    }, [searchedQuery])


    function fetchOrders() {
        if (orders) {
            inProgressLoader(dispatch, true)
        }
        let resp;
        fetch(`/api/admin/getorders?limit=10&page=${pageNumber}`)
            .then(response => {
                resp = response
                return response.json()
            })
            .then(res => {
                inProgressLoader(dispatch, false)
                if (resp.status === 200) {
                    setOrders(res.data)
                    allOrders = res.data;
                } else {
                    dispatch(invokeToast({ isSuccess: false, message: res.message }))
                }
            })
    }

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
                            <table className="table table-hover">
                                <thead className="border-bottom bg-body">
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

                                                <td className="align-middle ellipsis">
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

                                                <td className="align-middle text-capitalize ps-5">
                                                    <div className="btn-group">
                                                        <button type="button" className="btn btn-badge border-0 rounded-pill text-decoration-none p-0 d-flex align-items-center" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" style={{ height: "26px !important", width: "26px !important" }}>
                                                            {/* <div className="avatars__item pointer me-0"
                                                                style={{ background: `url(${x.user.avtar})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", }}></div> */}
                                                            <img src={x.user?.avtar} alt='' width="30px" height="30px" className="avatars__item pointer me-0" />&nbsp;
                                                            <span className='small'>{x.user?.firstname}</span>&nbsp;
                                                            <span className='small'>{x.user?.lastname}</span>
                                                        </button>
                                                    </div>
                                                </td>

                                                <td className="align-middle text-center small dateStr">
                                                    {getDateStr(x.createdAt)}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <Pagination
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                            totalDocsCount={totalDocsCount}
                        />
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