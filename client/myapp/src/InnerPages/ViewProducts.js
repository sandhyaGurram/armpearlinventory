import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ViewProducts = () => {
    const [data, setdata] = useState([])
    useEffect(() => {
        axios.
    })
    return (
        <div>
            <table className='table table-hover table-bordered'>
                <thead>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Actions</th>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    )
}

export default ViewProducts