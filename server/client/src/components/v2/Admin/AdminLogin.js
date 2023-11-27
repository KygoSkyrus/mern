import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { goWithGoogle } from '../Utility'
import theBagLogo from "./../../../assets/images/thebaglogo.png";


const AdminLogin = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div
      className="d-flex align-items-center justify-content-center text-center h-100 admin-login"
    >
      <div className="form-wrapper m-auto shadow-s rounded-1" style={{ width: "30%", minWidth: "300px" }}>
        <div className="form-container my-4" style={{ maxWidth: "unset" }}>
          <div className="d-flex justify-content-center flex-column align-items-center mb-4">
            <img alt='' className='ms-2 mb-1' src={theBagLogo} width="20px" />
            <section className='theLogo'>SHOPP ITT</section>
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
              <button className='btn btn-outline-info w-100 m-2' onClick={() => goWithGoogle('signin', navigate, dispatch)}>Google</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin