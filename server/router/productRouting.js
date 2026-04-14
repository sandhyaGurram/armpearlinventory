let express = require('express')
require('../db')
let Product = require('../modal/productmodal')
let productRouting = express.Router()


productRouting.get('/product', async (req, res) => {
    let prod = await Product.find()
    if (prod.length > 0) {
        res.send(prod)
    } else {
        res.send("no data found")
    }
});

productRouting.post('/product', async (req, res) => {
    let prod = new Product(req.body)
    let results = await prod.save()
    res.send(results)
})

productRouting.delete('/product/:id', async (req, res) => {
    const id1 = req.params.id;
    let prod = await Product.deleteOne({ _id: id1 })
    res.send(prod)
})

productRouting.get('/product/:id', async (req, res) => {
    const id1 = req.params.id
    let prod = await Product.findOne({ _id: id1 })
    res.send(prod)
})

// productRouting.put('/product/:id', async (req, res) => {
//     const id1 = req.params.id
//     let prod = await Product.updateOne({ _id: id1 }, { $set: req.body })
//     res.send(prod)

// })

productRouting.put('/product/:id', async (req, res) => {
    try {
        const id1 = req.params.id;

        const updatedProduct = await Product.findByIdAndUpdate(
            id1,
            req.body,
            { new: true } // ✅ returns updated data
        );

        res.send(updatedProduct);
    } catch (err) {
        console.log(err);
        res.status(500).send("Update failed");
    }
});

module.exports = productRouting