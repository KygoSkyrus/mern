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

        if (data.status === 422 || !data) {
            window.alert("invalid registration");
            console.log("invalid registration");
        } else {
            window.alert(" registration success");
            console.log("registration success");
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
                    <button type="submit" onClick={handleClick} className="btn btn-primary">Create</button>
                </form>
            </div>
        </>

    )
}

export default SignUp

