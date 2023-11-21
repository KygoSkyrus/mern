import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { setToastStatus, setToastContent, toastVisibility } from './redux/todoSlice';
import { isUserLoggedIn, setUserDetails } from './redux/userSlice';

import LoginImg from "./../../assets/images/newImg/collections/login.png"

import { data } from '../../assets/state-city';

const states = ['Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal']

const User = () => {


    const dispatch = useDispatch();
    const userDetail = useSelector(state => state.user.user)
    const userLoggedIn = useSelector(state => state.user.isUserLoggedIn)
    const [user, setUser] = useState({})
    const [address, setAddress] = useState({ house: "", street: '', city: '', pincode: '', state: '',country:'', phone: '' })

    
    const updateAddress = () => {
        console.log('address---', address)
        console.log('userDetail',userDetail)

        let existingAddress = JSON.parse(JSON.stringify(userDetail.address))
        existingAddress.phone = userDetail.phone
        // existingAddress.phone = userDetail.phone? userDetail.phone : ""

        // console.log('before',  
        // address.house,existingAddress.house +"\n"+
        // address.street,existingAddress.street +"\n"+
        // address.city,existingAddress.city +"\n"+
        // address.pincode,existingAddress.pincode +"\n"+
        // address.state,existingAddress.state +"\n"+
        // address.phone,existingAddress.phone +"\n"
        // )

        if(
            address.house!==existingAddress.house ||
            address.street!==existingAddress.street ||
            address.city!==existingAddress.city ||
            address.pincode!==existingAddress.pincode ||
            address.state!==existingAddress.state ||
            address.phone!==existingAddress.phone
        ){
            let resp;
            fetch('/api/updatedaddress', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    address
                }),
            })
                .then(response => {
                    resp = response;
                    return response.json()
                })
                .then(res => {
                    console.log('update address response', res)
                       if (resp.status === 200) {
                           dispatch(setUserDetails({ user: res.user }))//clearing user details
                           dispatch(setToastStatus({ isSuccess: true }))
                       }else{
                           dispatch(setToastStatus({ isSuccess: false }))
                       }
                       dispatch(setToastContent({ message: res.message }))
                       dispatch(toastVisibility({ toast: true }))
                })
        } else {
            alert('No changes applied!!')
        }

    }


    useEffect(() => {
        if (userDetail) {
            setUser({ ...user, email: userDetail.email, photo: userDetail.avtar, firstname: userDetail.firstname, lastname: userDetail.lastname })
            setAddress({ house: userDetail.address?.house, street: userDetail.address?.street, state: userDetail.address?.state, city: userDetail.address?.city, pincode: userDetail.address?.pincode, phone: userDetail.phone })
            console.log(user)
        } else {
            setUser(undefined)
        }

    }, [userDetail])//when the data gets loaded in store
    // console.log(user)


    const signOut = () => {
        console.log('sign')
        let resp;
        fetch('/api/signmeout')
            .then(response => {
                resp = response;
                return response.json()
            })
            .then(res => {
                console.log('sign me out response', res)
                if (resp.status === 200) {
                    dispatch(isUserLoggedIn({ value: false }))
                    dispatch(setUserDetails({ user: undefined }))//clearing user details
                    dispatch(setToastStatus({ isSuccess: true }))
                } else {
                    dispatch(setToastStatus({ isSuccess: false }))
                }
                dispatch(setToastContent({ message: res.message }))
                dispatch(toastVisibility({ toast: true }))
            })
    }


    return (
        <>
            {userDetail && userLoggedIn ?
                <div className='container my-5 user-form py-3 rounded'>

                    <section className='text-primary skip'>Skip for later</section>
                    <div className="row my-4 user-form-holder">
                        <div className="col-md-4 align-self-end" >
                            <div className='row'>
                                <div className='col-md-9 m-auto text-center'>
                                    <img src={userDetail?.avtar} alt="" className="img-fluid t-minw-215 rounded" style={{ maxHeight: "223px", width: "223px" }} />
                                    <h5 className='my-2 mb-3 text-capitalize'>{userDetail?.firstname}&nbsp;{userDetail?.lastname}</h5>
                                        <button className={`w-100 signout-btn ${window.outerWidth>768 && " btn btn-outline-danger"}`} onClick={signOut}>{window.outerWidth>768 ?"Sign out":<i className='fa fa-sign-out-alt'></i>}</button>
                                </div>
                            </div>

                        </div>

                        <div className="col-md-8 pe-5" >

                            <form className="row g-3" >
                                <div className="col-md-6">
                                    <label for="inputEmail" className="form-label">First name</label>
                                    <input type="text" value={userDetail?.firstname} className="form-control" id="inputEmail" style={{ cursor: "not-allowed" }} />
                                </div>
                                <div className="col-md-6">
                                    <label for="inputPassword" className="form-label">Last name</label>
                                    <input type="text" value={userDetail?.lastname} className="form-control" id="inputPassword" style={{ cursor: "not-allowed" }} />
                                </div>
                                <div className="col-md-6">
                                    <label for="inputEmail" className="form-label">Email</label>
                                    <input type="email" value={userDetail?.email} className="form-control" id="inputEmail" style={{ cursor: "not-allowed" }} />
                                </div>
                                <div className="col-md-6">
                                    <label for="inputPhone" className="form-label">Phone</label>
                                    <input type="number" name='phone' className="form-control" id="inputPhone" value={address.phone} onChange={e => setAddress({ ...address, phone: e.target.value })} />
                                </div>
                                {/* <div className="col-md-6">
                        <label for="inputPassword4" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword4" />
                    </div> */}
                                <div className="col-6">
                                    <label for="inputAddress" className="form-label">House/Apartment</label>
                                    <input type="text" name='house' className="form-control" id="inputAddress" placeholder="" value={address.house} onChange={e => setAddress({ ...address, house: e.target.value })} />
                                </div>
                                <div className="col-6">
                                    <label for="inputAddress" className="form-label">Street/Locality</label>
                                    <input type="text" name='street' className="form-control" id="inputAddress" placeholder="" value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} />
                                </div>
                                <div className="col-md-4">
                                    <label for="inputState" className="form-label">State</label>
                                    <select id="inputState" className="form-select" name='state' value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })}>
                                        <option selected>Select state</option>
                                        {states.map(x => {
                                            return (
                                                <option>{x}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label for="inputCity" className="form-label">City</label>
                                    <select id="inputCity" name='city' className="form-select" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })}>
                                        <option selected>Select City</option>
                                        {data[address.state]?.map(x => {
                                            return (
                                                <option>{x}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-2">
                                    <label for="inputZip" className="form-label">Zip</label>
                                    <input type="text" name='pincode' className="form-control" id="inputZip" value={address.pincode} onChange={e => setAddress({ ...address, pincode: e.target.value })} />
                                </div>
                                <div className="col-md-2">
                                    <label for="inputZip" className="form-label">Country</label>
                                    <input type="text" value="India" name='country' className="form-control" id="inputZip" style={{ cursor: "not-allowed" }} />
                                </div>
                                {/* <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck" />
                            <label className="form-check-label" for="gridCheck">
                                Check me out
                            </label>
                        </div>
                    </div> */}
                                <div className="col-12">
                                    <button type="button" className="btn btn-outline-warning w-100" onClick={updateAddress} >Update</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
                :
                <div className='container my-5'>
                    <div className='d-flex flex-column align-items-center m-auto' style={{ width: "fit-content" }}>

                        <div><img src={LoginImg} alt='' />
                        </div>
                        <h5 className='text-dark'>You are not logged in</h5>
                        <span className='text-center'>
                            Sign in to your account to continue
                        </span>
                        <button className='btn my-4 btn-outline-warning w-100' data-bs-toggle="modal" href="#exampleModalToggle">Sign in</button>

                    </div>
                </div>
            }
        </>
    )
}

export default User