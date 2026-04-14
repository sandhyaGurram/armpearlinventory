import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditHamsa = () => {
    const [name, setname] = useState('')
    const [quantity, setquantity] = useState('')
    const [type, settype] = useState('')
    const [price, setprice] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:4000/hamsa/${id}`)
            .then((res) => {
                setname(res.data.name)
                setquantity(res.data.quantity)
                settype(res.data.type)
                setprice(res.data.price)
            })
            .catch((err) => alert(err))
    }, [id])

    const editData = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:4000/hamsa/${id}`, { name, quantity, type, price })
            .then((res) => {
                alert("updated successfully")
                navigate('/hamsa')
            })
            .catch((err) => alert(err))

    }
    return (
        <>
            <div className='container p-5 mx-auto'>
                <h1>Edit Hamsa Data</h1>
                <form className='col-6 mb-5' onSubmit={editData}>
                    <input type='text' name='name' className='form-control mb-3' value={name} onChange={(e) => setname(e.target.value)} />
                    <input type='number' name='quantity' className='form-control mb-3' value={quantity} onChange={(e) => setquantity(e.target.value)} />
                    <input type='text' name='type' className='form-control mb-3' value={type} onChange={(e) => settype(e.target.value)} />
                    <input type='number' name='price' className='form-control mb-3' value={price} onChange={(e) => setprice(e.target.value)} />
                    <input type='submit' className='btn btn-success' value='Edit Data' />
                </form>
            </div>
        </>
    )
}

export default EditHamsa