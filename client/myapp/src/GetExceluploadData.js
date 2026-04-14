import axios from 'axios'
import React, { useEffect, useState } from 'react'

const GetExceluploadData = () => {
    const [data, setdata] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/excel')
            .then((res) => {

                setdata(res.data)
            })
            .catch((err) => alert(err))
    })
    return (
        <div className='container p-5'>
            <h1>Order data</h1>
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Customer Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => {
                        return (
                            <tr>
                                <td>{item.order_id}</td>
                                <td>{item.product_name}</td>
                                <td>{item.price} Rs/-</td>
                                <td>{item.customer_name}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>

        </div>
    )
}

export default GetExceluploadData