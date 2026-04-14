import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import axios from 'axios'

const AllExcelUpload = () => {
    const [uploadedData, setUploadedData] = useState([])
    const [dbData, setDbData] = useState([])
    const [platform, setplatform] = useState('amazon')

    // 🔹 Decide what to show
    const displayData = uploadedData.length > 0 ? uploadedData : dbData

    // 🔹 Safe render function
    const renderValue = (value) => {
        if (value === null || value === undefined || value === '') {
            return '---'
        }

        if (typeof value === 'object') {
            if (value.v !== undefined) return value.v
            if (value.NO !== undefined) return value.NO
            return JSON.stringify(value)
        }

        return value
    }

    // 🔹 Read Excel File
    const handleFile = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.onload = (evt) => {
            const data = new Uint8Array(evt.target.result)
            const workbook = XLSX.read(data, { type: 'array' })

            const sheetName = workbook.SheetNames[0]
            const sheet = workbook.Sheets[sheetName]

            const rawData = XLSX.utils.sheet_to_json(sheet, {
                header: 1,
                defval: ''
            })

            const header = rawData[1]
            const rows = rawData.slice(2)

            const cleanedData = rows
                .map(row => {
                    let obj = {}

                    header.forEach((key, index) => {
                        if (!key) return

                        let cleanKey =
                            typeof key === 'string'
                                ? key.trim()
                                : key?.v || `column_${index}`

                        let value = row[index]

                        if (!value) value = '---'

                        if (typeof value === 'object') {
                            value = value.NO || value.v || JSON.stringify(value)
                        }

                        obj[cleanKey] = value
                    })

                    return obj
                })
                .filter(item => {
                    return item['ORDER-ID'] !== '---' && item['ORDER-ID'] !== undefined
                })

            setUploadedData(cleanedData)
        }

        reader.readAsArrayBuffer(file)
    }

    // 🔹 Fetch Data from DB
    useEffect(() => {
        fetchData()
    }, [platform])

    const fetchData = () => {
        axios.get(`http://localhost:4000/allexcel/${platform}`)
            .then((res) => {
                console.log("DB DATA:", res.data)
                setDbData(res.data)
            })
            .catch((err) => console.log(err))
    }

    // 🔹 Save to Backend
    const sendToBackend = () => {
        axios.post(`http://localhost:4000/allupload/${platform}`, uploadedData)
            .then(() => {
                alert("Data stored in DB")
                setUploadedData([]) // clear preview after save
                fetchData() // refresh DB data
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='container p-5'>
            <h2>Upload Excel</h2>

            <input type="file" onChange={handleFile} />

            <button onClick={sendToBackend} className='btn btn-success mt-2'>
                Save to DB
            </button>

            {/* Platform Filter */}
            <select
                className="form-control mt-3 mb-3"
                value={platform}
                onChange={(e) => setplatform(e.target.value)}
            >
                <option value="amazon">Amazon</option>
                <option value="flipkart">Flipkart</option>
                <option value="meesho">Meesho</option>
            </select>

            {/* Table */}
            <h2>View Data</h2>

            <table className='table table-bordered'>
                <thead>
                    <tr>
                        {displayData.length > 0 &&
                            Object.keys(displayData[0]).map((key) => (
                                key !== "_id" && key !== "platform" && key !== "__v" &&
                                <th key={key}>{key}</th>
                            ))
                        }
                    </tr>
                </thead>

                <tbody>
                    {displayData.map((item, index) => (
                        <tr key={index}>
                            {Object.keys(item).map((key) => (
                                key !== "_id" && key !== "platform" && key !== "__v" && (
                                    <td key={key}>
                                        {renderValue(item[key])}
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

export default AllExcelUpload