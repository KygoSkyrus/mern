import React, { useEffect } from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { goWithGoogle } from '../Utility'
// import theBagLogo from "./../../../assets/images/thebaglogo.png";
import adminHat from './../../../assets/images/newImg/collections/hat-48.png'

const AdminLogin = () => {

  const {route}=useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAdminLoggedIn=useSelector(state=>state.user.isAdminAuthSuccess)

  useEffect(()=>{
    if(isAdminLoggedIn) navigate('/admin/dashboard')
  },[isAdminLoggedIn])

  return (
    <div
      className="d-flex align-items-center justify-content-center text-center h-100 admin-login"
    >
      <div className="form-wrapper m-auto shadow-s rounded-1" style={{ width: "30%", minWidth: "300px" }}>
        <div className="form-container my-4" style={{ maxWidth: "unset" }}>
          <div className="d-flex justify-content-center flex-column align-items-center mb-4">
            <img src={adminHat} alt='' style={{width: "30px",transform: "translate(-36px, 8px) rotate(-22deg)" }} />
            {/* <img alt='' className='mb-1' src={theBagLogo} width="20px" /> */}
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
              <button className='btn btn-outline-info w-100 m-2' onClick={() => goWithGoogle('signin', navigate, dispatch,route, true)}>Google</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin