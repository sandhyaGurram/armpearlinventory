import React, { useEffect, useState } from 'react'
import axios from 'axios'

import 'datatables.net-dt/css/dataTables.dataTables.css'
import 'datatables.net-dt/js/dataTables.dataTables.min.js'

import $ from 'jquery'

const ShopifyProducts = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/shopify-products')
            .then((res) => {
                console.log(res.data)
                setData(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        if (data.length > 0) {
            // Destroy old instance if exists
            if ($.fn.DataTable.isDataTable('#myTable')) {
                $('#myTable').DataTable().destroy();
            }

            // Initialize
            $('#myTable').DataTable();
        }
    }, [data])

    return (
        <div className='col-6 mx-auto container p-5' style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            <table className='table table-bordered table-hover' id='myTable'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        const product = item.node
                        return (
                            <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>{product.title}</td>

                                <td>₹ {product.variants.edges[0]?.node.price.amount}</td>
                                <td>{product.description}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ShopifyProducts