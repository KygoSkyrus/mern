import React from 'react'

const AdminLogin = () => {
  return (
    <div
    className="d-flex align-items-center justify-content-center text-center h-100vh"
  >
    <div className="form-wrapper m-auto" style={{ width: "30%", minWidth: "300px" }}>
      <div className="form-container my-4" style={{ maxWidth: "unset" }}>
        <div className="d-flex justify-content-center flex-column align-items-center mb-4">
          <section className='theLogo'>shoppitt</section>
        </div>

        <div className="panel">
          <div className="register-form p-4"  >
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Username"
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

            <button className="btn btn-block" 
            // onClick={e => login(e)}
            >
              Sign in
            </button>
          </div>
        </div>
        <p style={{ padding: "20px 0", color: "red" }}>
            {/* {error} */}
            </p>
        {/* <!-- <div className="bottom-text text-center my-3">
                    Don't have an account? <a href="register.html" className="font-weight-500">Sign Up</a><br>
                    Remind <a href="forget_password.html" className="font-weight-500">Password</a>
                </div> --> */}
      </div>
    </div>
  </div>  
  )
}

export default AdminLogin