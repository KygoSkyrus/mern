/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import BagLoader from './loaders/BagLoader';
import SignInToContinue from './SignInToContinue';

import { invokeToast } from './redux/toastSlice';
import { setUserDetails } from './redux/userSlice';
import { apiCall, getAvatarUrl, inProgressLoader, signOut } from './Utility';
import { data, states } from '../../assets/state-city';

const User = () => {

    const dispatch = useDispatch();
    const userDetail = useSelector(state => state.user.user)
    const userLoggedIn = useSelector(state => state.user.isUserLoggedIn)
    const [user, setUser] = useState({})
    const [name, setName] = useState({ firstname: "", lastname: "" })
    const [address, setAddress] = useState({ house: "", street: '', city: '', pincode: '', state: '', country: '', phone: '' })
    const [selectedAvatar, setSelectedAvatar] = useState('')

    useEffect(() => {
        if (userDetail) {
            setUser({ ...user, email: userDetail.email, photo: userDetail.avtar, firstname: userDetail.firstname, lastname: userDetail.lastname })
            setName({ firstname: userDetail.firstname, lastname: userDetail.lastname })
            setSelectedAvatar(userDetail.avtar)
            setAddress({ house: userDetail.address?.house, street: userDetail.address?.street, state: userDetail.address?.state, city: userDetail.address?.city, pincode: userDetail.address?.pincode, phone: userDetail.phone })
        } else {
            setUser(undefined)
        }

    }, [userDetail])//when the data gets loaded in store

    const updateAddress = () => {

        let existingAddress = JSON.parse(JSON.stringify(userDetail.address))
        existingAddress.phone = userDetail.phone

        if (
            address.house !== existingAddress.house ||
            address.street !== existingAddress.street ||
            address.city !== existingAddress.city ||
            address.pincode !== existingAddress.pincode ||
            address.state !== existingAddress.state ||
            address.phone !== existingAddress.phone ||
            name.firstname !== userDetail.firstname ||
            name.lastname !== userDetail.lastname ||
            selectedAvatar !== userDetail.avtar
        ) {
            inProgressLoader(dispatch, true)
            let bodyData={
                firstname: name.firstname,
                lastname: name.lastname,
                avtar: selectedAvatar,
                address,
            }
            apiCall(dispatch,'/api/user/updateaddress',bodyData)
        } else {
            dispatch(invokeToast({ isSuccess: false, message: "No changes are made" }))
        }

    }

    function showAvatarEditBtn(val) {
        const editBtn = document.querySelector('.avatar-edit-btn');
        val ? editBtn.classList.remove('d-none') : editBtn.classList.add('d-none');
    }

    function setUserAvatar() {
        document.querySelector('.userAvatar').src = selectedAvatar
        document.getElementById('closeAvatarModal').click()
    }

    return (
        <>
            {userLoggedIn === null ?
                <BagLoader />
                :
                userDetail && userLoggedIn ?
                    <div className='container my-5 user-form py-3 rounded'>

                        {/* <section className='text-primary skip'>Skip for later</section> */}
                        <div className="row my-4 user-form-holder">
                            <div className="col-md-4 align-self-end" >
                                <div className='row'>
                                    <div className='col-md-9 m-auto text-center'>
                                        <div className='avatar-container position-relative d-flex justify-content-center' onMouseEnter={e => showAvatarEditBtn(true)} onMouseLeave={e => showAvatarEditBtn(false)}>
                                            <img src={userDetail?.avtar} alt="shoppitt" className="userAvatar img-fluid t-minw-215 rounded-circle" style={{ maxHeight: "223px", width: "223px" }} />
                                            <div className='avatar-edit-btn' data-bs-toggle="modal" href="#avatarModal">
                                                <i className='fa fa-edit fa-2x'></i>
                                            </div>
                                        </div>
                                        <h5 className='my-2 mb-3 text-capitalize'>{userDetail?.firstname}&nbsp;{userDetail?.lastname}</h5>
                                        <button className={`w-100 signout-btn ${window.outerWidth > 768 && " btn btn-outline-danger"}`} onClick={() => signOut(dispatch)}>{window.outerWidth > 768 ? "Sign out" : <i className='fa fa-sign-out-alt'></i>}</button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-8 pe-5" >

                                <form className="row g-3" >
                                    <div className="col-md-6">
                                        <label for="inputFirstName" className="form-label">First name</label>
                                        <input type="text" value={name?.firstname} onChange={e => setName({ ...name, firstname: e.target.value })} className="form-control" id="inputFirstName" />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="inputLastName" className="form-label">Last name</label>
                                        <input type="text" value={name?.lastname} onChange={e => setName({ ...name, lastname: e.target.value })} className="form-control" id="inputLastName" />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="inputEmail" className="form-label">Email</label>
                                        <input type="email" value={userDetail?.email} className="form-control" id="inputEmail" readOnly style={{ cursor: "not-allowed" }} />
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
                                            {states.map((x, i) => {
                                                return (
                                                    <option key={i}>{x}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label for="inputCity" className="form-label">City</label>
                                        <select id="inputCity" name='city' className="form-select" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })}>
                                            <option selected>Select City</option>
                                            {data[address.state]?.map((x, i) => {
                                                return (
                                                    <option key={i}>{x}</option>
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
                                    <div className="col-12">
                                        <button type="button" className="btn btn-outline-warning w-100" onClick={() => updateAddress()} >Update</button>
                                    </div>
                                </form>
                            </div>

                        </div>

                        <div className="modal fade " id="avatarModal" tabIndex="-1" aria-labelledby="avatarModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered w-75 m-auto">
                                <div className="modal-content " style={{ width: "80vw" }}>
                                    <button type="button" id='closeAvatarModal' className="btn-close d-none" data-bs-dismiss="modal" aria-label="Close"></button>

                                    <div className="modal-body">
                                        <div className='d-flex justify-content-center flex-wrap' style={{ zIndex: 2, gap: "10px" }}>
                                            {Array.from(Array(20).keys()).map((x, i) => {
                                                return <img src={getAvatarUrl(i + 1)} alt='shoppitt' width='50px' onClick={e => setSelectedAvatar(e.target.src)} className={`${getAvatarUrl(i + 1) === selectedAvatar ? 'slectedAvatar' : ''}`} />
                                            })}
                                            <button className='btn btn-outline-info w-100 m-2 mt-4'
                                                onClick={() => setUserAvatar()}
                                            >Select Avatar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    :
                    <SignInToContinue />
            }
        </>
    )
}

export default User