let express = require('express')
let rexcelRouter = express.Router()
let Excel = require('../modal/excelmodal')



rexcelRouter.post('/upload', async (req, res) => {
    try {
        let records = req.body

        let savedData = await Excel.insertMany(records)

        res.send(savedData)
    } catch (err) {
        res.send(err)
    }
})

rexcelRouter.get('/excel', async (req, res) => {
    let data = await Excel.find()
    res.send(data)
})


module.exports = rexcelRouter