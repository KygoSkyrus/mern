import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';


import { formatInINRwoSign } from './../Utility'
import { getDateStr } from './../Utility';
import Nav from './Nav';

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
                                {users ?
                                    users.map(x => {
                                        return (
                                            <tr key={x._id}>
                                                <th scope="row" className="align-middle">
                                                    <div className='text-center'>
                                                        {/* <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /> */}
                                                        {/* <i className="fa fa-expand small text-body pointer"></i> */}
                                                        <i className="fa fa-circle fa-fw me-2 text-indigo"></i>
                                                    </div>
                                                </th>      

                                                <td  className="ps-3 align-middle text-center text-capitalize">
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

export default Users