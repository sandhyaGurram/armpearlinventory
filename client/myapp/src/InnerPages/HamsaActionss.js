import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const HamsaActionss = ({ data, setdata }) => {


    const deleteProduct = (id) => {
        console.log(id)
        axios.delete(`http://localhost:4000/hamsa/${id}`)
            .then((res) => {
                alert("data deleted")
                setdata((prevData) => prevData.filter(item => item._id !== id))

            })
            .catch((err) => alert(err))
    }
    return (
        <>
            <div className='container p-5'>
                <h1>Hamsa Data</h1>
                <table className='table table-header table-bordered col-6'>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>COllection Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.type}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <button className='btn me-3' onClick={() => deleteProduct(item._id)}><i class="fa-solid fa-trash"></i></button>
                                        <NavLink to={`/edithamsa/${item._id}`}><button className='btn btn-success '><i class="fa-solid fa-pen-to-square"></i></button></NavLink>
                                        {/* <button className='btn' onClick={()=>edi}><i class="fa-solid fa-pen-to-square"></i></button> */}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default HamsaActionss