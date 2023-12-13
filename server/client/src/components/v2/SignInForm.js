import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { goWithGoogle, signinAPI, defaultAvatar, inProgressLoader } from './Utility'
import { invokeToast } from './redux/toastSlice';

const SignInForm = ({ userCredentials, setUserCredentials, title, description, toggleText, signInOrSignUp, toggleSignInOrSignUp, btnText }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const auth = getAuth();

    function handleClick() {
        console.log('handleclick',signInOrSignUp)
        if (signInOrSignUp === "signup") {
            createUserAccountFirebase()
        } else if (signInOrSignUp === "signin") {
            loginUserFirebase()
        }
    }

    function createUserAccountFirebase() {
        // console.log('eee', userCredentials,userCredentials?.username?.trim().length)
        let name = userCredentials?.username?.trim();
        
        if (name?.length === 0 || userCredentials?.email.length === 0 || userCredentials?.password.length === 0) {
            dispatch(invokeToast({ isSuccess: false, message: 'Name is a mandatory field, Enter your name to proceed further' }))
            setUserCredentials({ ...userCredentials, username: '' })
            return;
        }
        // console.log('ccc', name)
        inProgressLoader(dispatch,true)
        
        name = name.split(' ')

        // console.log('splitted name', name)
        let firstname = '';
        let lastname = '';
        for (const str of name) {
            if (!firstname) {
                firstname = str;
            } else if (!lastname) {
                lastname = str;
                break;
            }
        }

        console.log('fname', firstname, lastname)

        createUserWithEmailAndPassword(auth, userCredentials?.email, userCredentials?.password)
            .then((response) => {
                // Signed up 
                const user = response.user;
                console.log('user cred', user)

                signinAPI('signup', user?.email, firstname, lastname, defaultAvatar, dispatch)
                inProgressLoader(dispatch,false)
                navigate('/user');//sending user to user page for filling out other details
                setUserCredentials({ email: '', password: '', username: '' })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('error', errorCode, errorMessage)
                // document.getElementById('closeSignin').click()//closing the modal
                inProgressLoader(dispatch,false)
                setUserCredentials({ email: '', password: '', username: '' })
                let errMsg = errorMessage;
                if (errorCode === 'auth/email-already-in-use') errMsg = "User already exists!!! Try Signing in instead"
                dispatch(invokeToast({ isSuccess: false, message: errMsg }))
            });
    }

    function loginUserFirebase() {
              inProgressLoader(dispatch,true)
        signInWithEmailAndPassword(auth, userCredentials?.email, userCredentials?.password)
            .then(
                (response) => {
                    console.log('signinresss', response, response?.user?.email)
                    //   navigate("/home");
                    const user = response.user;

                    signinAPI('signin', user?.email, "", "", user?.photoURL, dispatch)
                    inProgressLoader(dispatch,false)
                    navigate('/user');//sending user to user page for filling out other details
                    setUserCredentials({ email: '', password: '', username: '' })
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
                inProgressLoader(dispatch,false)
                setUserCredentials({ email: '', password: '', username: '' })
                dispatch(invokeToast({ isSuccess: false, message: "Authentication Failed, Invalid email/password" }))
            });
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
        setUserCredentials({ email: '', password: '', username: '' })
    }

    return (
        <>
            <h5 className='text-dark'>{title}</h5>
            <section className='text-center'>{description}</section>
            {signInOrSignUp === "signup" &&
                <input type="text" className="form-control mt-2" name="username" id="username" placeholder="Your name" value={userCredentials?.username} onChange={(e) => setUserCredentials({ ...userCredentials, username: e.target.value })} />
            }
            <input type="email" className="form-control my-2" name="email" id="email1" placeholder="Email address" aria-describedby="emailHelp" value={userCredentials?.email} onChange={(e) => setUserCredentials({ ...userCredentials, email: e.target.value })} />
            <input type="password" className="form-control" id="password1" name="password" placeholder="Password*" value={userCredentials?.password} onChange={(e) => setUserCredentials({ ...userCredentials, password: e.target.value })} />
            <button className='btn btn-outline-warning w-100 my-2' onClick={() => handleClick()}>{btnText}</button>

            <section className='my-3 text-end w-100 pointer' onClick={() => toggleSignIn(toggleSignInOrSignUp)}>{toggleText}</section>
            <section className='continue-with position-relative w-100 text-center'>
                <span >OR CONTINUE WITH</span>
                <section></section>
            </section>

            <button className='btn border w-100 m-2 d-flex justify-content-center align-items-center fs-5 text-black-50 py-1' onClick={() => goWithGoogle(signInOrSignUp, navigate, dispatch)}>
                <svg width="25" height="25" viewBox="5 5 35 35" xmlns="http://www.w3.org/2000/svg" style={{ height: "32px", width: "32px", marginLeft: "-8px" }}><g fill="none" fill-rule="evenodd"><path d="M31.64 23.205c0-.639-.057-1.252-.164-1.841H23v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"></path><path d="M23 32c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711h-3.007v2.332A8.997 8.997 0 0 0 23 32z" fill="#34A853"></path><path d="M17.964 24.71a5.41 5.41 0 0 1-.282-1.71c0-.593.102-1.17.282-1.71v-2.332h-3.007A8.996 8.996 0 0 0 14 23c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"></path><path d="M23 17.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C27.463 14.891 25.426 14 23 14a8.997 8.997 0 0 0-8.043 4.958l3.007 2.332c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"></path><path d="M14 14h18v18H14V14z"></path></g></svg> <span class="css-uk6cul">Google</span>
            </button>
        </>
    )
}

export default SignInForm