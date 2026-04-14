let mongoose = require('mongoose')

let studentSchema = mongoose.Schema({
    customername: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('students', studentSchema);