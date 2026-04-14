import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {
    return (
        <div className='admindashboard'>
            <ul>
                <li>
                    <NavLink to='addproduct'>Add Product</NavLink>
                </li>
                <li>
                    <NavLink to='editproduct'>Edit Product</NavLink>
                </li>
                <li>
                    <NavLink to='deleteproduct'>Delete Product</NavLink>
                </li>
                <li>
                    <NavLink to='getexceldata'>Get Excel Data</NavLink>
                </li>
                <li>
                    <NavLink to='upload'>Excel Upload</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default AdminSidebar