const express = require("express")
require('dotenv').config();
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const connectWithDatabase = require('./config/db');

const authRoutes = require('./routes/authRoutes')

const app = express()

//Middleware
app.use(bodyParser.json())

//Routes
app.use("/api/auth", authRoutes)

connectWithDatabase()

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})