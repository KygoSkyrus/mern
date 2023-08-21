import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { setToastStatus,setToastContent,toastVisibility } from './redux/todoSlice';
import { isUserLoggedIn ,setUserDetails} from './redux/userSlice';

import LoginImg from "./../../assets/images/newImg/collections/login.png"

const User = () => {


    const dispatch=useDispatch();
    const [user, setUser] = useState({})
    const userDetail = useSelector(state => state.user.user)
    const userLoggedIn = useSelector(state => state.user.isUserLoggedIn)

    console.log('jask', userDetail,userLoggedIn)


    useEffect(() => {

        if (userDetail ) {
            setUser({ ...user, email: userDetail.email, photo: userDetail.avtar, firstname: userDetail.firstname, lastname: userDetail.lastname })
            console.log(user)
        } else {
            setUser(undefined)
        }
    }, [])
    console.log(user)

    const signOut = () => {
        console.log('sign')
        let resp;
        fetch('/api/signmeout')
            .then(response => {
                resp=response;
                return response.json()})
            .then(res => {
                console.log('sign me out response', res)
                if (resp.status === 200) {
                    dispatch(isUserLoggedIn({ value: false }))
                    dispatch(setUserDetails({ user: undefined }))//clearing user details
                    dispatch(setToastStatus({ isSuccess: true }))
                }else{
                    dispatch(setToastStatus({ isSuccess: false }))
                }
                dispatch(setToastContent({ message: res.message }))
                dispatch(toastVisibility({ toast: true }))
            })
    }


    return (    
        <>
            {userDetail  && userLoggedIn?
                <div className='container my-5 user-form py-3 rounded'>

                    <section className='text-primary skip'>Skip for later</section>
                    <div class="row ">
                        <div class="col-md-4 " >
                            <div className='row'>
                                <div className='col-md-9 m-auto text-center'>
                                    <img src={userDetail?.avtar} alt="" class="img-fluid w-100 t-minw-215 rounded" />
                                    <h5 className='my-2 text-capitalize'>{userDetail?.firstname}&nbsp;{userDetail?.lastname}</h5>
                                    <button className='btn' onClick={signOut}>Sign out</button>
                                </div>
                            </div>

                        </div>

                        <div class="col-md-8 " >

                            <form class="row g-3">
                                <div class="col-md-6">
                                    <label for="inputEmail4" class="form-label">First name</label>
                                    <input type="text" value={userDetail?.firstname} class="form-control" id="inputEmail4" />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputPassword4" class="form-label">Last name</label>
                                    <input type="text" value={userDetail?.lastname} class="form-control" id="inputPassword4" />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputEmail4" class="form-label">Email</label>
                                    <input type="email" value={userDetail?.email} class="form-control" id="inputEmail4" />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputEmail4" class="form-label">Phone</label>
                                    <input type="number" class="form-control" id="inputEmail4" />
                                </div>
                                {/* <div class="col-md-6">
                        <label for="inputPassword4" class="form-label">Password</label>
                        <input type="password" class="form-control" id="inputPassword4" />
                    </div> */}
                                <div class="col-6">
                                    <label for="inputAddress" class="form-label">House/Apartment</label>
                                    <input type="text" class="form-control" id="inputAddress" placeholder="" />
                                </div>
                                <div class="col-6">
                                    <label for="inputAddress" class="form-label">Street/Locality</label>
                                    <input type="text" class="form-control" id="inputAddress" placeholder="" />
                                </div>
                                <div class="col-md-4">
                                    <label for="inputCity" class="form-label">City</label>
                                    <input type="text" class="form-control" id="inputCity" />
                                </div>
                                <div class="col-md-4">
                                    <label for="inputState" class="form-label">State</label>
                                    <select id="inputState" class="form-select">
                                        <option selected>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div class="col-md-2">
                                    <label for="inputZip" class="form-label">Zip</label>
                                    <input type="text" class="form-control" id="inputZip" />
                                </div>
                                <div class="col-md-2">
                                    <label for="inputZip" class="form-label">Country</label>
                                    <input type="text" class="form-control" id="inputZip" />
                                </div>
                                {/* <div class="col-12">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="gridCheck" />
                            <label class="form-check-label" for="gridCheck">
                                Check me out
                            </label>
                        </div>
                    </div> */}
                                <div class="col-12">
                                    <button type="submit" class="btn btn-outline-warning w-100">Update</button>
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