let mongoose = require('mongoose')


let armSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String   // (for now URL, later file upload)
    },
    quantity: {
        type: Number,
        default: 0
    },
    sku: {
        type: String,
        unique: true
    }
})

module.exports = mongoose.model('amrproducts', armSchema);