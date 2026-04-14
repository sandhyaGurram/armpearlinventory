import axios from 'axios'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Signup = () => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')
    const [cpass, setcpass] = useState('')
    const [phone, setphone] = useState('')
    const [address, setaddress] = useState('')
    const navigate = useNavigate()

    const signupform = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/signup', { name, email, password: pass, cpassword: cpass, phone, address })
            .then((res) => {
                alert("sign up success")
                navigate('/login')
            })
            .catch((err) => alert(err))
    }
    return (
        <>
            <div className='container p-5'>
                <h1>Signup Form</h1>
                <form className='col-6' onSubmit={signupform}>
                    <input type='text' className='form-control mb-3' placeholder='Name' name='name' value={name} onChange={(e) => setname(e.target.value)} />

                    <input type='email' className='form-control mb-3' placeholder='Email' name='email' value={email} onChange={(e) => setemail(e.target.value)} />
                    <input type='password' className='form-control mb-3' placeholder='Password' name='password' value={pass} onChange={(e) => setpass(e.target.value)} />
                    <input type='password' className='form-control mb-3' placeholder='Confirm Password' name='cpassword' value={cpass} onChange={(e) => setcpass(e.target.value)} />
                    <input type='number' className='form-control mb-3' placeholder='Phone' name='phone' value={phone} onChange={(e) => setphone(e.target.value)} />
                    <input type='text' className='form-control mb-3' placeholder='Address' name='address' value={address} onChange={(e) => setaddress(e.target.value)} />
                    <input type='submit' className='btn btn-success' value='SignUp' />
                </form>

                <NavLink to='/login'>Click here to Login</NavLink>
            </div>
        </>
    )
}

export default Signup