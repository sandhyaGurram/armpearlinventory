import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AmazonData = () => {
    const [data, setdata] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/allexcel/amazon')
            .then((res) => {
                console.log(res.data)
                setdata(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <div className='container p-5'>
            <h2>Amazon Data</h2>

            <table className='table table-bordered'>
                <thead>
                    <tr>
                        {data.length > 0 &&
                            Object.keys(data[0]).map((key) => (
                                key !== "_id" && <th key={key}>{key}</th>
                            ))
                        }
                    </tr>
                </thead>

                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {Object.keys(item).map((key) => (
                                key !== "_id" && key !== "__v" && (
                                    <td key={key}>
                                        {item[key] === null || item[key] === undefined || item[key] === ''
                                            ? '---'
                                            : typeof item[key] === 'object'
                                                ? JSON.stringify(item[key])
                                                : item[key]}
                                    </td>
                                )
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AmazonData