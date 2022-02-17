import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignUp(props) {

    const [credentials, setCredentials] = useState({ email: "", name: "", password: "", cpassword: "" })
    let history = useNavigate();

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleClick = async () => {
        const { email, name, password } = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, name, password })

        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            history("/")
            props.showAlert("Account created successfully", "success")
        } else {
            props.showAlert("Invalid Details", "danger")

        }

    }


    return (
        <form onSubmit={handleClick}>

            <div className="container my-5">
                <div className="mb-3 ">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onchange} id="email" name="email" placeholder="name@example.com" required/>
                </div>
                <div className="mb-3 ">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={onchange} id="name" name="name" />
                </div>
                <div className="mb-3 ">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onchange} id="password"  name="password" minLength={5} required />
                </div>
                <div className="mb-3 ">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onchange} id="cpassword" name="cpassword" minLength={5} required />
                </div>
            </div>
            <div className='text-center'>
                <button className='btn btn-primary' >SignUp</button>
            </div>
        </form>
    )
}

export default SignUp