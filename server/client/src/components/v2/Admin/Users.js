import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';


import { formatInINRwoSign } from './../Utility'
import { getDateStr } from './../Utility';
import Nav from './Nav';
import BagLoader from '../BagLoader';
import Header from './Header';

const Users = () => {

    const [users, setUsers] = useState()
    const userDetail = useSelector(state => state.user.user)
    const userLoggedIn = useSelector(state => state.user.isUserLoggedIn)
    console.log('is loggedin', userLoggedIn, userDetail)



    useEffect(() => {
        let resp;
        fetch(`/api/admin/getusers`)
            .then(response => {
                resp = response
                return response.json()
            })
            .then(res => {
                if (resp.status === 200) {
                    console.log('2000')
                    console.log('user list reponse', res)
                    setUsers(res.data)
                    //dispatch(setUserDetails({ user: res.user }))
                } else {
                    console.log('not 2000')
                    //   dispatch(setToastStatus({ isSuccess: false }))
                    //   dispatch(toastVisibility({ toast: true }))
                    //   dispatch(setToastContent({ message: res.message }))
                }
            })
    }, [])




    return (
        <>
            <Nav />

            <div >
                <Header heading="Users" icon="fa-user" />

                {users ?
                    <div className="container-fluid px-0 admin-table-grid">
                        <div className="table-responsive-md">
                            <table className="table table-hover mt-2">
                                <thead className="border-bottom">
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
                                                        {/* <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /> */}
                                                        {/* <i className="fa fa-expand small text-body pointer"></i> */}
                                                        <i className="fa fa-circle fa-fw me-2 text-indigo"></i>
                                                    </div>
                                                </th>

                                                <td className="ps-3 align-middle text-center text-capitalize">
                                                    <div className="align-items-center avatars__item bg-white d-flex justify-content-center pointer text-secondary"
                                                        style={{ background: `url(${x.avtar})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", }}></div>

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

                                                <td className="align-middle text-center">
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