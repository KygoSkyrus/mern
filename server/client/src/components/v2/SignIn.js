import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { invokeToast } from './redux/toastSlice';
import { goWithGoogle, signinAPI,defaultAvatar } from './Utility';
import loginImg from "./../../assets/images/login-cover.svg"
import SignInForm from './SignInForm';

const SignIn = ({ firebaseApp }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userCredentials, setUserCredentials] = useState({ email: '', password: '',username:'' });
    const [phone, setphone] = useState();
    const [otp, setOtp] = useState(["", "", "", "", "", ""])


    //FIREBASE_________________________________
    // const app = initializeApp(firebaseConfig);
    const auth = getAuth();


    // import { getAuth, signOut } from "firebase/auth";
    //     const auth = getAuth();
    // signOut(auth).then(() => {
    //   // Sign-out successful.
    // }).catch((error) => {
    //   // An error happened.
    // });


    function OTPInput() {

        console.log('otpinputr3')


        const newOtpValues = [...otp]

        const inputs = document.querySelectorAll('#otp > *[id]');
        console.log('inp', inputs)

        for (let i = 0; i < inputs.length; i++) {

            inputs[i].addEventListener('keyup', function (event) {
                if (event.key === "Backspace") {
                    inputs[i].value = '';
                    newOtpValues[i] = '';//setting otp state
                    setOtp(newOtpValues)//setting otp state
                    //sets the current controller to previous input on clearing
                    if (i !== 0) {
                        inputs[i - 1].focus();
                    }
                } else {
                    //for the last input and if its not empty
                    // if (i === inputs.length - 1 && inputs[i].value !== '') {
                    //     return true;
                    // } else 
                    if (event.keyCode > 47 && event.keyCode < 58) {
                        //if user enters any digits
                        inputs[i].value = event.key;
                        newOtpValues[i] = event.key;//setting otp state
                        setOtp(newOtpValues)//setting otp state
                        //send the cntroller to next input if its not last input
                        if (i !== inputs.length - 1) inputs[i + 1].focus();
                        event.preventDefault();
                    } else if (event.keyCode > 64 && event.keyCode < 91) {
                        //if user enters any letters
                        inputs[i].value = String.fromCharCode(event.keyCode);
                        newOtpValues[i] = String.fromCharCode(event.keyCode);//setting otp state
                        setOtp(newOtpValues)//setting otp state
                        if (i !== inputs.length - 1) inputs[i + 1].focus();
                        event.preventDefault();
                    }
                }
            });
        }


    }

    const loginWithNumber = async (e) => {
        e.preventDefault(e)

        auth.useDeviceLanguage();
        //FIREBASE_________________________________


        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // onSignInSubmit();
            }
        }, auth);

        let appVerifier = window.recaptchaVerifier;

        onSignInSubmit(appVerifier)
        console.log('phone', phone)

        function onSignInSubmit(appVerifier) {

            console.log('inside xyz', appVerifier, phone)
            signInWithPhoneNumber(auth, '+91 ' + phone, appVerifier)
                .then((confirmationResult) => {
                    console.log('confirmation rsult', confirmationResult)
                    // SMS sent. Prompt user to type the code from the message, then sign the

                    //here you have to show the otp inputs 
                    window.confirmationResult = confirmationResult;
                    // ...
                }).catch((error) => {
                    console.log(error)
                    // Error; SMS not sent
                    // ...
                });
        }

    }

    function onValidate(e) {
        console.log('mmm', otp)
        window.confirmationResult.confirm(otp.join("")).then((result) => {
            const user = result.user;
            console.log('User signed in successfully.', user)//returned data from firebase on confirmation
            // ...
        }).catch((error) => {
            alert('incorrect one time password')
            console.log("User couldn't sign in (bad verification code?)", error)
        });

        e.preventDefault()
    }



    

    return (
        <div className="modal fade signin" id="exampleModalToggle" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered w-75">
                <div className="modal-content " style={{ width: "80vw" }}>
                    <button type="button" id='closeSignin' className="btn-close d-none" data-bs-dismiss="modal" aria-label="Close"></button>

                    <div className="modal-body d-flex flex-row p-0 position-relative">
                        <div className='w-50 signin-img d-flex bg-dark' style={{ zIndex: 2 }}>
                            <img src={loginImg} alt='' />
                        </div>
                        <div className='w-50 forms-holder' >
                            <div className='signup-form d-flex justify-content-center align-items-center flex-column h-100' >
                            <SignInForm 
                                title="Create an account"
                                description="Enter your email below to create your account"
                                btnText="Create account"
                                toggleText='Exsiting user? Signin'
                                signInOrSignUp="signup"
                                toggleSignInOrSignUp="signin"
                                userCredentials={userCredentials}
                                setUserCredentials={setUserCredentials}
                                />
                            </div>

                            <div className={`signin-form d-flex justify-content-center align-items-center flex-column h-100 ${window.outerWidth < 768 && 'd-none'}`} >
                            <SignInForm 
                                title="SignIn to your account"
                                description="Enter your email and password to signin to your account"
                                btnText="Sign In"
                                toggleText='New user? Create an account'
                                signInOrSignUp="signin"
                                toggleSignInOrSignUp="signup"
                                userCredentials={userCredentials}
                                setUserCredentials={setUserCredentials}
                                />
                                {/* <h5 className='text-dark'>SignIn to your account</h5>
                                <section className='text-center'>Enter your email and password to signin to your account</section>
                                <input type="email" className="form-control my-2" name="email" id="email2" placeholder="Email address" aria-describedby="emailHelp" value={userCredentials?.email} onChange={(e) => setUserCredentials({ ...userCredentials, email: e.target.value })} />
                                <input type="password" className="form-control" id="password2" name="password" placeholder="Password*" value={userCredentials?.password} onChange={(e) => setUserCredentials({ ...userCredentials, password: e.target.value })} />
                                <button className='btn btn-outline-warning w-100 my-2' onClick={() => loginUserFirebase()}>Sign In</button>

                                <section className='my-3 text-end w-100 pointer' onClick={() => toggleSignIn('signup')}>New user? Create an account</section>
                                <section className='continue-with position-relative w-100 text-center'>
                                    <span >OR CONTINUE WITH</span>
                                    <section></section>
                                </section>

                                <button className='btn btn-outline-info w-100 m-2 d-flex justify-content-center align-items-center fs-5 text-black-50 py-1' onClick={() => goWithGoogle('signin', navigate, dispatch)}>
                                <svg width="25" height="25" viewBox="5 5 35 35" xmlns="http://www.w3.org/2000/svg" style={{height: "32px", width: "32px", marginLeft: "-8px"}}><g fill="none" fill-rule="evenodd"><path d="M31.64 23.205c0-.639-.057-1.252-.164-1.841H23v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"></path><path d="M23 32c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711h-3.007v2.332A8.997 8.997 0 0 0 23 32z" fill="#34A853"></path><path d="M17.964 24.71a5.41 5.41 0 0 1-.282-1.71c0-.593.102-1.17.282-1.71v-2.332h-3.007A8.996 8.996 0 0 0 14 23c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"></path><path d="M23 17.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C27.463 14.891 25.426 14 23 14a8.997 8.997 0 0 0-8.043 4.958l3.007 2.332c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"></path><path d="M14 14h18v18H14V14z"></path></g></svg> <span class="css-uk6cul">Google</span>
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default SignIn