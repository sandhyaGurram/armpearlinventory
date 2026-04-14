import axios from 'axios'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')

    const navigate = useNavigate()

    const loginform = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/login', { email, password: pass })
            .then((res) => {
                alert("login success")
                if (res.data == "valid") {
                    navigate('/admindashboard')
                } else {
                    alert("invalid credentials")
                }
            })
            .catch((err) => alert(err))
    }
    return (
        <>
            <div className='container p-5'>
                <h1>Signup Form</h1>
                <form className='col-6' onSubmit={loginform}>

                    <input type='email' className='form-control mb-3' placeholder='Email' name='email' value={email} onChange={(e) => setemail(e.target.value)} />
                    <input type='password' className='form-control mb-3' placeholder='Password' name='password' value={pass} onChange={(e) => setpass(e.target.value)} />
                    <input type='submit' className='btn btn-success' value='Login' />
                </form>
                <NavLink to='/signup'>Click here to Signup</NavLink>


            </div>
        </>
    )
}

export default Login