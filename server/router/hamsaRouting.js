let express = require('express')
require('../db')
let Hamsa = require('../modal/hamsamodal')
let hamsaRouting = express.Router()


hamsaRouting.get('/hamsa', async (req, res) => {
    let hprod = await Hamsa.find()
    if (hprod.length > 0) {
        res.send(hprod)
    } else {
        res.send("no data found")
    }
})


hamsaRouting.post('/hamsa', async (req, res) => {
    let hprod = new Hamsa(req.body)
    let results = await hprod.save()
    res.send(results)
})


hamsaRouting.delete('/hamsa/:id', async (req, res) => {
    let id1 = req.params.id
    let hprod = await Hamsa.deleteOne({ _id: id1 })
    res.send(hprod)

})


hamsaRouting.get('/hamsa/:id', async (req, res) => {
    let id1 = req.params.id
    let hprod = await Hamsa.findOne({ _id: id1 })
    res.send(hprod)
})


hamsaRouting.put('/hamsa/:id', async (req, res) => {
    let id1 = req.params.id
    let hprod = await Hamsa.updateOne({ _id: id1 }, { $set: req.body })
    res.send(hprod)
})
module.exports = hamsaRouting