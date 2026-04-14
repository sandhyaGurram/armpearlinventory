import axios from 'axios'
import React, { useEffect, useState } from 'react'
import innerstyles from './innerpage.module.css'

const Home = () => {
    const [data, setdata] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/product')
            .then((res) => {
                console.log(res)
                setdata(res.data)
            })
            .catch((err) => alert(err))
    }, [])
    return (
        <>
            <h1 className={innerstyles.breadc}>Home</h1>
            <div>
                <table className='table table-hover table-bordered'>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>email</th>
                            <th>phone</th>
                            <th>Address</th>
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
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Home

