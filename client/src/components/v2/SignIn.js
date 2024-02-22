import React from 'react'

import SignInForm from './SignInForm';
import loginImg from "./../../assets/images/login-cover.svg"

const SignIn = () => {

    return (
        <div className="modal fade signin" id="exampleModalToggle" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered w-75">
                <div className="modal-content " style={{ width: "80vw" }}>
                    <button type="button" id='closeSignin' className="d-none" data-bs-dismiss="modal" aria-label="Close"><i className='fa fa-times'></i></button>

                    <div className="modal-body d-flex flex-row p-0 position-relative">
                        <div className='w-50 signin-img d-flex bg-dark' style={{ zIndex: 2 }}>
                            <img src={loginImg} alt='shoppitt' />
                        </div>
                        <div className='w-50 forms-holder' >
                            <div className={`signup-form d-flex justify-content-center align-items-center flex-column h-100 ${window.outerWidth < 768 && 'd-none'}`} >
                                <SignInForm
                                    title="Create an account"
                                    description="Enter your email below to create your account"
                                    btnText="Create account"
                                    toggleText='Exsiting user? SignIn'
                                    signInOrSignUp="signup"
                                    switchTo="signin"
                                />
                            </div>

                            <div className={`signin-form d-flex justify-content-center align-items-center flex-column h-100`} >
                                <SignInForm
                                    title="SignIn to your account"
                                    description="Enter your email and password to sign in to your account"
                                    btnText="Sign In"
                                    toggleText='New user? Create an account'
                                    signInOrSignUp="signin"
                                    switchTo="signup"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn