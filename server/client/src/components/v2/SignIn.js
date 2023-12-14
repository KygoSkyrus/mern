import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { invokeToast } from './redux/toastSlice';
import { goWithGoogle, signinAPI, defaultAvatar } from './Utility';
import loginImg from "./../../assets/images/login-cover.svg"
import SignInForm from './SignInForm';

const SignIn = ({ firebaseApp }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
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
                                    toggleText='Exsiting user? Signin'
                                    signInOrSignUp="signup"
                                    switchTo="signin"
                                    // userCredentials={userCredentials}
                                    // setUserCredentials={setUserCredentials}
                                />
                            </div>

                            <div className={`signin-form d-flex justify-content-center align-items-center flex-column h-100`} >
                                <SignInForm
                                    title="SignIn to your account"
                                    description="Enter your email and password to signin to your account"
                                    btnText="Sign In"
                                    toggleText='New user? Create an account'
                                    signInOrSignUp="signin"
                                    switchTo="signup"
                                    // userCredentials={userCredentials}
                                    // setUserCredentials={setUserCredentials}
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