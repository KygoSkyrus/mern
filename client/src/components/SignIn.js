import React,{useState} from 'react'



const SignIn = () => {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const loginuser= async (e)=>{
        e.preventDefault();

        const res= await fetch('/signin',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email,password
            })
        });

        const data = await res.json();

        if(data.status === 400 || !data){
            window.alert("invalid credentials");
            console.log("invalid credentials");
        }else{
            window.alert("login success");
            console.log("login success");
        }
    }


    return (
        <div >
            <div className="container">
            <h1 className="mb-5">LOGIN</h1>
            <form method="POST">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" value={email} onChange={(e)=>setemail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={loginuser}>LOGIN</button>
            </form>
            
            <p>create a new account. SignUp</p>
        </div>
        </div>

    )
}

export default SignIn
