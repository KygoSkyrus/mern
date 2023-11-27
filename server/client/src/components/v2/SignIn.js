import React, { useState } from 'react'

import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, sendSignInLinkToEmail, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toastVisibility, setToastContent, setToastStatus } from './redux/todoSlice';
import { isUserLoggedIn, setUserDetails } from './redux/userSlice';
import { goWithGoogle } from './Utility';
import loginImg from "./../../assets/images/login-cover.svg"


const SignIn = ({ firebaseApp }) => {

    const [email, setemail] = useState({});
    const [password, setpassword] = useState('');

    const [phone, setphone] = useState();
    const [otp, setOtp] = useState(["", "", "", "", "", ""])

    const navigate = useNavigate()
    const dispatch = useDispatch()


    //FIREBASE_________________________________
    // const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();


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





    // const signinAPI = (val, email, firstname, lastname, photo) => {
    //     let resp;
    //     fetch(`/api/${val}`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             firstname, lastname, email, photo
    //         })
    //     })
    //         .then(response => {
    //             resp = response;
    //             return response.json()
    //         })
    //         .then(res => {
    //             console.log("res.user", res.user)
    //             if (resp.status === 200) {
    //                 dispatch(setToastStatus({ isSuccess: true }))
    //             } else {
    //                 dispatch(setToastStatus({ isSuccess: false }))
    //             }
    //             document.getElementById('closeSignin').click()//closing the modal

    //             dispatch(toastVisibility({ toast: true }))
    //             dispatch(setToastContent({ message: res.message }))
    //             if (res.is_user_logged_in) {
    //                 dispatch(isUserLoggedIn({ value: true }))
    //                 dispatch(setUserDetails({ user: res.user }))
    //             }
    //         })
    // }

    // const goWithGoogle = (val) => {

    //     //with this the two things that google does for us is that it authentiicates the email id and make sure that no on uses soeonelse's id ,on signup you will have to chekc is the account already exist,,if dont only then create the account ,,,,on signin you have to check the same if the user even exist and if it does exist then resturn response that user exist and set the jwt
    //     signInWithPopup(auth, provider)
    //         .then((result) => {
    //             console.log(result)
    //             // This gives you a Google Access Token. You can use it to access the Google API.
    //             const credential = GoogleAuthProvider.credentialFromResult(result);
    //             const token = credential.accessToken;
    //             //console.log(token, result.user);// The signed-in user info.

    //             //after google authentication
    //             if (token) {
    //                 let dname = result.user.displayName.split(" ")
    //                 let lastname = ''
    //                 let firstname = dname[0]
    //                 if (dname.length > 1) {
    //                     lastname = dname[dname.length - 1]
    //                 }

    //                 if (val === 'signup') {
    //                     signinAPI('signup', result.user.email, firstname, lastname, result.user.photoURL)
    //                     navigate('/user');//sending user to user page for filling out other details
    //                 } else {
    //                     signinAPI('signin', result.user.email)
    //                 }
    //             }

    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             const email = error.email;
    //             const credential = GoogleAuthProvider.credentialFromError(error);
    //             console.log(
    //                 "errorCode:",
    //                 errorCode,
    //                 ",",
    //                 "errorMessage: ",
    //                 errorMessage,
    //                 ",",
    //                 "email: ",
    //                 email,
    //                 ",",
    //                 "credential:",
    //                 credential
    //             );
    //         });

    // }


    const toggleSignIn = (form) => {
        let signin = document.querySelector('.signin-form')
        let signup = document.querySelector('.signup-form')
        if (form === 'signin') {
            if(window.outerWidth<768){
                signup.classList.add('d-none')
                signin.classList.remove('d-none')
            }else{
                signup.style.left='0'
                signin.style.right='0'
            }
        } else {
            if(window.outerWidth<768){
                signup.classList.remove('d-none')
                signin.classList.add('d-none')
            }else{
                signup.style.left='50%'
                signin.style.right='50%'
            }
        }
    }
        return (
            <div className="modal fade signin" id="exampleModalToggle" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered w-75">
                    <div className="modal-content " style={{width:"80vw"}}>
                    <button type="button" id='closeSignin' className="btn-close d-none" data-bs-dismiss="modal" aria-label="Close"></button>

                        <div className="modal-body d-flex flex-row p-0 position-relative">
                            <div className='w-50 signin-img d-flex bg-dark' style={{ zIndex: 2 }}>
                                <img src={loginImg} alt='' />
                            </div>
                            <div className='w-50 forms-holder' >
                                <div className='signup-form d-flex justify-content-center align-items-center flex-column h-100' >
                                    <h5 className='text-dark'>Create an account</h5>
                                    <section className='text-center'>Enter your email below to create your account</section>
                                    <input type="email" className="form-control my-2" name="email" id="email" placeholder="Email address" aria-describedby="emailHelp" value={email.signupEmail} onChange={(e) => setemail({ ...email, signupEmail: e.target.value })} />
                                    <button className='btn btn-outline-warning w-100' onClick={emailVerification}>Create account</button>

                                    <section className='my-3 text-end w-100 pointer' onClick={() => toggleSignIn('signin')}>Exsiting user? Signin</section>
                                    <section className='continue-with position-relative w-100 text-center'>
                                        <span >OR CONTINUE WITH</span>
                                        <section></section>
                                    </section>

                                    <button className='btn btn-outline-info w-100 m-2' onClick={() => goWithGoogle('signup',navigate,dispatch)}>Google</button>
                                </div>

                                <div className={`signin-form d-flex justify-content-center align-items-center flex-column h-100 ${window.outerWidth < 768 && 'd-none'}`} >
                                    <h5 className='text-dark'>SignIn to your account</h5>
                                    <section className='text-center'>Enter your email and password to signin to your account</section>
                                    <input type="email" className="form-control my-2" name="email" id="email" placeholder="Email address" aria-describedby="emailHelp" value={email.signinEmail} onChange={(e) => setemail({ ...email, signinEmail: e.target.value })} />
                                    <input type="password" className="form-control" id="password" name="password" placeholder="Password*" value={password} onChange={(e) => setpassword(e.target.value)} />
                                    <button className='btn btn-outline-warning w-100 my-2' onClick={emailVerification}>Sign In</button>

                                    <section className='my-3 text-end w-100 pointer' onClick={() => toggleSignIn('signup')}>New user? Create an account</section>
                                    <section className='continue-with position-relative w-100 text-center'>
                                        <span >OR CONTINUE WITH</span>
                                        <section></section>
                                    </section>

                                    <button className='btn btn-outline-info w-100 m-2' onClick={() => goWithGoogle('signin',navigate,dispatch)}>Google</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

  
}

export default SignIn