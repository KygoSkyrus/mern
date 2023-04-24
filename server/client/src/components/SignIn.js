import React, { useState } from 'react'
import SignUp from './SignUp';


import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


const SignIn = () => {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const [phone, setphone] = useState();

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
        auth.languageCode = 'it';
        //FIREBASE_________________________________


        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // onSignInSubmit();
            }
        }, auth);

        let appVerifier=window.recaptchaVerifier ;

        onSignInSubmit(appVerifier)
        console.log('phone', phone)





function onSignInSubmit (appVerifier){

console.log('inside xyz',appVerifier,phone)
        signInWithPhoneNumber(auth, '+91 8076806118', appVerifier)
            .then((confirmationResult) => {
                console.log('confirmation rsult', confirmationResult)
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                // ...
            }).catch((error) => {
                console.log(error)
                // Error; SMS not sent
                // ...
            });
        }

    }


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
                                    <div id='sign-in-button'>ss</div>
                                    {/* <div className="mb-3">
                                        <input type="password" className="form-control" id="password" name="password" placeholder="Password*" value={password} onChange={(e) => setpassword(e.target.value)} />
                                    </div> */}
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
                <SignUp />
            </div>
        </>
    )
}

export default SignIn