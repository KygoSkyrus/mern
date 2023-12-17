/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { invokeToast } from '../redux/toastSlice';
import { findSubString, getDateStr } from './../Utility';
import Nav from './Nav';
import BagLoader from '../loaders/BagLoader'
import Header from './Header';

let allUsers;
const Users = () => {

    const dispatch = useDispatch()
    const [users, setUsers] = useState()
    const [searchedQuery, setSearchedQuery] = useState()

    useEffect(() => {
        let resp;
        fetch(`/api/admin/getusers`)
            .then(response => {
                resp = response
                return response.json()
            })
            .then(res => {
                if (resp.status === 200) {
                    setUsers(res.data)
                    allUsers = res.data;
                } else {
                    dispatch(invokeToast({ isSuccess: false, message: res.message }))
                }
            })
    }, [])

    useEffect(() => {
        let searchedUser = allUsers?.filter(x => {
            return (
                findSubString(x.firstname, searchedQuery) ||
                findSubString(x.lastname, searchedQuery) ||
                findSubString(x.email, searchedQuery)
            )
        })
        setUsers(searchedUser)
    }, [searchedQuery])

    return (
        <>
            <Nav />
            <div >
                <Header heading="Users" icon="fa-user" setSearchedQuery={setSearchedQuery} />
                {users ?
                    <div className="container-fluid px-0 admin-table-grid">
                        <div className="table-responsive-md">
                            <table className="table table-hover">
                                <thead className="border-bottom bg-body">
                                    <tr>
                                        <th scope="col" width="50"></th>
                                        <th scope="col" width="30"></th>
                                        <th scope="col" className="small fw-normal text-center">First Name</th>
                                        <th scope="col" className="small fw-normal text-center">Last Name</th>
                                        <th scope="col" className="small fw-normal text-center">Email Id</th>
                                        <th scope="col" className="small fw-normal text-center">Orders</th>
                                        <th scope="col" className="small fw-normal text-center">Joined</th>
                                        <th scope="col" className="small fw-normal"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.map(x => {
                                        return (
                                            <tr key={x._id}>
                                                <th scope="row" className="align-middle">
                                                    <div className='text-center'>
                                                        {/* <i className="fa fa-expand small text-body pointer"></i> */}
                                                        <i className="fa fa-circle fa-fw me-2 text-indigo"></i>
                                                    </div>
                                                </th>

                                                <td className="ps-3 align-middle text-center text-capitalize">
                                                    {/* <div className="align-items-center avatars__item bg-white d-flex justify-content-center pointer text-secondary"
                                                        style={{ background: `url(${x.avtar})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", }}></div> */}
                                                        <img src={x.avtar} alt='' width="30px" height="30px" className="align-items-center avatars__item bg-white d-flex justify-content-center pointer text-secondary" />
                                                </td>

                                                <td className="ps-3 align-middle text-center text-capitalize">
                                                    {x.firstname}
                                                </td>

                                                <td className="align-middle text-center text-capitalize">
                                                    {x.lastname}
                                                </td>

                                                <td className="align-middle text-center" >
                                                    {x.email}
                                                </td>

                                                <td className="align-middle text-center" >
                                                    {x.orders.length}
                                                </td>

                                                <td className="align-middle text-center dateStr">
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
        </>
    )
}

export default Users