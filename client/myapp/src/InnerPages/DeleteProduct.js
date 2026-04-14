
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import innerstyles from './innerpage.module.css'
import { NavLink, useNavigate } from 'react-router-dom'

const DeleteProduct = () => {
  const [data, setdata] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:4000/product')
      .then((res) => {
        console.log(res)
        setdata(res.data)
      })
      .catch((err) => alert(err))
  }, [])

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:4000/product/${id}`)
      .then((res) => {
        alert("data deleted")
        navigate('/deleteproduct')
      })


      .catch((err) => {
        alert(err)
      })
  }
  return (
    <>
      <h1>Delete Product</h1>
      <div>
        <table className='table table-hover table-bordered'>
          <thead>
            <tr>
              <th>name</th>
              <th>email</th>
              <th>phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>
                    <button className='btn btn-danger me-2' onClick={() => deleteProduct(item._id)}><i className="fa-solid fa-trash"></i></button>
                    <NavLink to={`/editproduct/${item._id}`}><button className='btn btn-success '><i className="fa-solid fa-pen-to-square"></i></button></NavLink>
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

export default DeleteProduct