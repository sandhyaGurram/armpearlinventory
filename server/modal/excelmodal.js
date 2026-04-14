let mongoose = require('mongoose')

let excelSchema = new mongoose.Schema({}, { strict: false })
// dynamic schema (accepts any Excel structure)

module.exports = mongoose.model('exceldata', excelSchema)