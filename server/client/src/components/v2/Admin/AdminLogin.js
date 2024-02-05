/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { goWithGoogle, inProgressLoader, signinAPI } from '../Utility'
import adminHat from './../../../assets/images/newImg/collections/hat-48.png'
import theBagLogo from "./../../../assets/images/thebaglogo.png";
import { invokeToast } from '../redux/toastSlice';

const AdminLogin = () => {

  const auth = getAuth();
  const { route } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAdminLoggedIn = useSelector(state => state.user.isAdminAuthSuccess)
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });
  const isItAdmin = true;

  useEffect(() => {
    if (isAdminLoggedIn) navigate('/admin/dashboard')
  }, [isAdminLoggedIn])

  function loginUserFirebase() {
    inProgressLoader(dispatch, true)
    signInWithEmailAndPassword(auth, userCredentials?.email, userCredentials?.password)
      .then(
        (response) => {
          const user = response.user;
          signinAPI('signin', user?.email, "", "", user?.photoURL, dispatch, navigate, route, isItAdmin)
          inProgressLoader(dispatch, false)
          setUserCredentials({ email: '', password: '' })
        }
      )
      .catch((error) => {
        inProgressLoader(dispatch, false)
        setUserCredentials({ email: '', password: '' })
        dispatch(invokeToast({ isSuccess: false, message: "Authentication Failed, Invalid email/password" }))
      });
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center text-center h-100 admin-login"
    >
      <div className="form-wrapper m-auto shadow-s rounded-1" style={{ width: "30%", minWidth: "300px" }}>
        <div className="form-container my-4" style={{ maxWidth: "unset" }}>
          <div className="d-flex justify-content-center flex-column align-items-center mb-4">
            <img src={adminHat} alt='shoppitt' style={{ width: "30px", transform: "translate(-36px, 8px) rotate(-22deg)" }} />
            {/* <img alt='shoppitt' className='mb-1' src={theBagLogo} width="20px" /> */}
            <section className='theLogo fw-bold'>SHOPP ITT</section>
            <section style={{ letterSpacing: "3px", lineHeight: "10px", fontSize: "10px", color: "#a7a7a7" }}>Admin</section>
          </div>

          <div className="panel">
            <div className="register-form p-4"  >
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={userCredentials?.email}
                  onChange={(e) => setUserCredentials({ ...userCredentials, email: e.target.value })}
                  onKeyUp={(e) => e.key === "Enter" && document.getElementById('passWord').focus()}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="passWord"
                  name="password"
                  placeholder="Password"
                  value={userCredentials?.password}
                  onChange={(e) => setUserCredentials({ ...userCredentials, password: e.target.value })}
                  onKeyUp={(e) => e.key === "Enter" && loginUserFirebase()}
                />
              </div>

              <button className="btn btn-outline-warning w-100" onClick={() => loginUserFirebase()} >
                Sign in
              </button>
              <section className='continue-with position-relative w-100 text-center my-3'>
                <span >OR CONTINUE WITH</span>
                <section></section>
              </section>
              <button className='btn border w-100 d-flex justify-content-center align-items-center fs-5 text-black-50 py-1' onClick={() => goWithGoogle('signin', navigate, dispatch, route, isItAdmin)}>
                <svg width="25" height="25" viewBox="5 5 35 35" xmlns="http://www.w3.org/2000/svg" style={{ height: "32px", width: "32px", marginLeft: "-8px" }}><g fill="none" fillRule="evenodd"><path d="M31.64 23.205c0-.639-.057-1.252-.164-1.841H23v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"></path><path d="M23 32c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711h-3.007v2.332A8.997 8.997 0 0 0 23 32z" fill="#34A853"></path><path d="M17.964 24.71a5.41 5.41 0 0 1-.282-1.71c0-.593.102-1.17.282-1.71v-2.332h-3.007A8.996 8.996 0 0 0 14 23c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"></path><path d="M23 17.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C27.463 14.891 25.426 14 23 14a8.997 8.997 0 0 0-8.043 4.958l3.007 2.332c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"></path><path d="M14 14h18v18H14V14z"></path></g></svg> <span>Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="toast bg-warning show mt-4 shadow-sm" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <img src={theBagLogo} className="rounded me-2" width="20px" alt="" />
          <strong className="me-auto">Shopp-itt</strong>
          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div className="toast-body text-center text-dark">
          Use <b>Guest Admin credentials</b> to explore admin panel
          <section>
            <b>Email: </b>
            <span className='pointer' onClick={e => navigator?.clipboard.writeText(e.target.innerText)}>guestuser@email.com</span>
          </section>
          <section>
            <b>Password: </b>
            <span className='pointer' onClick={e => navigator?.clipboard.writeText(e.target.innerText)}>guest#7</span>
          </section>
        </div>
      </div>

    </div>
  )
}

export default AdminLogin