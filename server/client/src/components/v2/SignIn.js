import React, { useState } from 'react'

import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, sendSignInLinkToEmail, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toastVisibility, setToastContent, setToastStatus } from './redux/todoSlice';
import { isUserLoggedIn, setUserDetails } from './redux/userSlice';

import loginImg from "./../../assets/images/login-cover.svg"

//FIREBASE_________________________________
const firebaseConfig = {
    apiKey: "AIzaSyD356cys4X2N0DHboL4T8MZCDR1BuN2n88",
    authDomain: "shopp-itt.firebaseapp.com",
    projectId: "shopp-itt",
    storageBucket: "shopp-itt.appspot.com",
    messagingSenderId: "500784370915",
    appId: "1:500784370915:web:5433a992ab3e3229daa1d6",
    measurementId: "G-DVFRLB25DQ"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();


const SignIn = () => {

    const [email, setemail] = useState({});
    const [password, setpassword] = useState('');

    const [phone, setphone] = useState();
    const [otp, setOtp] = useState(["", "", "", "", "", ""])

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //hide the sign fom navbar if user is logged in

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

    const emailVerification = () => {
        console.log('eeee', email)
        const actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be in the authorized domains list in the Firebase Console.
            url: 'https://shopp-itt.firebaseapp.com',
            // This must be true.
            handleCodeInApp: true,
            // iOS: {
            //     bundleId: 'com.example.ios'
            // },
            // android: {
            //     packageName: 'com.example.android',
            //     installApp: true,
            //     minimumVersion: '12'
            // },
            // dynamicLinkDomain: 'http://shopp-itt.firebaseapp.com'
        };

        sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                window.localStorage.setItem('emailForSignIn', email);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
            });


    }





    const signinAPI = (val, email, firstname, lastname, photo) => {
        let resp;
        fetch(`/api/${val}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstname, lastname, email, photo
            })
        })
            .then(response => {
                resp = response;
                return response.json()
            })
            .then(res => {
                console.log("res.user",res.user)
                if (resp.status === 200) {
                    dispatch(setToastStatus({ isSuccess: true }))
                } else {
                    dispatch(setToastStatus({ isSuccess: false }))
                }
                document.getElementById('closeSignin').click()//closing the modal

                dispatch(toastVisibility({ toast: true }))
                dispatch(setToastContent({ message: res.message }))
                if (res.is_user_logged_in) {
                    dispatch(isUserLoggedIn({ value: true }))
                    dispatch(setUserDetails({ user: res.user }))
                }
            })
    }

    const goWithGoogle = (val) => {

        //with this the two things that google does for us is that it authentiicates the email id and make sure that no on uses soeonelse's id ,on signup you will have to chekc is the account already exist,,if dont only then create the account ,,,,on signin you have to check the same if the user even exist and if it does exist then resturn response that user exist and set the jwt
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result)
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                //console.log(token, result.user);// The signed-in user info.

                //after google authentication
                if (token) {
                    let dname = result.user.displayName.split(" ")
                    let lastname = ''
                    let firstname = dname[0]
                    if (dname.length > 1) {
                        lastname = dname[dname.length - 1]
                    }

                    if (val === 'signup') {
                        signinAPI('signup', result.user.email, firstname, lastname, result.user.photoURL)
                        navigate('/user');//sending user to user page for filling out other details
                    } else {
                        signinAPI('signin', result.user.email)
                    }
                }

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(
                    "errorCode:",
                    errorCode,
                    ",",
                    "errorMessage: ",
                    errorMessage,
                    ",",
                    "email: ",
                    email,
                    ",",
                    "credential:",
                    credential
                );
            });

    }


    const toggleSignIn = (form) => {
        console.log('djdj')
        let signin = document.querySelector('.signin-form')
        let signup = document.querySelector('.signup-form')
        if (form === 'signin') {
            signin.classList.remove('hideLoginForm')
            signup.classList.add('hideSignupForm')
        } else {
            signup.classList.remove('hideSignupForm')
            signin.classList.add('hideLoginForm')
        }
    }

    return (
        <>
            <div className="modal fade signin" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered w-75" style={{ maxWidth: "80%" }}>
                    <div className="modal-content d-flex flex-row">
                        <div className='w-50 d-flex bg-dark' style={{ zIndex: 1 }}>
                            <img src={loginImg} alt='' />
                        </div>
                        <div className='w-50'>
                            <button type="button" className="d-none" data-bs-dismiss="modal" aria-label="Close" id="closeSignin"></button>

                            <div className="modal-body h-100">
                                <div className='signup-form d-flex justify-content-center align-items-center flex-column h-100'>
                                    <h5 className='text-dark'>Create an account</h5>
                                    <section>Enter your email below to create your account</section>
                                    <input type="email" className="form-control my-2" name="email" id="email" placeholder="Email address" aria-describedby="emailHelp" value={email.signupEmail} onChange={(e) => setemail({ ...email, signupEmail: e.target.value })} />
                                    <button className='btn btn-outline-warning w-100' onClick={emailVerification}>Create account</button>

                                    <section className='my-3 text-end w-100 pointer' onClick={() => toggleSignIn('signin')}>Exsiting user? Signin</section>
                                    <section className='continue-with position-relative w-100 text-center'>
                                        <span >OR CONTINUE WITH</span>
                                        <section></section>
                                    </section>

                                    <button className='btn btn-outline-info w-100 m-2' onClick={() => goWithGoogle('signup')}>Google</button>
                                </div>

                                <div className='signin-form hideLoginForm d-flex justify-content-center align-items-center flex-column h-100'>
                                    <h5 className='text-dark'>SignIn to your account</h5>
                                    <section>Enter your email below to create your account</section>
                                    <input type="email" className="form-control my-2" name="email" id="email" placeholder="Email address" aria-describedby="emailHelp" value={email.signinEmail} onChange={(e) => setemail({ ...email, signinEmail: e.target.value })} />
                                    <input type="password" className="form-control" id="password" name="password" placeholder="Password*" value={password} onChange={(e) => setpassword(e.target.value)} />
                                    <button className='btn btn-outline-warning w-100' onClick={emailVerification}>Sign In</button>

                                    <section className='my-3 text-end w-100 pointer' onClick={() => toggleSignIn('signup')}>New user? Create an account</section>
                                    <section className='continue-with position-relative w-100 text-center'>
                                        <span >OR CONTINUE WITH</span>
                                        <section></section>
                                    </section>

                                    <button className='btn btn-outline-info w-100 m-2' onClick={() => goWithGoogle('signin')}>Google</button>
                                </div>

                                {/* <div className="padding" >
                                    <form method="POST">
                                        <div className="mb-3">
                                            <input type="email" className="form-control" name="email" id="email" placeholder="Email address*" aria-describedby="emailHelp" value={email} onChange={(e) => setemail(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="password" className="form-control" id="password" name="password" placeholder="Password*" value={password} onChange={(e) => setpassword(e.target.value)} />
                                        </div>
                                        <button type="submit" className="btn btn-outline-warning w-100" onClick={loginuser}>SIGN IN</button>
                                    </form>
                                </div> */}

                                {/* <div className="padding" >
                                    <form >
                                        <div className="mb-3">
                                            <input type="number" className="form-control" name="phone" id="phone" placeholder="Phone Number*" aria-describedby="emailHelp" value={phone} onChange={(e) => setphone(e.target.value)} />
                                        </div>
                                        <div id='sign-in-button' className='d-none'>ss</div>
                                        <div className="position-relative">
                                            <div className="p-2 text-center">
                                                <h6>Please enter the one time password <br /> to verify your account</h6>
                                                <div> <span>A code has been sent to</span> <small>*******9897</small> </div>
                                                <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2" onClick={e => OTPInput(e)}>
                                                    <input className="m-2 text-center form-control rounded" type="text" id="first" maxLength="1" />
                                                    <input className="m-2 text-center form-control rounded" type="text" id="second" maxLength="1" />
                                                    <input className="m-2 text-center form-control rounded" type="text" id="third" maxLength="1" />
                                                    <input className="m-2 text-center form-control rounded" type="text" id="fourth" maxLength="1" />
                                                    <input className="m-2 text-center form-control rounded" type="text" id="fifth" maxLength="1" />
                                                    <input className="m-2 text-center form-control rounded" type="text" id="sixth" maxLength="1" />
                                                </div>
                                                <div className="mt-4"> <button className="btn btn-danger px-4 validate" onClick={e => onValidate(e)}>Validate</button> </div>
                                            </div>
                                        </div>

                                        <button className="btn btn-outline-warning w-100" onClick={loginWithNumber}>LOG IN</button>
                                    </form>
                                </div> */}


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn