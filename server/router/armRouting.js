let express = require('express')
require('../db')
let Arm = require('../modal/armmodal')
let armRouting = express.Router()

armRouting.get('/arm', async (req, res) => {
    try {
        const products = await Arm.find();  // ✅ get real data
        res.json(products);                     // ✅ send array
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

armRouting.post('/arm', async (req, res) => {
    let prod = new Product(req.body)
    let results = await prod.save()
    res.send(results)
})

armRouting.delete('/arm/:id', async (req, res) => {
    const id1 = req.params.id;
    let prod = await Arm.deleteOne({ _id: id1 })
    res.send(prod)
})

armRouting.get('/arm/:id', async (req, res) => {
    const id1 = req.params.id
    let prod = await Arm.findOne({ _id: id1 })
    res.send(prod)
})

// armRouting.put('/arm/:id', async (req, res) => {
//     const id1 = req.params.id
//     let prod = await Arm.updateOne({ _id: id1 }, { $set: req.body })
//     res.send(prod)

// })

armRouting.put('/arm/:id', async (req, res) => {
    try {
        const id1 = req.params.id;

        const updatedProduct = await Arm.findByIdAndUpdate(
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

module.exports = armRouting