import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { setToastStatus,setToastContent,toastVisibility } from './redux/todoSlice';
import { isUserLoggedIn ,setUserDetails} from './redux/userSlice';

import LoginImg from "./../../assets/images/newImg/collections/login.png"

import { data } from '../../assets/state-city';

const states=['Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal']

const User = () => {


    const dispatch=useDispatch();
    const [user, setUser] = useState({})
    const userDetail = useSelector(state => state.user.user)
    const userLoggedIn = useSelector(state => state.user.isUserLoggedIn)

    // console.log('jask', userDetail,userLoggedIn)


    const[address,setAddress]=useState({house:undefined,street:undefined,state:undefined,city:undefined,pincode:undefined,})


    
   const updateAddress=()=>{
       console.log('address---',address)
   }





    useEffect(() => {
        if (userDetail ) {
            setUser({ ...user, email: userDetail.email, photo: userDetail.avtar, firstname: userDetail.firstname, lastname: userDetail.lastname })
            console.log(user)
        } else {
            setUser(undefined)
        }

    }, [])
    // console.log(user)

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
                    <div class="row my-4">
                        <div class="col-md-4 align-self-end" >
                            <div className='row'>
                                <div className='col-md-9 m-auto text-center'>
                                    <img src={userDetail?.avtar} alt="" class="img-fluid t-minw-215 rounded" style={{ maxHeight: "223px",width: "223px"}} />
                                    <h5 className='my-2 mb-3 text-capitalize'>{userDetail?.firstname}&nbsp;{userDetail?.lastname}</h5>
                                    <button className='btn btn-outline-danger w-100' onClick={signOut}>Sign out</button>
                                </div>
                            </div>

                        </div>

                        <div class="col-md-8 pe-5" >

                            <form class="row g-3" action='/api/updatedaddress' method='POST'>
                                <div class="col-md-6">
                                    <label for="inputEmail4" class="form-label">First name</label>
                                    <input type="text" value={userDetail?.firstname} class="form-control" id="inputEmail4" style={{cursor: "not-allowed"}} />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputPassword4" class="form-label">Last name</label>
                                    <input type="text" value={userDetail?.lastname} class="form-control" id="inputPassword4" style={{cursor: "not-allowed"}} />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputEmail4" class="form-label">Email</label>
                                    <input type="email" value={userDetail?.email} class="form-control" id="inputEmail4" style={{cursor: "not-allowed"}} />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputEmail4" class="form-label">Phone</label>
                                    <input type="number" name='phone' class="form-control" id="inputEmail4" />
                                </div>
                                {/* <div class="col-md-6">
                        <label for="inputPassword4" class="form-label">Password</label>
                        <input type="password" class="form-control" id="inputPassword4" />
                    </div> */}
                                <div class="col-6">
                                    <label for="inputAddress" class="form-label">House/Apartment</label>
                                    <input type="text" name='home' class="form-control" id="inputAddress" placeholder="" />
                                </div>
                                <div class="col-6">
                                    <label for="inputAddress" class="form-label">Street/Locality</label>
                                    <input type="text" name='street' class="form-control" id="inputAddress" placeholder="" />
                                </div>
                                <div class="col-md-4">
                                    <label for="inputCity"class="form-label">City</label>
                                    <select id="inputCity" name='city' class="form-select" onChange={e=>setAddress({...address,city:e.target.value})}>
                                    <option selected>Select City</option>
                                        {data[address.state]?.map(x=>{
                                            return(
                                                <option>{x}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <label for="inputState" class="form-label">State</label>
                                    <select id="inputState" class="form-select" name='state' onChange={e=>setAddress({...address,state:e.target.value})}>
                                        <option selected>Select state</option>
                                        {states.map(x=>{
                                            return(
                                                <option>{x}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div class="col-md-2">
                                    <label for="inputZip" class="form-label">Zip</label>
                                    <input type="text" name='pincode' class="form-control" id="inputZip" />
                                </div>
                                <div class="col-md-2">
                                    <label for="inputZip" class="form-label">Country</label>
                                    <input type="text" value="India" name='country' class="form-control" id="inputZip" style={{cursor: "not-allowed"}} />
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
                                    <button type="submit" class="btn btn-outline-warning w-100" >Update</button>
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