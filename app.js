const express = require("express")
require('dotenv').config();
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const connectWithDatabase = require('./config/db');

const app = express()

//Middleware
app.use(bodyParser.json())

connectWithDatabase()

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})