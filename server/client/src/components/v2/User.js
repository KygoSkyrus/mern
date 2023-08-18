import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'


import LoginImg from "./../../assets/images/newImg/collections/login.png"
import { useSelector } from 'react-redux';

const User = () => {


    const { state } = useLocation();
    const [user, setUser] = useState({})
    const userDetail = useSelector(state => state.user.user)
    const isUserLoggedIn = useSelector(state => state.user.isUserLoggedIn)

    console.log('jask', userDetail,isUserLoggedIn)


    useEffect(() => {

        if (userDetail ) {//it should fetch this feom store is user is signed in  
            // const { displayName, email, photo } = state;
            // console.log('user in u com[p', displayName, email, photo)
            // let names = displayName.split(" ")
            // console.log(names)
            // let lastname = ''
            // if (names.length > 1) {
            //     lastname = names[names.length - 1]
            // }

            setUser({ ...user, email: userDetail.email, photo: userDetail.avtar, firstname: userDetail.firstname, lastname: userDetail.lastname })
            console.log(user)
        } else {
            setUser(undefined)
        }
    }, [])
    console.log(user)

    const signOut = () => {
        //clear the jwt token 
        fetch('/api/signmeout')
            .then(response => response.json())
            .then(res => {
                console.log('ueuqw', res)
            })
    }


    return (
        <>
            {userDetail && isUserLoggedIn ?
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