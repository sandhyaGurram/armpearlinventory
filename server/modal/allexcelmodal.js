let mongoose = require('mongoose')

let allexcelSchema = new mongoose.Schema({
    platform: String, // amazon / flipkart / meesho
}, { strict: false })

module.exports = mongoose.model('allexceldata', allexcelSchema)