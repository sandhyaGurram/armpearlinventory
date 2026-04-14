import React, { useState } from 'react'
import innerstyles from './innerpage.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [phone, setphone] = useState('')
    const [address, setaddress] = useState('')
    const navigate = useNavigate()

    const productData = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/product', { name, email, phone, address })
            .then((res) => {
                alert("added successfully")
                navigate('/')


            })
            .catch((err) => alert("unable to add product "))
    }
    return (
        <>
            <section className={innerstyles.breadc}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h4>Add Product</h4>
                        </div>
                    </div>
                </div>
            </section>
            <section className='py-4'>
                <div className='container p-5'>
                    <div className='row'>
                        <div className='col-md-4'>

                        </div>
                        <div className='col-md-4'>
                            <form className={innerstyles.form} onSubmit={productData}>
                                <div className='mb-3'>
                                    <input type='text' name='name' placeholder='Customer Name' className='form-control' value={name} onChange={(e) => setname(e.target.value)} />
                                </div>

                                <div className='mb-3'>
                                    <input type='email' name='email' placeholder='Email' className='form-control' value={email} onChange={(e) => setemail(e.target.value)} />
                                </div>

                                <div className='mb-3'>
                                    <input type='text' name='phone' placeholder='Phone' className='form-control' value={phone} onChange={(e) => setphone(e.target.value)} />
                                </div>

                                <div className='mb-3'>
                                    <input type='text' name='address' placeholder='Address' className='form-control' value={address} onChange={(e) => setaddress(e.target.value)} />
                                </div>
                                <div className=''>
                                    <input type='submit' value='Add Product' className='btn btn-success' />
                                </div>



                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddProduct