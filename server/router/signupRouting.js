let express = require('express')
require('../db')
let Signup = require('../modal/signupmodal')
let signupRouting = express.Router()


signupRouting.post('/signup', async (req, res) => {
    const { name, email, password, cpassword, phone, address } = req.body
    let exists = await Signup.findOne({ email: email })
    if (exists) {
        res.send(`<h1>user already exists</h1>`)
    } else if (password != cpassword) {
        res.send('<h1>Paasword Incorrect</h1>')
    } else {
        let result = new Signup(req.body)
        let info = await result.save()
        res.send(info)
    }
})

signupRouting.post('/login', async (req, res) => {
    const { email, password } = req.body
    let exist = await Signup.findOne({ email: email })
    if (!exist) {
        res.send(`<h1>user not found</h1>`)
    } else if (exist.password == password) {
        res.send("valid")
    } else {
        res.send("Invalid")
    }
})

module.exports = signupRouting