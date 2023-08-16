import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const User = () => {


    const { state } = useLocation();
    const [user, setUser] = useState({})


    useEffect(() => {
        if(state){
            const { displayName, email, photo } = state;
            console.log('user in u com[p', displayName, email, photo)
    
            let names = displayName.split(" ")
            console.log(names)
            let lastname = ''
            if (names.length > 1) {
                lastname = names[names.length - 1]
            }
    
            setUser({ ...user, displayName, email, photo, firstname: names[0], lastname })
            console.log(user)
        }
    }, [])


    const signOut=()=>{
        //clear the jwt token 
    }


    //     position: absolute;
    // top: -17%;
    // left: 25px;
    // background: #f9fafc;
    return (
        <>

            <div className='container my-5 user-form py-3 rounded'>

            <section className='text-primary skip'>Skip for later</section>
                <div class="row ">
                    <div class="col-md-4 " >
                        <div className='row'>
                            <div className='col-md-9 m-auto text-center'>
                                <img src={user.photo} alt="" class="img-fluid w-100 t-minw-215 rounded" />
                                <h5 className='my-2 text-capitalize'>{user.displayName}</h5>
                                <button className='btn' onClick={signOut}>Sign out</button>
                            </div>
                        </div>

                    </div>

                    <div class="col-md-8 " >

                        <form class="row g-3">
                            <div class="col-md-6">
                                <label for="inputEmail4" class="form-label">First name</label>
                                <input type="text" value={user.firstname} class="form-control" id="inputEmail4" />
                            </div>
                            <div class="col-md-6">
                                <label for="inputPassword4" class="form-label">Last name</label>
                                <input type="text" value={user.lastname} class="form-control" id="inputPassword4" />
                            </div>
                            <div class="col-md-6">
                                <label for="inputEmail4" class="form-label">Email</label>
                                <input type="email" value={user.email} class="form-control" id="inputEmail4" />
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


            <div className='container my-5'>

                {/* <form>
                    <input type="text" className="form-control my-2" placeholder="first name" />

                    <input type="text" className="form-control my-2" placeholder="last name" />


                    <input type="email" className="form-control my-2" name="email" id="email" placeholder="Email address" aria-describedby="emailHelp" />

                    <input type="number" className="form-control my-2" placeholder="phone number" />

                    <input type="text" className="form-control my-2" placeholder="house/apartment" />
                    <input type="text" className="form-control my-2" placeholder="area/locality/street" />
                    <input type="text" className="form-control my-2" placeholder="city" />
                    <input type="text" className="form-control my-2" placeholder="pincode" />
                    <input type="text" className="form-control my-2" placeholder="state" />
                    <input type="text" className="form-control my-2" placeholder="country" />


                    <button className='btn btn-outline-warning w-100' >Update account</button>
                </form> */}
            </div>
        </>
    )
}

export default User