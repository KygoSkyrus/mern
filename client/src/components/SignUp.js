import React, { useState } from 'react';


const SignUp = () => {

    const [user, setuser] = useState({
        firstName: "", lastName: "", email: "", password: ""
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

        if (data.error==="fill all details" || !data) {
            window.alert("fill all details");
            console.log("fill all details");
        } else if(data.error==="email already exists"){
            window.alert("email already exists");
        }else{
            window.alert("account created successfully");
            console.log("account created successfully");
        }

    }


    return (
        <>
            <div className="container p-5">
                <form method="post">
                    <div className="mb-3">
                        <div className=" w-50 d-inline-block ">
                            <input type="text" className="form-control" id="firstName" name="firstName" autoComplete="off" placeholder="First name*" value={user.firstName} onChange={handleInputs} />
                        </div>
                        <div className=" w-50  d-inline-block ">
                            <input type="text" className="form-control" id="lastName" name="lastName" autoComplete="off" placeholder="Last name*" value={user.lastName} onChange={handleInputs} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" id="email1" name="email" aria-describedby="emailHelp" placeholder="Email address*" value={user.email} onChange={handleInputs} />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control"
                            placeholder="Password*" id="password" name="password" value={user.password} onChange={handleInputs} />
                    </div>
                    <button type="submit" onClick={handleClick} className="btn btn-outline-primary w-100">Create</button>
                </form>
            </div>
        </>

    )
}

export default SignUp

