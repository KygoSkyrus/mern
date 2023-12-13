import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { goWithGoogle } from '../Utility'
// import theBagLogo from "./../../../assets/images/thebaglogo.png";
import adminHat from './../../../assets/images/newImg/collections/hat-48.png'

const AdminLogin = () => {

  const { route } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAdminLoggedIn = useSelector(state => state.user.isAdminAuthSuccess)

  useEffect(() => {
    if (isAdminLoggedIn) navigate('/admin/dashboard')
  }, [isAdminLoggedIn])

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
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="passWord"
                  name="password"
                  placeholder="Password"
                />
              </div>

              <button className="btn btn-outline-warning w-100"
              // onClick={e => login(e)}
              >
                Sign in
              </button>
              <section className='continue-with position-relative w-100 text-center my-3'>
                <span >OR CONTINUE WITH</span>
                <section></section>
              </section>
              {/* <button className='btn btn-outline-info w-100 m-2' onClick={() => goWithGoogle('signin', navigate, dispatch, route, true)}>Google</button> */}
              <button className='btn border w-100 d-flex justify-content-center align-items-center fs-5 text-black-50 py-1' onClick={() => goWithGoogle('signin', navigate, dispatch, route, true)}>
                <svg width="25" height="25" viewBox="5 5 35 35" xmlns="http://www.w3.org/2000/svg" style={{ height: "32px", width: "32px", marginLeft: "-8px" }}><g fill="none" fill-rule="evenodd"><path d="M31.64 23.205c0-.639-.057-1.252-.164-1.841H23v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"></path><path d="M23 32c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711h-3.007v2.332A8.997 8.997 0 0 0 23 32z" fill="#34A853"></path><path d="M17.964 24.71a5.41 5.41 0 0 1-.282-1.71c0-.593.102-1.17.282-1.71v-2.332h-3.007A8.996 8.996 0 0 0 14 23c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"></path><path d="M23 17.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C27.463 14.891 25.426 14 23 14a8.997 8.997 0 0 0-8.043 4.958l3.007 2.332c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"></path><path d="M14 14h18v18H14V14z"></path></g></svg> <span class="css-uk6cul">Google</span>
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin