

let express = require('express')

let student = require('./router/studentRouting')
let product = require('./router/productRouting')
let arm = require('./router/armRouting')
let shopify = require('./router/shopifyRouting')
let hamsa = require('./router/hamsaRouting')
let signup = require('./router/signupRouting')
let excel = require('./router/excelRouting')
let allexcel = require('./router/allexcelRouting')
let customer = require('./router/customerRouting')
require('dotenv').config();

let cors = require('cors')

let app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use('/', student)
app.use('/', product)
app.use('/', arm)
app.use('/', hamsa)
app.use('/', signup)
app.use('/', excel)
app.use('/', allexcel)
app.use('/', shopify)
app.use('/', customer)


app.listen(4000)