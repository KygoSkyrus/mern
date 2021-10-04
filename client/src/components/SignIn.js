import React, { useState } from 'react'
import SignUp from './SignUp';


const SignIn = () => {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

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

console.log(data);
        if(data.error==="account doesn't exists"){
            window.alert("account doesn't exists");
        }else if(data.error==="fill all details"){
            window.alert("fill all details");
        }else if(data.error==="invalid credentials"){
            window.alert("invalid credentials");
        }else if(data.message==="user logged in successfully"){
            window.alert("user logged in successfully");
        }else{
            window.alert("login success");
            console.log("login success");
        }
    }


    return (
        <>
            <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalToggleLabel">SIGN In</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body">

                            <div className=" p-5" >
                                <form method="POST">
                                    <div className="mb-3">
                                        <input type="email" className="form-control" name="email" id="email" placeholder="Email address*" aria-describedby="emailHelp" value={email} onChange={(e) => setemail(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" className="form-control" id="password" name="password" placeholder="Password*" value={password} onChange={(e) => setpassword(e.target.value)} />
                                    </div>
                                    <button type="submit" className="btn btn-outline-primary w-100" onClick={loginuser}>SIGN IN</button>
                                </form>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <a data-bs-target="#exampleModalToggle2" href="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">New to Shopp-itt? create new account</a>
                        </div>
                    </div>
                </div>
            </div>


            <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalToggleLabel2">New Account</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <SignUp />
                        </div>
                        <div class="modal-footer">
                            <a href="#exampleModalToggle" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Already have an account? SignIn</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn


/*
const style = {
    width: "500px",
    height: "400px",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    background: "white",
    boxShadow: "0 0 20px",
    borderRadius: "4px",
}
*/