import React, { useState } from 'react';
import {Link ,BrowserRouter as Router, Route,Switch} from 'react-router-dom'

import SignIn from './SignIn';

const SignUp = () => {

    const [user, setuser] = useState({
        firstName: "",lastName: "", email: "", password: ""
    });


    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setuser({ ...user, [name]: value });
        console.log(setuser({ ...user, [name]: value }));
    }

    const handleClick = async (e) => {

        e.preventDefault();

        const { firstName, lastName, email, password } = user;

        //sending data
        const res = await fetch('/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName, lastName, email, password 
            })

        });

        const data = await res.json();

        if(data.status=== 422 || !data){
            window.alert("invalid registration");
            console.log("invalid registration");
        }else{
            window.alert(" registration success");
            console.log("registration success");
        }

    }


        return (
            <Router>
            <div className="container">
                <h1 className="mb-5">SIGN UP</h1>
                <form method="post">
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First name</label>
                        <input type="text" className="form-control" id="firstName" name="firstName" autoComplete="off" value={user.firstName} onChange={handleInputs} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastame" className="form-label">Last name</label>
                        <input type="text" className="form-control" id="lastName" name="lastName" autoComplete="off" value={user.lastName} onChange={handleInputs} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email1" name="email" aria-describedby="emailHelp" value={user.email} onChange={handleInputs} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={handleInputs} />
                    </div>
                    {/*<div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">confirm password</label>
                        <input type="text" className="form-control" id="cpassword" name="cpassword" autoComplete="off" value={user.cpassword} onChange={handleInputs} />
                    </div>*/}
                    <button type="submit" onClick={handleClick} className="btn btn-primary">Submit</button>
                </form>
                <Link to="/signin">
                    already have an account? SignIn
                </Link>
            </div>
</Router>
        )
    }

    export default SignUp

