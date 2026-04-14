let express = require('express')
require('../db')
let Student = require('../modal/studentmodal')
let studentRouting = express.Router()


studentRouting.get('/student', (req, res) => {
    res.send(`<h1>student get data</h1>`)
})

studentRouting.post('/student', async (req, res) => {
    let stu = new Student(req.body)
    let results = await stu.save()
    res.send(results)
})

module.exports = studentRouting