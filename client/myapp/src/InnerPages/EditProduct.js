import React, { useEffect, useState } from 'react'
import innerstyles from './innerpage.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { NavLink, useNavigate } from 'react-router-dom'

const EditProduct = () => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [phone, setphone] = useState('')
    const [address, setaddress] = useState('')
    const navigate = useNavigate()


    let { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:4000/product/${id}`)
            .then((res) => {
                console.log(res)
                setname(res.data.name)
                setemail(res.data.email)
                setphone(res.data.phone)
                setaddress(res.data.address)
            })
            .catch((err) => alert("error"))
    }, [id])


    const productData = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:4000/product/${id}`, { name, email, phone, address })
            .then((res) => {
                alert("updated successfully")
                navigate('/deleteproduct')


            })
            .catch((err) => alert("unable to edit product "))
    }
    return (
        <>
            <section className={innerstyles.breadc}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h4>Edit Product</h4>
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
                                    <input type='submit' value='Update Product' className='btn btn-success' />
                                </div>



                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default EditProduct