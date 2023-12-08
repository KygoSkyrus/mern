import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { goWithGoogle, signinAPI } from './Utility';
import loginImg from "./../../assets/images/login-cover.svg"
import { invokeToast } from './redux/toastSlice';


const SignIn = ({ firebaseApp }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });
    const [phone, setphone] = useState();
    const [otp, setOtp] = useState(["", "", "", "", "", ""])


    //FIREBASE_________________________________
    // const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    // const provider = new GoogleAuthProvider();

    function createUserAccountFirebase() {
        console.log('eee', userCredentials)
        
        createUserWithEmailAndPassword(auth, userCredentials?.email, userCredentials?.password)
            .then((response) => {
                // Signed up 
                const user = response.user;
                console.log('user cred', user)

                signinAPI('signup', user?.email, "", "", user?.photoURL, dispatch)
                navigate('/user');//sending user to user page for filling out other details
                setUserCredentials({ email: '', password: '' })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('error', errorCode, errorMessage)
                // document.getElementById('closeSignin').click()//closing the modal
                setUserCredentials({ email: '', password: '' })
                let errMsg=errorMessage;
                if(errorCode==='auth/email-already-in-use') errMsg="User already exists!!! Try Signing in instead"
                dispatch(invokeToast({ isSuccess: false, message: errMsg }))
            });
    }

    function loginUserFirebase() {

        signInWithEmailAndPassword(auth, userCredentials?.email, userCredentials?.password)
        .then(
            (response) => {
                console.log('signinresss', response,response?.user?.email)
                //   navigate("/home");
                const user = response.user;

                signinAPI('signin', user?.email, "", "", user?.photoURL, dispatch)
                navigate('/user');//sending user to user page for filling out other details
                setUserCredentials({ email: '', password: '' })
                // setemail('')
                // setpassword('')
            }
        )
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error', errorCode, errorMessage)
            // document.getElementById('closeSignin').click()//closing the modal
            // setemail('')
            // setpassword('')
            setUserCredentials({ email: '', password: '' })
            dispatch(invokeToast({ isSuccess: false, message: "Authentication Failed, Invalid email/password" }))
        });
    }

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



    //toggles between signIn and signUp form
    const toggleSignIn = (form) => {
        let signin = document.querySelector('.signin-form')
        let signup = document.querySelector('.signup-form')
        if (form === 'signin') {
            if (window.outerWidth < 768) {
                signup.classList.add('d-none')
                signin.classList.remove('d-none')
            } else {
                signup.style.left = '0'
                signin.style.right = '0'
            }
        } else {
            if (window.outerWidth < 768) {
                signup.classList.remove('d-none')
                signin.classList.add('d-none')
            } else {
                signup.style.left = '50%'
                signin.style.right = '50%'
            }
        }
        setemail('')
        setpassword('')
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
                                <h5 className='text-dark'>Create an account</h5>
                                <section className='text-center'>Enter your email below to create your account</section>
                                <input type="email" className="form-control my-2" name="email" id="email" placeholder="Email address" aria-describedby="emailHelp" value={userCredentials?.email} onChange={(e) => setUserCredentials({ ...userCredentials, email: e.target.value })} />
                                <input type="password" className="form-control" id="password" name="password" placeholder="Password*" value={userCredentials?.password} onChange={(e) => setUserCredentials({ ...userCredentials, password: e.target.value })} />
                                <button className='btn btn-outline-warning w-100 my-2' onClick={() => createUserAccountFirebase()}>Create account</button>

                                <section className='my-3 text-end w-100 pointer' onClick={() => toggleSignIn('signin')}>Exsiting user? Signin</section>
                                <section className='continue-with position-relative w-100 text-center'>
                                    <span >OR CONTINUE WITH</span>
                                    <section></section>
                                </section>

                                <button className='btn btn-outline-info w-100 m-2' onClick={() => goWithGoogle('signup', navigate, dispatch)}>Google</button>
                            </div>

                            <div className={`signin-form d-flex justify-content-center align-items-center flex-column h-100 ${window.outerWidth < 768 && 'd-none'}`} >
                                <h5 className='text-dark'>SignIn to your account</h5>
                                <section className='text-center'>Enter your email and password to signin to your account</section>
                                <input type="email" className="form-control my-2" name="email" id="email" placeholder="Email address" aria-describedby="emailHelp" value={userCredentials?.email} onChange={(e) => setUserCredentials({ ...userCredentials, email: e.target.value })} />
                                <input type="password" className="form-control" id="password" name="password" placeholder="Password*" value={userCredentials?.password} onChange={(e) => setUserCredentials({ ...userCredentials, password: e.target.value })} />
                                <button className='btn btn-outline-warning w-100 my-2' onClick={() => loginUserFirebase()}>Sign In</button>

                                <section className='my-3 text-end w-100 pointer' onClick={() => toggleSignIn('signup')}>New user? Create an account</section>
                                <section className='continue-with position-relative w-100 text-center'>
                                    <span >OR CONTINUE WITH</span>
                                    <section></section>
                                </section>

                                <button className='btn btn-outline-info w-100 m-2' onClick={() => goWithGoogle('signin', navigate, dispatch)}>Google</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default SignIn