import React, { useState } from 'react'
// import SignUp from './SignUp';


import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


const SignIn = () => {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const [phone, setphone] = useState();
    const [otp, setOtp] = useState(["", "", "", "", "", ""])

    const loginuser = async (e) => {
        e.preventDefault();

        const res = await fetch('/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = await res.json();

        //console.log(data);
        if (data.error === "account doesn't exists") {
            window.alert("account doesn't exists");
        } else if (data.error === "fill all details") {
            window.alert("fill all details");
        } else if (data.error === "invalid credentials") {
            window.alert("invalid credentials");
        } else if (data.message === "user logged in successfully") {
            window.alert("user logged in successfully");
            document.getElementById('closeSignin').click();
        } else {
            window.alert("login success");
            console.log("login success");
        }
    }


    function OTPInput() {

        console.log('otpinputr3')


        const newOtpValues = [...otp]

        const inputs = document.querySelectorAll('#otp > *[id]');

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
                    if (i === inputs.length - 1 && inputs[i].value !== '') {
                        return true;
                    } else if (event.keyCode > 47 && event.keyCode < 58) {
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
        // To apply the default browser preference instead of explicitly setting it.

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
        window.confirmationResult.confirm(otp.join("")).then((result) => {
          const user = result.user;
          console.log('User signed in successfully.',user)//returned data from firebase on confirmation
          // ...
        }).catch((error) => {
            alert('incorrect one time password')
            console.log("User couldn't sign in (bad verification code?)",error)
        });

        e.preventDefault()
    }




    /////////////////
    return (
        <>
            <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalToggleLabel">SIGN IN</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeSignin"></button>
                        </div>

                        <div className="modal-body">

                            <div className="padding" >
                                <form method="POST">
                                    <div className="mb-3">
                                        <input type="email" className="form-control" name="email" id="email" placeholder="Email address*" aria-describedby="emailHelp" value={email} onChange={(e) => setemail(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" className="form-control" id="password" name="password" placeholder="Password*" value={password} onChange={(e) => setpassword(e.target.value)} />
                                    </div>
                                    <button type="submit" className="btn btn-outline-warning w-100" onClick={loginuser}>SIGN IN</button>
                                </form>
                            </div>

                            <div className="padding" >
                                <form >
                                    <div className="mb-3">
                                        <input type="number" className="form-control" name="phone" id="phone" placeholder="Phone Number*" aria-describedby="emailHelp" value={phone} onChange={(e) => setphone(e.target.value)} />
                                    </div>
                                    <div id='sign-in-button' className='d-none'>ss</div>
                                    {/* <div className="mb-3">
                                        <input type="password" className="form-control" id="password" name="password" placeholder="Password*" value={password} onChange={(e) => setpassword(e.target.value)} />
                                    </div> */}
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
                            </div>


                        </div>

                        <div className="modal-footer">
                            <a data-bs-target="#exampleModalToggle2" href="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">New to Shopp-itt? create new account</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                {/* <SignUp /> */}
            </div>
        </>
    )
}

export default SignIn