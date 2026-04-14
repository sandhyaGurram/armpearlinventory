let express = require('express')
let allexcelRouter = express.Router()
let AllExcel = require('../modal/allexcelmodal')







allexcelRouter.post('/allupload/:platform', async (req, res) => {
    const platform = req.params.platform

    let dataWithPlatform = req.body.map(item => ({
        ...item,
        platform
    }))

    let savedData = await AllExcel.insertMany(dataWithPlatform)

    res.send(savedData)
})
allexcelRouter.get('/allexcel/:platform', async (req, res) => {
    try {
        const platform = req.params.platform

        let data = await AllExcel.find({ platform })

        res.send(data)
    } catch (err) {
        res.send(err)
    }
})


module.exports = allexcelRouter