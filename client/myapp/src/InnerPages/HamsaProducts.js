import axios from 'axios'
import React, { useEffect, useState } from 'react'
import HamsaActionss from './HamsaActionss'


const HamsaProducts = () => {
    const [name, setname] = useState('')
    const [quantity, setquantity] = useState('')
    const [type, settype] = useState('')
    const [price, setprice] = useState('')
    const [data, setdata] = useState([])

    const ProdutHamsa = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/hamsa', { name, quantity, type, price })
            .then((res) => {
                alert("added successfully")
                setname('')
                setquantity('')
                settype('')
                setprice('')
                setdata(prev => [...prev, res.data])

            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        axios.get('http://localhost:4000/hamsa')
            .then((res) => setdata(res.data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <div className='container p-5 '>
                <h1 className='text-center mb-4'>Hamsa Products</h1>
                <form className='col-6 mx-auto' onSubmit={ProdutHamsa}>
                    <input type='text' name='name' placeholder='Product Name' className='form-control mb-3' value={name} onChange={(e) => setname(e.target.value)} />
                    <input type='number' name='quantity' placeholder='Quantity' className='form-control mb-3' value={quantity} onChange={(e) => setquantity(e.target.value)} />
                    <input type='text' name='type' placeholder='Collection Name' className='form-control mb-3' value={type} onChange={(e) => settype(e.target.value)} />
                    <input type='number' name='price' placeholder='Price' className='form-control mb-3' value={price} onChange={(e) => setprice(e.target.value)} />
                    <input type='submit' className='btn btn-success' value='Add Product' />
                </form>
            </div>
            <div>

                <HamsaActionss data={data} setdata={setdata} />
            </div>

        </>
    )
}

export default HamsaProducts