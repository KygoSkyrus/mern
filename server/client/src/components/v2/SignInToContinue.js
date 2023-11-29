import React from 'react'
import LoginImg from "./../../assets/images/newImg/collections/login.png"

const SignInToContinue = () => {
    return (
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
    )
}

export default SignInToContinue