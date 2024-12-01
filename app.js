const express = require("express")
require('dotenv').config();
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const connectWithDatabase = require('./config/db');

//Routes
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')

const app = express()

//Middleware
app.use(bodyParser.json())

//Routes
app.use("/api/auth", authRoutes)
app.use('/api/products', productRoutes);

connectWithDatabase()

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})