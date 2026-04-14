import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import axios from 'axios'

const ExcelUpload = () => {
    const [data, setdata] = useState([])

    // ✅ Convert Excel serial date → dd-mm-yyyy
    const excelDateToJSDate = (serial) => {
        const utc_days = Math.floor(serial - 25569)
        const utc_value = utc_days * 86400
        const date_info = new Date(utc_value * 1000)

        const day = String(date_info.getDate()).padStart(2, '0')
        const month = String(date_info.getMonth() + 1).padStart(2, '0')
        const year = date_info.getFullYear()

        return `${day}-${month}-${year}`
    }

    const handleFile = (e) => {
        const file = e.target.files[0]

        const reader = new FileReader()

        reader.onload = (evt) => {
            const binaryStr = evt.target.result
            const workbook = XLSX.read(binaryStr, { type: 'binary' })

            const sheetName = workbook.SheetNames[0]
            const sheet = workbook.Sheets[sheetName]

            // ✅ Important fix
            const jsonData = XLSX.utils.sheet_to_json(sheet, {
                raw: false,
                dateNF: 'dd-mm-yyyy'
            })

            // ✅ Format data properly
            const formattedData = jsonData.map((row) => ({
                ...row,

                date: typeof row.date === 'number'
                    ? excelDateToJSDate(row.date)
                    : row.date,

                dispatched_date: typeof row.dispatched_date === 'number'
                    ? excelDateToJSDate(row.dispatched_date)
                    : row.dispatched_date,

                delivered_date: typeof row.delivered_date === 'number'
                    ? excelDateToJSDate(row.delivered_date)
                    : row.delivered_date,

                contact: row.contact ? String(row.contact) : ''
            }))

            console.log(formattedData)
            setdata(formattedData)
        }

        reader.readAsBinaryString(file)
    }

    const sendToBackend = () => {
        axios.post('http://localhost:4000/upload', data)
            .then(() => alert("✅ Data stored in DB"))
            .catch(err => console.log(err))
    }

    return (
        <div className="container p-5">
            <h2>Upload Excel</h2>

            <input type="file" onChange={handleFile} />

            <button onClick={sendToBackend}>Save to DB</button>

            <table className="table mt-4" border="1">
                <thead>
                    <tr>
                        {data.length > 0 && Object.keys(data[0]).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {Object.values(row).map((val, i) => (
                                <td key={i}>{val}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ExcelUpload



























// import React, { useState } from 'react'
// import * as XLSX from 'xlsx'
// import axios from 'axios'

// const ExcelUpload = () => {
//     const [data, setdata] = useState([])

//     const handleFile = (e) => {
//         const file = e.target.files[0]

//         const reader = new FileReader()

//         reader.onload = (evt) => {
//             const binaryStr = evt.target.result
//             const workbook = XLSX.read(binaryStr, { type: 'binary' })

//             const sheetName = workbook.SheetNames[0]
//             const sheet = workbook.Sheets[sheetName]

//             const jsonData = XLSX.utils.sheet_to_json(sheet)

//             console.log(jsonData)
//             setdata(jsonData)
//         }

//         reader.readAsBinaryString(file)
//     }

//     const sendToBackend = () => {
//         axios.post('http://localhost:4000/upload', data)
//             .then(() => alert("Data stored in DB"))
//             .catch(err => console.log(err))
//     }

//     return (
//         <div className="container p-5">
//             <h2>Upload Excel</h2>

//             <input type="file" onChange={handleFile} />

//             <button onClick={sendToBackend}>Save to DB</button>

//             <table className="table mt-4">
//                 <thead>
//                     <tr>
//                         {data.length > 0 && Object.keys(data[0]).map((key) => (
//                             <th key={key}>{key}</th>
//                         ))}
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {data.map((row, index) => (
//                         <tr key={index}>
//                             {Object.values(row).map((val, i) => (
//                                 <td key={i}>{val}</td>
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// export default ExcelUpload